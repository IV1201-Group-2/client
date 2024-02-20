import { ref, computed, type Ref } from "vue";
import { defineStore } from "pinia";
import type { RegistrationForm } from "@/util/types";
import router from "@/router";
import { RESTError } from "@/util/error";

type Role = "Applicant" | "Recruiter" | "";

export const useAuthStore = defineStore("auth", () => {
  const loginToken = ref("");
  const resetToken = ref("");
  const isAuthenticated = computed(() => !!loginToken.value);
  const role: Ref<Role> = ref("");

  async function register(registrationForm: RegistrationForm): Promise<RESTError> {
    const response = await fetch("https://register-service-c7bdd87bf7fd.herokuapp.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(registrationForm)
    });
    const jsonResponse = await response.json();

    if (response.status === 200) {
      return await login(registrationForm.username, registrationForm.password);
    } else {
      return jsonResponse.error as RESTError;
    }
  }

  function parseJwt(encryptedToken: string) {
    const base64Url = encryptedToken.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  async function login(username: string, password: string): Promise<RESTError> {
    const response = await fetch("https://login-service-afb21392797e.herokuapp.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ identity: username, password })
    });
    const jsonResponse = await response.json();

    if (response.status === 200) {
      loginToken.value = jsonResponse.token;
      role.value = parseJwt(jsonResponse.token).role === 2 ? "Applicant" : "Recruiter";
      router.push("/");
      return RESTError.None;
    } else {
      if (jsonResponse.error === RESTError.MissingPassword) {
        resetToken.value = jsonResponse.details.reset_token;
      }
      return jsonResponse.error as RESTError;
    }
  }

  async function resetPassword(password: string): Promise<RESTError> {
    const response = await fetch("https://login-service-afb21392797e.herokuapp.com/api/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resetToken.value}`
      },
      body: JSON.stringify({ password })
    });
    const jsonResponse = await response.json();

    resetToken.value = "";
    if (response.status === 200) {
      loginToken.value = jsonResponse.token;
      role.value = parseJwt(jsonResponse.token).role === 2 ? "Applicant" : "Recruiter";
      router.push("/");
      return RESTError.None;
    } else {
      return jsonResponse.error as RESTError;
    }
  }

  function logout() {
    loginToken.value = "";
    resetToken.value = "";
    role.value = "";
    router.push("/");
  }

  return {
    loginToken,
    resetToken,
    isAuthenticated,
    role,
    parseJwt,
    register,
    login,
    resetPassword,
    logout
  };
});

import { ref, computed, type Ref } from "vue";
import { defineStore } from "pinia";
import type { RegistrationForm } from "@/util/types";
import router from "@/router";

type Role = "Applicant" | "Recruiter" | "";
type AuthError =
  "MISSING_PARAMETERS" |
  "MISSING_PASSWORD" |
  "INVALID_EMAIL" |
  "USERNAME_TAKEN" |
  "EMAIL_TAKEN" |
  "PNR_TAKEN" |
  "WRONG_IDENTITY" |
  "WRONG_PASSWORD" |
  "ALREADY_LOGGED_IN" |
  "UNKNOWN" |
  "";

export interface AuthResult {
  success: boolean;
  responseCode: number;
  error: AuthError;
};

export const useAuthStore = defineStore("auth", () => {
  const token = ref("");
  const isAuthenticated = computed(() => !!token.value);
  const role: Ref<Role> = ref("");

  async function register(registrationForm: RegistrationForm): Promise<AuthResult> {
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
      // TODO
      return { success: false, responseCode: response.status, error: jsonResponse.error as AuthError };
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

  async function login(username: string, password: string): Promise<AuthResult> {
    const response = await fetch("https://login-service-afb21392797e.herokuapp.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ identity: username, password })
    });
    const jsonResponse = await response.json();

    if (response.status === 200) {
      token.value = jsonResponse.token;
      role.value = parseJwt(jsonResponse.token).role === 2 ? "Applicant" : "Recruiter";
      router.push("/");
      return { success: true, responseCode: response.status, error: "" };
    } else {
      return { success: false, responseCode: response.status, error: jsonResponse.error as AuthError };
    }
  }

  function logout() {
    token.value = "";
    role.value = "";
    router.push("/");
  }

  return {
    token,
    isAuthenticated,
    role,
    register,
    login,
    logout
  };
});

import { ref, computed, type Ref } from "vue";
import { defineStore } from "pinia";
import type { RegistrationForm } from "@/util/types";
import router from "@/router";

type Role = "Applicant" | "Recruiter" | "";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.tPaOrZOmxSsK6VVxL_oHRdqplpxlyizeoQBhBmjskFg"
  );
  const isAuthenticated = computed(() => !!token.value);
  const role: Ref<Role> = ref("Recruiter");

  function register(registrationForm: RegistrationForm) {
    fetch("https://register-service-c7bdd87bf7fd.herokuapp.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(registrationForm)
    }).then((response) => {
      console.log("status code: " + response.status);
    });
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

  function login(username: string, password: string) {
    fetch("https://login-service-afb21392797e.herokuapp.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ identity: username, password })
    }).then((response) => {
      if (response.status !== 200) {
        response.json().then((result) => console.log(result));
        // throw "could not login, status code: " + response.status
      } else {
        response.json().then((result) => {
          token.value = result.token;
          role.value = parseJwt(result.token).role === 2 ? "Applicant" : "Recruiter";
          router.push("application");
        });
      }
    });
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
    parseJwt,
    register,
    login,
    logout
  };
});

import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { RegistrationForm } from '@/util/types';
import router from '@/router';

type Role = "Applicant" | "Recruiter" | "";

export const useAuthStore = defineStore('auth', () => {
    const token = ref("");
    const isAuthenticated = computed(() => !!token.value);
    const role: Ref<Role> = ref("")

    function register(registrationForm: RegistrationForm) {
        fetch("https://register-service-c7bdd87bf7fd.herokuapp.com/api/register", {
            method: "POST",  
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registrationForm)
        }).then(response => console.log("status code: " + response.status))
    }

    function parseJwt (encryptedToken: string) {
        var base64Url = encryptedToken.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    async function login(username: string, password: string) {
        token.value = (await (await fetch("http://localhost:8080/getToken")).json()).value;
        role.value = (await (await fetch("http://localhost:8080/getRole", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token.value}`,
                "Content-Type": "application/json"
            }
        })).json()).value;
        router.push(role.value == "Applicant" ? '/application' : '/recruitment')
    }

    function logout() {
        token.value = "";
        role.value = "";
        router.push('/')
    }

    return {
        token,
        isAuthenticated,
        role,
        register,
        login,
        logout
    }
})

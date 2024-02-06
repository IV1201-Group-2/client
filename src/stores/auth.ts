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
        // to-do
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

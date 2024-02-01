import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { RegistrationForm } from '@/util/types';

type Role = "Applicant" | "Recruiter" | "";

export const useAuthStore = defineStore('auth', () => {
    const token = ref("");
    const isAuthenticated = computed(() => !!token.value);
    const role: Ref<Role> = ref("Applicant")

    function register(registrationForm: RegistrationForm) {
        // to-do
    }

    function login(username: string, password: string) {
        token.value = username + password; //placeholder
    }

    function logout() {
        token.value = ""; //placeholder
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

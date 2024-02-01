import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { RegistrationForm } from '@/util/types';

export const useAuthStore = defineStore('auth', () => {
    const token = ref("");
    const isAuthenticated = computed(() => !!token.value)

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
        register,
        login,
        logout
    }
})

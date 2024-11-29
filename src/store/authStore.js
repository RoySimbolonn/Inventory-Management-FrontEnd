import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        token: localStorage.getItem('token') || '',
        role: localStorage.getItem('role') || '',
    }),

    actions: {
        setToken(token) {
            // Pastikan token tidak undefined
            if (token) {
                this.token = token;
                localStorage.setItem('token', token);
            }
        },

        setRole(role) {
            // Pastikan role tidak undefined
            if (role) {
                this.role = role;
                localStorage.setItem('role', role);
            }
        },

        logout() {
            this.token = '';
            this.role = '';
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('auth');
        }
    },

    getters: {
        isAuthenticated() {
            return !!this.token;
        }
    }
});
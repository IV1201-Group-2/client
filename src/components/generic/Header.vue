<script setup lang="ts">
import { RouterLink } from "vue-router"
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);
const i18n = useI18n();

function changeLocale(locale: string) {
  i18n.locale.value = locale;
}
</script>

<template>
    <header>
        <nav>
        <RouterLink v-if="isAuthenticated" @click="authStore.logout()" to="">{{ $t("navigation.logout") }}</RouterLink>
        <RouterLink v-if="!isAuthenticated" to="/">{{ $t("navigation.login") }}</RouterLink>
        <RouterLink v-if="!isAuthenticated" to="/register">{{ $t("navigation.register") }}</RouterLink>
        </nav>
        <v-btn>
        <v-icon icon="mdi-translate" />
        <v-menu activator="parent">
            <v-list>
            <v-list-item
                v-for="language in i18n.availableLocales"
                :key="language"
                :value="language"
                @click="() => changeLocale(language)"
            >
                <v-list-item-title>
                {{ $t("languages." + language) }}
                </v-list-item-title>
            </v-list-item>
            </v-list>
        </v-menu>
        </v-btn>
    </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  width: 100%;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    flex-direction: row;
    place-items: center;
    justify-content: space-between;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    font-size: 1rem;
  }
}
</style>
<script setup lang="ts">
import { type ref } from "vue";
import { useAuthStore } from "@/stores/auth";
const { login } = useAuthStore();

const basePath = "applicant.login-page.";
const formPath = basePath + "form.";
const fieldsPath = formPath + "fields.";
const buttonsPath = formPath + "buttons.";

const username = ref("");
const password = ref("");

// const isFormValid = ref(false);
</script>

<template>
  <main>
    <v-sheet width="300" class="mx-auto">
      <h1>{{ $t(basePath + "header") }}</h1>
      <br />
      <v-form @submit.prevent>
        <v-text-field v-model="username" :label="$t(fieldsPath + 'username')" />
        <v-text-field v-model="password" :label="$t(fieldsPath + 'password')" />
        <v-btn type="submit" @click="login(username, password)" block>{{ $t(buttonsPath + "login") }}</v-btn>
      </v-form>
    </v-sheet>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>

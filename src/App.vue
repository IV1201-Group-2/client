<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./components/generic/PageHeader.vue";
import GenericError from "@/components/generic/GenericError.vue";
</script>

<template>
  <Header />
  <RouterView />
  <GenericError />
</template>

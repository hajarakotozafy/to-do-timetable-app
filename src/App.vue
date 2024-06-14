<script setup>
import { onMounted, onBeforeMount } from "vue";
import "@fontsource/plus-jakarta-sans";

import Header from './components/HeaderComponent/Header.vue';
import Dashboard from "./layouts/DashboardLayout/DashboardLayout.vue";

import { useTimetableTodosStore } from "./stores/timetableData";

const store = useTimetableTodosStore()
</script>

<template>
  <Header/>
  <Dashboard/>
</template>

<style scoped>
</style>

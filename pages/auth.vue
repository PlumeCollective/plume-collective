<script setup lang="ts">
import Login from "~/components/auth/Login.vue";
import Signup from "~/components/auth/Signup.vue";

const currentView = ref("login");
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center-safe gap-16 bg-base-100 p-8"
  >
    <Login v-if="currentView === 'login'" @switch="currentView = 'signup'" />
    <Signup v-else @switch="currentView = 'login'" />
    <NuxtImg src="ui/connection-panel.png" alt="Mockup" class="h-full" />
  </div>
</template>

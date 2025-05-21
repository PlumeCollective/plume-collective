<script setup lang="ts">
const user = useSupabaseUser();

watchEffect(() => {
  if (user.value) {
    return navigateTo("/library");
  } else {
    return navigateTo("/auth/login");
  }
});
</script>

<template>
  <div class="hero min-h-screen bg-base-100">
    <div class="hero-content max-w-md">
      <NuxtImg src="/logo/plume-collective-logo.svg" alt="Logo" />
    </div>
  </div>
</template>

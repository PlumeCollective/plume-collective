<script setup lang="ts">
const user = useSupabaseUser();

watchEffect(() => {
  if (!user.value) {
    return navigateTo("/auth/login");
  }
});
</script>

<template>
  <div class="flex items-center">
    <WorkInProgress />
  </div>
</template>

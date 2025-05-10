<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const handleLogout = async () => {
  await supabase.auth.signOut();
  return navigateTo("/");
};
</script>

<template>
  <div class="navbar bg-base-100 shadow">
    <div class="flex-1">
      <NuxtLink to="/" class="btn btn-ghost normal-case text-xl"
        >Plume Collective</NuxtLink
      >
    </div>
    <div class="flex-none">
      <div v-if="user" class="space-x-2">
        <button class="btn btn-outline" @click="handleLogout">
          Se déconnecter
        </button>
      </div>
      <div v-else class="space-x-2">
        <NuxtLink to="/auth/login" class="btn btn-outline"
          >Se connecter</NuxtLink
        >
        <NuxtLink to="/auth/signup" class="btn btn-primary"
          >Créer un compte</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

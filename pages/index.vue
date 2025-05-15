<script setup lang="ts">
const user = useSupabaseUser();

watchEffect(() => {
  if (user.value) {
    return navigateTo("/dashboard");
  } else {
    return navigateTo("/auth/login");
  }
});
</script>

<template>
  <div class="hero min-h-screen bg-base-100">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Bienvenue sur Plume Collective</h1>
        <p class="py-6">
          Connectez-vous ou créez un compte pour découvrir des livres uniques,
          corriger des manuscrits, et soutenir les auteurs indépendants.
        </p>
        <div class="space-x-4">
          <NuxtLink to="/auth/login" class="btn btn-primary"
            >Se connecter</NuxtLink
          >
          <NuxtLink to="/auth/signup" class="btn btn-accent text-white"
            >Créer un compte</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

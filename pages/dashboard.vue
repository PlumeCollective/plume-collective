<script setup lang="ts">
import { currentUser } from "@/store/state";
const user = useSupabaseUser();

watchEffect(() => {
  if (!user.value) {
    return navigateTo("/auth/login");
  }
});
</script>

<template>
  <div class="hero min-h-screen">
    <div class="hero-content text-center flex flex-col items-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Plume Collective</h1>
        <p class="py-6">
          Découvrez des histoires captivantes et des auteurs talentueux. Lisez
          des ebooks gratuitement et soutenez la création littéraire.
        </p>
        <NuxtLink to="/reader" class="btn btn-accent text-white mb-4">
          Lire "Gatsby le Magnifique"
        </NuxtLink>
        <EbookUploader />
        <div>{{ currentUser }}</div>
      </div>
    </div>
  </div>
</template>

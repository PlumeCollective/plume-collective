<script setup lang="ts">
const { email, password, confirmPassword, errorMessage, loading, signupUser } =
  useSignupUser();
const user = useSupabaseUser();

definePageMeta({
  layout: "auth",
});

watchEffect(() => {
  if (user.value) {
    return navigateTo("/library");
  }
});
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center-safe gap-16 bg-base-100 p-8"
  >
    <div class="w-full max-w-lg">
      <h1 class="text-4xl font-bold text-neutral mb-4">Créer un compte</h1>
      <p class="mb-8 text-neutral">Rejoignez Plume Collective</p>
      <form class="flex flex-col gap-4" @submit.prevent="signupUser">
        <div>
          <label class="label">
            <span class="label-text font-bold text-neutral">
              Adresse e-mail
            </span>
          </label>
          <input
            v-model="email"
            type="email"
            placeholder="Entrez votre e-mail"
            class="input w-full"
          />
        </div>

        <div>
          <label class="label">
            <span class="label-text font-bold text-neutral">Mot de passe</span>
          </label>
          <input
            v-model="password"
            type="password"
            placeholder="Entrez votre mot de passe"
            class="input w-full"
          />
        </div>

        <div>
          <label class="label">
            <span class="label-text font-bold text-neutral">
              Vérification du mot de passe
            </span>
          </label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="Vérifiez votre mot de passe"
            class="input w-full"
          />
        </div>

        <div v-if="errorMessage" class="text-error text-sm mt-2">
          {{ errorMessage }}
        </div>

        <div
          class="flex flex-col sm:flex-row items-center justify-between gap-2 mt-8"
        >
          <button
            type="submit"
            class="btn btn-primary text-base-100 w-full sm:w-auto"
            :disabled="loading"
          >
            <span v-if="loading" class="loading loading-spinner"></span>
            <span v-else>Créer un compte</span>
          </button>
          <span class="text-neutral">ou</span>
          <NuxtLink
            to="/auth/login"
            type="button"
            class="btn btn-soft w-full sm:w-auto text-primary"
          >
            Se connecter
          </NuxtLink>
        </div>
      </form>
    </div>
    <NuxtImg src="ui/connection-panel.png" alt="Mockup" class="h-full" />
  </div>
</template>

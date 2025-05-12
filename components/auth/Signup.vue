<script setup lang="ts">
const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const errorMessage = ref("");

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const handleSignUp = async () => {
  loading.value = true;
  errorMessage.value = "";

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Les mots de passe ne correspondent pas.";
    loading.value = false;
    return;
  }

  if (!passwordRegex.test(password.value)) {
    errorMessage.value =
      "Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule et un chiffre.";
    loading.value = false;
    return;
  }

  try {
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    navigateTo("/dashboard");
  } catch (error: any) {
    errorMessage.value = error.message || "Erreur inconnue.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="w-full max-w-lg">
    <h1 class="text-4xl font-bold text-neutral mb-4">Créer un compte</h1>
    <p class="mb-8 text-neutral">Rejoignez Plume Collective</p>

    <form @submit.prevent="handleSignUp" class="flex flex-col gap-4">
      <div>
        <label class="label">
          <span class="label-text font-bold text-neutral">Adresse e-mail</span>
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
          placeholder="Répétez votre mot de passe"
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
        <button
          type="button"
          class="btn btn-soft w-full sm:w-auto text-primary"
          @click="$emit('switch')"
        >
          Se connecter
        </button>
      </div>

      <div class="flex justify-center mt-8 text-sm">
        <a href="#" class="link text-primary">Mot de passe oublié ?</a>
      </div>
    </form>
  </div>
</template>

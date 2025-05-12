<script setup lang="ts">
import { currentUser } from "@/store/state";

const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = "";
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.user.id)
      .single();
    if (userError) throw userError;
    currentUser.value = userData;

    await navigateTo("/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    errorMessage.value = error.message || "Erreur inconnue.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center-safe gap-16 bg-base-100 p-8"
  >
    <div class="w-full max-w-lg">
      <h1 class="text-4xl font-bold text-neutral mb-4">Connexion</h1>
      <p class="mb-8 text-neutral">Accédez à votre compte</p>

      <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
        <div>
          <label class="label">
            <span class="label-text font-bold text-neutral"
              >Adresse e-mail</span
            >
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
            <span v-else>Se connecter</span>
          </button>
          <span class="text-neutral">ou</span>
          <NuxtLink
            to="/auth/signup"
            type="button"
            class="btn btn-soft w-full sm:w-auto text-primary"
          >
            Créer un compte
          </NuxtLink>
        </div>

        <div class="flex justify-center mt-8 text-sm">
          <a href="#" class="link text-primary">Mot de passe oublié ?</a>
        </div>
      </form>
    </div>
    <NuxtImg src="ui/connection-panel.png" alt="Mockup" class="h-full" />
  </div>
</template>

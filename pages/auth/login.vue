<script setup lang="ts">
const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = "";
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    navigateTo("/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    errorMessage.value = error.message || "Erreur inconnue.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form
    class="max-w-md mx-auto mt-10 space-y-4 p-6 border rounded-xl shadow bg-white"
    @submit.prevent="handleLogin"
  >
    <h1 class="text-2xl font-bold text-center">Se connecter</h1>
    <div v-if="errorMessage" class="text-red-600">{{ errorMessage }}</div>
    <input
      v-model="email"
      type="email"
      placeholder="Email"
      class="input input-bordered w-full"
      required
    />
    <input
      v-model="password"
      type="password"
      placeholder="Mot de passe"
      class="input input-bordered w-full"
      required
    />
    <button type="submit" class="btn btn-primary w-full" :disabled="loading">
      {{ loading ? "Connexion..." : "Se connecter" }}
    </button>
    <div class="text-sm text-center text-gray-500">
      Pas encore de compte ?
      <NuxtLink to="/auth/signup" class="text-blue-500 underline">
        Créer un compte
      </NuxtLink>
    </div>
  </form>
</template>

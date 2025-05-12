<script setup lang="ts">
import { PhBookBookmark, PhPencilSimple } from "@phosphor-icons/vue";
import { currentUser } from "@/store/state";
import type { Database } from "@/database.types";

const supabase = useSupabaseClient<Database>();

const updateRole = async (role: "reader" | "author") => {
  if (!currentUser.value?.id) {
    console.error("Utilisateur non connecté.");
    return;
  }

  const { data, error } = await supabase
    .from("users")
    .update({ role })
    .eq("id", currentUser.value.id)
    .select()
    .single();

  if (error) {
    console.error("Erreur lors de la mise à jour du rôle:", error.message);
    return;
  }

  currentUser.value = data;
  await navigateTo("/dashboard");
};
</script>

<template>
  <div
    class="min-h-screen bg-base-100 flex flex-col items-center justify-center"
  >
    <div class="w-full max-w-4xl">
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-neutral">Sélection du rôle</h1>
        <p class="text-neutral mt-2">
          Veuillez choisir votre rôle pour continuer.
        </p>
      </div>

      <div class="mb-8">
        <h2 class="text-xl font-semibold text-neutral mb-4">Rôle lecteur</h2>
        <div
          class="bg-secondary/5 rounded-xl p-6 flex flex-col items-start gap-2 shadow-md"
        >
          <PhBookBookmark
            class="text-secondary bg-secondary/10 rounded-full p-1 text-3xl"
          />
          <h3 class="text-lg font-bold text-secondary">Lecteur</h3>
          <p class="text-neutral">
            Accédez à la bibliothèque, lisez des livres, ajoutez à votre
            wishlist et suivez vos auteurs favoris.
          </p>
          <button
            class="btn btn-secondary btn-sm text-white"
            @click="updateRole('reader')"
          >
            Choisir lecteur
          </button>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-semibold text-neutral mb-4">Rôle auteur</h2>
        <div
          class="bg-secondary/5 rounded-xl p-6 flex flex-col items-start gap-2 shadow-md"
        >
          <PhPencilSimple
            class="text-primary bg-primary/10 rounded-full p-1 text-3xl"
          />

          <h3 class="text-lg font-bold text-primary">Auteur</h3>
          <p class="text-neutral">
            Publiez vos livres, gérez vos ventes, recevez des corrections et
            développez votre audience.
          </p>

          <button
            class="btn btn-primary btn-sm text-white"
            @click="updateRole('author')"
          >
            Choisir auteur
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

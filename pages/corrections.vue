<script setup lang="ts">
import type { Database } from "~/database.types";
const user = useSupabaseUser();
const supabase = useSupabaseClient<Database>();

watchEffect(() => {
  if (!user.value) {
    return navigateTo("/auth/login");
  }
});

interface CorrectionRow {
  avatar: string | null;
  nom: string;
  prenom: string;
  titre: string;
  date: string;
  statut: "open" | "resolved" | "flagged" | null;
  type: "comment" | "correction" | "other" | null;
}

const rows = ref<CorrectionRow[]>([]);

onMounted(async () => {
  const userId = user.value?.id;
  if (!userId) return;

  const { data, error } = await supabase
    .from("annotations")
    .select(
      `
      id,
      content,
      type,
      status,
      date_created,
      books (
        id,
        title,
        author_id
      ),
      users (
        profile_picture,
        id,
        first_name,
        last_name
      )
    `
    )
    .order("date_created", { ascending: false });

  if (error) {
    console.error("Erreur chargement annotations :", error.message);
    return;
  }

  rows.value = data.map((ann) => ({
    avatar: ann.users?.profile_picture || null,
    nom: ann.users?.last_name || "-",
    prenom: ann.users?.first_name || "-",
    titre: ann.books?.title || "-",
    date: ann.date_created
      ? new Date(ann.date_created).toLocaleDateString("fr-FR")
      : "-",
    statut: ann.status,
    type: ann.type,
    extrait: ann.content?.slice(0, 40) || "", // ➕ ici
  }));
});
</script>

<template>
  <div class="flex flex-col gap-8 px-6 pb-20">
    <h1 class="text-3xl font-bold">Corrections</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
        type="text"
        placeholder="Rechercher par nom, titre..."
        class="input input-bordered w-full"
      />
      <select class="select select-bordered w-full">
        <option selected>Tous les statuts</option>
        <option>À corriger</option>
        <option>En cours</option>
        <option>Corrigé</option>
      </select>
      <select class="select select-bordered w-full">
        <option selected>Tous les types</option>
        <option>Orthographe</option>
        <option>Grammaire</option>
        <option>Ponctuation</option>
        <option>Style</option>
      </select>
    </div>

    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr class="text-neutral-500">
            <th></th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Titre du livre</th>
            <th>Date d’envoi</th>
            <th>Statut</th>
            <th>Type & Actions</th>
            <th>Extrait</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="index">
            <td>
              <div class="avatar">
                <div class="w-8 h-8 rounded-full">
                  <NuxtImg
                    :src="row.avatar ?? '/plumy/plumy.svg'"
                    class="object-cover"
                    alt="Avatar"
                  />
                </div>
              </div>
            </td>
            <td>{{ row.nom }}</td>
            <td>{{ row.prenom }}</td>
            <td>{{ row.titre }}</td>
            <td>{{ row.date }}</td>
            <td>{{ row.statut }}</td>
            <td>{{ row.type }}</td>
            <td>{{ row.extrait }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

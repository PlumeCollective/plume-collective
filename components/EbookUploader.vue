<script setup lang="ts">
import type { Database } from "~/database.types";
import ePub from "epubjs";

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
const uploading = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const successMessage = ref("");
const errorMessage = ref("");

const uploadEbook = async (event: Event) => {
  if (!import.meta.client) return;

  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (!files || files.length === 0) {
    errorMessage.value = "Veuillez sélectionner un fichier .epub.";
    return;
  }

  const file = files[0];

  if (!file.name.endsWith(".epub")) {
    errorMessage.value = "Le fichier doit être au format EPUB.";
    return;
  }

  const buffer = await file.arrayBuffer();

  const bookFromFile = ePub(buffer);
  await bookFromFile.opened;

  const metadata = await bookFromFile.loaded.metadata;
  const extractedTitle = metadata?.title?.trim();
  const title = extractedTitle || file.name.replace(".epub", "");

  try {
    uploading.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    const userId = user.value?.id;
    if (!userId) {
      errorMessage.value = "Utilisateur non authentifié.";
      return;
    }

    const { data: book, error: insertBookError } = await supabase
      .from("books")
      .insert({
        title,
        author_id: userId,
      })
      .select()
      .single();

    if (insertBookError || !book) throw insertBookError;

    const fileExt = file.name.split(".").pop();
    const filePath = `${book.id}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("ebooks")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { error: updateError } = await supabase
      .from("books")
      .update({ epub_url: filePath })
      .eq("id", book.id);

    if (updateError) throw updateError;

    const { error: userBookError } = await supabase.from("user_books").insert({
      user_id: userId,
      book_id: book.id,
      type: "author",
    });

    if (userBookError) throw userBookError;

    successMessage.value = "Ebook importé et enregistré avec succès !";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    errorMessage.value = err.message || "Erreur lors de l’import.";
  } finally {
    uploading.value = false;
  }
};
</script>

<template>
  <div class="w-full text-start">
    <label class="btn w-full label label-text">
      {{ uploading ? "Importation en cours..." : "Importer un ebook" }}
      <input
        ref="fileInput"
        type="file"
        accept=".epub"
        class="hidden"
        :disabled="uploading"
        @change="uploadEbook"
      />
    </label>
    <p v-if="successMessage" class="text-green-600 mt-2">
      {{ successMessage }}
    </p>
    <p v-if="errorMessage" class="text-red-600 mt-2">
      {{ errorMessage }}
    </p>
  </div>
</template>

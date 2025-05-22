<script setup lang="ts">
import ePub from "epubjs";
import type { Book } from "epubjs";

const user = useSupabaseUser();

watchEffect(() => {
  if (!user.value) {
    return navigateTo("/auth/login");
  }
});

interface EpubInfo {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string | null;
}

const supabase = useSupabaseClient();
const ebooks = ref<EpubInfo[]>([]);

const fetchEbooks = async () => {
  const { data: files, error } = await supabase.storage
    .from("ebooks")
    .list("", {
      limit: 100,
    });

  if (error) {
    console.error("Erreur lors du listing des fichiers :", error);
    return;
  }

  const epubFiles = files.filter((f) => f.name.endsWith(".epub"));

  const promises = epubFiles.map(async (file) => {
    try {
      const { data, error: downloadError } = await supabase.storage
        .from("ebooks")
        .download(file.name);

      if (downloadError || !data) {
        throw downloadError;
      }

      const buffer = await data.arrayBuffer();
      const book: Book = ePub(buffer);
      await book.opened;

      const metadata = await book.loaded.metadata;
      const coverUrl = await book.coverUrl();

      return {
        id: file.name.split(".")[0],
        title: metadata?.title || file.name.replace(".epub", ""),
        author: metadata?.creator || "Auteur inconnu",
        description: metadata?.description || "Aucune description.",
        coverUrl,
      } satisfies EpubInfo;
    } catch (err) {
      console.error("Erreur lecture EPUB :", file.name, err);
      return null;
    }
  });

  const results = await Promise.all(promises);
  ebooks.value = results.filter(Boolean) as EpubInfo[];
};

onMounted(fetchEbooks);
</script>

<template>
  <div class="flex flex-col gap-10">
    <div class="flex flex-col gap-4">
      <h1 class="text-3xl font-bold">Marketplace</h1>
      <div role="tablist" class="tabs tabs-border">
        <a role="tab" class="tab tab-active">Tous</a>
        <a role="tab" class="tab">Romans</a>
        <a role="tab" class="tab">Essais</a>
        <a role="tab" class="tab">Poésie</a>
        <a role="tab" class="tab">Jeunesse</a>
      </div>
    </div>

    <div class="form-control">
      <label class="input input-bordered flex items-center gap-2 w-full">
        <input type="text" placeholder="Rechercher un livre, un auteur…" />
        <Icon name="ph:magnifying-glass" />
      </label>
    </div>

    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Sélection du moment</h2>
      <div class="flex flex-wrap gap-4 items-stretch">
        <BookCard v-for="book in ebooks" :key="book.id" :book="book" />
      </div>
    </section>
  </div>
</template>

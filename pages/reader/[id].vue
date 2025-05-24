<script setup lang="ts">
import ePub from "epubjs";
import type { Book, Rendition, Location } from "epubjs";
import type { Database } from "~/database.types";

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
const route = useRoute();
const id = route.params.id;
const selectedAnnotation = ref<{ cfiRange: string; text: string } | null>(null);
const showAnnotationModal = ref(false);
const annotationContent = ref("");

const bookContainer = ref<HTMLDivElement>();
const book = ref<Book>();
const rendition = ref<Rendition>();
const currentLocation = ref<Location>();

onMounted(async () => {
  const filePath = `${id}.epub`;

  const { data, error } = await supabase.storage
    .from("ebooks")
    .download(filePath);

  if (error || !data) {
    console.error("Erreur téléchargement EPUB :", error);
    return;
  }

  const arrayBuffer = await data.arrayBuffer();

  book.value = ePub(arrayBuffer);

  if (bookContainer.value) {
    rendition.value = book.value.renderTo(bookContainer.value, {
      width: "100%",
      height: "100%",
    });

    rendition.value.display().then(() => {
      currentLocation.value = rendition.value?.location;
    });

    rendition.value.on("selected", async (cfiRange: string) => {
      const text = await book.value
        ?.getRange(cfiRange)
        .then((range) => range?.toString());

      if (!text) return;

      selectedAnnotation.value = {
        cfiRange,
        text,
      };

      showAnnotationModal.value = true;

      rendition.value?.annotations.remove(cfiRange, "highlight");
    });
  }
});

const closeModal = () => {
  annotationContent.value = "";
  selectedAnnotation.value = null;
  showAnnotationModal.value = false;
};

const nextPage = () => {
  rendition.value?.next();
};

const prevPage = () => {
  rendition.value?.prev();
};

watchEffect(() => {
  if (!user.value) {
    return navigateTo("/auth/login");
  }
});
</script>

<template>
  <div class="min-h-screen">
    <AnnotationModal
      :show="showAnnotationModal"
      :selected-text="selectedAnnotation?.text || ''"
      :cfi-range="selectedAnnotation?.cfiRange || ''"
      @close="closeModal"
    />

    <div>{{ selectedAnnotation }}</div>
    <div class="flex justify-end p-8">
      <NuxtLink to="/" class="btn btn-primary text-white rounded-xl"
        >← Retour</NuxtLink
      >
    </div>
    <div class="container flex flex-col items-center mx-auto">
      <div ref="bookContainer" class="w-[90vh] h-[80vh]" />
      <div class="flex justify-center gap-4 mt-4">
        <button class="btn btn-primary text-white rounded-xl" @click="prevPage">
          ← Prev
        </button>
        <button class="btn btn-primary text-white rounded-xl" @click="nextPage">
          Next →
        </button>
      </div>
    </div>
  </div>
</template>

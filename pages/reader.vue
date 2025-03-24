<script setup lang="ts">
import { ref, onMounted } from "vue";
import ePub from "epubjs";
import type { Book, Rendition, Location } from "epubjs";

const bookContainer = ref<HTMLDivElement>();
const book = ref<Book>();
const rendition = ref<Rendition>();
const currentLocation = ref<Location>();

onMounted(() => {
  if (bookContainer.value) {
    book.value = ePub("/ebooks/the-great-gatsby.epub");

    rendition.value = book.value.renderTo(bookContainer.value, {
      width: "100%",
      height: "100%",
    });

    rendition.value.display().then(() => {
      currentLocation.value = rendition.value?.location;
    });
  }
});

const nextPage = () => {
  if (rendition.value) {
    rendition.value.next();
  }
};

const prevPage = () => {
  if (rendition.value) {
    rendition.value.prev();
  }
};
</script>

<template>
  <div class="min-h-screen">
    <div class="flex justify-end p-8">
      <NuxtLink to="/" class="btn btn-accent text-white">← Retour</NuxtLink>
    </div>
    <div class="container flex flex-col items-center mx-auto">
      <div ref="bookContainer" class="w-[90vh] h-[80vh]" />
      <div class="flex justify-center gap-4 mt-4">
        <button class="btn btn-accent text-white" @click="prevPage">
          ← Prev
        </button>
        <button class="btn btn-accent text-white" @click="nextPage">
          Next →
        </button>
      </div>
    </div>
  </div>
</template>

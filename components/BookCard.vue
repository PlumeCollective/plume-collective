<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  book: {
    id: string;
    title: string;
    author: string;
    description: string;
    coverUrl: string | null;
  };
}>();

const hasClicked = ref(false);

const readEbook = () => {
  navigateTo(`/reader/${props.book.id}`);
};
</script>

<template>
  <div
    class="card bg-secondary/10 shadow-md rounded-xl p-4 space-y-3 h-full w-full max-w-xs flex flex-col"
  >
    <div class="text-lg font-semibold truncate">{{ book.title }}</div>
    <p class="text-sm text-neutral-500 leading-snug">
      {{ book.description }}
    </p>
    <p class="text-sm text-neutral-700">Auteur : {{ book.author }}</p>

    <NuxtImg
      v-if="book.coverUrl"
      :src="book.coverUrl"
      class="w-full h-40 object-cover rounded-lg"
    />

    <div class="font-semibold">Prix : 19,95€</div>

    <div class="flex flex-col gap-2">
      <button
        v-if="!hasClicked"
        class="btn btn-primary text-white w-full"
        @click="hasClicked = true"
      >
        Ajouter au panier
      </button>
      <button
        v-else
        class="btn btn-accent text-white w-full"
        @click="readEbook"
      >
        Lire
      </button>
      <button class="btn btn-outline btn-disabled w-full">Voir détails</button>
    </div>
  </div>
</template>

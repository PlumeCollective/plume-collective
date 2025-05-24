<script setup lang="ts">
const { uploadEbook, uploading, successMessage, errorMessage } =
  useUploadEbook();

const handleUpload = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (files?.[0]) await uploadEbook(files[0]);
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
        @change="handleUpload"
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

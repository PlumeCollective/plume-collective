<script setup lang="ts">
defineProps<{
  show: boolean;
  selectedText: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "save", content: string, type: "comment" | "correction" | "other"): void;
}>();

const content = ref("");
const selectedType = ref<"comment" | "correction" | "other">("comment");

const handleSave = () => {
  if (content.value.trim()) {
    emit("save", content.value.trim(), selectedType.value);
    content.value = "";
    selectedType.value = "comment";
  }
};

const handleClose = () => {
  content.value = "";
  selectedType.value = "comment";
  emit("close");
};
</script>

<template>
  <div v-if="show" class="modal modal-open z-50">
    <div class="modal-box space-y-4">
      <h3 class="text-lg font-bold">Nouvelle annotation</h3>

      <p class="text-sm italic text-neutral-500 max-h-32 overflow-y-auto">
        "{{ selectedText }}"
      </p>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Type d’annotation</span>
        </label>
        <select v-model="selectedType" class="select select-bordered w-full">
          <option value="comment">Commentaire</option>
          <option value="correction">Correction</option>
          <option value="other">Autre</option>
        </select>
      </div>

      <textarea
        v-model="content"
        class="textarea textarea-bordered w-full"
        rows="4"
        placeholder="Écrivez votre annotation ici..."
      ></textarea>

      <div class="modal-action">
        <button class="btn btn-primary text-white" @click="handleSave">
          Enregistrer
        </button>
        <button class="btn" @click="handleClose">Annuler</button>
      </div>
    </div>
  </div>
</template>

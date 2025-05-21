<script setup lang="ts">
import type { Database } from "@/database.types.ts";

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();

watchEffect(() => {
  if (!user.value) {
    return navigateTo("/auth/login");
  }
});

const firstName = ref("");
const lastName = ref("");
const username = ref("");
const email = ref("");
const bio = ref("");
const profilePicture = ref<string | null>(null);
const uploading = ref(false);
const saving = ref(false);
const role = ref<"author" | "reader">("reader");

onMounted(async () => {
  if (!user.value) return;

  const { data, error } = await supabase
    .from("users")
    .select(
      "first_name, last_name, username, email, bio, profile_picture, role"
    )
    .eq("id", user.value.id)
    .single();

  if (error) {
    console.error("Erreur chargement profil :", error.message);
    return;
  }

  firstName.value = data.first_name || "";
  lastName.value = data.last_name || "";
  username.value = data.username || "";
  email.value = data.email || "";
  bio.value = data.bio || "";
  profilePicture.value = data.profile_picture;
  role.value = (data.role as "author" | "reader") || "reader";
});

const updateProfile = async () => {
  if (!user.value) return;
  saving.value = true;

  const { error } = await supabase
    .from("users")
    .update({
      first_name: firstName.value,
      last_name: lastName.value,
      username: username.value,
      email: email.value,
      bio: bio.value,
      profile_picture: profilePicture.value,
      role: role.value,
    })
    .eq("id", user.value.id);

  if (error) {
    console.error("Erreur mise à jour :", error.message);
  }

  saving.value = false;
};

const handleUpload = async (event: Event) => {
  if (!user.value) return;

  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  uploading.value = true;

  const ext = file.name.split(".").pop();
  const filePath = `${user.value.id}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    console.error("Erreur upload image :", uploadError.message);
    uploading.value = false;
    return;
  }

  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
  profilePicture.value = data.publicUrl;

  uploading.value = false;
};
</script>

<template>
  <div class="flex flex-col gap-8 px-6 max-w-3xl mx-auto pb-20">
    <h1 class="text-3xl font-bold">Paramètres</h1>

    <div class="flex items-center gap-4">
      <div class="avatar">
        <div
          class="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
        >
          <NuxtImg
            :src="profilePicture || '/plumy/plumy.svg'"
            class="object-cover"
            alt="Photo de profil"
          />
        </div>
      </div>
      <div>
        <label class="btn btn-outline btn-sm btn-disabled">
          {{ uploading ? "Chargement..." : "Modifier la photo" }}
          <input type="file" class="hidden" @change="handleUpload" />
        </label>
      </div>
    </div>

    <form class="flex flex-col gap-6" @submit.prevent="updateProfile">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="form-control">
          <label class="label"><span class="label-text">Nom</span></label>
          <input v-model="lastName" type="text" class="input input-bordered" />
        </div>

        <div class="form-control">
          <label class="label"><span class="label-text">Prénom</span></label>
          <input v-model="firstName" type="text" class="input input-bordered" />
        </div>

        <div class="form-control md:col-span-2 flex flex-col">
          <label class="label"
            ><span class="label-text">Nom d’utilisateur</span></label
          >
          <input
            v-model="username"
            type="text"
            class="input input-bordered w-full"
          />
        </div>

        <div class="form-control md:col-span-2 flex flex-col">
          <label class="label"><span class="label-text">Email</span></label>
          <input
            v-model="email"
            type="email"
            class="input input-bordered w-full"
          />
        </div>

        <div class="form-control md:col-span-2 flex flex-col">
          <label class="label"><span class="label-text">Rôle</span></label>
          <select v-model="role" class="select select-bordered w-full">
            <option value="author">Auteur</option>
            <option value="reader">Lecteur</option>
          </select>
        </div>

        <div class="form-control md:col-span-2 flex flex-col">
          <label class="label"><span class="label-text">Bio</span></label>
          <textarea
            v-model="bio"
            class="textarea textarea-bordered w-full"
            rows="4"
          ></textarea>
        </div>
      </div>

      <div class="flex justify-end gap-4">
        <button
          type="submit"
          class="btn btn-primary text-white"
          :disabled="saving"
        >
          {{ saving ? "Enregistrement..." : "Enregistrer" }}
        </button>
      </div>
    </form>
  </div>
</template>

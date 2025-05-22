<script setup lang="ts">
import type { Database } from "~/database.types";

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();

const currentUser = ref<{
  first_name: string | null;
  last_name: string | null;
  role: string | null;
  profile_picture: string | null;
} | null>(null);

onMounted(async () => {
  if (!user.value) return;

  const { data, error } = await supabase
    .from("users")
    .select("first_name, last_name, role, profile_picture")
    .eq("id", user.value.id)
    .single();

  if (error) {
    console.error("Erreur récupération utilisateur :", error.message);
    return;
  }

  currentUser.value = data;
});

const signOut = async () => {
  await supabase.auth.signOut();
};
</script>

<template>
  <aside class="bg-secondary/10 w-64 flex flex-col justify-between p-6">
    <div>
      <NuxtImg src="/logo/plume-collective-logo.svg" alt="Logo" class="mb-2" />

      <nav class="flex flex-col gap-1">
        <NuxtLink
          to="/library"
          class="btn btn-sm btn-ghost btn-primary hover:text-white justify-start"
          active-class="btn-active text-white"
        >
          <Icon name="ph:books" class="text-lg mr-1" />
          <span class="text-base">Bibliothèque</span>
        </NuxtLink>
        <NuxtLink
          to="/marketplace"
          class="btn btn-sm btn-ghost btn-primary hover:text-white justify-start"
          active-class="btn-active text-white"
        >
          <Icon name="ph:storefront" class="text-lg mr-1" />
          <span class="text-base">Marketplace</span>
        </NuxtLink>
        <NuxtLink
          to="/corrections"
          class="btn btn-sm btn-ghost justify-start btn-primary hover:text-white"
          active-class="btn-active text-white"
        >
          <Icon name="ph:pencil-simple" class="text-lg mr-1" />
          <span class="text-base">Corrections</span>
        </NuxtLink>
        <NuxtLink
          to="/sales"
          class="btn btn-sm btn-ghost btn-primary justify-start hover:text-white btn-disabled"
          active-class="btn-active text-white"
        >
          <Icon name="ph:chart-bar" class="text-lg mr-1" />
          <span class="text-base">Ventes</span>
        </NuxtLink>
        <NuxtLink
          to="/notifications"
          class="btn btn-sm btn-ghost btn-primary justify-start hover:text-white btn-disabled"
          active-class="btn-active text-white"
        >
          <Icon name="ph:bell" class="text-lg mr-1" />
          <span class="text-base">Notifications</span>
        </NuxtLink>
        <NuxtLink
          to="/settings"
          class="btn btn-sm btn-ghost btn-primary justify-start hover:text-white"
          active-class="btn-active text-white"
        >
          <Icon name="ph:user-circle" class="text-lg mr-1" />
          <span class="text-base">Paramètres</span>
        </NuxtLink>
      </nav>
    </div>

    <div class="flex flex-col justify-center items-center gap-1">
      <div class="avatar">
        <div
          class="w-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2"
        >
          <NuxtImg
            src="plumy/plumy.svg"
            alt="User Avatar"
            width="40"
            height="40"
          />
        </div>
      </div>
      <span class="text-sm font-semibold">
        {{
          currentUser?.first_name && currentUser?.last_name
            ? `${currentUser?.first_name} ${currentUser?.last_name}`
            : ""
        }}
      </span>
      <span class="text-xs">{{ currentUser?.role }}</span>
      <button
        class="btn btn-sm bg-neutral text-white rounded-lg"
        @click="signOut"
      >
        Se déconnecter
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import {
  PhPlus,
  PhFileArrowUp,
  PhHeart,
  PhShoppingCart,
  PhBookBookmark,
} from "@phosphor-icons/vue";

const user = useSupabaseUser();

watchEffect(() => {
  if (!user.value) {
    return navigateTo("/auth/login");
  }
});
</script>

<template>
  <div class="flex flex-col gap-10">
    <div>
      <div class="breadcrumbs text-sm">
        <ul>
          <li>
            <NuxtLink to="/library">Tableau de bord</NuxtLink>
          </li>
        </ul>
      </div>
      <h1 class="text-3xl font-bold mb-4">Tableau de bord</h1>
      <div role="tablist" class="tabs tabs-border">
        <a role="tab" class="tab tab-active">Mes livres</a>
        <a role="tab" class="tab">En correction</a>
        <a role="tab" class="tab">Wishlist</a>
        <a role="tab" class="tab">Publications</a>
        <a role="tab" class="tab">Ventes</a>
      </div>
    </div>

    <section class="flex flex-col gap-2">
      <h2 class="text-2xl font-semibold">Créer ou importer un livre</h2>
      <div class="flex justify-center gap-4">
        <div class="flex-1 relative">
          <div class="absolute inset-0 bg-base-300/50 z-10 rounded-xl"></div>

          <div
            class="bg-secondary/10 rounded-xl p-6 flex flex-col justify-between gap-2 shadow-md opacity-50 pointer-events-none select-none"
          >
            <div class="flex flex-col gap-1">
              <PhPlus
                class="text-3xl bg-primary/10 rounded-full text-primary w-10 h-10 p-2"
              />
              <span class="text-xl font-semibold">Créer un livre</span>
              <p>Commencez un nouveau manuscrit depuis zéro.</p>
            </div>
            <button class="btn btn-primary text-white rounded-xl w-max mt-2">
              Créer
            </button>
          </div>
        </div>

        <div
          class="flex-1 bg-secondary/10 rounded-xl p-6 flex flex-col justify-between gap-2 shadow-md"
        >
          <div class="flex flex-col gap-1">
            <PhFileArrowUp
              class="text-3xl bg-primary/10 rounded-full text-primary w-10 h-10 p-2"
            />
            <span class="text-xl font-semibold">Importer un livre</span>
            <p>Importer un manuscrit existant (EPUB).</p>
          </div>
          <button
            class="btn btn-primary text-white rounded-xl w-max mt-2"
            @click="navigateTo('/library/import')"
          >
            Importer
          </button>
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-2">
      <h2 class="text-2xl font-semibold">Livres favoris</h2>
      <div class="flex justify-center gap-4">
        <div class="flex-1 relative h-full">
          <div class="absolute inset-0 bg-base-300/50 z-10 rounded-xl"></div>

          <div
            class="bg-secondary/10 rounded-xl p-6 flex flex-col justify-between gap-2 shadow-md h-full"
          >
            <div class="flex flex-col gap-2">
              <PhBookBookmark
                class="text-3xl bg-primary/10 rounded-full text-primary w-10 h-10 p-2"
              />
              <span class="text-xl font-semibold">Le Voyageur</span>
              <p>En cours de correction</p>
            </div>
            <div class="flex gap-2">
              <button class="btn btn-primary text-white rounded-xl">
                Lire
              </button>
              <button
                class="btn btn-soft btn-primary bg-primary/10 text-primary rounded-xl"
              >
                Retirer
              </button>
            </div>
          </div>
        </div>

        <div class="flex-1 relative h-full">
          <div class="absolute inset-0 bg-base-300/50 z-10 rounded-xl"></div>

          <div
            class="bg-secondary/10 rounded-xl p-6 flex flex-col justify-between gap-2 shadow-md h-full"
          >
            <div class="flex flex-col gap-2">
              <PhHeart
                class="text-3xl bg-primary/10 rounded-full text-primary w-10 h-10 p-2"
              />
              <span class="text-xl font-semibold">Lumière d'été</span>
              <p>Ajouté à la wishlist</p>
            </div>
            <div class="flex gap-2">
              <button class="btn btn-primary text-white rounded-xl">
                Lire
              </button>
              <button
                class="btn btn-soft btn-primary bg-primary/10 text-primary rounded-xl"
              >
                Retirer
              </button>
            </div>
          </div>
        </div>

        <div class="flex-1 relative h-full">
          <div class="absolute inset-0 bg-base-300/50 z-10 rounded-xl"></div>

          <div
            class="bg-secondary/10 rounded-xl p-6 flex flex-col justify-between gap-2 shadow-md h-full"
          >
            <div class="flex flex-col gap-2">
              <PhShoppingCart
                class="text-3xl bg-primary/10 rounded-full text-primary w-10 h-10 p-2"
              />
              <span class="text-xl font-semibold">Nouveaux Mondes</span>
              <p>Disponible à l'achat</p>
            </div>
            <div class="flex gap-2">
              <button class="btn btn-primary text-white rounded-xl">
                Acheter
              </button>
              <button
                class="btn btn-soft btn-primary bg-primary/10 text-primary rounded-xl"
              >
                Retirer
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Livres en correction</h2>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Livre</th>
              <th>Auteur</th>
              <th>Statut</th>
              <th>Badge</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="flex items-center gap-2">
                  <div class="avatar">
                    <div class="w-8 rounded-full">
                      <NuxtImg src="/plumy/plumy.svg" />
                    </div>
                  </div>
                  Le Voyageur
                </div>
              </td>
              <td>Jean Dupont</td>
              <td>En cours</td>
              <td><span class="text-yellow-600">Badge Or</span></td>
            </tr>
            <tr>
              <td>
                <div class="flex items-center gap-2">
                  <div class="avatar">
                    <div class="w-8 rounded-full">
                      <NuxtImg src="/inky/inky.svg" />
                    </div>
                  </div>
                  Lumière d'été
                </div>
              </td>
              <td>Marie Curie</td>
              <td>À relire</td>
              <td><span class="text-neutral-500">Badge Argent</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-2xl font-semibold">Suivi des ventes</h2>
      <div class="flex">
        <WorkInProgress class="flex-1 h-96" />
      </div>
    </section>
  </div>
</template>

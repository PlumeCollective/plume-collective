<script setup lang="ts">
const user = useSupabaseUser();

watchEffect(() => {
  if (!user.value) {
    return navigateTo("/auth/login");
  }
});
</script>

<template>
  <div class="flex flex-col gap-10 px-6 max-w-5xl mx-auto pb-20">
    <div>
      <div class="breadcrumbs text-sm">
        <ul>
          <li>
            <NuxtLink to="/library">Tableau de bord</NuxtLink>
          </li>
          <li><NuxtLink to="/library/import">Importer un livre</NuxtLink></li>
        </ul>
      </div>
      <h1 class="text-3xl font-bold">Importer un livre</h1>
    </div>

    <div class="form-control max-w-5xl flex flex-col gap-4">
      <h2 class="text-2xl font-semibold">Fichier EPUB</h2>
      <EbookUploader />
    </div>

    <div role="tablist" class="tabs tabs-border">
      <a role="tab" class="tab tab-active">Présentation</a>
      <a role="tab" class="tab">Couverture</a>
      <a role="tab" class="tab">Personnages</a>
      <a role="tab" class="tab">Chapitres</a>
      <a role="tab" class="tab">Prévisualisation</a>
      <a role="tab" class="tab">Publication</a>
    </div>

    <WorkInProgress />
  </div>

  <!-- <div class="flex flex-col gap-6">
      <div class="space-y-4">
        <h2 class="text-2xl font-semibold">Présentation du livre</h2>

        <input
          type="text"
          placeholder="Entrer le titre du livre"
          class="input input-bordered w-full max-w-xl"
        />
        <textarea
          class="textarea textarea-bordered w-full max-w-xl"
          rows="4"
          placeholder="Résumé du livre"
        ></textarea>
        <input
          type="text"
          placeholder="Ex: Roman, Policier, Science-fiction"
          class="input input-bordered w-full max-w-xl"
        />
      </div>

      <div class="space-y-4">
        <h2 class="text-2xl font-semibold">Couverture</h2>
        <div class="w-64 h-auto bg-base-200 p-4 rounded-xl shadow-md">
          <NuxtImg
            src="/book-cover.jpg"
            class="rounded-lg shadow-md"
            alt="Couverture"
          />
        </div>
        <button class="btn btn-outline btn-primary w-max">
          Ajouter/Modifier
        </button>
      </div>

      <div class="space-y-4">
        <h2 class="text-2xl font-semibold">Personnages</h2>
        <div class="flex items-center gap-2 text-primary">
          <div class="badge badge-outline">Nom du personnage</div>
          <div class="text-sm text-neutral-500">Description courte</div>
        </div>
        <button class="btn btn-outline btn-primary w-max">
          Ajouter un personnage
        </button>
      </div>

      <div class="space-y-4">
        <h2 class="text-2xl font-semibold">Chapitres</h2>
        <button class="btn btn-outline btn-primary w-max">
          Ajouter un chapitre
        </button>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Titre du chapitre</th>
                <th>Modifier</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chapitre 1</td>
                <td>
                  <button class="btn btn-sm btn-ghost">Modifier</button>
                </td>
                <td>
                  <button class="btn btn-sm btn-error text-white">
                    Supprimer
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="text-2xl font-semibold">Prévisualisation</h2>
        <button class="btn btn-outline btn-primary w-max">
          Ouvrir la prévisualisation
        </button>
      </div>

      <div class="space-y-4">
        <h2 class="text-2xl font-semibold">Publication</h2>
        <div class="bg-base-200 p-6 rounded-xl shadow-inner space-y-2">
          <div><span class="font-semibold">Statut</span> : Brouillon</div>
          <p class="text-sm text-neutral-500">
            Le livre n’est pas encore publié. Vous pouvez le modifier avant
            publication.
          </p>
          <div class="flex gap-4">
            <button class="btn btn-primary text-white">Publier</button>
            <button class="btn btn-outline btn-primary">Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

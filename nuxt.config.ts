import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/fonts", "@nuxtjs/supabase"],
  app: {
    head: {
      title: "Plume Collective",
      htmlAttrs: {
        lang: "fr",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/plumy/plumy.svg" }],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/css/app.css"],
  supabase: {
    redirect: false,
  },
});

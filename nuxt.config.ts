import type { NuxtPage } from "nuxt/schema";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-D023GRZM81",
          async: true,
        },
        {
          textContent: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D023GRZM81');
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied'
            });
          `,
          type: "text/javascript",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      gtagId: "G-D023GRZM81",
    },
  },
  site: { indexable: true },
  compatibilityDate: "2024-11-01",
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/robots",
    "@primevue/nuxt-module",
    "shadcn-nuxt",
    "@nuxtjs/i18n",
    "@nuxt/icon",
    "@zadigetvoltaire/nuxt-gtm",
    "nuxt-vuefire",
  ],
  
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // and more...
  },
  robots: {
    disallow: [],
  },
  gtm: {
    id: "GTM-PSNBGB7P",
    enabled: true,
    debug: true,
  },
  vuefire: {
    config: {
      apiKey: "AIzaSyAmGK4Ii68H9hJpN4zkR1DVcnK3J73-lzA",
      authDomain: "novosad-shop.firebaseapp.com",
      projectId: "novosad-shop",
      storageBucket: "novosad-shop.firebasestorage.app",
      messagingSenderId: "810463236883",
      appId: "1:810463236883:web:c197ee498a2d5f477d40e6",
      measurementId: "G-D023GRZM81",
    },
  },
  i18n: {
    locales: [
      { code: "uk", iso: "uk-UA", file: "uk.json", name: "Українська" },
      { code: "ru", iso: "ru-RU", file: "ru.json", name: "Русский" },
    ],
    defaultLocale: "uk",
    lazy: true,
    langDir: "locales/",
    strategy: 'no_prefix',
  },
});

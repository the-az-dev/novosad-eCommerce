import type { NuxtPage } from "nuxt/schema";

export default defineNuxtConfig({
  nitro: {
    serveStatic: true,
    prerender: {
      routes: ['/', '/uk', '/ru', '/uk/products', '/uk/blog', '/uk/orders', '/ru/blog', '/ru/products', '/ru/orders'] // або всі потрібні маршрути
    }
  },
  ssr: false,
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
      tgBotLink: "https://api.telegram.org/bot7898072240:AAEB3fAzevRlC6rv0n3hf3nwVcSHYwkw7Y8/sendMessage?chat_id=-4606585191",
      apiUrl: "http://185.65.244.209:8089/"
    },
  },
  site: {
    indexable: true,
    url: "http://novosad.pp.ua",
    name: "Магазин 'Novosad'",
  },
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
    "nuxt-simple-sitemap",
    'reka-ui/nuxt',
    "@nuxt/image",
  ],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  robots: {
    disallow: [],
    sitemap: "https://novosad.pp.ua/sitemap.xml",
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
  primevue: {
    usePrimeVue: true,
    loadStyles: true,
  },
  i18n: {
    locales: [
      { code: "uk", iso: "uk-UA", file: "uk.json", name: "Українська" },
      { code: "ru", iso: "ru-RU", file: "ru.json", name: "Русский" },
    ],
    defaultLocale: "uk",
    lazy: true,
    langDir: "locales/",
    strategy: "prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      alwaysRedirect: true,
      fallbackLocale: 'uk'
    },
  },
  sitemap: {
    urls: [
      "/about",
      "/category",
      "/contacts",
      "/orders",
      "/blog",
      "/products",
      "/blog/[id]",
      "/products/[id]",
    ].map((route) => ({ loc: route })),
  },
});
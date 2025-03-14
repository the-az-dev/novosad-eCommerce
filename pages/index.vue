<script setup lang="ts">
import { Separator } from "@/components/ui/separator";
import ClientMainPageFAQ from "~/components/ClientMainPageFAQ.vue";
import ClientMainPageStepper from "~/components/ClientMainPageStepper.vue";

const meta = {
  uk: {
    title: "Магазин 'Novosad' - Головна",
    description:
      "Якісні саджанці з Європи. Саджанці полуниці 'Фриго' прямо з місця їх росту, розсадники різноманітних плодових дерев та ягідних культур. Доставка по всій території України.",
    lang: "uk-UA",
    url: "http://novosad.pp.ua/uk",
  },
  ru: {
    title: "Магазин 'Novosad' - Главная",
    description:
      "Качественные саженцы из Европы. Саженцы клубники 'Фриго' прямо с места их роста, питомники разнообразных плодовых деревьев и ягодных культур. Доставка по всей территории Украины.",
    lang: "ru-RU",
    url: "http://novosad.pp.ua/ru",
  },
};

const currentLang = process.client
  ? window.location.pathname.includes("/ru")
    ? "ru"
    : "uk"
  : "uk";


useSeoMeta({
  title: meta[currentLang].title,
  description: meta[currentLang].description,
  ogTitle: meta[currentLang].title,
  ogDescription: meta[currentLang].description,
  ogImage: "/img/og-image.png",
  ogUrl: meta[currentLang].url,
  twitterTitle: meta[currentLang].title,
  twitterDescription: meta[currentLang].description,
  twitterImage: "/img/og-image.png",
  twitterCard: "summary",
});

useHead({
  htmlAttrs: {
    lang: meta[currentLang].lang,
  },
  link: [
    { rel: "icon", type: "image/png", href: "/favicon.ico" },
    { rel: "alternate", hreflang: "uk", href: "http://novosad.pp.ua/uk" },
    { rel: "alternate", hreflang: "ru", href: "http://novosad.pp.ua/ru" },
    { rel: "alternate", hreflang: "x-default", href: "http://novosad.pp.ua" },
  ],
});

</script>

<template>
  <div class="flex flex-col items-center w-full justify-around">
    <ClientMainPageHeader></ClientMainPageHeader>
    <Separator></Separator>
    <ClientMainPageCategoryList></ClientMainPageCategoryList>
    <Separator></Separator>
    <ClientMainPageSeasonalProducts></ClientMainPageSeasonalProducts>
    <Separator></Separator>
    <ClientMainPageStepper></ClientMainPageStepper>
    <Separator></Separator>
    <ClientMainPageFAQ></ClientMainPageFAQ>
  </div>
</template>

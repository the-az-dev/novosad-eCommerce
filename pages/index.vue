<script setup lang="ts">
import { Separator } from "@/components/ui/separator";
import ClientMainPageFAQ from "~/components/ClientMainPageFAQ.vue";
import ClientMainPageStepper from "~/components/ClientMainPageStepper.vue";

const localePath = useLocalePath();
const { t, locale } = useI18n();
const meta = {
  uk: {
    title: "Головна - Магазин 'Novosad'",
    description:
        "Якісні саджанці з Європи. Саджанці полуниці 'Фриго' прямо з місця їх росту, розсадники різноманітних плодових дерев та ягідних культур. Доставка по всій території України.",
    lang: "uk-UA",
    url: "http://novosad.pp.ua/uk/",
  },
  ru: {
    title: "Главная - Магазин 'Novosad'",
    description:
        "Качественные саженцы из Европы. Саженцы клубники 'Фриго' прямо с места их роста, питомники разнообразных плодовых деревьев и ягодных культур. Доставка по всей территории Украины.",
    lang: "ru-RU",
    url: "http://novosad.pp.ua/ru/",
  },
};


useSeoMeta({
  title: meta[locale.value].title,
  description: meta[locale.value].description,
  ogTitle: meta[locale.value].title,
  ogDescription: meta[locale.value].description,
  ogImage: "/img/og-image.png",
  ogUrl: meta[locale.value].url,
  twitterTitle: meta[locale.value].title,
  twitterDescription: meta[locale.value].description,
  twitterImage: "/img/og-image.png",
  twitterCard: "summary",
});

useHead({
  htmlAttrs: {
    lang: meta[locale.value].lang,
  },
  link: [
    {
      rel: 'icon',
      type: 'image/ico',
      href: '/favicon.ico'
    }
  ]
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

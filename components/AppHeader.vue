<script setup lang="ts">
import { Button } from "@/components/ui/button";

const { t } = useI18n();
const localePath = useLocalePath();
</script>

<template>
  <div
    class="w-full p-6 text-lg bg-white flex flex-row justify-between items-center border-b max-h-[10vh] shadow-md"
  >
    <div class="max-h-[66%] scale-75">
      <img
        src="/img/main-page/header-logo.png "
        alt="Header Logo - Novosad Shop"
        class="max-h-[66%] object-contain"
      />
    </div>

    <div class="max-w-[60%]">
      <ol class="flex flex-row justify-around items-center w-full">
        <li class="mr-9">
          <NuxtLink :to="localePath('index')" rel="canonical">{{
            t("nav-home-title")
          }}</NuxtLink>
        </li>
        <li class="mr-9">
          <NuxtLink :to="localePath('products')" rel="canonical">{{
            t("nav-product-title")
          }}</NuxtLink>
        </li>
        <li class="mr-9">
          <NuxtLink :to="localePath('blog')" rel="canonical">{{
            t("nav-article-title")
          }}</NuxtLink>
        </li>
        <li class="mr-9">
          <NuxtLink :to="localePath('contacts')" rel="canonical">{{
            t("nav-contact-title")
          }}</NuxtLink>
        </li>
        <li class="mr-9">
          <NuxtLink :to="localePath('orders')" rel="canonical">{{
            t("nav-payment-title")
          }}</NuxtLink>
        </li>
        <li
          class="mr-9 text-[#056327] flex flex-col items-center justify-center gap-2"
        >
          <NuxtLink class="text-sm" to="tel:+380500363290"
            >+38 (050) 036 32 90</NuxtLink
          >
          <NuxtLink class="text-sm" to="#">+38 (068) 065 40 11(viber)</NuxtLink>
        </li>
      </ol>
    </div>
  </div>
</template>

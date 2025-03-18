<script setup lang="ts">
import { Separator } from "@/components/ui/separator";
import { Label } from '@/components/ui/label';

const { t } = useI18n();
const localePath = useLocalePath();
</script>

<template>
  <div
    class="w-full py-4 px-0 md:px-6 lg:px-6 flex flex-row justify-around md:justify-between lg:justify-between items-center border-b max-h-[7vh] shadow-xl"
  >
    <div class="max-h-[66%] scale-50">
      <img
        src="/img/main-page/header-logo.png "
        alt="Header Logo - Novosad Shop"
        class="max-h-[66%] object-contain"
      />
    </div>

    <div
        class="flex flex-col md:flex-row lg:flex-row items-center justify-center md:gap-2 lg:gap-2 px-4"
    >
      <NuxtLink class="text-[12px] md:text-sm lg:text-sm" to="tel:+380500363290">+38 (050) 036 32 90</NuxtLink>
      <NuxtLink class="text-[12px] md:text-sm lg:text-sm" to="#">+38 (068) 065 40 11 (viber)</NuxtLink>
    </div>
  </div>

  <div class="w-full flex flex-row items-center justify-center rounded-b-xl shadow-xl bg-[#166534] text-white p-4">
    <ol class="flex flex-row justify-around items-center text-center text-[12px] md:text-text-lg lg:text-lg gap-6 w-full md:w-[70vh] lg:w-[70vh]">
      <li class="flex flex-row items-center justify-center">
        <NuxtLink :to="localePath('index')" rel="canonical">{{
            t("nav-home-title")
          }}</NuxtLink>
      </li>
      <li class="flex flex-row items-center justify-center">
        <NuxtLink :to="localePath('products')" rel="canonical">{{
            t("nav-product-title")
          }}</NuxtLink>
      </li>
      <li class="flex flex-row items-center justify-center">
        <NuxtLink :to="localePath('blog')" rel="canonical">{{
            t("nav-article-title")
          }}</NuxtLink>
      </li>
      <li class="flex flex-row items-center justify-center">
        <NuxtLink to="#footer" rel="canonical">{{
            t("nav-contact-title")
          }}</NuxtLink>
      </li>
      <li class="flex flex-row items-center justify-center">
        <NuxtLink :to="localePath('orders')" rel="canonical">{{
            t("nav-payment-title")
          }}</NuxtLink>
      </li>

    </ol>
  </div>
</template>

<script setup lang="ts">
import Label from "@/components/ui/label/Label.vue";
import { Button } from "@/components/ui/button";
import ProductPendingCarousel from "@/components/elements/ProductPendingCarousel.vue";
import ProductSuccessCarousel from "@/components/elements/ProductSuccessCarousel.vue";
import { NuxtLink } from "#components";
const { t, locale } = useI18n();
const config = useRuntimeConfig();
const localePath = useLocalePath();

const { status } = await useLazyFetch(`${config.public.apiUrl}products/get?locale=${locale.value}&filter_Сезон=Весна`);
</script>

<template>
  <div
    class="min-h-[40vh] w-full flex flex-col items-center justify-center gap-8 p-8"
  >
    <div class="flex flex-row justify-between items-center w-full max-w-5xl">
      <Label class="text-3xl font-semibold">{{ t("home-seasonal-section-title") }}</Label>
      <NuxtLink :to="localePath('products')">
        <Button variant="outline" class="text-lg">{{ t("more-btn") }}</Button>
      </NuxtLink>
    </div>
    <ProductPendingCarousel v-show="status === 'pending'" />
    <ProductSuccessCarousel v-show="status === 'success'" />
  </div>
</template>

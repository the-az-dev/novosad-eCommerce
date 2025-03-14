<script setup lang="ts">
import Label from "@/components/ui/label/Label.vue";
import { Button } from "@/components/ui/button";
import ProductPendingCarousel from "@/components/elements/ProductPendingCarousel.vue";
import ProductSuccessCarousel from "@/components/elements/ProductSuccessCarousel.vue";
import { NuxtLink } from "#components";

const { status } = await useLazyFetch("http://localhost:8089/products/get");
</script>

<template>
  <div
    class="min-h-[40vh] w-full flex flex-col items-center justify-center gap-8 p-8"
  >
    <div class="flex flex-row justify-between items-center w-full max-w-7xl">
      <Label class="text-2xl font-semibold">Пропозиції Весни 2025</Label>
      <NuxtLink :to="'/products/?season=' + 'Весна'">
        <Button variant="outline" class="text-md">Більше</Button>
      </NuxtLink>
    </div>
    <ProductPendingCarousel v-show="status === 'pending'" />
    <ProductSuccessCarousel v-show="status === 'success'" />
  </div>
</template>

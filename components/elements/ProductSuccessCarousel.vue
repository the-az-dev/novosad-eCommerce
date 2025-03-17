<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/elements/ProductCard.vue";
const { t, locale } = useI18n();
import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()
const {data: data, status, error, refresh} = await useLazyFetch(`http://185.65.244.209:8089/products/get?locale=${locale.value}&filter_Сезон=Весна`, {
  key: 'products',
  cache: false,
  credentials: 'include',
}); 
const products = computed(() => data.value?.data || [])
const pagination = computed(() => data.value?.pages || {})
</script>

<template>
    <Carousel
      :opts="{ align: 'start', loop: true }"
      class="w-full max-w-8xl sm:max-w-4xl max-h-5xl h-full"
      v-show="status==='success'"
    >
      <CarouselContent class="">
        <CarouselItem
          v-for="product in products"
          :key="product?.name"
          class="w-full sm:basis-1 md:basis-2/2 lg:basis-1/3 flex justify-center p-6"
        >
          <ProductCard :product="product"/>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
</template>
<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/elements/ProductCard.vue";

const {data: data, status, error, refresh} = await useLazyFetch('http://185.65.244.209:8089/products/get', {
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
      class="w-full max-w-7xl max-h-5xl h-full"
      v-show="status==='success'"
    >
      <CarouselContent class="flex">
        <CarouselItem
          v-for="product in products"
          :key="product.name"
          class="w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center p-4"
        >
          <ProductCard :product="product"/>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
</template>
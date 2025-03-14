<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCardSkeleton from "@/components/elements/ProductCardSkeleton.vue";
</script>

<template>
  <Carousel
    :opts="{ align: 'start', loop: true }"
    class="w-full max-w-7xl max-h-5xl h-full"
  >
    <CarouselContent class="flex">
      <CarouselItem
        class="w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center p-4"
      >
        <ProductCardSkeleton />
      </CarouselItem>
      <CarouselItem
        class="w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center p-4"
      >
        <ProductCardSkeleton />
      </CarouselItem>
      <CarouselItem
        class="w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center p-4"
      >
        <ProductCardSkeleton />
      </CarouselItem>
      <CarouselItem
        class="w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center p-4"
      >
        <ProductCardSkeleton />
      </CarouselItem>
      <CarouselItem
        class="w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center p-4"
      >
        <ProductCardSkeleton />
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>

<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const plugin = Autoplay({
  delay: 2000,
  stopOnMouseEnter: false,
  stopOnInteraction: false,
});

useHead({
  link: [
    {
      rel: "preload",
      as: "image",
      href: "/img/main-page/gallery/1.jpg",
    },
    {
      rel: "preload",
      as: "image",
      href: "/img/main-page/gallery/2.jpg",
    },
    {
      rel: "preload",
      as: "image",
      href: "/img/main-page/gallery/3.jpg",
    },
    {
      rel: "preload",
      as: "image",
      href: "/img/main-page/gallery/4.jpg",
    },
    {
      rel: "preload",
      as: "image",
      href: "/img/main-page/gallery/5.jpg",
    },
    {
      rel: "preload",
      as: "image",
      href: "/img/main-page/gallery/7.jpg",
    },
    {
      rel: "preload",
      as: "image",
      href: "/img/main-page/gallery/8.jpg",
    },
    {
      rel: "preload",
      as: "image",
      href: "/img/main-page/gallery/9.jpg",
    },
    {
      rel: "preload",
      as: "image",
      href: "/img/main-page/gallery/10.jpg",
    },
  ],
});

const gallery_img = [
  "/img/main-page/gallery/1.jpg",
  "/img/main-page/gallery/3.jpg",
  "/img/main-page/gallery/4.jpg",
  "/img/main-page/gallery/5.jpg",
  "/img/main-page/gallery/7.jpg",
  "/img/main-page/gallery/8.jpg",
  "/img/main-page/gallery/9.jpg",
  "/img/main-page/gallery/10.jpg",
];
</script>

<template>
  <Carousel
    class="relative w-full overflow-hidden max-w-2xl mx-auto "
    :plugins="[plugin]"
    :opts="{
      align: 'start',
      loop: true,
    }"
  >
    <CarouselContent class="w-full h-full ">
      <CarouselItem
        v-for="img in gallery_img"
        :key="img"
        class="w-full h-[200px] md:h-[300px] lg:h-[400px] flex flex-col items-center justify-center"
      >
        <NuxtImg
          :src="img"
          alt="Novosad Photo | Header Main"
          class="w-full h-full object-cover object-top rounded-lg"
          format="webp"
        />
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious style="display: none;"/>
    <CarouselNext style="display: none;"/>
  </Carousel>
</template>

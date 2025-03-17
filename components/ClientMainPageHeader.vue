<script setup lang="ts">
import PhotoCarousel from "./elements/PhotoCarousel.vue";
import {useI18n} from "vue-i18n";
const { t, locale } = useI18n();
</script>

<template>
  <div
    class="min-h-[500px] sm:min-h-[350px] w-full flex flex-col md:flex-row lg:flex-row xl:flex-row items-center justify-between p-6 gap-8"
  >
    <div
      class="w-full sm:w-1/2 h-full flex flex-col items-center justify-center text-center sm:text-left"
    >
      <h1 class="text-[22px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-semibold italic p-2 text-center">
        {{ t("home-header-title") }}
      </h1>
      <p
        class="text-[18px] sm:text-[16px] w-[90%] p-4 italic font-regular text-center"
      >
        {{ t("home-header-subtitle") }}
      </p>
    </div>
    <div
      class="w-full sm:w-1/2 h-full flex flex-row items-center justify-center rounded-lg"
    >
      <PhotoCarousel class="" />
    </div>
  </div>
</template>

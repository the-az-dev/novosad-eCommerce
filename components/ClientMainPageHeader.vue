<script setup lang="ts">
import PhotoCarousel from "./elements/PhotoCarousel.vue";
import {useI18n} from "vue-i18n";
const { t, locale } = useI18n();
</script>

<template>
  <div
    class="min-h-[500px] sm:min-h-[350px] w-full flex flex-col sm:flex-row items-center justify-between p-6 sm:p-9"
  >
    <div
      class="w-full sm:w-1/2 h-full flex flex-col items-center justify-center text-center sm:text-left"
    >
      <h1 class="text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] font-semibold italic p-2">
        {{ t("home-header-title") }}
      </h1>
      <p
        class="text-[18px] sm:text-[16px] w-[90%] p-4 italic font-semiregular text-center"
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

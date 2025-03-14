<script setup lang="ts">
import PhotoCarousel from "./elements/PhotoCarousel.vue";
</script>

<template>
  <div
    class="min-h-[500px] sm:min-h-[350px] w-full flex flex-col sm:flex-row items-center justify-between p-6 sm:p-9"
  >
    <div
      class="w-full sm:w-1/2 h-full flex flex-col items-center justify-center text-center sm:text-left"
    >
      <h1 class="text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] font-semibold italic p-2">
        Ласкаво просимо у світ Novosad
      </h1>
      <p
        class="text-[18px] sm:text-[16px] w-[90%] p-4 italic font-semiregular text-center"
      >
        Фірма Novosad постачає високоякісний посадковий матеріал плодово-ягідних
        рослин з елітних розсадників та промислових плантацій Польщі, Голландії,
        Німеччини. Порівняно з українськими – наші саджанці відрізняються
        генетичною чистотою та відсутністю хронічних захворювань під час
        вирощування. Саджанці вирощені в кліматичних умовах аналогічних
        українським. Це ключові складові Вашого гарантованого врожаю.
      </p>
    </div>
    <div
      class="w-full sm:w-1/2 h-full flex flex-row items-center justify-center rounded-lg"
    >
      <PhotoCarousel class="" />
    </div>
  </div>
</template>

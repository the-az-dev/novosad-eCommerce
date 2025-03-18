<script setup lang="ts">
import {  } from '@/components/ui/separator';

import { Trophy, Handshake, Truck } from "lucide-vue-next";
import Label from "@/components/ui/label/Label.vue";
const { t } = useI18n();
const steps = [
  {
    step: 1,
    title: t("stepper-step1-header"),
    description: t("stepper-step1-content"),
    icon: Trophy,
  },
  {
    step: 2,
    title: t("stepper-step2-header"),
    description: t("stepper-step2-content"),
    icon: Truck,
  },
  {
    step: 3,
    title: t("stepper-step3-header"),
    description: t("stepper-step3-content"),
    icon: Handshake,
  },
];
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-start gap-14 px-[calc(40%-7rem)] md:px-8 lg:px-8 py-8">
    <div class="flex flex-col items-center justify-start">
      <Label class="text-3xl font-semibold text-center">
        {{ t("stepper-header") }}
      </Label>
    </div>
    <div class="flex flex-col md:flex-row lg:flex-row items-stretch justify-between w-full gap-8">
      <div 
        v-for="(item, index) in steps"
        :key="item.step"
        class="flex flex-col items-center text-center relative pointer-events-none basis-1/3 min-h-[200px]"
      >
        <div class="flex flex-col items-center gap-4 w-full">
          <div class="w-16 h-16 flex items-center justify-center rounded-full border-2 border-black">
            <component :is="item.icon" class="w-8 h-8" />
          </div>
          <div class="flex flex-col gap-2 text-center flex-grow">
            <div class="text-xl font-semibold">
              {{ item.title }}
            </div>
            <div class="text-md">
              {{ item.description }}
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

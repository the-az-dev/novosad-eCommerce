<script setup lang="ts">
import { Separator } from "@/components/ui/separator";
import ClientMainPageFAQ from "~/components/ClientMainPageFAQ.vue";
import ClientMainPageStepper from "~/components/ClientMainPageStepper.vue";
</script>

<template>
  <div class="flex flex-col items-center w-full justify-around">
    <ClientMainPageHeader></ClientMainPageHeader>
    <Separator></Separator>
    <ClientMainPageCategoryList></ClientMainPageCategoryList>
    <Separator></Separator>
    <ClientMainPageSeasonalProducts></ClientMainPageSeasonalProducts>
    <Separator></Separator>
    <ClientMainPageStepper></ClientMainPageStepper>
    <Separator></Separator>
    <ClientMainPageFAQ></ClientMainPageFAQ>
  </div>
</template>

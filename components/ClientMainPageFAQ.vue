<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const { t } = useI18n();

const accordionItems = [
  {
    value: "item-1",
    title: t("faq-q1-header"),
    content: t("faq-g1-content"),
  },
  {
    value: "item-2",
    title: t("faq-q2-header"),
    content:
      t("faq-g2-content"),
  },
  {
    value: "item-3",
    title: t("faq-q3-header"),
    content: t("faq-g3-content"),
  },
];
</script>

<template>
  <div
    class="w-full max-h-[60vh] flex flex-col items-center justify-between p-14 gap-12"
  >
  <div>
      <Label class="text-3xl font-semibold text-center"
        >{{ t("faq-header") }}</Label
      >
    </div>
    <Accordion type="single" class="w-full max-w-[60%]" collapsible>
      <AccordionItem
        v-for="item in accordionItems"
        :key="item.value"
        :value="item.value"
      >
        <AccordionTrigger class="text-xl font-semibold">{{ item.title }}</AccordionTrigger>
        <AccordionContent class="text-lg">
          {{ item.content }}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>

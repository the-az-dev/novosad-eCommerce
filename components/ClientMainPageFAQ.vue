<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const accordionItems = [
  {
    value: "item-1",
    title: "Скільки часу займає доставка?",
    content: "Доставка товару займає зазвичай від 2-ох до 4-ох днів. Доставка реалізовується перевізником 'Нова Пошта' за рахунок покупця. У разі відсутності товару на складі, доставлення товару заматиме 2-3 тижня. За детальною інформацією звертайтесь до Новосада Сергія Миколайовича (+380-50-378-24-72).",
  },
  {
    value: "item-2",
    title: "Чи можна придбати у вас товари ОПТ-ом?",
    content:
      "Так. У нас є великий набір товарів, котрі можна купляти, як і оптом, так і у роздріб. Переглянути товари згідно ваших побажань можна на сторіці 'Каталог товарів'.",
  },
  {
    value: "item-3",
    title: "До кого можна звернутись за консультацією щодо певного товару?",
    content: "Усі контактні дані ви зможете знайти на сторінці 'Контакти'. Там ви знайдете контакти особи, котра вам допоможе із вашим питанням.",
  },
];
</script>

<template>
  <div
    class="w-full max-h-[60vh] flex flex-col items-center justify-between p-14 gap-12"
  >
  <div>
      <Label class="text-3xl font-semibold text-center"
        >Часті запитання та відповіді</Label
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

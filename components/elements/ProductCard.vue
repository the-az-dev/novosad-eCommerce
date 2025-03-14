<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ref, watch, onUnmounted } from "vue";
import ProductDrawerContent from "./ProductDrawerContent.vue";

const isOpen = ref(false);

watch(isOpen, (val) => {
  if (!val) {
    // Дрібна затримка, щоб дочекався анімації закриття
    setTimeout(() => {
      if (document.body.style.position === "fixed") {
        document.body.style.position = "";
      }
    }, 300);
  }
});

onUnmounted(() => {
  document.body.style.position = "";
});

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const { product } = props;
</script>

<template>
  <Card
    class="w-full max-w-[280px] shadow-lg border border-gray-300 rounded-xl bg-white"
  >
    <CardHeader
      class="h-48 bg-gray-100 flex items-center justify-center rounded-t-lg overflow-hidden"
    >
      <img
        class="h-full w-full object-cover"
        :src="product.photo_url"
        :alt="product.name + ' | Novosad'"
      />
    </CardHeader>
    <CardContent class="p-4 flex flex-col gap-2">
      <CardDescription class="flex flex-row items-center justify-between">
        <Badge class="bg-gray-200 text-gray-700 rounded-md px-2 py-1 hover:bg-gray-200">
          {{ product.category.name }}
        </Badge>
        <CardTitle
          >{{ product.price }} грн. / {{ product.minimal_order }} шт.</CardTitle
        >
      </CardDescription>
      <CardTitle class="text-lg font-semibold text-gray-900">
        {{ product.name }}
      </CardTitle>
    </CardContent>
    <CardFooter class="flex justify-between p-4 w-full">
      <Drawer v-model:open="isOpen">
        <DrawerTrigger as-child>
          <Button class="w-full" variant="outline"
            >Детальніше <i class="pi pi-search"></i
          ></Button>
        </DrawerTrigger>
        <DrawerContent class="p-4">
          <ProductDrawerContent :product="product"/>
          <DrawerFooter>
            <DrawerClose as-child>
              <Button variant="outline">Закрити</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </CardFooter>
  </Card>
</template>

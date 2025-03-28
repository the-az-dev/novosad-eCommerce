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
const { t } = useI18n();

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
  showDrawer: {
    type: Boolean,
    requiered: false,
    default: true,
  },
  redirectLink: {
    type: String,
    required: false,
    default: '#',
  },
  isMainPage: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const { product } = props;
</script>

<template>
  <Card
    class="w-full max-w-[320px] h-full min-h-[380px] max-h-[380px] shadow-lg border border-gray-300 rounded-xl bg-white opacity-0 animate-fade-up"
    :style="{ 'min-width': isMainPage ? '120px' : '320px' }"
  >
    <CardHeader
      class="h-48 bg-gray-100 flex items-center justify-center rounded-t-lg overflow-hidden"
    >
      <img
        class="h-full w-full object-cover"
        :src="product?.photo_url"
        :alt="product?.name + ' | Novosad'"
      />
    </CardHeader>
    <CardContent class="p-4 flex flex-col gap-2">
      <CardDescription class="flex flex-row items-center justify-between">
        <Badge
          class="bg-gray-200 text-gray-700 rounded-md px-2 py-1 hover:bg-gray-200"
        >
          {{ product.category?.name }}
        </Badge>
        <CardTitle
          >{{ product?.price }} {{ t("product-item-price-quantity") }}</CardTitle
        >
      </CardDescription>
      <CardTitle
          class="text-md font-semibold text-gray-900 w-full line-clamp-none
            h-full min-h-[5vh] max-h-[5vh] relative z-[999]"
      >
        {{ product?.name }}
      </CardTitle>
    </CardContent>
    <CardFooter class="flex flex-col justify-between p-4 w-full max-h-[1vh]" v-if="showDrawer">
      <Drawer v-model:open="isOpen">
        <DrawerTrigger as-child>
          <Button class="w-full" variant="outline"
            >{{ t("product-item-more-info") }} <i class="pi pi-search"></i
          ></Button>
        </DrawerTrigger>
        <DrawerContent class="p-4">
          <ProductDrawerContent :product="product" />
          <DrawerFooter>
            <a :href="product?.buy_link"
            ><Button class="bg-[#A020F0] hover:bg-[#A020F0] text-md w-full" size="lg"
            >{{ t("product-item-buy") }}<i class="pi pi-shopping-cart"></i></Button
            ></a>
            <DrawerClose as-child>
              <Button variant="outline">{{ t("product-item-info-close") }}</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </CardFooter>
    <CardFooter class="flex justify-between p-4 w-full" v-else>
      <NuxtLink :to="redirectLink" class="w-full"><Button class="w-full" variant="outline"
        >{{ t("product-item-more-info") }}</Button></NuxtLink>
      <NuxtLink :to="product?.buy_link" class="w-full"><Button class="w-full" variant="ghost"
      >{{ t("product-item-buy") }}</Button></NuxtLink>
    </CardFooter>
  </Card>
</template>

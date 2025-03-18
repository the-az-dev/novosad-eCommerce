<script setup lang="ts">
import {
  DrawerDescription,
} from "@/components/ui/drawer";
import Label from "@/components/ui/label/Label.vue";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DOMPurify from "dompurify";
import { computed } from "vue";

const props = defineProps({
    product: {
        type: Object,
        required: true,
    }
});

const { product } = props;
const { t } = useI18n();

const description = computed(() => {
  return DOMPurify.sanitize(product?.description.replace(/\\r\\n/g, "<br>"));
});

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-4 w-full bg-white h-full max-h-6xl min-h-6xl my-4 rounded-xl shadow-lg border"
  >
    <div class="flex flex-col md:flex-row lg:flex-row items-start justify-around p-4 gap-4 w-full h-[70vh] md:h-full lg:h-full overflow-y-auto md:overflow-hidden lg:overflow-hidden">
      <div class="flex flex-col justify-between w-full gap-4 p-6 h-auto sm:border-b md:border-r lg:border-r">
        <div class="flex flex-col md:flex-row lg:flex-row justify-around items-center gap-4 w-full">
          <div class="flex flex-col w-full h-full max-w-[15vh] max-h-[15vh] rounded-xl shadow-lg border">
            <img
                class="h-full w-full object-contain rounded-xl"
                :src="product?.photo_url"
                :alt="product?.name + ' | Novosad'"
            />
          </div>
          <div
              class="flex flex-col justify-center items-center w-full h-full gap-4 p-4"
          >
            <div class="flex flex-col-reverse md:flex-row lg:flex-row items-center justify-center md:justify-between lg:justify-between w-full gap-2">
              <Label class="text-xl italic">{{ product?.name }}</Label>
              <Label class="bg-gray-100 text-gray-500 rounded-md px-2 py-1 hover:bg-gray-100 sm:text-center">
                ID: {{ product?.id }}
              </Label>
            </div>
            <div class="flex flex-col-reverse md:flex-row lg:flex-row items-center justify-between gap-2 w-full">
              <div class="flex flex-row gap-2">
                <Label class="text-md">Ціна:</Label>
                <Label class="text-md"
                >{{ product?.price }} грн.</Label
                >
              </div>
              <Label class="">{{ t("product-item-info-delivery-date")}} {{ product?.delivery_at }}  </Label>
            </div>

          </div>
        </div>
        <div class="flex flex-col gap-4 w-full py-4 border-t items-center justify-center h-auto md:max-h-[32vh] lg:max-h-[32vh]">
          <DrawerDescription v-html="description" class="overflow-y-hidden md:overflow-y-auto lg:overflow-y-auto overflow-x-hidden text-md h-full w-full" />
        </div>
      </div>
      <div
        class="flex flex-col items-center justify-around bg-gray gap-4 p-4 w-full max-w-sm h-auto"
      >
        <Label class="text-lg">{{ t("fltr-product") }}</Label>

        <div class="w-full overflow-y-auto">
          <Table class="w-full">
            <TableBody class="w-full">
              <TableRow>
                <TableCell class="font-medium text-center w-[40vh] border-r">{{ t("min-order-quantity") }}</TableCell>
                <TableCell class="text-center w-[40vh] border-l">{{ product?.minimal_order }} {{ t("product-item-price-per-amount") }}</TableCell>
              </TableRow>
              <TableRow
                v-for="[key, value] in Object.entries(product?.attributes)"
                :key="key"
                class="w-full"
              >
                <TableCell class="font-medium text-center w-[40vh] border-r">{{ key }}</TableCell>
                <TableCell class="text-center w-[40vh] border-l">{{ value }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>

  </div>
</template>

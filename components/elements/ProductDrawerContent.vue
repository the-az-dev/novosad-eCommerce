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

const description = computed(() => {
  return DOMPurify.sanitize(product.description.replace(/\\r\\n/g, "<br>"));
});
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-4 w-full bg-white h-full max-h-3xl my-4 rounded-xl shadow-lg border p-6"
  >
    <div class="flex flex-row items-start justify-between p-4 gap-4 w-full">
      <img
        class="h-full w-full object-cover max-w-[30vh] max-h-[30vh] p-4"
        :src="product.photo_url"
        :alt="product.name + ' | Novosad'"
      />
      <div
        class="flex flex-col justify-between w-full h-full max-w-6xl gap-4 p-4"
      >
        <div class="flex flex-row items-center justify-between w-full">
          <Label class="text-xl italic">{{ product.name }}</Label>
          <Badge class="bg-gray-200 text-gray-700 rounded-md px-2 py-1 hover:bg-gray-200">
            {{ product.category.name }}
          </Badge>
        </div>
        <div class="flex flex-row items-center justify-between w-full">
          <Label class="text-md">Ціна:</Label>
          <Label class="text-md"
            >{{ product.price }} грн. / {{ product.minimal_order }} шт.</Label
          >
        </div>
        <DrawerDescription v-html="description">
        </DrawerDescription>
      </div>
      <div
        class="h-full flex flex-col items-center justify-around bg-gray gap-4 p-4"
      >
        <Label class="text-lg">Особливості товару</Label>

        <div class="w-full max-h-[200px] overflow-y-auto">
          <Table class="w-full">
            <TableBody>
              <TableRow
                v-for="[key, value] in Object.entries(product.attributes)"
                :key="key"
              >
                <TableCell class="font-medium">{{ key }}</TableCell>
                <TableCell class="text-center">{{ value }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
    <div class="flex flex-row w-full items-center justify-end gap-2">
      <a :href="product.buy_link"
        ><Button class="bg-[#A020F0] hover:bg-[#A020F0] text-md" size="lg"
          >Замовити на Prom<i class="pi pi-shopping-cart"></i></Button
      ></a>
    </div>
  </div>
</template>

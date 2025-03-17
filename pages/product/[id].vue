<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import Label from "../../components/ui/label/Label.vue";
import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
const { t, locale } = useI18n();
const localePath = useLocalePath();

const route = useRoute();
const { data, error, status } = await useLazyFetch(
  `http://localhost:8089/products/get?id=${route.params.id}&locale=${locale.value}`
);
const product = data.value?.data[0];
</script>

<template>
  <div class="w-full h-full flex flex-col items-center">
    <div class="w-full max-h-[40vh] px-8 py-8 flex flex-col gap-6 border-b">
      <div
        class="w-full bg-[#bcaf45] flex flex-row items-center justify-start max-h-2"
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <a href="/public" class="text-md"> {{ t("nav-home-title") }} </a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>
                <a :href="localePath('products')" class="text-md">
                  {{ t("product-page-name") }}
                </a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage class="text-md">{{
                product.name
              }}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
    <div
      class="bg-gray-300 min-h-[40vh] w-full p-8 max-h-3xl flex flex-col items-center justify-center gap-4"
    >
      <div class="flex flex-row gap-4 h-full w-full p-4">
        <div
          class="flex flex-col items-center justify-center gap-6 w-full max-w-[60vh] rounded-lg border-r p-6"
        >
          <!-- Header Content -->
          <div
            class="flex flex-row items-start justify-start gap-4 w-full rounded-lg border-b py-6"
          >
            <img
              class="h-full w-full object-cover max-w-[30vh] max-h-[30vh] rounded-lg"
              :src="product?.photo_url"
              :alt="product?.name + ' | Novosad'"
            />
            <div class="flex flex-col justify-between w-full h-full max-w-md gap-4 p-4">
              <div class="flex flex-col items-center gap-2 h-full">
                <div class="flex flex-row items-center justify-between w-full">
                  <Label class="text-2xl italic">{{ product?.name }}</Label>
                </div>
                <div class="flex flex-row items-center gap-2 w-full">
                  <Label class="text-md">Ціна:</Label>
                  <Label class="text-md"
                    >{{ product?.price }} грн. /
                    {{ product?.minimal_order }} шт.</Label
                  >
                </div>
                <div class="flex flex-row items-center gap-2 w-full">
                  <Label class="text-md">Код товару:</Label>
                  <Label class="text-md font-light">{{ product?.id }}</Label>
                </div>
                <div class="flex flex-row items-center gap-2 w-full">
                  <Label class="text-md">В наявності:</Label>
                  <Label class="text-md">{{ product?.id }}</Label>
                </div>
              </div>
              <div class="flex flex-row w-full items-center justify-end h-full">
                <a
                  :href="product?.buy_link"
                  rel="canonical"
                  class="bg-[#A020F0] hover:bg-[#A020F0] text-md p-2 text-white border shadow-lg rounded-lg"
                  ><Button size="lg"
                    >{{ t("product-item-buy")
                    }}<i class="pi pi-shopping-cart"></i></Button
                ></a>
              </div>
            </div>
          </div>
          <!-- Tabs -->
          <div class="w-full h-full">
            <div class="w-full flex flex-col items-center justify-end gap-4 rounded-lg border-t">
              <div></div>
              <div></div>
            </div>
          </div>
        </div>

        <!-- Haraterystyka -->
        <div
          class="h-full flex flex-col items-start justify-start w-full max-w-[30vh]"
        >
          <div
            class="h-full flex flex-col items-center justify-center bg-gray gap-4 p-4"
          >
            <Label class="text-lg">Особливості товару</Label>

            <div
              class="w-full max-h-[200px] overflow-y-auto flex flex-col items-center justify-center"
            >
              <Table class="w-full">
                <TableBody class="w-full">
                  <TableRow
                    v-for="[key, value] in Object.entries(product?.attributes)"
                    :key="key"
                    class="w-full"
                  >
                    <TableCell class="font-medium border-r text-2m">{{
                      key
                    }}</TableCell>
                    <TableCell class="text-center border-l text-2m">{{
                      value
                    }}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

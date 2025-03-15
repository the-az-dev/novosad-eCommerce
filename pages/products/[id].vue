<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Label } from "@/components/ui/label";

const route = useRoute();
let product = null;
let _status = null;
if(route.params.productId !== null){
  console.log(`http://localhost:8089/products/get?id=${route.params.id}`);
  
  const {data, error, status} = await useFetch(`http://localhost:8089/products/get?id=${route.params.id}`);
  product = data.value?.data[0];
  _status = status;
}

</script>

<template>
  <div class="w-full bg-[#000000] max-h-[30vh]" v-if="product !== null">
    <div
      class="w-full p-6 bg-[#bcaf45] flex flex-row items-center justify-start max-h-2"
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <a href="/" class="text-md"> Головна </a>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <a href="/products" class="text-md">Каталог товарів</a>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage class="text-md">{{ product?.name }}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
    <div class="w-full p-6 mx-auto">
    </div>
  </div>
</template>

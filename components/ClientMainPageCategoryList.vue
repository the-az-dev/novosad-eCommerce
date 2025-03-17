<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CategoryCard from "./elements/CategoryCard.vue";
import CategoryCardSkeleton from "./elements/CategoryCardSkeleton.vue";
const { t, locale } = useI18n();
const localePath = useLocalePath();
const config = useRuntimeConfig();

const { data, status, error } = await useFetch(
  config.public.apiUrl + "products/category/get?locale=" + locale.value,
);

const categories = data.value?.data;
</script>

<template>
  <div
    class="w-full flex flex-col items-center justify-between gap-14 p-8 pb-8"
  >
    <div class="flex flex-row justify-center items-center w-full max-w-7xl">
      <Label class="text-3xl font-semibold">{{ t("home-category-section-title") }}</Label>
    </div>
    <NavigationMenu
      class="w-full max-w-7xl mx-auto px-4"
      v-if="status === 'success'"
    >
      <div
        class="flex flex-wrap justify-center gap-4"
      >
        <NuxtLink
          v-for="category in categories"
          :key="category.id"
          :to="localePath(`/products`)"
          class="w-[calc(100%/2-0.5rem)] sm:w-[calc(100%/3-0.5rem)] md:w-[calc(100%/4-0.5rem)] lg:w-[calc(100%/5-0.5rem)] xl:w-[calc(100%/6-0.5rem)]"
        >
          <CategoryCard :category="category" />
        </NuxtLink>
      </div>
    </NavigationMenu>
    <NavigationMenu
      v-if="status === 'pending'"
      class="w-full max-w-7xl max-h-4xl h-full overflow-x-auto overflow-y-hidden gap-6"
    >
      <NavigationMenuList v-for="i in 10" v-if="status === 'pending'">
        <NavigationMenuItem>
          <NavigationMenuTrigger
            class="absolute inset-0 w-full h-full bg-transparent hover:bg-transparent"
          />
          <CategoryCardSkeleton />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
</template>

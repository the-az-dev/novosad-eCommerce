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
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NuxtLink } from "#components";
const props = defineProps({
  category: {
    type: Object,
    requiered: true,
  },
});

const { category } = props;
</script>

<template>
  <Card class="border border-gray-300 rounded-xl bg-white hover:bg-white w-full h-full">
    <CardContent class="w-full p-4 flex flex-col items-center justify-between h-full gap-2">
      <div
        class="w-full max-w-[60px] max-h-[60px] sm:max-w-[70px] sm:max-h-[70px] md:max-w-[80px] md:max-h-[80px] lg:max-w-[90px] lg:max-h-[90px] flex items-center justify-center rounded-lg overflow-hidden"
      >
        <img
          class="w-full h-full object-contain"
          :src="category?.photo_url"
          :alt="category?.name + ' | Novosad'"
        />
      </div>
      <CardTitle
        class="text-center w-full mt-3 text-sm sm:text-base md:text-md font-semibold leading-snug"
      >
        {{ category?.name }}
      </CardTitle>
    </CardContent>
  </Card>
</template>
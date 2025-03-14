<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
</script>

<template>
  <Card
    class="w-full max-w-[280px] shadow-lg border border-gray-300 rounded-xl bg-white"
  >
    <CardHeader
      class="h-32 flex items-center justify-center rounded-t-lg overflow-hidden object-cover"
    >
      <Skeleton class="h-[125px] w-[250px] rounded-xl object-cover " />
    </CardHeader>
    <CardContent class="p-4 flex flex-col gap-2">
      <CardDescription class="flex flex-row items-center justify-between">
        <Skeleton class="text-gray-700 rounded-md px-2 py-1 w-2md" />
        <Skeleton class="w-full text-gray-700" />
      </CardDescription>
      <Skeleton class="text-lg font-semibold text-gray-900 w-full" />
    </CardContent>
    <CardFooter class="flex justify-between p-4 w-full">
      <Skeleton class="w-full h-[10%] text-gray-700" />
    </CardFooter>
  </Card>
</template>

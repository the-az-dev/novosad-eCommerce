<template>
  <div class="w-full max-h-[40vh] px-8 py-8 flex flex-col gap-6 border-b">
    <div
        class="w-full flex flex-row items-center justify-start max-h-2"
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <a href="/" class="text-md"> {{ t("nav-home-title") }} </a>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage class="text-md">{{ t("article-page-name") }}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
    <div class="w-full mx-auto">
      <Label class="text-3xl">{{ t("article-page-name") }}</Label>
    </div>
  </div>

  <div class="w-full flex flex-row items-center justify-between max-h-4 p-6 gap-4">
    <Select v-model="selectedCategory">
      <SelectTrigger class="h-full w-full max-w-[30vh]">
        <SelectValue :placeholder="t('article-category-all-selection')" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="_" disabled>
            {{ t('article-category-all-selection') }}
          </SelectItem>
          <SelectItem v-for="category in categories" :key="category?.id" :value="category?.title" >
            {{ category?.title }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <Input
      type="search"
      :placeholder="t('article-search-label')"
      class="w-full"
      v-model="title"
    />
  </div>
  <div v-if="!isEmpty && posts.length > 0 && !loading" class="p-6 w-full">
    <div
        v-for="post in posts"
        :key="post?.id"
        class="flex flex-row md:flex-row items-center w-full p-6 mb-6 gap-8 border rounded-xl shadow-sm bg-white hover:shadow-xl transition-all duration-300"
    >
      <!-- IMAGE BLOCK -->
      <div class="w-[200px] h-[140px] flex-shrink-0 overflow-hidden rounded-xl">
        <img
            :src="post?.photo_url"
            alt="Post image"
            class="w-full h-full object-cover rounded-xl"
        />
      </div>

      <!-- TEXT BLOCK -->
      <div class="flex flex-row justify-between flex-1 pl-4 w-full gap-8 items-center h-full">
        <div class="flex flex-col justify-between h-full gap-4">
          <h3 class="text-lg font-semibold leading-snug line-clamp-2">
            {{ post.title }}
          </h3>
          <p class="text-sm text-gray-500 flex flex-col items-center text-ellipsis" v-html="post.description.slice(0, 512) + '...'"></p>
        </div>
        <div class="w-[30vh] mx-4">
          <a :href="localePath('blog') + '/' + post.id" rel="canonical" target="_blank">
            <Button class="rounded-full p-6 text-md">{{ t("article-read-more") }}</Button>
          </a>
        </div>
      </div>
    </div>
  </div>
  <div v-if="loading" class="p-6 w-full flex flex-row gap-8 items-center justify-center h-full text-2xl">
    <div class="w-full text-center">

      <i class="pi pi-spin pi-spinner text-4xl scale-150 text-center mx-6" style="font-size: 2rem"></i> <br>

      <Label class="text-lg w-full">{{ t("searching-posts") }}</Label>

    </div>
  </div>
  <div v-else-if="isEmpty && posts.length === 0" class="text-muted text-sm italic p-4">
    {{ t("article-no-posts") }}
  </div>

</template>

<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "~/components/ui/breadcrumb";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {useLocalePath} from "#imports";
import {Skeleton} from "@/components/ui/skeleton";
const localePath = useLocalePath();
const { t, locale } = useI18n();
const config = useRuntimeConfig();

const title = ref("");
const categories = ref([]);
const posts = ref([]);
const loading = ref(true);
const selectedCategory = ref("");
const isEmpty = ref(false)

async function getCategories() {
  try {
    const res = await $fetch(`${config.public.apiUrl}blog/category/get?locale=${locale.value}`);
    categories.value = res?.data || [];
  } catch (error) {
    console.error("Помилка отримання категорій:", error);
  }
}

async function fetchPosts() {
  try {
    const res = await $fetch(`${config.public.apiUrl}blog/post/get?locale=${locale.value}`);
    const _posts = res?.data || [];

    if (selectedCategory.value) {
      posts.value = _posts.filter((post) => post?.category?.name === selectedCategory.value);
    } else if (title.value) {
      posts.value = _posts.filter((post) => post?.title.includes(title.value));
    } else {
      posts.value = _posts;
    }
    isEmpty.value = posts.value.length === 0;
    loading.value = false;
  } catch (error) {
    console.error("Помилка отримання постів:", error);
  }
}

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}


watch(title, () => {
  fetchPosts();
})

watch(selectedCategory, () => {
  fetchPosts();
})

onMounted(
    async () => {
      await fetchPosts();
      await getCategories();
    }
)

const meta = {
  uk: {
    title: "Блог - Магазин 'Novosad'",
    description:
        "Якісні саджанці з Європи. Саджанці полуниці 'Фриго' прямо з місця їх росту, розсадники різноманітних плодових дерев та ягідних культур. Доставка по всій території України.",
    lang: "uk-UA",
    url: "http://novosad.pp.ua/uk/blog/",
  },
  ru: {
    title: "Блог - Магазин 'Novosad'",
    description:
        "Качественные саженцы из Европы. Саженцы клубники 'Фриго' прямо с места их роста, питомники разнообразных плодовых деревьев и ягодных культур. Доставка по всей территории Украины.",
    lang: "ru-RU",
    url: "http://novosad.pp.ua/ru/blog/",
  },
};


useSeoMeta({
  title: meta[locale.value].title,
  description: meta[locale.value].description,
  ogTitle: meta[locale.value].title,
  ogDescription: meta[locale.value].description,
  ogImage: "/img/og-image.png",
  ogUrl: meta[locale.value].url,
  twitterTitle: meta[locale.value].title,
  twitterDescription: meta[locale.value].description,
  twitterImage: "/img/og-image.png",
  twitterCard: "summary",
});

useHead({
  htmlAttrs: {
    lang: meta[locale.value].lang,
  },
  link: [
    {
      rel: 'icon',
      type: 'image/ico',
      href: '/favicon.ico'
    }
  ]
});
</script>
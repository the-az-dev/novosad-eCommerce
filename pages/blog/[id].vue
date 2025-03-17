<script setup lang="ts">
const route = useRoute();
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
import {useLocalePath} from "#imports";
const localePath = useLocalePath();
const { t, locale } = useI18n();
const config = useRuntimeConfig();
const post = ref(null);
const res = await $fetch(`${config.public.apiUrl}blog/post/get/${route.params.id}?locale=${locale.value}`);
post.value = res?.data[0];

const decoratedContent = ref('');

onMounted(() => {
  decoratedContent.value = decorateContent(post.value?.description.replace(/\&nbsp;/g, ''));
});

function decorateContent(htmlContent: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');

  const paragraphs = doc.body.querySelectorAll('p');

  paragraphs.forEach(paragraph => {
    const linkImages = paragraph.querySelectorAll('a');
    linkImages.forEach(linkImage => {
      const hasImages = linkImage.querySelectorAll('img').length > 0;
      if (hasImages) {
        paragraph.classList.add('flex', 'flex-row', 'items-center', 'justify-center', 'max-h-2', 'w-full', 'gap-8', 'mx-6', 'p-4');
        linkImage.classList.add('w-[500px]', 'h-[500px]', 'flex-shrink-0', 'overflow-hidden', 'rounded-xl');
        linkImage.querySelectorAll('img').forEach(image => {
          image.classList.add('w-full', 'h-full', 'object-cover', 'rounded-xl');
        })
      } else {
        paragraph.classList.add('text-paragraph'); // Додаємо клас для звичайних параграфів
      }
    })
  });

  return doc.body.innerHTML;
}

const meta = {
  uk: {
    title: post?.title + " - Магазин 'Novosad'",
    description:
        "Якісні саджанці з Європи. Саджанці полуниці 'Фриго' прямо з місця їх росту, розсадники різноманітних плодових дерев та ягідних культур. Доставка по всій території України.",
    lang: "uk-UA",
    url: "http://novosad.pp.ua/uk/blog/"+post?.id,
  },
  ru: {
    title: post?.title + " - Магазин 'Novosad'",
    description:
        "Качественные саженцы из Европы. Саженцы клубники 'Фриго' прямо с места их роста, питомники разнообразных плодовых деревьев и ягодных культур. Доставка по всей территории Украины.",
    lang: "ru-RU",
    url: "http://novosad.pp.ua/ru/blog/"+post?.id,
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
      href: '/_favicon.ico'
    }
  ]
});
</script>

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
            <BreadcrumbLink>
              <a href="/blog" class="text-md"> {{ t("article-page-name") }} </a>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage class="text-md">{{ post?.title }}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
    <div class="w-full mx-auto">
      <Label class="text-3xl">{{ post?.title }}</Label>
    </div>
  </div>
  <div v-html="decoratedContent" class="article-content p-8 text-lg"></div>
</template>

<style scoped>
.article-content {
  line-height: 1.6;
  white-space: normal;
}
</style>
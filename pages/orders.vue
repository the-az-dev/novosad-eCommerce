<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useI18n } from "vue-i18n";
const localePath = useLocalePath();
const { t, locale } = useI18n();
import { toast } from '@/components/ui/toast'
import { toTypedSchema } from '@vee-validate/zod'
import { h } from 'vue'
import * as z from 'zod'

const config = useRuntimeConfig();

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
  phone: z.string().min(2).max(18),
  mail: z.string().min(2).max(50),
  address: z.string().min(2).max(256),
  detail: z.string().min(5)
}))

function onSubmit(values: any) {
  const currentDate: Date = new Date();
  const message_text = `
Нова заявка на купівлю! 📩

ПІБ: ${values.username}
Номер телефону: ${values.phone}
Ел. адреса: ${values.mail}
Адреса: ${values.address}
Вміст замовлення:

${values.detail}

Дата відправки заявки: ${currentDate.getDate()}-${
      currentDate.getMonth() + 1
  }-${currentDate.getFullYear()} | ${currentDate.getHours()}:${currentDate.getMinutes()}
`;

  const encodedMessage = encodeURIComponent(message_text);
  fetch(
      `${
          config.public.tgBotLink
      }&text=${encodedMessage}`
  )
  .then(() => {
    toast({
      title: t("order-form-toast-title"),
      description: h('Label', { class: 'mt-2 w-[340px] rounded-md bg-slate-950' }, t("order-form-toast-description")),
      duration: 2000,
    })
  })
  .catch(() => {
    toast({
      title: t("order-form-toast-title-error"),
      description: h('Label', { class: 'mt-2 w-[340px] rounded-md bg-slate-950' }, t("order-form-toast-description-error")),
      duration: 2000,
      variant: 'destructive',
    })
  });
}

const meta = {
  uk: {
    title: "Замовлення та доставка - Магазин 'Novosad'",
    description:
        "Якісні саджанці з Європи. Саджанці полуниці 'Фриго' прямо з місця їх росту, розсадники різноманітних плодових дерев та ягідних культур. Доставка по всій території України.",
    lang: "uk-UA",
    url: "http://novosad.pp.ua/uk/blog/",
  },
  ru: {
    title: "Заказ и доставка - Магазин 'Novosad'",
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
              <a :href="localePath('index')" rel="canonical" class="text-md"> {{ t("nav-home-title") }} </a>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage class="text-md">{{ t("nav-payment-title") }}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
    <div class="w-full mx-auto">
      <Label class="text-3xl">{{ t("nav-payment-title") }}</Label>
    </div>
  </div>

  <div class="h-full w-full p-6 flex flex-col gap-6 md:gap-12 items-stretch justify-around">
    <Card class="rounded-xl shadow-lg border flex-1 p-6 flex flex-col md:flex-row lg:flex-row items-center gap-6">
      <CardHeader class="w-32 h-32 flex items-center justify-center">
        <img
            src="https://img.icons8.com/cotton/100/fast-cart.png"
            alt="icons8 order icon"
            class="object-contain w-32 h-32"
        />
      </CardHeader>
      <CardContent class="flex flex-col items-start w-full gap-4">
        <Label class="text-xl font-semibold w-full">
          {{ t("order-title") }}
        </Label>
        <p class="text-md italic w-full break-words whitespace-pre-line">
          {{ t("order-description") }}
        </p>
        <Form v-slot="{ handleSubmit }" as="" keep-values :validation-schema="formSchema" >
          <Dialog>
            <DialogTrigger as-child>
              <Button class="text-white px-6 py-4 text-[20px] p-2 w-full md:w-[25vh] lg:w-[25vh]">
                {{ t("order-open-modal") }}
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{{ t("order-form-header") }}</DialogTitle>
                <DialogDescription>
                  {{ t("order-form-description") }}
                </DialogDescription>
              </DialogHeader>
              <form id="dialogForm" @submit="handleSubmit($event, onSubmit)" class="flex flex-col gap-4" action="">
                <FormField v-slot="{ componentField }" name="username">
                  <FormItem>
                    <FormControl>
                      <Input type="text" :placeholder="t('order-name-placeholder')" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="phone">
                  <FormItem>
                    <FormControl>
                      <Input type="phone" :placeholder="t('order-phone-placeholder')" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="mail">
                  <FormItem>
                    <FormControl>
                      <Input type="email" :placeholder="t('order-mail-placeholder')" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="address">
                  <FormItem>
                    <FormControl>
                      <Input type="text" :placeholder="t('order-address-placeholder')" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="detail">
                  <FormItem>
                    <FormControl>
                      <Textarea :placeholder="t('order-detail-placeholder')" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </form>
              <DialogFooter>
                <Button type="submit" form="dialogForm">
                  {{ t("order-submit-btn") }}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Form>
      </CardContent>
    </Card>

    <Card class="rounded-xl shadow-lg border flex-1 p-6 flex flex-col md:flex-row lg:flex-row items-center gap-6">
      <CardHeader class="w-32 h-32 flex items-center justify-center">
        <img
            src="https://img.icons8.com/cotton/100/delivery.png"
            alt="icons8 delivery icon"
            class="object-contain w-32 h-32"
        />
      </CardHeader>
      <CardContent class="flex flex-col items-start w-full gap-4">
        <Label class="text-xl font-semibold">
          {{ t("delivery-title") }}
        </Label>
        <p class="text-md italic w-full break-words">
          {{ t("delivery-description") }}
        </p>
      </CardContent>
    </Card>
  </div>




</template>

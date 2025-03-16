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
import { ref, onMounted, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useSeoMeta, useHead, useLazyFetch, useLocalePath } from "#imports";
import ProductCard from "~/components/elements/ProductCard.vue";
import ProductCardSkeleton from "~/components/elements/ProductCardSkeleton.vue";

const { t, locale } = useI18n();
const localePath = useLocalePath();

// Категорії та підкатегорії
const categories = ref([]);
const selectedCategoryId = ref("");
const selectedSubcategoryId = ref("");

// Обрані значення фільтрів
const selectedFilters = ref<Record<string, string | boolean | number>>({});

// Товари
const products = ref([]);
const loading = ref(false);
const error = ref(null);
const _locale = locale.value;

// Динамічне обчислення активної категорії
const selectedCategory = computed(() => {
  return categories.value.find((cat) => cat.id === selectedCategoryId.value);
});

// Отримання категорій
const fetchCategories = async () => {
  try {
    const res = await $fetch("http://185.65.244.209:8089/products/category/get?locale="+locale.value);
    categories.value = res?.data || [];
  } catch (e) {
    console.error("Помилка при отриманні категорій", e);
  }
};

// Фільтри для підкатегорії
const filters = ref([]);
const fetchFilters = async (subcategoryId: string) => {
  try {
    const res = await $fetch(
      `http://185.65.244.209:8089/products/filters/get?id=${subcategoryId}&locale=${locale.value}`
    );
    filters.value = res?.data || [];

    // Ініціалізація selectedFilters з порожніми значеннями
    selectedFilters.value = {};
    filters.value.forEach((filter) => {
      selectedFilters.value[filter.name] = "";
    });
  } catch (e) {
    console.error("Помилка при отриманні фільтрів", e);
  }
};

// Слухаємо зміну підкатегорії
watch(selectedSubcategoryId, (id) => {
  if (id) fetchFilters(id);
});

// Отримання товарів з урахуванням обраних фільтрів
const fetchProducts = async () => {
  loading.value = true;
  error.value = null;

  try {
    const query: Record<string, any> = {
      locale: locale.value,
    };

    if (selectedSubcategoryId.value) {
      query.subcategory = selectedSubcategoryId.value;
    }

    // Додаємо фільтри в запит
    Object.entries(selectedFilters.value).forEach(([key, val]) => {
      if (val !== "") {
        query[key] = val;
      }
    });

    const queryString = new URLSearchParams(query).toString();

    console.log(`http://185.65.244.209:8089/products/get?${queryString}`);
    
    
    if(queryString !== null || queryString?.length !== 0 || queryString !== undefined){
      const res = await $fetch(
        `http://185.65.244.209:8089/products/get?${queryString}`
      );
      
      products.value = res?.data || [];
    }
    else{
      const res = await $fetch(
        `http://185.65.244.209:8089/products/get`
      );
      
      products.value = res?.data || [];
    }
  } catch (e) {
    console.error("Помилка при отриманні товарів", e);
    error.value = e;
  } finally {
    loading.value = false;
  }
};

// Застосування фільтрів
const applyFilters = () => {
  fetchProducts();
};

onMounted(async () => {
  await fetchCategories();
  await fetchProducts();
  console.log(loading);
  console.log(products);
  
});

// SEO мета
const meta = {
  uk: {
    title: `${t("product-page-name")} - Магазин 'Novosad'`,
    description:
      "Якісні саджанці з Європи. Саджанці полуниці 'Фриго' прямо з місця їх росту, розсадники різноманітних плодових дерев та ягідних культур. Доставка по всій території України.",
    lang: "uk-UA",
    url: `http://novosad.pp.ua${localePath("products")}`,
  },
  ru: {
    title: `${t("product-page-name")} - Магазин 'Novosad'`,
    description:
      "Качественные саженцы из Европы. Саженцы клубники 'Фриго' прямо с места их роста, питомники разнообразных плодовых деревьев и ягодных культур. Доставка по всей территории Украины.",
    lang: "ru-RU",
    url: `http://novosad.pp.ua${localePath("products")}`,
  },
};

useSeoMeta({
  title: meta[locale.value].title,
  description: meta[locale.value].description,
  ogTitle: meta[locale.value].title,
  ogDescription: meta[locale.value].description,
  ogImage: "/img/og-image.png",
  twitterTitle: meta[locale.value].title,
  twitterDescription: meta[locale.value].description,
  twitterImage: "/img/og-image.png",
  twitterCard: "summary",
  ogLocale: locale.value === "uk" ? "uk_UA" : "ru_RU",
  ogUrl: meta[locale.value].url,
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
      class="w-full bg-[#bcaf45] flex flex-row items-center justify-start max-h-2"
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
            <BreadcrumbPage class="text-md">{{ t("product-page-name") }}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
    <div class="w-full mx-auto">
      <Label class="text-3xl">{{ t("product-page-name") }}</Label>
    </div>
  </div>

  <div class="p-8 w-full min-h-screen flex gap-8 flex-row justify-center">
    <!-- Фільтри -->
    <aside
      class="w-full max-w-[30vh] bg-white p-6 rounded-lg shadow-md h-full flex flex-col min-h-screen"
    >
      <h2 class="text-xl font-semibold mb-4">Фільтри</h2>

      <!-- Вибір категорії/підкатегорії -->
      <div class="mb-4">
        <label class="block text-sm font-medium">Категорія</label>
        <select class="w-full border p-2 rounded" v-model="selectedCategoryId">
          <option disabled value="">Оберіть категорію</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <!-- Вибір підкатегорії -->
      <div class="mb-4" v-if="selectedCategory">
        <label class="block text-sm font-medium">Підкатегорія</label>
        <select
          class="w-full border p-2 rounded"
          v-model="selectedSubcategoryId"
        >
          <option disabled value="">Оберіть підкатегорію</option>
          <option
            v-for="subcategory in selectedCategory.subcategory"
            :key="subcategory.id"
            :value="subcategory.id"
          >
            {{ subcategory.name }}
          </option>
        </select>
      </div>

      <!-- Відображення фільтрів -->
      <!-- Відображення фільтрів -->
      <div v-if="filters.length > 0" class="flex flex-col gap-4">
        <div v-for="(filter, idx) in filters" :key="idx">
          <label class="block text-sm font-medium mb-1">{{
            filter?.name
          }}</label>

          <!-- SELECT -->
          <template v-if="filter?.type === 'select'">
            <select
              class="w-full border p-2 rounded"
              v-model="selectedFilters[filter.name]"
            >
              <option value="">Усі</option>
              <option v-for="(val, i) in filter.values" :key="i" :value="val">
                {{ val }}
              </option>
            </select>
          </template>

          <!-- BOOLEAN -->
          <template v-else-if="filter?.type === 'boolean'">
            <div class="flex gap-2 items-center">
              <label>
                <input
                  type="checkbox"
                  :checked="selectedFilters[filter.name] === true"
                  @change="selectedFilters[filter.name] = $event.target.checked"
                />
                Так
              </label>
            </div>
          </template>

          <!-- TEXT або NUMBER -->
          <template
            v-else-if="filter?.type === 'number' || filter?.type === 'text'"
          >
            <input
              type="text"
              class="w-full border p-2 rounded"
              v-model="selectedFilters[filter.name]"
            />
          </template>
        </div>
      </div>

      <!-- КНОПКА ЗАСТОСУВАТИ -->
      <Button
        class="bg-blue-500 text-black border p-2 rounded hover:bg-blue-600 mt-auto"
        @click="applyFilters"
      >
        Застосувати
      </Button>
    </aside>

    <!-- Список товарів -->
    <div
      class="w-full max-w-[60vh] flex flex-wrap gap-4 h-full min-h-screen justify-center items-center"
    >
      <NavigationMenu v-if="!loading" class="w-full">
        <div class="flex flex-wrap justify-start gap-4">
          <div
            v-for="product in products"
            :key="product?.id"
            class="w-[calc(33.333%-0.5rem)] sm:w-[calc(25%-0.5rem)] md:w-[calc(20%-0.5rem)] lg:w-[calc(16.666%-0.5rem)] xl:w-[calc(14.285%-0.5rem)]"
          >
            <ProductCard
              :product="product"
              :show-drawer="true"
            />
          </div>
        </div>
      </NavigationMenu>
      <NavigationMenu v-else class="w-full">
        <div class="flex flex-wrap justify-start gap-4">
          <div
            v-for="i in 4"
            :key="i"
            class="w-[calc(33.333%-0.5rem)] sm:w-[calc(25%-0.5rem)] md:w-[calc(20%-0.5rem)] lg:w-[calc(16.666%-0.5rem)] xl:w-[calc(14.285%-0.5rem)]"
          >
            <ProductCardSkeleton />
          </div>
        </div>
      </NavigationMenu>
    </div>
  </div>
</template>

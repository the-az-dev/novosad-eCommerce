<script setup lang="ts">
import {
  Breadcrumb,
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
} from "@/components/ui/navigation-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
let isMounted = true;
let timeoutId;
const searchedName = ref('')
const max_price = ref(0)
const min_price = ref(0)
const config = useRuntimeConfig();

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Динамічне обчислення активної категорії
const selectedCategory = computed(() => {
  return categories.value.find((cat) => cat.id === selectedCategoryId.value);
});

// Отримання категорій
const fetchCategories = async () => {
  try {
    const res = await $fetch( config.public.apiUrl + "products/category/get?locale="+locale.value);
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
        config.public.apiUrl + `products/filters/get?id=${subcategoryId}&locale=${locale.value}`
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
  if (id) {
    fetchFilters(id);
    fetchProducts();
  }
});

watch(searchedName, (value) => {
  if (value.length > 0) {
    fetchProducts();
  }
})

watch(min_price, (value) => {
  if (value > 0) {
    fetchProducts();
  }
})

watch(max_price, (value) => {
  if (value > 0) {
    fetchProducts();
  }
})

// Отримання товарів з урахуванням обраних фільтрів
const fetchProducts = async () => {
  loading.value = true;
  error.value = null;
  clearTimeout(timeoutId); // Скасовуємо попередній таймаут (якщо він існує)

  timeoutId = setTimeout(async () => {
    try {
      const query: Record<string, any> = {
        locale: locale.value,
      };

      if (selectedSubcategoryId.value) {
        query.subcategory_id = selectedSubcategoryId.value;
      }

      if(searchedName.value) {
        query.name = searchedName.value;
      }

      if(min_price.value && min_price.value) {
        query.price_min = min_price.value;
        query.price_max = max_price.value;
      }

      // Додаємо фільтри в запит
      Object.entries(selectedFilters.value).forEach(([key, val]) => {
        if (val !== "") {
          query[`filter_${key}`] = val;
        }
      });

      const queryString = new URLSearchParams(query).toString();

      console.log(config.public.apiUrl + `products/get?${queryString}`);
      if (queryString) {
        const encodedMessage = encodeURIComponent(queryString)
        const res = await $fetch(
            config.public.apiUrl + `products/get?${queryString}`
        );

        products.value = Array.isArray(res?.data) ? res.data : [];
      } else {
        const res = await $fetch(
            config.public.apiUrl + `products/get`
        );

        products.value = Array.isArray(res?.data) ? res.data : [];
      }
    } catch (e) {
      console.error("Помилка при отриманні товарів", e);
      error.value = e;
    } finally {
      loading.value = false;
    }
  }, 2000);
};

// Застосування фільтрів
const applyFilters = () => {
  fetchProducts();
};

const notFound = computed(() => {
  return !!((products.value.length === 0 && !loading.value) || (searchedName.value !== "" && min_price.value && max_price.value && selectedCategory.value && selectedSubcategoryId.value));
})

onMounted(async () => {
  await fetchCategories();
  if (isMounted) await fetchProducts();
});

onBeforeUnmount(() => {
  isMounted = false;
});



const meta = {
  uk: {
    title:  `${ t("nav-product-title") } - Магазин 'Novosad'`,
    description:
        "Якісні саджанці з Європи. Саджанці полуниці 'Фриго' прямо з місця їх росту, розсадники різноманітних плодових дерев та ягідних культур. Доставка по всій території України.",
    lang: "uk-UA",
    url: "http://novosad.pp.ua/uk/products",
  },
  ru: {
    title: `${ t("nav-product-title") } - Магазин 'Novosad'`,
    description:
        "Качественные саженцы из Европы. Саженцы клубники 'Фриго' прямо с места их роста, питомники разнообразных плодовых деревьев и ягодных культур. Доставка по всей территории Украины.",
    lang: "ru-RU",
    url: "http://novosad.pp.ua/ru/products",
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
  ],
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
            <BreadcrumbPage class="text-md">{{ t("product-page-name") }}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
    <div class="w-full mx-auto">
      <Label class="text-3xl">{{ t("product-page-name") }}</Label>
    </div>
  </div>

  <div
      class="p-8 w-full flex gap-8 flex-col md:flex-row lg:flex-row overflow-hidden transition-[height] duration-300 items-center md:items-start lg:items-start justify-center"
      :style="{ 'min-height': loading ? '42.5vh' : (products.length ? 'auto' : '42.5vh') }"
  >
    <!-- Фільтри -->
    <aside
      class="w-full min-w-[30vh] max-w-[30vh] bg-white p-6 rounded-xl shadow-lg border h-full flex flex-col justify-between items-center"
    >
      <div class="w-full flex flex-col items-center gap-2">
        <h2 class="text-xl font-semibold mb-4">{{ t("product-filters-title") }}</h2>

        <!-- Пошук назви товару -->
        <div class="mb-4 opacity-0 animate-fade-up flex flex-col gap-2 w-full">
          <label class="block text-sm font-medium">{{ t("product-search-label") }}</label>
          <input
              type="text"
              class="w-full border p-2 rounded-lg"
              :placeholder="t('product-search-placeholder')"
              v-model="searchedName"
          />
        </div>

        <!-- Пошук цінового діапазону -->
        <div class="mb-4 opacity-0 animate-fade-up flex flex-col gap-2 w-full">
          <label class="block text-sm font-medium">{{ t("product-price-label") }}</label>
          <div class="flex w-full flex-row items-center gap-2">
            <input
                type="number"
                class="w-full border p-2 rounded-lg"
                :placeholder="t('product-price-placeholder-from')"
                v-model="min_price"
            />
            <input
                type="number"
                class="w-full border p-2 rounded-lg"
                :placeholder="t('product-price-placeholder-to')"
                v-model="max_price"
            />
          </div>
        </div>

        <!-- Вибір категорії/підкатегорії -->
        <div class="mb-4 opacity-0 animate-fade-up flex flex-col gap-2 w-full">
          <label class="block text-sm font-medium">{{ t("product-group-label") }}</label>
          <select class="w-full border p-2 rounded-lg" v-model="selectedCategoryId">
            <option disabled value="">{{ t("product-group-all-selection") }}</option>
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
        <div class="mb-4 opacity-0 animate-fade-up flex flex-col gap-2 w-full" v-if="selectedCategory">
          <label class="block text-sm font-medium">{{ t("product-category-label") }}</label>
          <select
              class="w-full border p-2 rounded-lg"
              v-model="selectedSubcategoryId"
          >
            <option disabled value="">{{ t("product-category-all-selection") }}</option>
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
        <div v-if="filters.length > 0" class="flex flex-col gap-4 w-full mb-4">
          <div v-for="(filter, idx) in filters" :key="idx" class="opacity-0 animate-fade-up">
            <label class="block text-sm font-medium mb-2">{{
                filter?.name
              }}</label>

            <!-- SELECT -->
            <template v-if="filter?.type === 'select'">
              <select
                  class="w-full border p-2 rounded-lg"
                  v-model="selectedFilters[filter.name]"
              >
                <option value="">Усі</option>
                <option v-for="(val, i) in filter.values" :key="i" :value="val">
                  {{ val }}
                </option>
              </select>
            </template>

            <!-- BOOLEAN -->
            <template v-else-if="filter?.type === 'boolean'" class="opacity-0 animate-fade-up">
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
                v-else-if="filter?.type === 'number' || filter?.type === 'text'" class="opacity-0 animate-fade-up">
              <input
                  type="text"
                  class="w-full border p-2 rounded-lg"
                  v-model="selectedFilters[filter.name]"
              />
            </template>
          </div>
        </div>

      </div>
      <!-- КНОПКА ЗАСТОСУВАТИ -->
      <Button
          variant="outline"
        class="text-black border p-2 rounded mt-auto w-full"
        @click="applyFilters"
      >
        Застосувати
      </Button>
    </aside>

    <!-- Список товарів -->
    <div
      class="w-full flex flex-wrap gap-4 h-full justify-center items-center"
    >
      <NavigationMenu v-if="!loading" class="w-full">
        <div class="flex flex-wrap justify-center gap-4 w-full">
          <div
            v-for="(product, index) in products"
            :key="product?.id"
            class="w-[calc(1-0.5rem)] sm:w-[calc(2-0.5rem)] md:w-[calc(3-0.5rem)] lg:w-[calc(4-0.5rem)] xl:w-[calc(5-0.5rem)] "
          >
            <div
                v-if="!loading"
                :style="{ animationDelay: `${(index+1) * 100}ms` }"
                class="opacity-0 animate-fade-up"
              >
              <ProductCard
                  :product="product"
                  :show-drawer="true"
                  :is-main-page="false"
              />
            </div>
          </div>
        </div>
      </NavigationMenu>
      <NavigationMenu v-if="notFound" class="w-full opacity-0 animate-fade-up flex flex-col gap-2 items-center justify-center">
        <div class="flex flex-wrap gap-4">
          <img src="https://img.icons8.com/color/425/dead-tree.png" alt="Error icon - Novosad Shop">
        </div>
        <Label class="text-2xl font-medium text-center">{{ t("no-info-found") }}</Label>
      </NavigationMenu>
      <NavigationMenu v-else-if="loading" class="w-full">
        <div class="flex flex-wrap justify-start gap-4">
          <div
            v-for="i in 25"
            :key="i"
            class="w-[calc(1-0.5rem)] sm:w-[calc(2-0.5rem)] md:w-[calc(3-0.5rem)] lg:w-[calc(4-0.5rem)] xl:w-[calc(5-0.5rem)]"
          >
            <div
                :style="{ animationDelay: `${(i+1) * 100}ms` }"
                class="opacity-0 animate-fade-up"
            >
              <ProductCardSkeleton />
            </div>
          </div>
        </div>
      </NavigationMenu>
    </div>
  </div>
</template>

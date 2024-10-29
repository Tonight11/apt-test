<template>
  <div class="category-page">
    <Breadcrumb :breadcrumbs="breadcrumbs" />
    <img
      v-if="categoryData?.menu_image"
      :src="categoryData?.menu_image"
      :alt="getLocalizedInfo(categoryData)?.cg_slug"
      class="w-60"
    />
    <div v-else class="w-60 h-60 bg-[gray]">No Image</div>
    <h1>{{ getLocalizedInfo(categoryData)?.cg_name }}</h1>
    <p>{{ getLocalizedInfo(categoryData)?.cg_description }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Category, Localization } from "~/types";

const { categories, loadCategories } = useCategories();
const { getLocalizedInfo } = useLocalization()

const route = useRoute();

const categoryData = ref<Category | null>(null);
const breadcrumbs = ref<{ name: string; link: string }[]>([]);

const findCategoryBySlug = (
  categories: Category[],
  slugArray: string[],
  depth = 0
): Category | null => {
  if (depth >= slugArray.length) return null;

  const slugArraySorted = slugArray.filter((s) => s !== "");
  const currentSlug = slugArraySorted[depth];
  const matchedCategory = categories.find(
    (cat) => getLocalizedInfo(cat)?.cg_slug === currentSlug
  );

  if (!matchedCategory) return null

  return depth === slugArraySorted.length - 1 || !matchedCategory
    ? matchedCategory
    : findCategoryBySlug(
        matchedCategory.childs || [],
        slugArraySorted,
        depth + 1
      );
};

const generateBreadcrumbs = (category: Category | null): { name: string; link: string }[] => {
  const breadcrumbList = [];
  if (category) {
    const parentPath = category.path_to_top || [];

    // Собираем путь для каждой категории в path_to_top, формируя правильные ссылки
    let accumulatedPath = '';
    parentPath.forEach((id) => {
      const parentCategory = categories.value.find((cat) => cat.id === id);
      if (parentCategory) {
        const localizedInfo = getLocalizedInfo(parentCategory);
        accumulatedPath += `/${localizedInfo?.cg_slug || ''}`;
        
        breadcrumbList.push({
          name: localizedInfo?.cg_name || '',
          link: `/category${accumulatedPath}`,
        });
      }
    });

    // Добавляем текущую категорию в конец крошек
    const currentCategoryInfo = getLocalizedInfo(category);
    accumulatedPath += `/${currentCategoryInfo?.cg_slug || ''}`;
    breadcrumbList.push({
      name: currentCategoryInfo?.cg_name || '',
      link: `/category${accumulatedPath}`,
    });
  }

  return breadcrumbList;
};


await loadCategories();
const slugArray = route.params.slug || [];
categoryData.value = findCategoryBySlug(categories.value, slugArray as string[]);
breadcrumbs.value = generateBreadcrumbs(categoryData.value);

useSeoMeta({
  title: getLocalizedInfo(categoryData.value)?.cg_name || "Category Page",
  ogTitle: getLocalizedInfo(categoryData.value)?.cg_name || "Category Page",
  description: getLocalizedInfo(categoryData.value)?.cg_description || "",
  ogDescription: getLocalizedInfo(categoryData.value)?.cg_description || "",
})
</script>

<style scoped>
.category-page {
  padding: 20px;
}
</style>

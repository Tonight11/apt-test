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
const { getLocalizedInfo } = useLocalization();

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

  if (!matchedCategory) return null;

  return depth === slugArraySorted.length - 1 || !matchedCategory
    ? matchedCategory
    : findCategoryBySlug(
        matchedCategory.childs || [],
        slugArraySorted,
        depth + 1
      );
};

const findCategoryByPath = (
  categories: Category[],
  pathToTop: number[]
): { name: string; link: string }[] => {
  let currentCategories = categories;
  let matchedCategory = null;
  const breadcrumb: { name: string; link: string }[] = [];
  let accumulatedPath = "/category";

  for (const id of pathToTop) {
    matchedCategory = currentCategories.find((cat) => cat.id === id);
    if (!matchedCategory) return [];

    currentCategories = matchedCategory.childs || [];

    const localizedInfo = getLocalizedInfo(matchedCategory);
    if (localizedInfo?.cg_slug) {
      accumulatedPath += `/${localizedInfo.cg_slug}`;
      breadcrumb.push({
        name: localizedInfo.cg_name || "",
        link: accumulatedPath,
      });
    }
  }

  return breadcrumb;
};

const generateBreadcrumbs = (
  category: Category | null
): { name: string; link: string }[] => {
  let breadcrumbList: { name: string; link: string }[] = [];

  if (category?.path_to_top) {
    const sortedPathToTop = category.path_to_top.sort((a, b) => a - b);

    const parentCategoryBreadcrumbs = findCategoryByPath(
      categories.value,
      [...sortedPathToTop, category.id]
    );

    breadcrumbList = parentCategoryBreadcrumbs;
  }

  return breadcrumbList;
};


await loadCategories();
const slugArray = route.params.slug || [];
categoryData.value = findCategoryBySlug(
  categories.value,
  slugArray as string[]
);
breadcrumbs.value = generateBreadcrumbs(categoryData.value);

useSeoMeta({
  title: getLocalizedInfo(categoryData.value)?.cg_name || "Category Page",
  ogTitle: getLocalizedInfo(categoryData.value)?.cg_name || "Category Page",
  description: getLocalizedInfo(categoryData.value)?.cg_description || "",
  ogDescription: getLocalizedInfo(categoryData.value)?.cg_description || "",
});
</script>

<style scoped>
.category-page {
  padding: 20px;
}
</style>

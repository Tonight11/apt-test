<template>
  <section>
    <h2 class="mb-2">Категории</h2>
    <CategoryList :categories="categories" />
  </section>
</template>

<script setup lang="ts">
const { categories, loadCategories } = useCategories();

loadCategories();

useSeoMeta({
  title: "Категории",
  ogTitle: "Категории",
  description: "Просмотр всех категорий",
  ogDescription: "Просмотр всех категорий",
});
</script>

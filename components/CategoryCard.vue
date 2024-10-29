<script setup lang="ts">
import type { Category } from "~/types";

defineProps<{ category: Category }>();


const { getLocalizedInfo } = useLocalization()
</script>

<template>
  <NuxtLink :to="`/category/${getLocalizedInfo(category)?.cg_slug}`" class="category-card">
    <img :src="category.menu_image" :alt="getLocalizedInfo(category)?.cg_name" class="image" />
    <h3>{{ getLocalizedInfo(category)?.cg_name }}</h3>
    <p>{{ getLocalizedInfo(category)?.cg_description }}</p>
  </NuxtLink>
</template>

<style scoped>
.category-card {
  @apply p-4 border rounded-lg shadow-md hover:shadow-lg;
}
</style>

<template>
  <div class="category-list grid grid-cols-[0.2] sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <CategoryCard v-for="category in categories" :key="category.id" :category="category" />
  </div>
</template>

<script setup lang="ts">
import type { Category } from '~/types'

defineProps<{ categories: Category[] }>()
</script>

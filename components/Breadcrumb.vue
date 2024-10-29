<template>
  <nav>
    <ul class="breadcrumbs flex">
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <NuxtLink class="mx-2 underline" :to="`/${crumb.link}`">{{ crumb.name }}</NuxtLink>
        <span v-if="index < breadcrumbs.length - 1"> -> </span>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
type BreadcrumbsType = {
  link: string;
  name: string;
};

interface Props {
  breadcrumbs: BreadcrumbsType[];
}

defineProps<Props>();
</script>

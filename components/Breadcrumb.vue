<template>
  <nav>
    <ul class="breadcrumbs flex">
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <NuxtLink :title="crumb.name" class="mx-2 underline" :to="`${crumb.link}`">{{ textSlicer(20, crumb.name) }}</NuxtLink>
        <span v-if="index < breadcrumbs.length - 1"> -> </span>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { textSlicer } from '~/utils/slicer';
type BreadcrumbsType = {
  link: string;
  name: string;
};

interface Props {
  breadcrumbs: BreadcrumbsType[];
}

defineProps<Props>();
</script>

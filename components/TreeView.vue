<template>
  <ul>
    <li v-for="node in tree" :key="node.id">
      <div class="flex items-center cursor-pointer">
        <span
          @click="toggleNode(node)"
          v-if="node.childs && node.childs.length"
          class="mr-2"
        >
          <svg
            v-if="node.isOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 12h12M6 6l12 6-12 6"
            />
          </svg>
        </span>

        <span>
          <NuxtLink :to="`/category/${getLocalizedInfo(node)?.link}`">{{
            getLocalizedInfo(node)?.cg_name
          }}</NuxtLink>
        </span>
      </div>
      <div v-if="node.isOpen">
        <TreeView class="ml-2" :tree="node.childs || []" />
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Category } from "~/types";


defineProps<{
  tree: Category[];
}>();

const { getLocalizedInfo } = useLocalization()
const toggleNode = (node: Category) => {
  node.isOpen = !node.isOpen;
};
</script>

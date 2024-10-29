<template>
  <div class="wrapper flex flex-col min-h-[100dvh]">
    <header class="header flex justify-between">
      <h1>
        <NuxtLink to="/"> Главная </NuxtLink>
      </h1>
      <LanguageSwitcher />
    </header>
    <main class="main-content flex-1">
      <slot />
      <aside class="min-w-[250px] w-[250px] border py-1 px-3">
        <TreeView :tree="categories" />
      </aside>
    </main>
    <footer class="footer">
      <p>© 2023. Все права защищены.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { categories, loadCategories } = useCategories();
loadCategories();
</script>

<style scoped>
.header {
  @apply p-4 bg-gray-800 text-white;
}
.main-content {
  @apply p-6 flex justify-between gap-10;
}
.footer {
  @apply p-4 bg-gray-700 text-center text-white;
}
</style>

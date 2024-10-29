<template>
  <select class="bg-transparent" v-model="selectedLanguage" @change="changeLanguage">
    <option class="text-black" value="ru">Русский</option>
    <option class="text-black" value="en">English</option>
    <option class="text-black" value="fr">Français</option>
  </select>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const { locale, setLocale } = useI18n();
const selectedLanguage = ref(locale.value);

const changeLanguage = () => {
  locale.value = selectedLanguage.value;
  setLocale(selectedLanguage.value)
};
</script>

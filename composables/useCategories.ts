import { ref } from "vue";
import type { Category } from "~/types";

export const useCategories = () => {
  const categories = ref<Category[]>([]);

  const loadCategories = async () => {
    const fetchedCategories = await fetchCategories();
    if (fetchedCategories) {
      categories.value = fetchedCategories;
    }
  };

  const fetchCategories = async (): Promise<Category[] | null> => {
    const { data, error } = await useFetch<Category[]>("/tasks");

    if (error.value) {
      console.error("Error fetching categories:", error.value);
      return null;
    }


    return data.value || [];
  };

  return { categories, loadCategories };
};

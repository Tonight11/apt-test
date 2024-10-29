import type { Category, Localization } from "~/types";

export const useLocalization = () => {
  const { locale } = useI18n();

  const getLocalizedInfo = (
    node: Category | null
  ): Localization | undefined => {
    if (!node) return undefined;
    const currentLocale = locale.value as keyof typeof node.locale;
    return node.locale[currentLocale]?.cg_name
      ? node.locale[currentLocale]
      : node.locale["ru"];
  };

  return {
    getLocalizedInfo,
  };
};

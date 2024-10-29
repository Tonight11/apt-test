type Locale = {
  en?: Localization;
  ru?: Localization;
  fr?: Localization;
};

export type Localization = {
  id?: number;
  cg_name?: string;
  cg_description?: string;
  cg_title?: string;
  cg_slug?: string;
  meta_description?: string;
  meta_keywords?: string;
  link?: string;
};

type OpenGraph = {
  id: number;
  cat_id: number;
  og_property_name: string;
  locale: LocaleContent;
};

type TwitterData = {
  id: number;
  cat_id: number;
  extra_meta_name: string;
  locale: LocaleContent;
};

type LocaleContent = {
  en?: { og_content_value?: string };
  ru?: { og_content_value?: string } | { extra_meta_content?: string };
  fr?: { og_content_value?: string };
};

export type Category = {
  id: number;
  depth: number;
  numchild: number;
  category_image: string | null;
  logo_image: string | null;
  menu_image?: string;
  separate_menu: boolean;
  c_images: number;
  product_rep_1_id: number | null;
  product_rep_2_id: number | null;
  c_views: number;
  og: OpenGraph[] | null;
  twitter: TwitterData[] | null;
  locale: Locale;
  search_target?: boolean;
  path_to_top: number[];
  childs?: Category[];
  isOpen?: boolean;
};

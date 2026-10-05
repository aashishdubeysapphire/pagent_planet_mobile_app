export interface SellItemsCategory {
  categories: Category[];
  product_count?: number;
}

export interface Category {
  id: number;
  name: string;
  image_path?: string;
  category_txt: string;
  parent_id: number;
  slug: string;
  speciality_slug?: string;
  order: number;
  image: string;
  status: number;
}

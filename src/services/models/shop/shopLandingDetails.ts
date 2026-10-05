export interface ShopLandingDetails {
  categories: Category[];
  featuredProducts: ProductsData[];
  slashedPrices: ProductsData[];
  mostLiked: ProductsData[];
  mostViewed: ProductsData[];
  compareProducts: ProductsData[];
  popularCatgeories: PopularStyles[];
}

export interface Category {
  id: number;
  name: string;
  image_path: any;
}

export interface ProductsData {
  id: number;
  product_id?: number;
  featured_image_path: string;
  featured_image: string;
  slug: string;
  unique_style_number: string;
  selling_price: number;
  price: number;
  is_favourite?: FavObject[];
}

export interface FavObject {
  id: number;
  record_id: number;
  record_type: string;
  user_id: number;
}

export interface Category {
  id: number;
  name: string;
  image_path: any;
}

export interface PopularStyles {
  id: number;
  name: string;
  image_path: any;
  param: string;
  param_value: number;
}

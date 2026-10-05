import {Base} from '../base';
import {LocalImage} from '../localimage';
import {Category} from './sellCategory';
import {SellAttributes, VariableField} from './stepOne/catgoryFields';

export interface MyProductsList extends Base<ProductsResponse> {}

export interface ProductsResponse {
  products: Products;
  productDetail: ProductsData;
}

export interface Products {
  current_page: number;
  data: ProductsData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface ProductsData {
  brand_name: never;
  profile_name?: string;
  role_name?: string;
  id?: number;
  product_id?: number;
  slug?: string;
  profile_id?: number;
  role_id?: number;
  designer_id?: number;
  unique_style_number?: string;
  user_id?: number;
  meta_title?: any;
  meta_keyword?: any;
  meta_description?: any;
  featured_image?: string;
  worn_at_event_id?: any;
  color_id?: string;
  category_id?: number;
  swimsuit_item_type?: number;
  collection_id?: any;
  price?: number;
  selling_price?: number;
  discontinued_dress?: string;
  allow_wholesale?: string;
  wholesale_price?: any;
  description?: any;
  view_count?: number;
  worn_status: WornStatus;
  flaw_detail?: string;
  inventory?: number;
  inventory_alert?: number;
  search_count?: number;
  mark_as_sold?: string;
  video_link?: any;
  infusionsoft_product_id?: number;
  is_configurable?: number;
  parent_id?: number;
  master_pageant_id?: number;
  pageant_id?: number;
  is_deleted?: string;
  export_to_feed?: string;
  is_featured_product?: string;
  expired_on?: string;
  is_draft?: number;
  category_detail?: Category;
  featured_full_path_image?: string;
  localFeaturedImageUploaded?: boolean;
  worn_at_pageant_id?: number;
  worn_at_pageant_name?: string;
  result?: SellAttributes;
  additional_images?: string[];
  subcategory?: VariableField;
  delete_additional_images?: string[];
  delete_product?: string[];
  delete_product_size?: string[];
  localImage?: LocalImage;
  additionalImage?: LocalImage[];
  ticket_image?: LocalImage;
  sample_audio?: LocalImage;
  full_audio?: LocalImage;
  digitalFile?: string;
  ticketImage?: string;
  sampleAudio?: string;
  fullAudio?: string;
  digital_file?: LocalImage;
}

export interface WornStatus {
  id: number;
  title: string;
}

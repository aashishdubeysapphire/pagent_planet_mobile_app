import {Base} from '../base';

export interface MyOrdersData extends Base<MyOrderResponse> {}

export interface MyOrderResponse {
  myOrders: MyOrders;
}

export interface MyOrders {
  current_page: number;
  data: Daum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface Daum {
  id: number;
  dress_order_id: string;
  product_id: number;
  quantity: number;
  price: number;
  currency_price: number;
  size: number;
  sub_total: number;
  currency_sub_total: number;
  shipping_status: number;
  allow_return: number;
  completed_transaction_id: number;
  created_at: string;
  updated_at: string;
  currencySign: string;
  formatted_created_at: string;
  download_file_path: string;
  dress_order: DressOrder;
  product: Product;
  user_track: any;
  allow_dispute?: AllowDispute;
  dress_order_dispute?: DressOrderDispute;
}

export interface DressOrder {
  id: string;
  user_id: number;
  currency_id: number;
  currency_order_net_amount: number;
  order_net_amount: number;
  installment_charge?: number;
  currency_installment_charge?: number;
  order_notes: any;
  order_status: number;
  paid_in_installments: number;
  is_order_generated: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  slug: string;
  profile_id: number;
  role_id: number;
  designer_id: number;
  unique_style_number: string;
  user_id: number;
  meta_title: any;
  meta_keyword: any;
  meta_description: any;
  featured_image?: string;
  worn_at_event_id: any;
  color_id: string;
  category_id: number;
  collection_id: any;
  price: number;
  selling_price: number;
  discontinued_dress: string;
  allow_wholesale: string;
  wholesale_price: any;
  description?: string;
  view_count: number;
  worn_status: number;
  flaw_detail?: string;
  inventory: number;
  inventory_alert: number;
  search_count: number;
  mark_as_sold: string;
  video_link: any;
  infusionsoft_product_id: number;
  is_configurable: number;
  parent_id: number;
  master_pageant_id: number;
  pageant_id: number;
  is_deleted: string;
  export_to_feed: string;
  is_featured_product: string;
  expired_on: any;
  is_draft: number;
  product_img_url: string;
  subcategory: Subcategory[];
  product_parent?: ProductParent;
  record_image: RecordImage[];
  name: string;
  image: string;
  quantity: number;
  status: number;
  sku: any;
  url: any;
  product_name: string;
  product_desc: any;
  product_price: any;
  product_short_desc: any;
  subscription_only: boolean;
  product_options: any[];
  subscription_plans: any[];
}

export interface Subcategory {
  id: number;
  name: string;
  label: string;
  values: Values;
}

export interface ProductParent {
  id: number;
  slug: string;
  profile_id: number;
  role_id: number;
  designer_id: number;
  unique_style_number: string;
  user_id: number;
  meta_title: any;
  meta_keyword: any;
  meta_description: any;
  featured_image: string;
  worn_at_event_id: any;
  color_id: string;
  category_id: number;
  collection_id: any;
  price: number;
  selling_price: number;
  discontinued_dress: string;
  allow_wholesale: string;
  wholesale_price: any;
  description: any;
  view_count: number;
  worn_status: number;
  flaw_detail: any;
  inventory: number;
  inventory_alert: any;
  search_count: number;
  mark_as_sold: string;
  video_link: any;
  infusionsoft_product_id: number;
  is_configurable: number;
  parent_id: number;
  master_pageant_id: number;
  pageant_id: number;
  is_deleted: string;
  export_to_feed: string;
  is_featured_product: string;
  expired_on: any;
  is_draft: number;
}

export interface RecordImage {
  id: number;
  record_id: number;
  parent_id: any;
  type: string;
  image: string;
  title: any;
  view_count: number;
  alt_tag: any;
  created_at: string;
  updated_at: string;
}

export interface AllowDispute {
  id: number;
  dress_order_item_id: number;
  previous_status: number;
  status: number;
  created_at: string;
}

export interface DressOrderDispute {
  id: number;
  dress_order_id: string;
  dress_order_item_id: number;
  dispute_reason: string;
  dispute_comment: string;
  dispute_status: number;
  created_at: string;
  updated_at: string;
}
export interface Values {
  id: number;
  name: string;
}

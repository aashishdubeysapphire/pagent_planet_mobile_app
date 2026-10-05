import {Base} from '../base';
import {Contestant} from '../pageantdetails/contestant';

export interface BagProductsResponse extends Base<BagProducts> {}

export interface BagProducts {
  cartData: CartData;
  subtotal: string;
  discount: string;
  finalprice: string;
  shipping_charges: string;
  recentlyViewed: any;
  topSellers: any;
  unique: Product[];
  duplicate: Product[];
}

export interface CartData {
  id: number;
  user_id: number;
  have_billing_address: number;
  have_shipping_address: number;
  session_id: any;
  created_at: string;
  updated_at: string;
  quote_item: QuoteItem[];
  marked_for_checkout_item_count: number;
}

export interface QuoteItem {
  id: number;
  quote_id: number;
  product_id: number;
  quantity: number;
  price: number;
  size: number;
  inventory_failed: string;
  subtotal: number;
  marked_for_checkout: number;
  product: Product;
}

export interface Product {
  id: number;
  slug: string;
  infusionsoft_product_id: number;
  unique_style_number: string;
  featured_image: string;
  category_id: number;
  price: number;
  selling_price: number;
  discontinued_dress: string;
  inventory: number;
  product_img_url: string;
  attributes: Attributes;
  subcategory: any[];
  quantity: number;
}

export interface Attributes {
  resultSet: ResultSet[];
  imageArr: any[];
}

export interface ResultSet {
  id: number;
  name: string;
  hex_code: string;
  productVariantSizeList: ProductVariantSizeList[];
}

export interface ProductVariantSizeList {
  product_id: number;
  isDiffPrice: boolean;
  inventory: number;
  price: number;
  selling_price: number;
  id: number;
  size: Size;
}

export interface Size {
  attribute_id: number;
  id: number;
  name: number;
}

export interface TppOrderData {
  unique_id: string;
  dressOrderObj: DressOrderObj;
  memberhsipOrderObj: MemberhsipOrderObj;
  ticket_contestants: Contestant[];
}

export interface DressOrderObj {
  id: string;
  order_notes: any;
  user_id: number;
  updated_at: string;
  created_at: string;
  order_net_amount: number;
  currency_id: number;
  currency_order_net_amount: number;
  is_order_generated: number;
  paid_in_installments: number;
  installment_charge: number;
  currency_installment_charge: number;
  order_status: 1;
}

export interface TransactionVerification {
  order?: Order;
  milestoneData?: MilestoneDaum[];
}

export interface Order {
  amount: number;
  id: string;
  order_for: string;
}

export interface MilestoneDaum {
  duedate: string;
}

export interface MemberhsipOrderObj {
  id?: number;
  user_id?: number;
  order_for?: string;
  from_record_type?: string;
  from_record_id?: number;
  to_record_type?: string;
  to_record_id?: number;
  select_pageant_id?: any;
  to_record_title?: string;
  age_division_id?: any;
  first_name?: string;
  last_name?: string;
  address?: number;
  country_id?: number;
  state_id?: number;
  city_name?: string;
  zip_code?: number;
  mobile?: number;
  email?: string;
  amount?: number;
  amount_after_charge?: number;
  quantity?: any;
  vote_price?: any;
  total_amount?: any;
  membership_price?: number;
  prepaid_lead_price?: number;
  prepaid_lead_number?: number;
  prepaid_lead_amount?: number;
  status?: string;
  discount_applied?: string;
  profile_role_id?: number;
  profile_id?: number;
  claimCount?: number;
}

import {Product} from '../myorders/myOrdersList';

export interface SuggestionResult {
  status_code: number;
  success: boolean;
  message: string;
  data: Suggestionresponse;
}

export interface Suggestionresponse {
  products: Product[];
  sellers: Seller[];
}

export interface Seller {
  id: number;
  name: string;
  slug: string;
  image: string;
  user_id: number;
  business_role_id: number;
}

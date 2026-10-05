import {Product} from '../myorders/myOrdersList';

export interface BuyerDetails {
  name: string;
  email: string;
}

export interface BillingDetails {
  name: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: number;
  phone: number;
}

export interface ShippingDetails {
  name: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: number;
  phone: number;
}

export interface OrderDetail {
  id: string;
  created_at: string;
  status: number;
  order_notes?: any;
  paid_in_installments: number;
  order_net_amount: string;
  buyer_details: BuyerDetails;
  billing_details: BillingDetails;
  shipping_details: ShippingDetails;
  product: Product[];
}

export interface OrderDetail {
  order_detail: OrderDetail;
}

export interface getOrderDetails {
  success: boolean;
  status_code: number;
  message: string;
  data: OrderDetail;
}

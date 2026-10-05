import { CountryState } from "../country/CountryState";

export interface AddressInfo {
  billingAdrreses: BillingAddress;
  shippingAdrreses: BillingAddress;
}

export interface BillingAddress {
  id: number;
  user_id: number;
  type: number;
  is_default_address: number;
  first_name: string;
  last_name: string;
  company_name: string;
  email: string;
  phone: number;
  address: string;
  city: string;
  zipcode: number;
  created_at: string;
  updated_at: string;
  country_name: CountryState;
  state_name: CountryState;
  phoneNo: number;
  name: string;
  default: boolean;
}

import {Product} from '../myorders/myOrdersList';
import {DressOrderObj} from '../sellitems/bagProducts';

export interface TransactionDetail {
  id?: number;
  message?: string;
  invoice_id?: number;
  payment_amount?: number;
  payment_status?: string;
  transaction_id?: number;
  dressOrderObj?: DressOrderObj;
  installment?: string;
}

export interface VoteContestantDetail {
  contestantName: string;
  totalVotes: string;
  event_id: number;
  contestant_id: number;
  age_division_id: number;
  totalCost: number;
  perVotePrice: number;
  halfPrice: number;
  claimIds?: string;
  profileId?: string;
  currencySign: string;
  have_billing_address: number;
}

export interface CreditCard {
  id: number;
  card_type?: string;
  card_number: string;
  validation_status: string;
}

export interface InfusionToken {
  id: number;
  merchant_id: number;
  token_type: string;
  expire_in: number;
  access_token: string;
  refresh_token: string;
}

export interface OrderDetail {
  message: string;
  id: number;
  title: string;
  status: string;
  total: number;
  contact: Contact;
  notes: any;
  terms: any;
  creation_date: string;
  modification_date: any;
  order_date: string;
  lead_affiliate_id: number;
  sales_affiliate_id: number;
  total_due: number;
  total_paid: number;
  shipping_information: ShippingInformation;
  refund_total: number;
  order_items: OrderItem[];
  payment_plan: any;
  order_discount: any;
  allow_payment: any;
  allow_paypal: any;
  tax_summary_items: any;
  fault: Fault;

  jobRecurringId: number;
  name: string;
  description: string;
  type: string;
  quantity: number;
  cost: any;
  price: number;
  discount: number;
  product: Product;
  specialId: number;
  specialAmount: any;
  specialPctOrAmt: number;
  orderItemTaxes: any;
  recurringBilling: boolean;
  frequency: number;
  billingCycle: number;
  numberOfPayments: number;
}

export interface ShippingInformation {
  line1: any;
  line2: any;
  locality: any;
  region: any;
  company: any;
  phone: any;
  zip_code: any;
  zip_four: any;
  country_code: any;
  first_name: any;
  middle_name: any;
  last_name: any;
  is_invoice_to_company: boolean;
}

export interface OrderItem {
  id?: number;
  jobRecurringId?: number;
  name?: string;
  description?: string;
  type?: string;
  notes?: any;
  quantity?: number;
  cost?: number;
  price?: number;
  discount?: any;
  product?: Product;
  specialId?: number;
  specialAmount?: any;
  specialPctOrAmt?: number;
  orderItemTaxes?: any;
  recurringBilling?: boolean;
  frequency?: number;
  billingCycle?: number;
  numberOfPayments?: number;
  product_id?: number;
}

export interface ContactResponse {
  contacts: Contact[];
  count: number;
  next: string;
  previous: string;
  fault: Fault;
}
export interface Fault {
  faultstring: string;
  detail: Detail;
}

export interface Detail {
  errorcode: string;
}
export interface Contact {
  email_addresses: EmailAddress[];
  email_opted_in: boolean;
  addresses: Address[];
  last_updated: string;
  tag_ids: any[];
  owner_id: any;
  date_created: string;
  middle_name: string;
  given_name: string;
  ScoreValue: any;
  email_status: string;
  phone_numbers: PhoneNumber[];
  last_updated_utc_millis: number;
  company: any;
  id: number;
  family_name: string;
  email: string;
  first_name: string;
  last_name: string;
  company_name: string;
  job_title: string;
}

export interface EmailAddress {
  email: string;
  field: string;
}

export interface Address {
  line1: string;
  line2: string;
  locality: string;
  region: string;
  field: string;
  postal_code: string;
  zip_code: string;
  zip_four: string;
  country_code: string;
}

export interface PhoneNumber {
  number: string;
  extension: string;
  field: string;
  type: string;
}

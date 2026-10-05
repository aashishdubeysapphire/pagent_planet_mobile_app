export interface PlanData {
  have_billing_address: number;
  my_plans: MyPlan[];
  membership_plans: Plan[];
}
export interface MyPlan {
  id: number;
  user_id: number;
  payment_id: any;
  record_type: string;
  record_id: number;
  membership_id: number;
  membership_name: string;
  membership_type: string;
  membership_is_addon: string;
  membership_role_id: any;
  membership_cost_per_lead: number;
  membership_article_count: number;
  membership_price: number;
  is_special_membership: string;
  pay_flow_profile_id: any;
  pay_flow_transaction_id: any;
  membership_skype_calls_number: any;
  expiry_date: string;
  status: string;
  is_recurring: string;
  credit_card_id: number;
  subscription_plan_id: number;
  subscription_or_recurring_order_id: number;
  invoice_id: number;
  charge_payment_ref_number: number;
  profile_lead_id: number;
  total_amount: number;
  total_prepaid_lead: number;
  requested_prepaid_leads: number;
  request_prepaid_lead_amount: number;
  carry_forward_leads: number;
  created_at: string;
  updated_at: string;
  image: string;
  payment: any;
  membership_plan: Plan;
  profile_lead: ProfileLead;
}

export interface ProfileLead {
  id: number;
  order_id: number;
  profile_id: number;
  profile_type: string;
  membership_leads: number;
  prepaid_leads: number;
  free_leads: number;
  purchased_at: string;
  validity_days: number;
  claimed_leads: number;
  pending_leads: number;
  status: string;
  created_at: string;
  updated_at: string;
}
export interface Plan {
  id?: number;
  name?: string;
  type?: string;
  is_addon?: string;
  role_id?: any;
  buying_lead?: string;
  cost_per_lead?: number;
  article_count?: number;
  price?: number;
  skype_calls_number?: any;
  content?: string;
  paypal_response?: string;
  amt_lead_includes?: number;
  prepaid_lead_price?: number;
  created_at?: string;
  updated_at?: string;
  updatedContent?: string[];
  image?: string;
  role?: any;
}

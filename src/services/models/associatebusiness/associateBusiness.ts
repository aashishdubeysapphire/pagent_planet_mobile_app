import {Owner} from '../pageantdetails/owner';

export interface AssociateBusiness {
  id: number;
  from_type: string;
  from_tag_id: number;
  to_type: string;
  to_tag_id: number;
  title: any;
  from_business: FromBusiness;
}
export interface FromBusiness {
  id: number;
  owner_id: number;
  old_owner_id: number;
  email: string;
  is_business: string;
  business_role_id: number;
  business_title: any;
  slug: any;
  tagline?: string;
  image: string;
  address: string;
  longitude?: number;
  latitude?: number;
  phone: any;
  bio?: string;
  achievement: any;
  website?: string;
  facebook_link?: string;
  twitter_link?: string;
  instagram_link?: string;
  pinterest_link?: string;
  dob: any;
  occupation: any;
  achievements: any;
  detail: any;
  you_tube_link?: string;
  google_plus_link?: string;
  custom_design?: string;
  is_featured: string;
  provide_coaching: string;
  hourly_rate?: number;
  rating_average: number;
  view_count: number;
  search_count: number;
  view_phone_count: number;
  is_verified: string;
  is_brand: string;
  cost_per_lead: any;
  pay_profile_id?: number;
  article_count: any;
  active_membership_id: any;
  active_membership_price: any;
  status: string;
  mail_notify_pref: string;
  dnd_status: string;
  dnd_inactive_date?: string;
  hide_message_me: string;
  disable_msg_feature: string;
  redirect_membership_date: any;
  import_id?: number;
  created_by?: number;
  updated_by?: number;
  review_count: number;
  role: Role;
  owner: Owner;
}

export interface Role {
  id: number;
  name: string;
  display_name: string;
}

import { CountryState } from "../country/CountryState";

export interface getExpertProfileDetails {
  success: boolean;
  status_code: number;
  data: getExpertProfileDetailsData;
}

export interface getExpertProfileDetailsData {
  pending_location_request: any;
  profile: Profile;
  designer: string;
  designerData: any[];
  all_states: string;
  roleName: string;
  roleId: number;
  countryIds: CountryState[];
  stateIds: any[];
  specalitiesIds: SpecalitiesId[];
  contestantParticipateIds: any[];
  contestantList: any[];
  pageantParticipateIds: any[];
  pageantList: any[];
  advertisingBannerData: AdvertisingBannerData;
  location: Location[];
}

export interface Location {
  name: string;
  lat: number;
  lng: number;
  days: Day[];
}

export interface Day {
  day: string;
  isOpen: string;
  from: string;
  to: string;
}

export interface AdvertisingBannerData {
  is_active_advertiser: string;
  membership_price: number;
  lead_include: number;
  position_profile_appeared: number;
  total_profile_for_this_role_type: number;
  roleName: string;
  role_slug: string;
  profile_id: number;
}

export interface SpecalitiesId {
  id: number;
  name: string;
  slug: string;
}

export interface Profile {
  id: number;
  owner_id: number;
  old_owner_id: number;
  email: string;
  is_business: string;
  business_role_id: number;
  business_title: string;
  slug: string;
  tagline?: any;
  image?: any;
  address: string;
  longitude: number;
  latitude: number;
  phone: number;
  bio: number;
  achievement?: any;
  website?: any;
  facebook_link?: any;
  twitter_link?: any;
  instagram_link?: any;
  pinterest_link?: any;
  dob?: any;
  occupation?: any;
  achievements?: any;
  detail?: any;
  you_tube_link?: any;
  google_plus_link?: any;
  custom_design: string;
  is_featured: string;
  provide_coaching: string;
  hourly_rate?: any;
  rating_average?: any;
  view_count: number;
  search_count: number;
  view_phone_count: number;
  is_verified: string;
  is_brand: string;
  cost_per_lead?: any;
  pay_profile_id?: any;
  article_count?: any;
  active_membership_id?: any;
  active_membership_price?: any;
  status: string;
  dnd_status: string;
  dnd_inactive_date?: any;
  mail_notify_pref: string;
  hide_message_me: string;
  disable_msg_feature: string;
  redirect_membership_date?: any;
  import_id?: any;
  created_by?: any;
  updated_by?: any;
  dynamic_url?: any;
  collection: any[];
  operating_hour_multiple: Operatinghourmultiple[];
  business_designer: any[];
  record_tag: any[];
  record_image: any[];
  role: Role;
  business_lead_country: Businessleadcountry[];
  business_lead_state: any[];
}

export interface Businessleadcountry {
  id: number;
  business_id: number;
  country_id: number;
}

export interface Role {
  id: number;
  name: string;
  display_name: string;
}

export interface Operatinghourmultiple {
  id: number;
  business_id: number;
  sun_to?: any;
  sun_from?: any;
  mon_to?: any;
  mon_from?: any;
  tue_to: string;
  tue_from: string;
  wed_to?: any;
  wed_from?: any;
  thu_to: string;
  thu_from: string;
  fri_to?: any;
  fri_from?: any;
  sat_to?: any;
  sat_from?: any;
  address: string;
  longitude: number;
  latitude: number;
}

import {Base} from '../base';

export interface DirectoryData extends Base<Data> {}

export interface Data {
  categorySelect: string[];
  stateList: any[];
  str: string;
  suggestion: string[];
  list: List;
  is_message_button_disable: boolean;
}

export interface List {
  current_page: number;
  data: DirectoryItem[];
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

export interface DirectoryItem {
  entry_fees_value: number;
  entry_fees_status: string;
  id: number;
  title: string;
  name: string;
  title_keyw: string;
  slug: string;
  master_pageant_id: any;
  age_from: number;
  age_to: number;
  gender?: string;
  is_married?: string;
  have_kids?: string;
  main_image: string;
  speciality_pageant?: string;
  show_recruit_director_button?: string;
  owner_id: number;
  rating_average: any;
  type: string;
  type_keyw: string;
  is_pageant_completed: string;
  status: string;
  active_membership_id?: number;
  active_membership_price?: number;
  is_verified: string;
  dnd_status: string;
  hide_message_me: string;
  speciality_type: number;
  pageant_order: number;
  countries: any[];
  countries_count: number;
  states: any[];
  states_count: number;
  phase_ids: number[];
  price?: number;
  expiry_date?: string;
  final_rating: number;
  pageant_start_date?: string;
  pageant_end_date?: string;
  contestants_count: number;
  review_count: number;
  best_in_pageantry_awards_count: number;
  totalProducts: number;
  productsToCompete: boolean;
  productsToAttend: boolean;
  image_full_url: string;
  business_order: number;
  email: string;
  is_business: string;
  business_title: string;
  image: string;
  address: string;
  business_role_id: number;
  specality: any[];
  bio: string;
  location: string;
  pageant_count: number;
  user_slug: string;
  profile_image: string;
  best_in_pageantry_business_awards_count: number;
  productsOnSale: number;
  productsOnHire: number;
  productOnSale: number;
  productOnHire: number;
  contestant_order: number;
  zodiac_sign: any;
  height: any;
  hair_color: any;
  eye_color: any;
  country_name: string;
  state_name: string;
  country_id: any;
  city_id: any;
  first_name: string;
  last_name: string;
  is_minor: string;
  pageant_competed_count: number;
  pageant_won_count: number;
  awards_won_count: number;
  contestant_age: any;
  is_compete_button_display: boolean;
}

export interface BusinessType {
  pageant: string;
  contestant: string;
  aesthetics: string;
  coach: string;
  designer: string;
  emcee: string;
  judge: string;
  photographer: string;
  production: string;
  retailer: string;
}

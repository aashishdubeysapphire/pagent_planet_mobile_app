import {Contestant} from '../../models/pageantdetails/contestant';
import {CountryState} from '../country/CountryState';
import {Pageant} from '../pageantdetails/pageant';
import {PersonalDetails} from './personalDetails';

export interface User {
  id: string;
  created_by_user_id: string;
  updated_by_user_id: string;
  user_type_id: string;
  gender: string;
  first_name: string;
  last_name: string;
  slug: string;
  dob: string;
  email: string;
  user_name: string;
  country_id: number;
  cart_count: number;
  unread_notifications_count: number;
  wishlist_count: number;
  state_id: number;
  mobile: string;
  address: string;
  zip_code: string;
  organization: string;
  latitude: string;
  longitude: string;
  security_question_id: string;
  security_answer: string;
  profile_image: string;
  status: string;
  is_verified: string;
  reset_password_token: string;
  last_lead_received_date: string;
  verified_token: string;
  user_otp: string;
  otp_expiry_date: string;
  bio: string;
  primary_profile_type: string;
  primary_profile_id: string;
  image_path: string;
  import_id: string;
  wp_pwd_reset: string;
  infusionsoft_contact_id: string;
  product_cron_email_last_date: string;
  personal_details: PersonalDetails;
  country: CountryState;
  state: CountryState;
  is_pageant_exist: boolean;
  addedRolesListData: AddedRolesListData;
  contestant: Contestant;
  pageant: Pageant;
  is_expert_exist: boolean;
  is_contestant_exist: boolean;
  sortedRolesForPublicScreen: SortedRolesForPublicScreen[];
  sortedAllRolesForPublicScreen: SortedRolesForPublicScreen[];
  product_count: number;
  bank_details: number;
  isEventTicketVote: number;

  
}

export interface SortedRolesForPublicScreen {
  role_id?: number;
  id?: number;
  name?: string;
  role: string;
  created_at?: number;
  status?: string;
}
export interface AddedRolesListData {
  pageant: string;
  contestant: string;
  coach: string;
  designer: string;
  emcee: string;
  hair_makeup_artist: string;
  personal_trainer: string;
  photographer: string;
  production: string;
  retailer: string;
}

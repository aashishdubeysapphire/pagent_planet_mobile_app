import {Contestant} from '../pageantdetails/contestant';
import {Owner} from '../pageantdetails/owner';
import {Pageant} from '../pageantdetails/pageant';
import {ProductsData} from '../sellitems/myProducts';

interface PostUsersWholikedList {
  id: number;
  user_id: number;
  post_id: number;
  status: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: any;
  owner: Owner;
}

interface PageantSystemDetail {
  id: number;
  title: string;
  slug: string;
}

interface PostCategory {
  id: number;
  name: string;
  status: number;
  slug: string;
  is_system_generated: number;
  post_title?: any;
  used_for_profile_type: string;
  created_at: string;
  updated_at: any;
  deleted_at: any;
}

interface Role {
  id: number;
  created_by_user_id: number;
  updated_by_user_id: number;
  user_type_id: number;
  display_name: string;
  name: string;
  is_editable: string;
  is_directory: string;
  is_business: string;
  description: string;
  image: string;
  sort_order: number;
  is_for_nomination: string;
}

interface Business {
  id: number;
  business_title: string;
  slug: string;
  status: string;
  owner_id: number;
  business_role_id: number;
  is_business: string;
  role: Role;
}

export interface ConvoListItem {
  convoUserTabsArr: any;
  is_updated: any;
  post_output_time_to_show: ReactNode;
  active_role: any;
  share_url: string;
  dynamic_url: string;
  id: number;
  user_id: number;
  category_id: number;
  body: string;
  profile_type?: any;
  profile_id?: any;
  business_id?: any;
  image_name: string;
  status: number;
  video_url: string;
  published_at: string;
  event_id?: number;
  post_total_likes?: number;
  post_main_comment_count?: number;
  post_replies_comment_count?: number;
  video_type: string;
  embed_video_url: string;
  video_id: string;
  postUsersWholikedList: PostUsersWholikedList;
  thread_owner_image: string;
  post_image_url: string;
  pageantSystemDetail: PageantSystemDetail;
  post_category: PostCategory;
  owner: Owner;
  contestant: Contestant;
  business: Business;
  post_event: Pageant;
  post_likes_by_logged_in_user?: any;
  trophy_id: any;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  master_pageant_id: number;
  master_pageant_title: string;
  upload_image_radio_checked: boolean;
  video_url_radio_checked: boolean;
  year_id: number;
  image_url: string;
  selected_category_name: string;
  crownConvoLinkings: CrownConvoLinkings;
  tagged_contestant: TaggedContestant;
  product_profile_data: ProductProfileData;
}

interface CommunityPostList {
  current_page: number;
  data: ConvoListItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

interface Data {
  communityPostList: CommunityPostList;
  loggedInUserData: any[];
}

export interface ConvoListing {
  success: boolean;
  status_code: number;
  message: string;
  data: Data;
}

export interface CrownConvoLinkings {
  isSystemGenerated: number;
  linkingURL: LinkingUrl;
  profileNames: ProfileNames;
  productDetail: ProductsData;
  thread_owner_image: string;
  profileExists: ProfileExists;
  eventImageUrl: string;
  skipPosts: boolean;
}

export interface LinkingUrl {
  contestantProfileUrl: string;
  expertProfileUrl: string;
  contestantActivePofile: boolean;
  contestantImageUrl: string;
  businessActivePofile: boolean;
  expertImageUrl: string;
  userProfileUrl: string;
  businessDetail: any;
}

export interface ProfileNames {
  userName: string;
  contestantName: string;
  activeContestantNameLink: boolean;
  eventName: string;
  activeEventNameLink: boolean;
  expertProfileName: string;
  activeExpertProfileName: boolean;
}

export interface ProfileExists {
  userNameExists: boolean;
  contestantNameExists: boolean;
  expertNameExists: boolean;
  eventNameExists: boolean;
  contestantNameOnAnotherPositionExists: boolean;
}

export interface TaggedContestant {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  slug: string;
  status: string;
  is_minor: string;
  owner_id: number;
}

export interface ProductProfileData {
  id: number;
  title?: string;
  slug: any;
  master_pageant_id: any;
  year_id?: number;
  age_from?: number;
  age_to?: number;
  start_date?: string;
  end_date?: string;
  gender?: string;
  is_married?: string;
  have_kids?: string;
  latitude: any;
  longitude: any;
  address: any;
  website: any;
  location: any;
  venue: any;
  email?: string;
  phone?: number;
  description?: string;
  main_image?: string;
  banner_image?: string;
  speciality_pageant?: string;
  show_recruit_director_button?: string;
  owner_id: number;
  old_owner_id: number;
  rating_average: any;
  created_by_user_id?: number;
  updated_by_user_id?: number;
  type?: string;
  seo_focuskw: any;
  seo_title: any;
  seo_metakeyword: any;
  seo_metadesc: any;
  seo_linkdex: any;
  'seo_primary_age-divisions': any;
  is_pageant_completed?: string;
  priority?: number;
  priority_weight?: number;
  priority_calculated?: number;
  facebook: any;
  twitter: any;
  status: string;
  is_pca_activated?: string;
  people_award_name?: string;
  hide_vote_count?: number;
  per_vote_price: any;
  view_count: number;
  search_count: number;
  cost_per_lead: any;
  article_count: any;
  active_membership_id: any;
  active_membership_price: any;
  is_verified?: string;
  pay_profile_id: any;
  pca_start_date_time: any;
  pca_end_date_time: any;
  pca_admin_notify?: string;
  is_prediction_hide?: string;
  dnd_status: string;
  dnd_inactive_date: any;
  hide_message_me: string;
  speciality_type?: number;
  sub_speciality_type?: number;
  txt_for_speciality_type?: string;
  streetAddress: any;
  addressLocality: any;
  addressRegion: any;
  addressCountry: any;
  redirect_membership_date?: string;
  half_price_start_notification_last_date: any;
  import_id: any;
  not_sure?: number;
  not_sure_end_date?: number;
  not_sure_address?: number;
  hide_votes_scheduler_date_time: any;
  hide_contestant_last_name?: string;
  different_pca_end_dates?: string;
  contestants_sort_by_vote_count?: number;
  show_predictive_matrix?: number;
  one_winner_only?: number;
  is_half_price?: number;
  half_price_start_date_time: any;
  half_price_end_date_time: any;
  is_featured_event?: string;
  tickets_entry_fee_product_reminder_last_date: any;
  create_event_reminder_last_date: any;
  activate_pca_reminder_last_date: any;
  event_timezone_id?: number;
  is_pca_deactivated_before_min_days?: number;
  name?: string;
  start_in_pageant?: string;
  dob?: string;
  zodiac_sign: any;
  bio?: string;
  occupation?: string;
  college_attend?: string;
  height?: number;
  weight: any;
  hair_color?: number;
  eye_color?: number;
  complexion?: string;
  fun_facts?: string;
  talent?: string;
  pageant_plateform?: string;
  image: any;
  country_id?: number;
  created_by?: number;
  state_id: any;
  city_id?: number;
  is_vip?: string;
  skype_calls: any;
  collect_donation_status?: string;
  first_name?: string;
  last_name?: string;
  contestant_todo_reminder_last_date?: string;
  hide_dob?: string;
  is_minor?: string;
  todo_sent_email_last_date?: string;
  business_role_id: string;
  business_title: string;
  main_image_full_url: string;
}

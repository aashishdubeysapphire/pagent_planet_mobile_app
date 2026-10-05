interface BusinessRatingToProfile {
  id: number;
  owner_id: number;
  old_owner_id: number;
  email: string;
  is_business: string;
  business_role_id: number;
  business_title: string;
  slug: string;
  tagline: string;
  image?: any;
  address: string;
  longitude?: any;
  latitude?: any;
  phone: number;
  bio?: any;
  achievement?: any;
  website: string;
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
  rating_average: number;
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
  hide_message_me: string;
  disable_msg_feature: string;
  redirect_membership_date?: any;
  import_id?: any;
  created_by?: any;
  updated_by?: any;
}

interface UserRatingFromProfile {
  id: number;
  created_by_user_id?: any;
  updated_by_user_id: number;
  user_type_id: number;
  gender: string;
  first_name: string;
  last_name: string;
  slug?: any;
  dob?: any;
  email: string;
  user_name: string;
  password: string;
  old_password?: any;
  password_salt?: any;
  password_hash?: any;
  country_id: number;
  state_id: number;
  mobile: number;
  address?: any;
  zip_code?: any;
  organization?: any;
  latitude?: any;
  longitude?: any;
  security_question_id?: any;
  security_answer?: any;
  profile_image: string;
  status: string;
  reset_password_token: string;
  last_lead_received_date: string;
  verified_token?: any;
  user_otp: number;
  otp_expiry_date: string;
  is_verified: number;
  bio: string;
  primary_profile_type: string;
  primary_profile_id: number;
  image_path: string;
  import_id?: any;
  wp_pwd_reset: string;
  infusionsoft_contact_id: number;
  product_cron_email_last_date?: any;
  is_logout_on_web: number;
}

interface Datum {
  id: number;
  record_id?: any;
  record_type?: any;
  rating_to: number;
  rating_to_type: string;
  rating_from: number;
  rating_from_type: string;
  rating_to_user_id: number;
  rating_from_user_id: number;
  event_org?: any;
  session_rating?: any;
  professionalism: number;
  production_quality?: any;
  overall_exp: number;
  knowledgeable: number;
  cost: number;
  average_rating: number;
  title?: any;
  review: string;
  is_edited: number;
  business_rating_to_profile: BusinessRatingToProfile;
  user_rating_from_profile: UserRatingFromProfile;
  get_reviews_reply?: any;
}

interface ReviewRating {
  current_page: number;
  data: Datum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

export interface ExpertReview {
  reviewRating: ReviewRating;
  isMyReviewInCurrentYear: number;
  totalUserRating: number;
  pageNumber: number;
  totalPage: number;
}

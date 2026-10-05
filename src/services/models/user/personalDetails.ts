export interface PersonalDetails {
  gender?: string;
  first_name: string;
  last_name: string;
  profile_image?: string;
  profile_image_url?: string;
  contact_details: ContactDetails;
  linked_accounts: LinkedAccounts;
}

export interface ContactDetails {
  mobile: string;
}
export interface LinkedAccounts {
  id: string;
  facebook_page: string;
  twitter_page: string;
  pintrest_page: string;
  youtube_page: string;
  instagram_page: string;
  google_plus_page: string;
  linkedin_page: string;
  tiktok_page: string;
  profile_id: number;
  user_id: number;
  profile_type: string;
  linkedin_company: any;
  foursquare_page: any;
  created: string;
  updated: string;
}

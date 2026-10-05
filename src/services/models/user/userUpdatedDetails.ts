interface ContactDetails {
  mobile: string;
}

interface LinkedAccounts {
  id: number;
  facebook_page: string;
  twitter_page: string;
  pintrest_page: string;
  youtube_page: string;
  instagram_page: string;
  google_plus_page: string;
  linkedin_page: string;
  tiktok_page: string;
}

interface PersonalDetails {
  gender: string;
  first_name: string;
  last_name: string;
  profile_image?: any;
  profile_image_url?: any;
  contact_details: ContactDetails;
  linked_accounts: LinkedAccounts;
}

interface Country {
  id: number;
  sort_name: string;
  name: string;
  phone_code: number;
  status: number;
}

interface State {
  id: number;
  name: string;
  slug: string;
  country_id: number;
}

interface Contestant {
  id: number;
  status: string;
}

interface Pageant {
  id: number;
  status: string;
}

interface SortedRolesForPublicScreen {
  role_id: number;
  id: number;
  name: string;
  role: string;
  created_at: number;
}

interface AddedRolesListData {
  pageant: string;
  contestant: string;
}

interface User {
  id: number;
  user_type_id: number;
  email: string;
  country_id: number;
  state_id: number;
  address: string;
  latitude: string;
  longitude: string;
  status: string;
  is_verified: number;
  bio: string;
  primary_profile_type: string;
  primary_profile_id: number;
  personal_details: PersonalDetails;
  country: Country;
  state: State;
  contestant: Contestant;
  pageant: Pageant;
  is_expert_exist: boolean;
  is_contestant_exist: boolean;
  is_pageant_exist: boolean;
  sortedRolesForPublicScreen: SortedRolesForPublicScreen[];
  addedRolesListData: AddedRolesListData;
  product_count?: number;
}

interface Data {
  user: User;
}

export interface UserUpdatedDetails {
  success: boolean;
  status_code: number;
  message: string;
  data: Data;
}

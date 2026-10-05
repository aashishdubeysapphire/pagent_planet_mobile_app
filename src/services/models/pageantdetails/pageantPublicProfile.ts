import {GalleryItem} from '../gallery/galleryItem';
import {Contestant} from './contestant';
import {Awards} from './contestantPublicDetails';
import {Owner} from './owner';
import {Pageant} from './pageant';
import {AdvertisingBannerData} from './pageantDetailData';

export interface PageantPublicProfileResponse {
  pageant: Pageant;
  latitude: number;
  longitude: number;
  streetAddress1: string;
  streetAddress2: string;
  addressCountry: string;
  addressState: string;
  addressPostalCode: string;
  addressCity: string;
  events: Events;
  imageFolderPath: string;
  imageFolderUrl: string;
  noImageCrownUrl: string;
  profileImagesPath: string;
  pageantSystemThumbImageUrl: string;
  userFavourite: string;
  favouriteCount: number;
  nominateDetail: any[];
  communityPosts: CommunityPosts;
  pageantsWithActivePCA: any[];
  averageRating: number;
  ratingCount: number;
  product_total_count: number;
  pageantStaff: PageantStaff;
  pageantStaffList: PageantStaff;
  galleries: Galleries;
  productsToCompete: number;
  productsToAttend: number;
  bipAwardsArr: BipAwardsArr;
  is_message_button_disable: boolean;
  activeNominationsList: any[];
  winningNominationsList: any[];
  event: Pageant;
  awards: Awards;
  totalContestants: TotalContestants;
  judgesAndEmcess: JudgesAndEmcess;
  sponsers: Sponser[];
  sponsors: Sponser[];
  activeNominationList: any[];
  winningNominationList: any[];
  advertisingBannerData: AdvertisingBannerData;
  pageantPrizes: PageantPrize[];
  pageantResults: PageantResult[];
  is_pca_banner_display : boolean;
}
export interface Sponser {
  id: number;
  name: string;
  link: string;
  type: string;
  logoSrc: string;
  slug?: string;
}
export interface Events {
  current_page: number;
  data: Pageant[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface JudgesAndEmcess {
  current_page: number;
  data: any[];
  first_page_url: string;
  from: any;
  last_page: number;
  last_page_url: string;
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: any;
  total: number;
}
export interface TotalContestants {
  current_page: number;
  data: Contestant[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface CommunityPosts {
  current_page: number;
  data: postsData[];
  first_page_url: string;
  from: any;
  last_page: number;
  last_page_url: string;
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: any;
  total: number;
}

export interface postsData {
  id: number;
  user_id: number;
  category_id: number;
  body: string;
  image_name: string;
  video_url: any;
  status: number;
  profile_type: any;
  profile_id: any;
  business_id: any;
  event_id: number;
  created_at: string;
  published_at: string;
  updated_at: string;
  deleted_at: any;
  thread_owner_image: string;
  owner: Owner;
}

export interface Galleries {
  galleryList: GalleryItem[];
}

export interface PageantStaff {
  current_page: number;
  data: Pageant[];
  first_page_url: string;
  from: any;
  last_page: number;
  last_page_url: string;
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: any;
  total: number;
}

export interface BipAwardsArr {
  current_page: number;
  data: any[];
  first_page_url: string;
  from: any;
  last_page: number;
  last_page_url: string;
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: any;
  total: number;
}

export interface PageantPrize {
  id: number;
  message: string;
  prize_thumb_image_path: string;
}

export interface PageantResult {
  id: number;
  contestant_id: number;
  pageant_id: number;
  age_division_id: number;
  contestant_name: string;
  contestant_title: string;
  contestant_image_url: string;
  additional_title?: number;
  additional_title_value: string;
  title_awarded_text?: string;
  type: number;
}

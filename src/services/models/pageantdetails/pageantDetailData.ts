import {MasterRecordsItem} from '../masterData';
import {Pageant} from './pageant';

export interface PageantDetailData {
  pageant_details: Pageant;
  events: Pageant[];
  childPageants: ChildPageants;
  advertisingBannerData: AdvertisingBannerData;
  yearsListArr: MasterRecordsItem[];
}
export interface ChildPageants {
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

export interface AdvertisingBannerData {
  is_active_advertiser: string;
  membership_price: number;
  lead_include: number;
  position_profile_appeared: number;
  total_profile_for_this_role_type: number;
  roleName: string;
  role_slug: string;
  profile_id: number;
  rank: number;
}

import {Base} from '../base';

export interface ContestantAwardsData extends Base<ContestantAwardsResponse> {}

export interface ContestantAwardsResponse {
  contestant_awards: ContestantAwards;
}

export interface ContestantAwards {
  current_page: number;
  data: Data[];
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

export interface Data {
  id: number;
  business_id: number;
  profile_id: number;
  profile_type: string;
  image_name: string;
  image_title: string;
  status: number;
  created_at: string;
  updated_at: string;
  image_url: any;
  trophy_thumb_image_path: string;
  trophy_original_image_path: string;
}

export interface ContestantWorkWithRequest {
  business_profile_id?: string;
  gallery_id?: string;
  profile_id?: string;
  page: number;
  tagged_image: any;
  selected_profiles?: SelctedOption[];
}

export interface SelctedOption {
  title: string;
  keys: number[];
}

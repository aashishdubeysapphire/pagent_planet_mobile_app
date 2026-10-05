export interface Award {
  id?: number;
  name?: string;
  slug?: string;
  master_record_type_id?: number;
  description?: string;
  image?: string;
  status?: string;
  contestant_id?: number;
  award_id?: number;
  pageant_id?: number;
  age_division_id?: number;
  contestant_name?: string;
  contestant_image_url?: string;
  award_title?: string;
  contestant_status?: string;
  event_award?: Award;
  business_id: number;
  profile_id: number;
  profile_type: string;
  image_name: string;
  image_title: string;
  created_at: string;
  updated_at: string;
  image_url: any;
  trophy_thumb_image_path: string;
  trophy_original_image_path: string;
}

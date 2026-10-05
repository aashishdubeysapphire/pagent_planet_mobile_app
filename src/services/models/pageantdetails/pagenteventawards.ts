export interface eventPageantData {
  id: number;
  business_id: number;
  profile_id: number;
  profile_type: string;
  image_name: string;
  image_title: string;
  status: number;
  created_at: Date;
  updated_at: Date;
  image_url?: any;
  trophy_thumb_image_path: string;
  trophy_original_image_path: string;
}

interface EventAwards {
  current_page: number;
  data: eventPageantData[];
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

export interface PagentEventAwards {
  event_awards: EventAwards;
}

import {TagData} from './tagsData';
export interface Image {
  id: number;
  record_id: number;
  parent_id: any;
  event_id: number;
  type: string;
  image: string;
  title: string;
  isFeaturedImage: boolean;
  view_count: number;
  alt_tag: string;
  created_at: string;
  updated_at: string;
  image_full_url: string;
  is_featured_image: string;
  is_my_profile_tagged: boolean;
  thumb_image_full_url: string;
  tags: TagData[];
}

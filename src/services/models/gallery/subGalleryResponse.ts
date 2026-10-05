import {Image} from './image';
export interface SubGalleryResponse {
  images: Images;
  albumImages: Images;
}

export interface Images {
  current_page: number;
  data: Image[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  is_featured_image: string;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

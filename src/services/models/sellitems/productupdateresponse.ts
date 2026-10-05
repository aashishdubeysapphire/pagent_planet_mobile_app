import {LocalImage} from '../localimage';

export interface ProductUpdateResponse {
  product_id?: number;
  child_products?: ChildProduct[];
  featured_image?: LocalImage;
  variant_image?: LocalImage;
  additional_images?: LocalImage;
  ticket_image?: LocalImage;
  sample_audio?: LocalImage;
  full_audio?: LocalImage;
  digital_file?: LocalImage;
}

export interface ChildProduct {
  product_id: number;
  color_id: number;
  size_id: number;
}

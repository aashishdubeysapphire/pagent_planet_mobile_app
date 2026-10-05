import {Tag} from './tag';

export interface GalleryItem {
  id: number;
  record_id: number;
  record_image_id: number;
  image_x: number;
  image_y: number;
  user_type: string;
  album_name: string;
  image: string;
  created_at: string;
  profileImageSrc: string;
  profile_id: number;
  profile_type: string;
  altTag: string;
  pageant_id: number;
  type: string;
  view_count: string;
  event_phase_id: number;
  status: any;
  to_type: string;
  to_type_id: string;
  updated_at: string;
  sort_count: number;
  featured_image: string;
  featured_image_path: string;
  tag_name: string;
  tag_profile_type: string;
  tag_profile_id: number;
  gallery_id: number;
  original_image: string;
  record_images: RecordImage[];
  record_image: RecordImage;
  record_gallery: RecordGallery;
  pageant_title: PageantTitle;
  title: string;
  slug: string;
  main_image: string;
  business_record_image: RecordImage;
  contestantDetails: ContestantDetails;
  selectedImage: string;
  imagesCount: number;
  business_record_images_count: number;
  allTags: any[];
  allGalleries: number[];
  inactive_tag?: boolean;
  imageId: number;
  tagCount: number;
  name: string;
  imgSource: string;
  bigImgSource: string;
}

export interface ContestantDetails {
  id: number;
  owner_id: number;
  status: string;
  is_minor: string;
}

export interface RecordImage {
  id: number;
  record_id: number;
  parent_id: any;
  type: string;
  image: string;
  title: any;
  view_count: number;
  alt_tag: string;
  created_at: string;
  updated_at: string;
  tags: Tag[];
}

export interface RecordGallery {
  id: number;
  record_id: number;
  album_name: string;
  type: string;
  view_count: any;
  pageant_id: number;
  event_phase_id?: number;
  status: number;
  to_type: any;
  to_type_id: any;
  created_at: string;
  updated_at: string;
  sort_count: number;
  featured_image: string;
  featured_image_path: string;
  pageant_title: PageantTitle;
}

export interface PageantTitle {
  id: number;
  title: string;
  slug: string;
  main_image: string;
}

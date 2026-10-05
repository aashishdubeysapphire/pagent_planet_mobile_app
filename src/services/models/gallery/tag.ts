export interface Tag {
  role_id: number;
  id?: number;
  record_image_id?: number;
  imageX?: number;
  imageY?: number;
  tagName?: string;
  tagId?: number;
  owner_id?: number;
  name?: string;
  profileLink?: string;
  tag_profile_type?: string;
  tag_profile_id?: number;
  gallery_id?: number;
  pageant_id?: number;
  created_at?: string;
  updated_at?: string;
  text?: string;
  status?: string;
  localImagePath?: string;
  is_minor?: string;

  image_x: number;
  image_y: number;
  tag_name: string;
}

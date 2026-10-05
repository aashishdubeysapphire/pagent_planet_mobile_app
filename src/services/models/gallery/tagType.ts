export interface TagType {
  success: boolean;
  status_code: number;
  data: Data;
}

export interface Data {
  tag_types: Tag_type[];
}

export interface Tag_type {
  id: number;
  slug: string;
  name: string;
}

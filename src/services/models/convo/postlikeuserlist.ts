interface Owner {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string;
  image_path: string;
  slug: string;
  primary_profile_type: string;
  primary_profile_id: number;
}

interface Datum {
  id: number;
  user_id: number;
  post_id: number;
  status: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: any;
  thread_owner_image: string;
  owner: Owner;
}

interface PostUsersWholikedList {
  current_page: number;
  data: Datum[];
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

interface Data {
  postUsersWholikedList: PostUsersWholikedList;
  totalCountUsersWhoLikedThePost: number;
}

export interface PostLikeUserList {
  success: boolean;
  status_code: number;
  message: string;
  data: Data;
}

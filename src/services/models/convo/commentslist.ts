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
  user_type_id: number;
}

export interface CommentListItem {
  id: number;
  user_id: number;
  post_id: number;
  body: string;
  image_name?: any;
  video_url?: any;
  status: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: any;
  comment_total_replies?: any;
  thread_owner_image: string;
  main_comment_owner_image: string;
  commenterUserProfileUrl: string;
  comment_output_time_to_show: string;
  owner: Owner;
}

interface CommentList {
  current_page: number;
  data: any[];
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
  loggedInUserData: any[];
  commentList: CommentList;
}

export interface CommentsListData {
  success: boolean;
  status_code: number;
  message: string;
  data: Data;
}

export interface NotificationData {
  current_page: number;
  data: Notification[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface Notification {
  id: number;
  user_id: number;
  profile_name: string;
  notification_type: string;
  title: string;
  record_type: string;
  record_id: number;
  recipient_profile_type: any;
  recipient_id: number;
  is_read: string;
  sender_profile_type: string;
  image: string;
  created_at: string;
  post_output_time_to_show: string;
  published_at: string;
}

export interface NotificationCartFavMessageCount {
  cart_count: number;
  wishlist_count: number;
  unread_notifications_count: number;
  unread_messages_count: number;
}

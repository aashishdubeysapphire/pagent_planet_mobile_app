import {Base} from './base';

export interface MessagesData extends Base<MessagesResponse> {}

export interface MessagesResponse {
  messageList: MessageList;
  msg_type: string;
}

export interface MessageList {
  current_page: number;
  data: MessageContent[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface MessageContent {
  message_to_myself(message_to_myself: any): unknown;
  id: number;
  parent_id: number;
  sender_id: number;
  receiver_id: number;
  record_id: number;
  profile_name: string;
  profile_type: string;
  type: string;
  attach_file_name: any;
  original_name: any;
  message: string;
  sender_delete_flag: number;
  receiver_delete_flag: number;
  msg_type_status: number;
  msg_unique_key: any;
  msg_from_type: string;
  admin_msg_read_by: any;
  admin_msg_delete_by: any;
  disable_msg_feature_ids: any;
  sent_all_msg_delete_by: any;
  coach_profile_url: any;
  email_sent_status: string;
  membership_type: any;
  admin_mark_read_unread: string;
  created_by: any;
  profile_image_url: any;
  message_shared_status: string;
  message_create_at: string;
  sender_name: SenderName;
  receiver_name: ReceiverName;
  msgHide : boolean;
  msg_type_read_status : string;
  not_application_name : string;
  not_application_image_url : string;
}

export interface SenderName {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  profile_image: string;
}

export interface ReceiverName {
  id: number;
  first_name: string;
  last_name: string;
  receiver_full_name: string;
  profile_image: string;
}

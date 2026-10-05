export interface ContestantSubmissionResponse {
  todosListData: TodosList[];
}

export interface TodosList {
  id: number;
  name: any;
  created_by_id: number;
  todo_type: number;
  category_id: number;
  profile_id: number;
  event_type: number;
  date_type: number;
  days_away_from_date_type: number;
  is_married: any;
  have_kids: any;
  gender: any;
  has_membership: number;
  due_days_before_event: any;
  description: string;
  file_folder_name: any;
  additional_info: any;
  link: any;
  title_for_link: any;
  due_date: string;
  status: number;
  age_from: number;
  age_to: number;
  selected_location: number;
  location_address: any;
  wardrobe_text: any;
  created_at: string;
  updated_at: string;
  total_contestants: number;
  pending_contestants: number;
  todo_category: TodoCategory;
}

export interface TodoCategory {
  id: number;
  name: string;
}

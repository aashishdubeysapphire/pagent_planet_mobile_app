interface TimeZoneData {
  id: number;
  abbr: string;
  utc: string;
  text: string;
}

interface Event {
  id: number;
  end_date: string;
  event_timezone_id: number;
  time_zone_data: TimeZoneData;
}

interface AgeDivisionsData {
  id: number;
  name: string;
}

interface TodoStatus {
  todo_status: string;
  todo_status_cls: string;
}

interface TodoCategory {
  id: number;
  name: string;
  slug: string;
  status: number;
  created_at: Date;
  updated_at?: any;
}

interface Todo {
  id: number;
  name?: any;
  created_by_id: number;
  todo_type: number;
  category_id: number;
  profile_id: number;
  event_type: number;
  date_type: number;
  days_away_from_date_type: number;
  is_married?: any;
  have_kids?: any;
  gender?: any;
  has_membership: number;
  due_days_before_event?: any;
  description: string;
  file_folder_name?: any;
  additional_info?: any;
  link: string;
  title_for_link?: any;
  due_date: string;
  status: number;
  age_from: number;
  age_to: number;
  selected_location: number;
  location_address?: any;
  wardrobe_text?: any;
  created_at: Date;
  updated_at: Date;
  ageDivisionsData: AgeDivisionsData[];
  contestantsData: any[];
  groupsData: any[];
  due_date_formatted: string;
  todo_status: TodoStatus;
  todo_category: TodoCategory;
}

export interface todoGetData {
  event: Event;
  todo: Todo;
}

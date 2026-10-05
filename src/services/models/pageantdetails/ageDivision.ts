export interface AgeDivision {
  id?: number;
  name?: string;
  label?: string;
  slug?: string;
  age_from?: number;
  age_to?: number;
  created_by_user_id?: number;
  updated_by_user_id?: number;
  status?: number;
  unread_count?: number;
  notification_setting?: number;
  profile_type?: string;
  profile_id?: number;
  public_url?: string;
  age_divisions?: AgeDivision[];
}

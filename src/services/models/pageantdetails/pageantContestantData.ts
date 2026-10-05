import {Contestant} from './contestant';

export interface PageantContestantData {
  pageantContestants: PageantContestants;
}
export interface PageantContestants {
  current_page: number;
  data: Contestant[];
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

  eventContestants: Contestant[];
  is_show_vote: boolean;
  current_hide_votes_scheduler_date_time: any;
  current_pca_end_date_time: string;
  current_pca_start_date_time: string;
  current_pca_end_date_time_difference: number;
  current_hide_votes_scheduler_date_time_difference: number;
  half_price_start_date_time_difference: number;
  is_pca_activated: string;
  is_timer: boolean;
  is_pageant_completed: string;
}

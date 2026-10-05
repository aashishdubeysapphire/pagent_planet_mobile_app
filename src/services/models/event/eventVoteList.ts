import {Contestant} from '../../models/pageantdetails/contestant';
import {Base} from '../base';

export interface EVENT_VOTE_LIST extends Base<EventVoteData> {}

export interface EventVoteData {
  discounted_totals: DiscountedTotals;
  without_discounted_totals: DiscountedTotals;
  total_votes_amount: number;
  total_votes_count: number;
  filter_age_division_id: number;
  awardWinner: string;
  event: Event;
  voteList: VoteList;
}

export interface DiscountedTotals {
  total_votes_amount: number;
  total_votes_count: number;
}

export interface Event {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  pca_start_date_time: string;
  pca_end_date_time: string;
  one_winner_only: number;
  status: string;
  is_pca_activated: string;
  is_pageant_completed: string;
  per_vote_price: number;
}

export interface VoteList {
  current_page: number;
  data: DATA[];
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

export interface DATA {
  id: number;
  pageant_id: number;
  user_id: number;
  contestant_id: number;
  age_division_id: number;
  per_vote_price: number;
  Last_total_votes: number;
  Last_total_price: number;
  Last_payment_detail_id: number;
  created_at: string;
  updated_at: string;
  votes: number;
  total_pageant_votes: number;
  contestantProfile: Contestant;
}

import {MasterRecordsItem} from '../masterData';
import {Contestant} from './contestant';
import {Pageant} from './pageant';

export interface VoteContestant {
  msgArray: MsgArray;
  votePickCount: number;
  pageantContestant: Contestant;
  event: Pageant;
  is_show_vote: boolean;
  currencySign: string;
  is_discounted_price: boolean;
  current_contestant_votes: number;
  higest_contestant_votes: number;
  second_higest_contestant_votes: number;
  third_higest_contestant_votes: number;
  highest_votes_second_contestant: number;
  is_second_highest_tie: number;
  is_third_highest_tie: number;
  voteCountListArr: MasterRecordsItem[];
  current_pca_end_date_time: string;
  current_hide_votes_scheduler_date_time: string;
  half_price_start_date_time: string;
  current_pca_end_date_time_difference: number;
  current_hide_votes_scheduler_date_time_difference: number;
  half_price_start_date_time_difference: number;
  share_link: string;
  have_billing_address : number;
  have_shipping_address: number;
}

export interface MsgArray {
  status: string;
  msg: string;
  votedifference: number;
  array_with_highest_3_current: ArrayWithHighest3Current;
  votingDetailArray: VotingDetailArray[];
  is_second_highest_tie: number;
  is_third_highest_tie: number;
}

export interface ArrayWithHighest3Current {
  current_contestant_earned_vote: number;
  highest_vote: number;
  second_higest_vote: number;
  third_higest_vote: number;
}

export interface VotingDetailArray {
  id: number;
  pageant_id: number;
  contestant_id: number;
  age_division_id: number;
  earned_total_vote: number;
}

export interface VoteCountListArr {
  value: number;
  selected: boolean;
  text: number;
}

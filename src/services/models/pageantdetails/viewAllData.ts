import {Award} from '../../models/pageantdetails/award';
import {Contestant} from '../../models/pageantdetails/contestant';
import {Pageant} from '../../models/pageantdetails/pageant';
import {Base} from '../base';
export interface ViewAllData extends Base<ViewAllResponse> {}

export interface ViewAllResponse {
  data: Result[];
}

export interface Result {
  id: number;
  pageant_id: number;
  age_division_id: number;
  award_id?: number;
  contestant_id: number;
  pageant_contestant_id: number;
  pageant: Pageant;
  award?: Award;
  winner_id: any;
  first_runner_up_id: any;
  second_runner_up_id: any;
  type?: number;
  additional_title?: number;
  title_awarded_text?: string;
  contestant_profile?: Contestant;
}

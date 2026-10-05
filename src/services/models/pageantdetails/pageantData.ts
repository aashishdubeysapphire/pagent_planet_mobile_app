import {Contestant} from '../../models/pageantdetails/contestant';
import {Pageant} from '../../models/pageantdetails/pageant';

export interface PageantData {
  id: number;
  pageant_id: number;
  age_division_id: number;
  contestant_id: number;
  contestant_name: string;
  weight_id: number;
  contestant_title?: string;
  contestant_image: string;
  won: string;
  award: any;
  got_title: any;
  pageant: Pageant;
  winner_id: any;
  first_runner_up_id: any;
  second_runner_up_id: any;
  type: number;
  additional_title: number;
  title_awarded_text: any;
  pageant_contestant_id: number;
  contestant_profile: Contestant;
  award_id: number;
}

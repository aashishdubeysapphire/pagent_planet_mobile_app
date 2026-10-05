import {Award} from '../pageantdetails/award';
import {Contestant} from '../pageantdetails/contestant';

export interface AddEventResultRequest {
  event_id: number;
  age_division_id?: number;
  pageant_awards?: Award[];
  winners?: Contestant[];
  firstRunnerUps?: Contestant[];
  secondRunnerUps?: Contestant[];
  thirdRunnerUps?: Contestant[];
  fourthRunnerUps?: Contestant[];
}

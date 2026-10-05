import {Award} from '../pageantdetails/award';
import {Contestant} from '../pageantdetails/contestant';

export interface AddEventRequest {
  index?: number;
  oldId?: number;
  winner?: string;
  contestant?: Contestant;
  award?: Award;
  description?: string;
  descriptionId?: number;
  descriptionTitleAwardValue?: string;
  error?: string;
  descriptionTitleAwardValueError?: boolean;
  contestantDuplicateError?: boolean;
  contestantEmptyError?: boolean;
}

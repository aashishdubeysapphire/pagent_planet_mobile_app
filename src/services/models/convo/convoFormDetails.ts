import {ConvoListItem} from './convoListing';

export interface getConvoDetails {
  success: boolean;
  status_code: number;
  message: string;
  data: ConvoListItem;
}

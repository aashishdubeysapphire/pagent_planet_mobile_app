import {AssociateBusiness} from './associateBusiness';

export interface AssociateBusinessResponse {
  current_page: number;
  data: AssociateBusiness[];
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

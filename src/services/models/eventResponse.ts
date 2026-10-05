import {AgeDivision} from '../models/pageantdetails/ageDivision';
import {Pageant} from '../models/pageantdetails/pageant';
import { Events } from './pageantdetails/pageantPublicProfile';
export interface EventResponse {
  events: Events;
}
export interface Event {
  id: number;
  pageant_id: number;
  age_division_id: number;
  contestant_id: number;
  contestant_image: string;
  got_title?: string;
  weight?: Weight;
  weight_id?: number;
  contestant_title?: string;
  type_from: string;
  pageant: Pageant;
  age_division: AgeDivision;
}

export interface Weight {
  id: number;
  name: any;
  slug: any;
  master_record_type_id: number;
  description?: string;
  image: any;
  status: string;
}

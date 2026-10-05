import {Pageant} from '../../../services/models/pageantdetails/pageant';

export interface PageantListResponse {
  pageants: Pageants;
}

export interface Pageants {
  upcomingPageantsArr: Pageant[];
  activePageantsArr: Pageant[];
  inactivePageantsArr: Pageant[];
}

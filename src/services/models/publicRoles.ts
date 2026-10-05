import {CountryState} from './country/CountryState';
import {AgeDivision} from './pageantdetails/ageDivision';

export interface Roles {
  profileTabsArr: AgeDivision[];
  public_url: string;
  userLocationsData: UserLocationsData;
}
export interface UserLocationsData {
  country: CountryState;
  state: CountryState;
}

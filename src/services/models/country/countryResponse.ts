import {CountryState} from './CountryState';

export interface CountryResponse {
  countries: CountryState[];
  states: CountryState[];
}

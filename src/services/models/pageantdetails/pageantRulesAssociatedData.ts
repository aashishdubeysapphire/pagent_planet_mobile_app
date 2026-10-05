import {Base} from '../base';
import { CountryState } from '../country/CountryState';
import {AgeDivision} from './ageDivision';
import {Pageant, PageantPhaseOfCompetition} from './pageant';

export interface PageantRulesAssociatedData extends Base<Data> {}

export interface Data {
  pageantRulesAssociatedData: PageantRulesAssociatedDataItems;
}

export interface PageantRulesAssociatedDataItems {
  ageDivisionsData: AgeDivision[];
  pageantCountriesData: CountryState[];
  pageantStatesData: any[];
  pageantPhaseOfCompetitionsData: PageantPhaseOfCompetition[];
  pageantData: Pageant;
}


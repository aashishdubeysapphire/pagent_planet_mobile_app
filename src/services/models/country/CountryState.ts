export interface CountryState {
  id: number;
  sort_name: string;
  name: string;
  phone_code: number;
  status: number;
  slug: string;
  country_id: number;
  pageant_id: number;
  state_id: number;
  isSelected: boolean;
  country: CountryState;
  state: CountryState;
}

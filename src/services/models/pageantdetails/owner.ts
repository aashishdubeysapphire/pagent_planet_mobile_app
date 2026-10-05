import {CountryState} from '../country/CountryState';

export interface Owner {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_image: string;
  primary_profile_type: string;
  primary_profile_id: number;
  image_path: string;
  slug: any;
  gender: string;
  user_name: string;
  product_cron_email_last_date: any;
  infusionsoft_contact_id: number;
  bio: string;
  address: string;
  state: CountryState;
  country: CountryState;
  user_type_id: number;
}

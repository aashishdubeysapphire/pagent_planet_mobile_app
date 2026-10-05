import {Base} from './base';

export interface MasterData extends Base<Master> {}

export interface Master {
  master_records: MasterRecords;
  countries: MasterRecordsItem[];
  colors: MasterRecordsItem[];
}

export interface MasterRecords {
  years: MasterRecordsItem[];
  phases_of_competition: MasterRecordsItem[];
  hair_color: MasterRecordsItem[];
  height: MasterRecordsItem[];
  eye_color: MasterRecordsItem[];
  weight: MasterRecordsItem[];
  zodiac: MasterRecordsItem[];
  award: MasterRecordsItem[];
}

export interface MasterRecordsItem {
  id: number;
  name: number;
  slug: number;
  place: number;
  master_record_type_id: number;
  description: any;
  image: string;
  status: string;
  sort_name: string;
  phone_code: number;
  isSelected: boolean;
  hex_code: string;
}

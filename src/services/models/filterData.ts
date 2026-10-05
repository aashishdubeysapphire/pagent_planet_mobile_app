import {Base} from './base';

export interface FilterData extends Base<DataFilter> {}

export interface DataFilter {
  businessTypes: DirectoryFilter[];
  contestantsWorkedAlbumsFilters: Filter[];
  pageantAlbumsFilters: Filter[];
  data: Filter[];
}

export interface DirectoryFilter {
  is_locked: boolean;
  id: number;
  display_name: string;
  name: string;
  description?: string;
  filters: Filter[];
}

export interface Filter {
  title: string;
  searchTitle?: string;
  type?: number;
  min?: number;
  max?: number;
  currentMaxToDateActive: boolean;
  disable?: boolean;
  selectedIndex?: number;
  query?: string[];
  slug?: string[];
  isAllSelected?: boolean;
  isOneOptionActive?: boolean;
  tempQuery?: string[];
  options?: Option[];
}

export interface Option {
  name: string;
  id: number;
  value: string;
  isSelcted: boolean;
  tag_profile_id: number;
}

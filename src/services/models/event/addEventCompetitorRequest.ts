export interface AddEventCompetitorRequest {
  pageant_id: number;
  id?: number;
  contestant_id?: number;
  age_division_id: number;
  contestant_title: string;
  contestant_image?: string;
  first_name?: string;
  last_name?: string;
}

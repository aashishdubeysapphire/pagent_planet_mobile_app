interface Data {
  id: number;
  record_id?: any;
  record_type?: any;
  rating_to: number;
  rating_to_type: string;
  rating_from: number;
  rating_from_type: string;
  rating_to_user_id: number;
  rating_from_user_id: number;
  event_org?: any;
  session_rating?: any;
  professionalism: number;
  production_quality?: any;
  overall_exp: number;
  knowledgeable: number;
  cost: number;
  average_rating: number;
  title?: any;
  review: string;
  is_edited: number;
}

export interface GetReviewDetails {
  success: boolean;
  status_code: number;
  message: string;
  data: Data;
}

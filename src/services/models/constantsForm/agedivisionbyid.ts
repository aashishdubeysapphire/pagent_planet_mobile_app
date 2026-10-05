import {AgeDivision} from '../pageantdetails/ageDivision';

export interface AgeDivisionById {
  success: boolean;
  status_code: number;
  message: string;
  data: AgeDivision[];
}

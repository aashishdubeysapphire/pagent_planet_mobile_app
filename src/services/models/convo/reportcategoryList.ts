export interface categoryData {
  id: number;
  name: string;
}

export interface reportCategory {
  success: boolean;
  status_code: number;
  message: string;
  data: categoryData[];
}

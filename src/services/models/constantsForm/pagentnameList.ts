interface Pageant {
  id: number;
  title: string;
  country: string;
  state: string;
}

interface Data {
  pageants: Pageant[];
}

export interface PagentNameList {
  success: boolean;
  status_code: number;
  message: string;
  data: Data;
}

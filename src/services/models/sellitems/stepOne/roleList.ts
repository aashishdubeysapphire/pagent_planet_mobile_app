 interface Role {
  id: number;
  name: string;
  profiles: any;
}

 interface Data {
  roles: Role[];
}

export interface RoleList {
  success: boolean;
  status_code: number;
  data: Data;
}

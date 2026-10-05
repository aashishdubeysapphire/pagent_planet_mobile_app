import {User} from './user/user';

export interface Data {
  token_type: string;
  token: string;
  expires_at: number;
  access_token: string;
  user_id: string;
  user: User;
}

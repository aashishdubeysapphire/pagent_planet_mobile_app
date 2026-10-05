import {Base} from './base';
import {Data} from './data';

export interface Auth extends Base<Data> {}

export const InitialAuth: Auth = {
  message: '',
  data: null,
  success: false,
  status_code: 0,
};

export interface versionData {
  android_version: string;
  ios_version: string;
  forceUpdate: number;
  message: string;
}

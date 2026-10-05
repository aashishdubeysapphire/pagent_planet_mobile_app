import {PermissionsAndroid, Platform} from 'react-native';
import {toast, toastType} from '../common/commonalert';
import { isIosDevice } from './helperFunction';
import translations from '../../assets/translations';

export const androidCameraPermission = () =>
  new Promise(async (resolve, reject) => {

    try {
      if (!isIosDevice() && Platform.Version >= 33) {
        return resolve(true);
      } else if (!isIosDevice() && Platform.Version > 22) {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);

        if (
          granted['android.permission.CAMERA'] !== 'granted' ||
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== 'granted' ||
          granted['android.permission.READ_EXTERNAL_STORAGE'] !== 'granted'
        ) {
          toast(translations.STORAGE_PERMISSION_NOT_GRANTED, toastType.ERROR_TOAST);
          return reject(false);
        }
        return resolve(true);
      }

      return resolve(true);
    } catch (error) {
      return reject(false);
    }
  });


export const checkDownloadPermission = async () => {
  if (isIosDevice()) {
    return true;
  } else if (!isIosDevice() && Platform.Version >= 33) {
    return true;
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        toast(translations.STORAGE_PERMISSION_NOT_GRANTED, toastType.ERROR_TOAST);
        return false;
      }
    } catch (err) {
      toast(err, toastType.ERROR_TOAST);
      return false;
    }
  }
};

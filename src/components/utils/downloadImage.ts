import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Platform} from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import translations from '../../assets/translations';
import {ImageExtensionTypes, MethodTypes} from '../../services/constants';
import {toast, toastType} from '../common/commonalert';
import {isURL} from './validations';
import { isIosDevice } from './helperFunction';
export const downloadImage = (image_path: string) => {
  if (isURL(image_path)) {
    const date = new Date();
    const image_URL = image_path;
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];

    const {config, fs} = RNFetchBlob;
    const DownloadDir =
      isIosDevice()
        ? ext === ImageExtensionTypes.JPEG ||
          ext === ImageExtensionTypes.JPG ||
          ext === ImageExtensionTypes.PNG
          ? fs.dirs.PictureDir
          : fs.dirs.DocumentDir
        : fs.dirs.PictureDir;

    const configfb = {
      fileCache: true,
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      addAndroidDownloads: {
        //     // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          DownloadDir +
          '/' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
      path:
        DownloadDir +
        '/' +
        Math.floor(date.getTime() + date.getSeconds() / 2) +
        ext,
    };
    const configOptions = Platform.select({
      ios: {
        fileCache: configfb.fileCache,
        path: configfb.path,
      },
      android: configfb,
    });
    config(configOptions)
      .fetch(MethodTypes.GET, image_URL)
      .then(res => {
        if (isIosDevice()) {
          if (
            ext === ImageExtensionTypes.JPEG ||
            ext === ImageExtensionTypes.JPG ||
            ext === ImageExtensionTypes.PNG
          ) {
            CameraRoll.save(image_URL, 'photo')
              .then(() => {
                toast(
                  translations.IMAGE_DOWNLOADED_SUCCESSFULLY,
                  toastType.SUCESS_TOAST,
                );
              })
              .catch(error => {
                toast(error.message, toastType.ERROR_TOAST);
              });

            toast(
              translations.IMAGE_DOWNLOADED_SUCCESSFULLY,
              toastType.SUCESS_TOAST,
            );
          } else {
            // FOR PDF other ascii ecode is done
            // RNFetchBlob.fs.writeFile(configfb.path, res.data, 'ascii');
            // RNFetchBlob.ios.previewDocument(configfb.path);
            toast(
              translations.FILE_DOWNLOADED_SUCCESSFULLY,
              toastType.SUCESS_TOAST,
            );
          }
        } else {
          if (
            ext === ImageExtensionTypes.JPEG ||
            ext === ImageExtensionTypes.JPG ||
            ext === ImageExtensionTypes.PNG
          ) {
            toast(
              translations.IMAGE_DOWNLOADED_SUCCESSFULLY,
              toastType.SUCESS_TOAST,
            );
          } else {
            toast(
              translations.FILE_DOWNLOADED_SUCCESSFULLY,
              toastType.SUCESS_TOAST,
            );
          }
        }
      });
  } else {
    toast(
      translations.OOPS_SOMETHING_WENT_WRONG_TRY_LETER,
      toastType.ERROR_TOAST,
    );
  }
};

const getExtention = (filename: string) => {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
};

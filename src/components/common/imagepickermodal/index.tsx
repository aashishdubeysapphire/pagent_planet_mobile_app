import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Linking,
  GestureResponderEvent,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
  ImagePickerResponse,
  Asset,
} from 'react-native-image-picker';
import BottomModal from '../bottommodal';
import translations from '../../../assets/translations';
import AppImages from '../../../assets/images/AppImages';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';
import {androidCameraPermission} from '../../utils/permissions';
import {pick} from '@react-native-documents/picker';
import {ASPECT_RATIO, IMAGE_TYPE} from '../../utils/enum';
import WarningModel from '../../common/warningmodel';
import {LocalImage} from '../../../services/models/localimage';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {checkIsNull} from '../../utils/validations';
import {toast, toastType} from '../commonalert';
import {isIosDevice} from '../../utils/helperFunction';
import useStyle from './styles';

interface Props {
  onDeletePress?: (event: GestureResponderEvent) => void;
  isRemoveButtonRequire?: boolean;
  removeCameraOption?: boolean;
  isModalVisible: boolean;
  setModalVisible?: any;
  onImageFound?: (event: LocalImage) => void;
  enableMultipleImage?: boolean;
  documentUpload?: boolean;
  cropperCircleOverlay?: boolean;
  hideModelEarly?: boolean;
  uncheckCheckBox?: () => void;
  onMultiplsImageSelection?: (event: Asset[]) => void;
  id?: number;
  note?: string;
  note2?: string;
  cropping?: boolean;
  showNote?: boolean;
  addLinkOption?: boolean;
  onLinkButtonClicked?: (event: GestureResponderEvent) => void;
  customWidth: string;
  customHeight: string;
}

const ImagePickerModal = ({
  onDeletePress,
  isModalVisible,
  isRemoveButtonRequire,
  setModalVisible,
  onImageFound,
  documentUpload,
  cropping = true,
  showNote = true,
  hideModelEarly,
  removeCameraOption = false,
  enableMultipleImage = false,
  onMultiplsImageSelection,
  uncheckCheckBox = () => {},
  id = -1,
  cropperCircleOverlay = id === IMAGE_TYPE.BANNER_IMAGE ? false : true,
  note = translations.FOR_BETTER_SIZE,
  note2 = '',
  addLinkOption,
  onLinkButtonClicked,
  customWidth,
  customHeight,
}: Props) => {
  const styles = useStyle();
  const [isPermission, setPermission] = useState(false);
  const [isPermissionAllowed, setPermissionAllowed] = useState(false);

  const closeModal = () => {
    setPermission(false);
    setPermissionAllowed(false);
    setModalVisible(false);
    if (documentUpload && uncheckCheckBox) {
      uncheckCheckBox();
    }
  };

  const getImageCroppingOptions = () => {
    const width = checkIsNull(customWidth) ? parseInt(customWidth) : 600;
    const height =
      customHeight === ASPECT_RATIO.NOT_REQUIRED
        ? undefined
        : checkIsNull(customHeight)
        ? parseInt(customHeight)
        : id === IMAGE_TYPE.BANNER_IMAGE
        ? 300
        : 600;

    return {width, height};
  };

  const handleImageResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      return;
    }

    if (response.errorCode) {
      if (
        response.errorCode === 'camera_unavailable' ||
        response.errorCode === 'permission' ||
        response.errorCode === 'others'
      ) {
        setPermissionAllowed(true);
      }
      // toast(translations.OOPS_SOMETHING_WENT_WRONG_TRY_LETER, toastType.ERROR_TOAST);
      return;
    }

    if (!response.assets || response.assets.length === 0) {
      return;
    }

    if (enableMultipleImage && onMultiplsImageSelection) {
      onMultiplsImageSelection(response.assets);
      if (hideModelEarly) closeModal();
      return;
    }

    const asset = response.assets[0];

    const localImage: LocalImage = {
      name: asset.fileName || `image-${Date.now()}.jpg`,
      uri: asset.uri || '',
      type: asset.type || 'image/jpeg',
      id,
      size: asset.fileSize ? asset.fileSize / (1024 * 1024) : 0,
    };

    if (onImageFound) {
      onImageFound(localImage);
    }

    if (hideModelEarly) {
      closeModal();
    }
  };

  const openPicker = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      selectionLimit: enableMultipleImage ? 5 : 1,
      quality: 1,
    };

    launchImageLibrary(options, handleImageResponse);
  };

  const takePhoto = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      quality: 1,
    };

    launchCamera(options, handleImageResponse);
  };

  const uploadDocument = async () => {
    try {
      if (!isIosDevice()) {
        const permission = await check(
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
        if (permission !== RESULTS.GRANTED) {
          const result = await request(
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          );
          if (result !== RESULTS.GRANTED) {
            toast(
              translations.PLEASE_ALLOW_STORAGE_ACCESS,
              toastType.ERROR_TOAST,
            );
            return;
          }
        }
      }

      const [result] = await pick({
        type: ['public.item'],
      });

      if (!result || result.length === 0) return;

      const file = result[0];
      const localImage: LocalImage = {
        name: file.name || 'document',
        uri: isIosDevice() ? file.uri.replace('file://', '') : file.uri,
        type: file.type || 'application/octet-stream',
        id,
        size: file.size ? file.size / (1024 * 1024) : 0,
      };

      onImageFound?.(localImage);
      closeModal();
    } catch (err: any) {
      if (err.message) {
        toast(err.message, toastType.ERROR_TOAST);
      }
    }
  };

  useEffect(() => {
    if (isModalVisible) {
      androidCameraPermission()
        .then(() => setPermission(true))
        .catch(() => setPermissionAllowed(true));
    } else {
      closeModal();
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (!isPermissionAllowed) {
      setModalVisible(false);
    }
  }, [isPermissionAllowed]);

  useEffect(() => {
    if (!isPermission) {
      setModalVisible(false);
    }
  }, [isPermission]);

  return (
    <View>
      <BottomModal
        isModalVisible={isPermission}
        setIsModalVisible={setPermission}
        customStyles={{
          height: 'auto',
          paddingHorizontal: moderateScaleVertical(16),
        }}>
        <View style={styles.headingView}>
          <Text style={styles.modalHeading}>
            {documentUpload || addLinkOption
              ? translations.CHOOSE_FILE
              : translations.CHOOSE_IMAGE}
          </Text>
          <TouchableOpacity style={styles.crossIcon} onPress={closeModal}>
            <AppImages.ProfileImage.Tpp_cross_icon />
          </TouchableOpacity>
        </View>

        <View style={styles.ImagesView}>
          <TouchableOpacity style={styles.circleImage} onPress={openPicker}>
            <AppImages.ProfileImage.Tpp_choose_gallery_icon
              width={moderateScale(60)}
              height={moderateScale(60)}
            />
            <Text style={styles.underImageText}>{translations.GALLERY}</Text>
          </TouchableOpacity>

          {!removeCameraOption && (
            <TouchableOpacity style={styles.circleImage} onPress={takePhoto}>
              <AppImages.ProfileImage.Tpp_camera_icon
                width={moderateScale(60)}
                height={moderateScale(60)}
              />
              <Text style={styles.underImageText}>{translations.CAMERA}</Text>
            </TouchableOpacity>
          )}

          {documentUpload && (
            <TouchableOpacity
              style={styles.circleImage}
              onPress={uploadDocument}>
              <AppImages.Common.DocIcon
                width={moderateScale(60)}
                height={moderateScale(60)}
              />
              <Text style={styles.underImageText}>{translations.DOCUMENT}</Text>
            </TouchableOpacity>
          )}

          {addLinkOption && onLinkButtonClicked && (
            <TouchableOpacity
              style={styles.circleImage}
              onPress={onLinkButtonClicked}>
              <AppImages.Common.LinkIcon
                width={moderateScale(60)}
                height={moderateScale(60)}
              />
              <Text style={styles.underImageText}>{translations.LINK}</Text>
            </TouchableOpacity>
          )}

          {isRemoveButtonRequire && onDeletePress && (
            <TouchableOpacity
              style={styles.circleImage}
              onPress={onDeletePress}>
              <AppImages.ProfileImage.Tpp_remove_image_icon
                width={moderateScale(60)}
                height={moderateScale(60)}
              />
              <Text style={styles.underImageText}>{translations.REMOVE}</Text>
            </TouchableOpacity>
          )}
        </View>

        {showNote && (
          <Text
            style={{
              ...styles.modalNote,
              marginBottom: note2 ? 0 : moderateScaleVertical(20),
            }}>
            {translations.NOTE}
            <Text style={styles.modalNoteMsg}>{note}</Text>
          </Text>
        )}

        {note2 && (
          <Text
            style={{...styles.modalNote, marginTop: moderateScaleVertical(6)}}>
            {translations.NOTE}
            <Text style={styles.modalNoteMsg}>{note2}</Text>
          </Text>
        )}
      </BottomModal>

      <WarningModel
        msg={translations.CAMERA_STORAGE_PERMISSION}
        isModalVisible={isPermissionAllowed}
        yesButtonText={translations.GO_TO_APP_SYSTEM_PAGE}
        setConfirm={() => Linking.openSettings()}
        setIsModalVisible={setPermissionAllowed}
        showCancle={false}
        headingStyle={styles.modalLabel}
      />
    </View>
  );
};

export default ImagePickerModal;

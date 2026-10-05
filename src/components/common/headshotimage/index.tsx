import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import translations from '../../../assets/translations';
import AppImages from '../../../assets/images/AppImages';
import images from '../../../assets/images/AppImages';
import {styles} from './styles';
import ImagePickerModal from '../../common/imagepickermodal';
import {moderateScaleVertical} from '../../utils/responsiveSize';
import FastImageView from '../../../components/common/fastimageview';
import {color} from '../../../assets/colorConstant';
import WarningModel from '../warningmodel';
import {IMAGE_TYPE} from '../../utils/enum';
import {LocalImage} from '../../../services/models/localimage';

interface Props {
  onImageFound: (data: LocalImage | undefined) => void;
  url?: string | undefined;
  note?: string;
  label?: string;
  displayHeadUrl?: boolean;
  showNote?: boolean;
  isMandatory?: boolean;
  errorMsg?: string;
  heading?: string;
  id?: number;
  removeCameraOption?: boolean;
  isClickDisable?: boolean;
  msg?: String;
  isDisplayingEditIcon?: boolean;
  showLink: boolean;
  onLinkButtonPressed?: (event: GestureResponderEvent) => void;
  onCustomClick?: () => void;
  note2: string;
  circularCrop: boolean;
  disableClick: boolean;
  height: string;
  width: string;
  isCropping: boolean;
  isRemoveBottomSpace?: boolean;
}

/* A function component. */
const HeadShotImage = ({
  onImageFound,
  url = '',
  displayHeadUrl,
  showNote = true,
  removeCameraOption,
  label = translations.UPLOADE_HEADSHOT_IMAGE_FOR_EVENT,
  isMandatory = false,
  heading = translations.HEADSHOT_IMAGES,
  note = translations.FOR_BETTER_SIZE,
  errorMsg = '',
  id = -1,
  isClickDisable = true,
  msg = '',
  isDisplayingEditIcon = false,
  showLink,
  onLinkButtonPressed,
  note2 = '',
  circularCrop,
  disableClick,
  height,
  width,
  onCustomClick,
  isCropping,
  isRemoveBottomSpace = false,
}: Props) => {
  /* A state variable. */
  const [isHeadShotAvaialble, setHeadShotAvaialble] = useState(displayHeadUrl);
  /* A state variable. */
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [headShotLocalImage, setHeadShotLocalImage] = useState(url);
  const [isWarningMoadlVisible, setIsWarningMoadlVisible] = useState(false);

  /**
   * If the isClickDisable variable is true, then set the isModalVisible variable to the opposite of
   * what it currently is
   */
  const onAddImageClick = () => {
    if (onCustomClick !== undefined) {
      onCustomClick();
    } else if (isClickDisable) {
      setIsModalVisible(!isModalVisible);
    }
  };

  /* A react hook that is called when the component is mounted. */
  useEffect(() => {
    setHeadShotAvaialble(displayHeadUrl);
  }, [displayHeadUrl]);

  /**
   * A callback function that is called when the user selects an image from the image picker.
   * @param {LocalImage} data - LocalImage - this is the data that is returned from the image picker.
   */
  const imagePickerResult = (data: LocalImage) => {
    onImageFound(data);
    setHeadShotAvaialble(true);
    setHeadShotLocalImage(data.uri);
  };

  /**
   * It deletes the image from the state and the form data.
   */
  const onDeleteImageClick = () => {
    setHeadShotAvaialble(false);
    setHeadShotLocalImage('');
    onImageFound(undefined);
  };

  return (
    <View
      style={
        isRemoveBottomSpace ? styles.mainContinerBottom : styles.mainContiner
      }>
      {isHeadShotAvaialble ? (
        <View style={styles.headShotContainer}>
          <Text style={styles.headShotImageTitleText}>
            {heading}
            {isMandatory && (
              <Text style={{...styles.headShotImageText, color: color.RED}}>
                {'*'}
              </Text>
            )}
          </Text>

          <View style={styles.headShotImageContainer}>
            <FastImageView
              width={moderateScaleVertical(94)}
              height={moderateScaleVertical(94)}
              borderRadius={moderateScaleVertical(15)}
              imageUrl={headShotLocalImage}
            />

            {isDisplayingEditIcon ? (
              <TouchableOpacity
                style={styles.headShotDeleteContainer}
                onPress={() => setIsModalVisible(true)}>
                <AppImages.Common.EditReplaceSmall_ICON />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.headShotDeleteContainer}
                onPress={() =>
                  disableClick
                    ? {}
                    : isMandatory || id === IMAGE_TYPE.BANNER_IMAGE || msg
                    ? setIsWarningMoadlVisible(true)
                    : onDeleteImageClick()
                }>
                <AppImages.Common.DeleteImageIcon />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <View>
          <TouchableOpacity
            style={styles.upladImageView}
            onPress={onAddImageClick}>
            <View style={styles.uploadImageInnerVIew}>
              <View style={styles.cameraCenter}>
                <AppImages.Dashboard.UploadImage_ICON />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.headShotImageText}>{label}</Text>
                {isMandatory && (
                  <Text style={{...styles.headShotImageText, color: color.RED}}>
                    {'*'}
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
      {showNote ? (
        <Text style={isHeadShotAvaialble ? styles.noteHeadImage : styles.note}>
          {translations.NOTE}
          <Text style={styles.noteMsg}>{note}</Text>
        </Text>
      ) : (
        <View
          style={{
            ...styles.noNote,
            marginBottom: errorMsg !== '' ? 0 : moderateScaleVertical(16),
          }}
        />
      )}
      <ImagePickerModal
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        onImageFound={imagePickerResult}
        hideModelEarly
        note={note}
        removeCameraOption={removeCameraOption}
        id={id}
        addLinkOption={showLink}
        onLinkButtonClicked={() => {
          onLinkButtonPressed();
        }}
        note2={note2}
        cropperCircleOverlay={circularCrop}
        customHeight={height}
        customWidth={width}
        cropping={isCropping}
      />
      <WarningModel
        msg={
          msg !== ''
            ? msg
            : id === IMAGE_TYPE.BANNER_IMAGE
            ? translations.DELETE_BANNER
            : translations.DELETE_LOGO
        }
        isModalVisible={isWarningMoadlVisible}
        setConfirm={onDeleteImageClick}
        setIsModalVisible={setIsWarningMoadlVisible}
        headingStyle={styles.modalHeading}
      />
      {errorMsg !== null && errorMsg?.length > 0 ? (
        <View style={isHeadShotAvaialble ? styles.row2 : styles.row}>
          <images.Common.Alert_ICON />
          <Text style={styles.error}> {errorMsg} </Text>
        </View>
      ) : (
        <Text style={styles.noError} />
      )}
    </View>
  );
};

export default HeadShotImage;

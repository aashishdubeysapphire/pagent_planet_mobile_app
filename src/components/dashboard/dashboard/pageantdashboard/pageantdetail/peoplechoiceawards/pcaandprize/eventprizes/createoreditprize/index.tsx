/* A function component , used for creating or Editing a Event Prize on the
   event PCA  */

import {View, Text, Keyboard} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../../../../../../../common/header';
import translations from '../../../../../../../../../assets/translations';
import {styles} from './styles';
import useCgMutation from '../../../../../../../../../services/api/useCgMutation';
import {
  EDIT_EVENT_PRIZE,
  CREATE_EVENT_PRIZE,
} from '../../../../../../../../../services/endpoints';
import {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../../../../../store/useAppStore';
import {PRIZE, REFESH_SCREEN} from '../../../../../../../../utils/enum';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../../../root/screenname';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createFormData} from '../../../../../../../../utils/helperFunction';
import HeadShotImage from '../../../../../../../../common/headshotimage';
import {AddUpdatePrizeResponse} from '../../../../../../../../../services/models/event/addOrUpdateEventPrize';
import {Base} from '../../../../../../../../../services/models/base';
import {
  internetState,
  toast,
  toastType,
} from '../../../../../../../../common/commonalert';
import {useNetInfo} from '@react-native-community/netinfo';
import CustomInput from '../../../../../../../../common/custominput';

const CreateOrEditPrize = props => {
  const {id, event_id} = props?.route?.params;
  const setLoader = useSetLoader();
  const setScreenRefresh = useSetScreenRefresh();
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [descriptionErr, setDescriptionErr] = useState('');
  const [prizeId, setPrizeId] = useState('');
  const [imageData, setImageData] = useState('');
  const [newImage, setNewImage] = useState('');
  const netInfo = useNetInfo();

  useEffect(() => {
    if (props.route.params.id === PRIZE.EDIT_PRIZE) {
      setDescription(props.route.params.description);
      setImageData('');
      setPrizeId(props.route.params.prizeId);
      setNewImage(props.route.params.image);
    }
  }, []);

  const imagePickerResult = (image: string) => {
    setImageData(image);
  };

  const updateImageBody = {
    pageant_id: event_id,
    message: description,
    upload_image: imageData,
  };

  const updateBody = {
    prize_id: prizeId,
    pageant_id: event_id,
    message: description,
    upload_image: imageData,
    new_image: newImage,
  };

  //API CREATE EVENT PRIZES ----------------------------------------- START

  const {mutateAsync: createAPrize} = useCgMutation<
    Base<AddUpdatePrizeResponse>
  >({
    key: CREATE_EVENT_PRIZE + event_id,
    url: CREATE_EVENT_PRIZE,
    body: createFormData(updateImageBody),
    isJson: false,
    customHeader: {'Content-Type': 'multipart/form-data'},
    offSuccessToast: false,
  });
  //API CREATE EVENT PRIZES ----------------------------------------- END

  //API UPDATE EVENT PRIZES ----------------------------------------- START

  const {mutateAsync: updatePrize} = useCgMutation<
    Base<AddUpdatePrizeResponse>
  >({
    key: EDIT_EVENT_PRIZE + event_id,
    url: EDIT_EVENT_PRIZE,
    body: createFormData(updateBody),
    isJson: false,
    offSuccessToast: false,
    customHeader: {'Content-Type': 'multipart/form-data'},
  });
  //API UPDATE EVENT PRIZES ----------------------------------------- END

  const validation = () => {
    if (description.length === 0) {
      setDescriptionErr(translations.THIS_FIELD_REQUIRED);
      return false;
    } else {
      setDescriptionErr('');
      return true;
    }
  };

  const imageValidations = () => {
    if (!!imageData) {
      if (imageData.size > 2.048) {
        toast(
          translations.PRIZE_ERROR_MSG_FOR_IMAGE_SIZE,
          toastType.ERROR_TOAST,
        );
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const hitCreateNewPrize = async () => {
    const response = await createAPrize();
    if (response.success) {
      setDescription('');
      setImageData('');
      setScreenRefresh(REFESH_SCREEN.EVENT_PRIZE_LIST);
    }
    Keyboard.dismiss();
    setLoader(false);
  };

  const hitUpdatePrize = async () => {
    const res = await updatePrize();
    if (res.success) {
      setDescription('');
      setImageData('');
      setScreenRefresh(REFESH_SCREEN.EVENT_PRIZE_LIST);
      navigation.goBack();
    }
    setLoader(false);
  };

  const onSave = async () => {
    if (imageData === undefined) {
      setImageData('');
      setNewImage('');
    } else if (imageData !== '') {
      setNewImage('');
    }
    if (validation() && imageValidations()) {
      if (!netInfo.isConnected && !netInfo.isInternetReachable) {
        internetState(netInfo.isConnected!!);
        return false;
      } else {
        setLoader(true);
        if (id === PRIZE.ADD_PRIZE) {
          setTimeout(() => {
            hitCreateNewPrize();
          }, 1000);
        } else if (id === PRIZE.EDIT_PRIZE) {
          setTimeout(() => {
            hitUpdatePrize();
          }, 1000);
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header
        lable={
          id === PRIZE.ADD_PRIZE ? SCREEN.CREATE_A_PRIZE : SCREEN.EDIT_PRIZE
        }
        rightText={translations.SAVE}
        onPressRightText={onSave}
        isUnderLineRequired
      />
      <View style={styles.subContainer}>
        <CustomInput
          floatingText={translations.DESCRIPTION}
          value={description}
          returnKeyType={'done'}
          setText={value => setDescription(value)}
          multiline={true}
          maxLength={50}
          numberOfLines={2}
          textAlignVertical={'top'}
          lengthCheck={true}
          forMultiline={true}
          showLength={false}
          errorMsg={descriptionErr}
          isMandatory={true}
        />

        {!!imageData && (
          <Text style={styles.uploadImage}>{translations.UPLOAD_IMAGE}</Text>
        )}
        <HeadShotImage
          onImageFound={imagePickerResult}
          label={translations.UPLOAD_IMAGE}
          url={imageData === '' ? props.route.params.image : imageData}
          removeCameraOption
          msg={translations.DELETE_IMAGE}
          displayHeadUrl={imageData || props.route.params.image ? true : false}
          isCropping={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateOrEditPrize;

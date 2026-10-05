import React, {useContext, useEffect, useState} from 'react';
import Header from '../../../../common/header';
import {SafeAreaView, Dimensions, View} from 'react-native';
import translations from '../../../../../assets/translations';
import AppImages from '../../../../../assets/images/AppImages';
import {styles} from './styles';
import {moderateScaleVertical} from '../../../../utils/responsiveSize';
import {UserContext} from '../../../../../store/userStore';
import {useSetLoader} from '../../../../../store/useAppStore';
import useCgMutation from '../../../../../services/api/useCgMutation';
import {UPLOADE_IMAGE} from '../../../../../services/endpoints';
import {useNetInfo} from '@react-native-community/netinfo';
import {internetState} from '../../../../common/commonalert';
import ImagePickerModal from '../../../../common/imagepickermodal';
import FastImageView from '../../../../common/fastimageview';
import {ApiStatusType} from '../../../../../services/constants';
import { isIosDevice } from '../../../../utils/helperFunction';

const ProfileImage = ({navigation}) => {
  const {storeData, setDataToStore} = useContext(UserContext);

  const setLoader = useSetLoader();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uploadeImageBody, setUploadeImageBody] = useState(undefined);
  const [userProfileUrl, setUserProfileUrl] = useState(
    storeData?.data?.user?.personal_details?.profile_image_url,
  );
  const netInfo = useNetInfo();
  const [itemSize, setItemSize] = useState(Number);
  const updateModelState = () => {
    setIsModalVisible(!isModalVisible);
  };

  const {mutateAsync: uploadeImage} = useCgMutation({
    key: UPLOADE_IMAGE,
    body: uploadeImageBody,
    url: UPLOADE_IMAGE,
    customHeader: {'Content-Type': 'multipart/form-data'},
    isJson: false,
  });

  const createFormData = (formValues: {[x: string]: any}) => {
    const form_data = new FormData();

    for (const key in formValues) {
      form_data.append(key, formValues[key]);
    }

    return form_data;
  };
  const checkInterNet = () => {
    if (!netInfo.isConnected) {
      internetState(netInfo.isConnected!!);
      return false;
    }

    return true;
  };

  useEffect(() => {
    setItemSize(
      Dimensions.get('window').width +
        moderateScaleVertical(!isIosDevice() ? -10 : -40),
    );
    setTimeout(() => {
      setUserProfileUrl(
        storeData?.data?.user?.personal_details?.profile_image_url,
      );
    }, 200);
  }, []);

  const uploadImageFunc = async () => {
    if (checkInterNet()) {
      setLoader(true);

      const res = await uploadeImage();
      if (res.success || res.status_code === ApiStatusType.Error) {
        const store = storeData;
        store.data.user.personal_details.profile_image_url =
          res.data?.image_url;
        setDataToStore(store);
        navigation.goBack();
      }
      setLoader(false);
    }
  };

  const removeImage = () => {
    const details = {
      type: 1,
      profile_image: '  ',
    };
    const body = createFormData(details);
    setUploadeImageBody(body);
    setTimeout(() => {
      uploadImageFunc();
      setIsModalVisible(false);
    }, 600);
  };

  const imagePickerResult = (data: any) => {
    const details = {
      type: 1,
      profile_image: data,
    };
    setUserProfileUrl(data.uri);
    const body = createFormData(details);
    setUploadeImageBody(body);
    uploadImageFunc();
  };
  return (
    <SafeAreaView style={styles.mainContiner}>
      <Header
        lable={translations.PROFILE_IMAGE}
        rightText={
          userProfileUrl === null ? translations.ADD : translations.EDIT
        }
        isUnderLineRequired
        onPressRightText={updateModelState}
        onPressBack={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.continer}>
        {userProfileUrl === null ? (
          <View style={styles.placeHolderContiner}>
            <AppImages.Common.UserPlaceHolder_ICON
              height={moderateScaleVertical(itemSize)}
              width={moderateScaleVertical(itemSize - 20)}
            />
          </View>
        ) : (
          <FastImageView
            width={moderateScaleVertical(itemSize)}
            height={moderateScaleVertical(itemSize)}
            imageUrl={userProfileUrl}
            borderRadius={moderateScaleVertical(18)}
          />
        )}
      </View>
      <ImagePickerModal
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        onImageFound={imagePickerResult}
        isRemoveButtonRequire={
          storeData.data?.user.personal_details.profile_image_url !== null
        }
        onDeletePress={removeImage}
      />
    </SafeAreaView>
  );
};

export default ProfileImage;

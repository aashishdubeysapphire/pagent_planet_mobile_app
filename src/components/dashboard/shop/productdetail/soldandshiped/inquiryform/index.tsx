import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {styles} from './styles';
import translations from '../../../../../../assets/translations';
import Header from '../../../../../common/header';
import FloatingInput from '../../../../../common/floatinginput';
import {
  createFormData,
  dontAcceptEmoji,
} from '../../../../../utils/helperFunction';
import FloatingDropdown from '../../../../../common/floatingdropown';
import DynamicradioButton from '../../../../../common/dynamicradiobutton/dynamicradioButton';
import {
  PREFERRED_TIME_OF_CONTACT,
  PREFERRE_MODE_OF_CONTACT,
} from './loccalList';
import FloatingBigInput from '../../../../../common/floatingbiginput';
import AppImages from '../../../../../../assets/images/AppImages';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';
import ImagePickerModal from '../../../../../common/imagepickermodal';
import HeadShotImage from '../../../../../common/headshotimage';
import CustomButton from '../../../../../common/button';
import SearchAdress from '../../../../../common/searchaddress';
import {UserContext} from '../../../../../../store/userStore';
import {toast, toastError, toastType} from '../../../../../common/commonalert';
import {isValid} from './validation';
import {SEND_INQUIRY} from '../../../../../../services/endpoints';
import {MethodTypes} from '../../../../../../services/constants';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {Base} from '../../../../../../services/models/base';
import {useNavigation} from '@react-navigation/core';
import Loader from '../../../../../common/customloader';
import { removeEmojis } from '../../../../../utils/validations';
const InquiryForm = props => {
  const {profileSlug = '', productSlug = ''} = props?.route?.params;
  const navigation = useNavigation();
  const {storeData} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddressModalVisible, setAddressModalVisible] = useState(false);
  const [errMsg, setErrMsg] = useState({});
  const [selectModeOfContact, setsetselectModeOfContact] = useState(
    PREFERRE_MODE_OF_CONTACT[0].lable,
  );
  const [selectedTimeOfContact, setSelectedTimeOfContact] = useState(
    PREFERRED_TIME_OF_CONTACT[0].lable,
  );
  const [data, setData] = useState({
    name: '',
    email: storeData.data?.user?.email,
    phone: '',
    location: '',
    lat: '',
    long: '',
    message: '',
  });
  const onChangeData = val => {
    setData({
      ...data,
      ...val,
    });
  };
  const [image, setImage] = useState('');

  const imagePickerResult = res => {
    if (!!res?.uri) {
      if (res.size * 1024 > 2048) {
        toast(
          translations.THE_ATTACHMENT_GREATER_2048_KB,
          toastType.ERROR_TOAST,
        );
      } else {
        setImage(res);
      }
    } else {
      setImage('');
    }
  };
  const onAddress = (addres: string, lat: string, long: string) => {
    onChangeData({
      location: addres,
      lat: lat,
      long: long,
    });
  };
  const getId = (
    list = PREFERRE_MODE_OF_CONTACT,
    selectedText = selectModeOfContact,
  ) => {
    let item = list.filter(Data => Data?.lable == selectedText);
    return item?.[0]?.id;
  };
  const inquiryBody = {
    roleSlug: 'Retailer',
    profileSlug: profileSlug,
    productSlug: productSlug,
    from_name: data.name,
    from_email: data.email,
    phone: data.phone,
    latitude: data.lat,
    longitude: data.lat,
    country_name: '',
    state_name: '',
    mode_of_contact_id: getId(PREFERRE_MODE_OF_CONTACT, selectModeOfContact),
    time_of_contact_id: getId(PREFERRED_TIME_OF_CONTACT, selectedTimeOfContact),
    message: data.message,
    location_of_the_contestant: data.location,
    attachment: image,
  };
  const {mutateAsync: postInquery} = useCgMutation<Base>({
    key: SEND_INQUIRY,
    url: SEND_INQUIRY,
    method: MethodTypes.Post,
    body: createFormData(inquiryBody),
    isJson: false,
    customHeader: {'Content-Type': 'multipart/form-data'},
    offSuccessToast: false,
    disableLoader: true,
  });

  const onPressSubmit = async () => {
    if (isValid(data, setErrMsg)) {
      setIsLoading(true);
      let res = await postInquery();
      if (res.success) {
        if (profileSlug == '' && productSlug == '') {
          navigation.goBack();
        }
        navigation.goBack();
      }
      setIsLoading(false);
    } else {
      toastError(translations.MANDATORY_FEILDS_ARE_NOT_FILLED);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Loader isLoading={isLoading} />
      <Header lable={translations.SEND_INQUIRY} isUnderLineRequired />
      <ScrollView style={styles.scrollMainView}>
        <FloatingInput
          floatingText={translations.FROM_NAME}
          setText={val => onChangeData({name: removeEmojis(val)})}
          value={data.name}
          isMandatory={true}
          returnKeyType={'done'}
          errorMsg={errMsg?.name}
        />
        <FloatingInput
          floatingText={translations.FROM_EMAIL}
          setText={val => onChangeData({email: removeEmojis(val)})}
          value={data.email}
          returnKeyType={'done'}
          isMandatory={true}
          errorMsg={errMsg?.email}
        />
        <FloatingInput
          floatingText={translations.PHONE}
          setText={val => onChangeData({phone: val.replace(/[^\d]/g, '')})}
          value={data.phone}
          isMandatory={true}
          returnKeyType={'done'}
          keyboardType={'number-pad'}
          maxLength={16}
          errorMsg={errMsg?.phone}
        />
        <FloatingDropdown
          floatingText={translations.LOCATION_OF_THE_EVENT}
          value={data.location}
          onFieldFocus={() => {
            setAddressModalVisible(true);
          }}
          isMandatory={true}
          errorMsg={errMsg?.location}
        />
        <SearchAdress
          isModalVisible={isAddressModalVisible}
          setIsModalVisible={setAddressModalVisible}
          onItemSelect={onAddress}
        />
        <Text style={styles.radiolable}>
          {translations.PREFERRE_MODE_OF_CONTACT}{' '}
          <Text style={styles.starRed}>*</Text>
        </Text>
        <DynamicradioButton
          data={PREFERRE_MODE_OF_CONTACT}
          selectedRadio={selectModeOfContact}
          setSelectedRadio={val => setsetselectModeOfContact(val)}
          customStyles={styles.customStyles}
          numColumns={3}
        />
        <Text style={[styles.radiolable, styles.extraSpace]}>
          {translations.PREFERRED_TIME_OF_CONTACT}{' '}
          <Text style={styles.starRed}>*</Text>
        </Text>
        <DynamicradioButton
          data={PREFERRED_TIME_OF_CONTACT}
          selectedRadio={selectedTimeOfContact}
          setSelectedRadio={val => setSelectedTimeOfContact(val)}
          customStyles={styles.customStyles}
          numColumns={3}
        />
        <View style={styles.extraSpace}></View>
        <FloatingBigInput
          floatingText={translations.MESSAGE}
          setText={val => onChangeData({message: dontAcceptEmoji(val)})}
          value={data.message}
          returnKeyType={'done'}
          multiline={true}
          textAlignVertical={'top'}
          maxLength={10000}
          forMultiline={true}
          autoCapitalize={'sentences'}
          showLength={false}
          isMandatory={true}
          errorMsg={errMsg?.message}
        />
        {!!image?.uri ? (
          <HeadShotImage
            onImageFound={imagePickerResult}
            url={image.uri}
            label={translations.UPLOADE_ATTACHMENT}
            showNote={false}
            heading={translations.UPLOADE_ATTACHMENT}
            displayHeadUrl={true}
          />
        ) : (
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            style={styles.uploadView}>
            <AppImages.Common.UploadIcon
              height={moderateScaleVertical(36)}
              width={moderateScaleVertical(36)}
            />
            <Text style={styles.upload}>{translations.UPLOADE_ATTACHMENT}</Text>
          </TouchableOpacity>
        )}

        <ImagePickerModal
          isModalVisible={isModalVisible}
          setModalVisible={setIsModalVisible}
          onImageFound={imagePickerResult}
        />
        <View style={styles.btnStyle}>
          <CustomButton
            label={translations.SUBMIT}
            inactive={true}
            onPress={onPressSubmit}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InquiryForm;

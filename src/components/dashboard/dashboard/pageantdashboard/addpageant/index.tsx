import {
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import translations from '../../../../../assets/translations';
import Header from '../../../../common/header';
import {styles} from './styles';
import {
  IMAGE_TYPE,
  ROLES,
  REFESH_SCREEN,
  USER_DESHBOARD_TAB,
} from '../../../../utils/enum';
import AddPageantForm from '../../../dashboard/pageantdashboard/addpageant/components/addeditpageantform';
import {
  GET_PAGEANT_AND_EVENT_DETAIL,
  UPLOADE_IMAGE,
  UPDATE_PAGEANT,
  CREATE_PAGEANT,
  GET_UPDATED_USERDATA,
} from '../../../../../services/endpoints';
import {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../store/useAppStore';
import useCgMutation from '../../../../../services/api/useCgMutation';
import {UserContext} from '../../../../../store/userStore';
import {SCREEN} from '../../../../../root/screenname';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {internetState} from '../../../../common/commonalert';
import WarningModel from '../../../../common/warningmodel';
import moment from 'moment';
import {checkIsNull} from '../../../../utils/validations';
import {createFormData} from '../../../../utils/helperFunction';
import {useNavigation} from '@react-navigation/core';
import {BackHandler} from 'react-native';
import {ApiStatusType, MethodTypes} from '../../../../../services/constants';
import {ADD_PAGEANT_INFO_ARRAY, EDIT_PAGEANT_INFO_ARRAY} from './localArray';
import {TIME_FORMAT} from '../../../../utils/datetimemanger';
const AddPageant = props => {
  const {storeData, setDataToStore} = React.useContext(UserContext);
  const setLoader = useSetLoader();
  const navigation = useNavigation();
  const scrollRef = useRef();
  const [isEventData, setIsEventData] = useState(false);
  const setScreenRefresh = useSetScreenRefresh();
  const [isSavePressed, setIsSavePressed] = useState(false);
  const [mainImagePicked, setMainImagePicked] = useState(false);
  const [bannerImagePicked, setBannerImagePicked] = useState(false);
  const [isWarningMoadlVisible, setIsWarningMoadlVisible] = useState(false);
  const [updateImageBody, setUpdateImageBody] = useState({});
  const [step_one, setStep_one] = useState({
    title: {name: '', id: ''},
    year: {name: '', id: ''},
    phone: '',
    start_date: '',
    end_date: '',
    not_sure: '',
    not_sure_end_date: '',
    email: '',
    website: '',
    show_recruit_director_button: '',
    mail_notify_pref: '',
    description: '',
    main_image: '',
    banner_image: '',
  });
  React.useEffect(() => {
    setStep_one({
      title: {name: '', id: ''},
      year: {name: '', id: ''},
      phone: '',
      start_date: '',
      end_date: '',
      not_sure: '',
      not_sure_end_date: '',
      email: '',
      website: '',
      show_recruit_director_button: '',
      mail_notify_pref: '',
      description: '',
      main_image: '',
      banner_image: '',
    });
  }, []);

  const netInfo = useNetInfo();
  React.useEffect(() => {
    if (props.route?.params !== undefined) {
      NetInfo.fetch().then(state => {
        if (state.isConnected && state.isInternetReachable) {
          if (props.route?.params?.pageantEventDetail === undefined) {
            getEventDataAPI();
          } else if (
            props?.route?.params?.pageantEventDetail !== undefined &&
            props?.route?.params?.pageantEventDetail !== null
          ) {
            displayPageantDetail(props.route.params.pageantEventDetail);
          }
        } else {
          internetState(netInfo.isConnected!!);
        }
      });
    }

    const hardBack = BackHandler.addEventListener(
      'hardwareBackPress',
      onPressBack,
    );
    return () => hardBack.remove();
  }, []);
  const onPressBack = () => {
    onPressBack1();
    return true;
  };
  const onPressBack1 = () => {
    if (
      !props?.route?.params?.isEdit &&
      !storeData.data?.user.is_pageant_exist
    ) {
      setIsWarningMoadlVisible(true);
    } else {
      navigation.goBack();
    }
  };
  const checkInterNet = () => {
    if (!netInfo.isConnected) {
      internetState(netInfo.isConnected!!);
      return false;
    }
    return true;
  };

  const updatedBody = {
    title: step_one.title.name,
    year_id: step_one.year.id,
    phone: step_one.phone,
    not_sure: step_one.not_sure,
    not_sure_end_date: step_one.not_sure_end_date,
    email: step_one.email,
    website: step_one.website,
    show_recruit_director_button: '',

    description: step_one.description,
    id: props.route.params !== undefined ? props.route.params.pageantId : 0,
  };
  const updatedAddBody = {
    title: step_one.title.name,
    year_id: step_one.year.id,
    phone: step_one.phone,
    start_date: step_one.start_date,
    end_date: step_one.end_date,
    not_sure: step_one.not_sure,
    not_sure_end_date: step_one.not_sure_end_date,
    email: step_one.email,
    website: step_one.website,
    show_recruit_director_button: '',

    description: step_one.description,
    main_image: '',
    banner_image: '',
  };
  const {mutateAsync: updateEventDetails} = useCgMutation({
    key: UPDATE_PAGEANT,
    url: UPDATE_PAGEANT,
    body: updatedBody,
    auth: storeData.data?.access_token,
    disableLoader: true,
  });
  const {mutateAsync: addEventDetails} = useCgMutation({
    key: CREATE_PAGEANT,
    url: CREATE_PAGEANT,
    body: updatedAddBody,
    auth: storeData.data?.access_token,
    disableLoader: true,
  });

  const {mutateAsync: uploadHeatShotImage} = useCgMutation({
    key: UPLOADE_IMAGE,
    url: UPLOADE_IMAGE,
    body: createFormData(updateImageBody),
    auth: storeData.data?.access_token,
    isJson: false,
    customHeader: {'Content-Type': 'multipart/form-data'},
    offSuccessToast: true,
    disableLoader: true,
  });
  const {mutateAsync: getUpdatedUserData} = useCgMutation({
    key: GET_UPDATED_USERDATA,
    url: GET_UPDATED_USERDATA,
    method: MethodTypes.GET,
    disableLoader: true,
    offSuccessToast: true,
  });
  const updateEventDetailsApi = async () => {
    setLoader(true);
    const res = await updateEventDetails();

    if (res.success) {
      if (step_one.main_image !== '' && mainImagePicked) {
        setUpdateImageBody({
          type: IMAGE_TYPE.MAIN_IMAGE,
          profile_image: step_one.main_image,
          pageant_id: res.data.pageant.id,
        });

        const imgRes1 = await uploadHeatShotImage();
        if (imgRes1.success) {
          const store = storeData;
          store.data.user.is_pageant_exist = true;
          setDataToStore(store);
        }
      }
      if (bannerImagePicked) {
        setUpdateImageBody({
          type: IMAGE_TYPE.BANNER_IMAGE,
          profile_image: step_one.banner_image,
          pageant_id: res.data.pageant.id,
        });
        const imgRes = await uploadHeatShotImage();
      }
      setScreenRefresh(REFESH_SCREEN.PAGEANT_DETAIL);
      setTimeout(() => {
        setLoader(false);
        props.navigation.goBack();
      }, 1000);
    }
  };
  const addEventDetailsApi = async () => {
    setLoader(true);
    const res = await addEventDetails();
    if (res.success) {
      if (step_one.main_image !== '') {
        setUpdateImageBody({
          type: IMAGE_TYPE.MAIN_IMAGE,
          profile_image: step_one.main_image,
          pageant_id: res.data.id,
        });

        await uploadHeatShotImage();
      }
      if (step_one.banner_image !== '') {
        setUpdateImageBody({
          type: IMAGE_TYPE.BANNER_IMAGE,
          profile_image: step_one.banner_image,
          pageant_id: res.data.id,
        });
        await uploadHeatShotImage();
      }

      const updatedUserData = await getUpdatedUserData();
      if (res.success) {
        let updatedUser = updatedUserData.data.user;
        let store = storeData;
        store.data.user = updatedUser;
        setDataToStore(store);
      }

      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: SCREEN.DASHBOARD_NAVIGATION}],
        });
        navigation.navigate(USER_DESHBOARD_TAB.DESHBOARD, {
          redirectedto: ROLES.PAGEANT,
        });
        navigation.navigate(SCREEN.ADD_PAGENT_RULES, {
          pageantId: res?.data?.id,
          startDate: step_one.start_date,
          endDate: step_one.end_date,
          notSure: step_one.not_sure,
          notSureEndDate: step_one.not_sure_end_date,
        });
      }, 1000);
    }
    setScreenRefresh(REFESH_SCREEN.PAGEANT_ROLE_TYPE);
    setLoader(false);
  };
  const saveButtonPressed = () => {
    if (checkInterNet()) {
      if (props?.route?.params?.pageantId) {
        updateEventDetailsApi();
      } else {
        addEventDetailsApi();
      }
    }
  };
  const {mutateAsync: eventData} = useCgMutation({
    key: GET_PAGEANT_AND_EVENT_DETAIL,
    method: MethodTypes.GET,
    url: GET_PAGEANT_AND_EVENT_DETAIL + `${props?.route?.params?.pageantId}`,
    offSuccessToast: true,
  });
  const getEventDataAPI = async () => {
    setLoader(true);
    const res = await eventData();
    if (res.success || res.status_code === ApiStatusType.Success) {
      displayPageantDetail(res?.data?.pageant_details);
      setStep_one({
        ...step_one,
        title: {
          name: res?.data?.pageant_details?.title,
          id: res?.data?.pageant_details?.pageant?.master_pageant?.id,
        },
        start_date:
          res?.data?.pageant_details?.not_sure === 1
            ? translations.NOT_SURE_CAPITALIZED
            : checkIsNull(res?.data?.pageant_details?.start_date)
            ? moment(
                res?.data?.pageant_details?.start_date,
                TIME_FORMAT.YYYYMMDD,
              ).format(TIME_FORMAT.MMDDYYYY)
            : null,
        end_date:
          res?.data?.pageant_details?.not_sure_end_date === 1
            ? translations.NOT_SURE_CAPITALIZED
            : checkIsNull(res?.data?.pageant_details?.end_date)
            ? moment(
                res?.data?.pageant_details?.end_date,
                TIME_FORMAT.YYYYMMDD,
              ).format(TIME_FORMAT.MMDDYYYY)
            : null,
        year: {
          name: res?.data?.pageant_details?.pageant?.year_name?.name,
          id: res?.data?.pageant_details?.pageant?.year_name?.id,
        },

        description: res?.data?.pageant_details?.description,
        email: res?.data?.pageant_details?.email,
        website: res?.data?.pageant_details?.website,
        phone: res?.data?.pageant_details?.phone,
        main_image: res?.data?.pageant_details?.main_image_full_url,
        not_sure: res?.data?.pageant_details?.not_sure,
        mail_notify_pref: res?.data?.pageant_details?.mail_notify_pref,
        not_sure_end_date: res?.data?.pageant_details?.not_sure_end_date,
        banner_image: checkIsNull(res?.data?.pageant_details?.banner_image)
          ? res?.data?.pageant_details?.banner_image_full_url
          : null,
      });
      setIsEventData(true);
    }
  };
  const displayPageantDetail = pageantDetails => {
    setStep_one({
      ...step_one,
      title: {
        name: pageantDetails?.title,
        id: pageantDetails?.pageant?.master_pageant?.id,
      },
      start_date:
        pageantDetails?.not_sure === 1
          ? translations.NOT_SURE_CAPITALIZED
          : checkIsNull(pageantDetails?.start_date)
          ? moment(pageantDetails?.start_date, TIME_FORMAT.YYYYMMDD).format(
              TIME_FORMAT.MMDDYYYY,
            )
          : null,
      end_date:
        pageantDetails?.not_sure_end_date === 1
          ? translations.NOT_SURE_CAPITALIZED
          : checkIsNull(pageantDetails?.end_date)
          ? moment(pageantDetails?.end_date, TIME_FORMAT.YYYYMMDD).format(
              TIME_FORMAT.MMDDYYYY,
            )
          : null,
      year: {
        name: pageantDetails?.pageant?.year_name?.name,
        id: pageantDetails?.pageant?.year_name?.id,
      },

      description: pageantDetails?.description,
      email: pageantDetails?.email,
      website: pageantDetails?.website,
      phone: pageantDetails?.phone,
      main_image: pageantDetails?.main_image_full_url,
      not_sure: pageantDetails?.not_sure,
      mail_notify_pref: pageantDetails?.mail_notify_pref,
      not_sure_end_date: pageantDetails?.not_sure_end_date,
      banner_image: checkIsNull(pageantDetails?.banner_image)
        ? pageantDetails?.banner_image_full_url
        : null,
    });
    setIsEventData(true);
  };
  const onChangeStepOne = data => {
    setStep_one({...step_one, ...data});
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header
        lable={
          props?.route?.params?.isEdit
            ? translations.EDIT_PAGEANT_DETAILS
            : SCREEN.ADD_PAGEANT
        }
        rightText={'Save'}
        onPressBack={() => {
          if (
            props?.route?.params?.isEdit ||
            storeData.data?.user.is_pageant_exist
          ) {
            navigation.goBack();
          } else {
            setIsWarningMoadlVisible(true);
          }
        }}
        onPressRightText={() => setIsSavePressed(true)}
        isUnderLineRequired
        infoIcon={true}
        infoDataArray={
          props?.route?.params?.isEdit
            ? EDIT_PAGEANT_INFO_ARRAY
            : ADD_PAGEANT_INFO_ARRAY
        }
      />
      <ScrollView
        keyboardShouldPersistTaps={true}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}>
        <KeyboardAvoidingView>
          <View style={styles.viewContainer}>
            {props?.route?.params?.pageantId ? (
              <>
                {isEventData ? (
                  <AddPageantForm
                    step_one={step_one}
                    onChangeStepOne={onChangeStepOne}
                    editScrenView={props?.route?.params?.isEdit ? true : false}
                    isEditable={props?.route?.params?.isEdit}
                    isPlanActive={props?.route?.params?.isPlanActive}
                    addPageant={saveButtonPressed}
                    isSavePressed={isSavePressed}
                    pageantPlanDetail={props.route?.params?.pageantPlanDetail}
                    setIsSavePressed={setIsSavePressed}
                    pageantId={props?.route?.params?.pageantId}
                    setMainImagePicked={setMainImagePicked}
                    setBannerImagePicked={setBannerImagePicked}
                    scrollRef={scrollRef}
                  />
                ) : null}
              </>
            ) : (
              <AddPageantForm
                step_one={step_one}
                onChangeStepOne={onChangeStepOne}
                isSavePressed={isSavePressed}
                setIsSavePressed={setIsSavePressed}
                addPageant={saveButtonPressed}
                setMainImagePicked={setMainImagePicked}
                setBannerImagePicked={setBannerImagePicked}
                scrollRef={scrollRef}
              />
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <WarningModel
        msg={translations.ADD_PAGENT_BACK_ERR_MSG}
        isModalVisible={isWarningMoadlVisible}
        setCancel={() => {
          navigation.goBack();
          setScreenRefresh(REFESH_SCREEN.PAGEANT_LIST);
        }}
        setIsModalVisible={setIsWarningMoadlVisible}
        headingStyle={styles.modalHeading}
      />
    </SafeAreaView>
  );
};

export default AddPageant;

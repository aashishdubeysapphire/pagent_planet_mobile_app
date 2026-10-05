import {SafeAreaView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from '../styles';
import Header from '../../../../common/header';
import translations from '../../../../../assets/translations';
import Form from './component/form';
import {
  getIDsArrayFromArray,
  removeMiddleSpaces,
} from '../../../../utils/helperFunction';
import {checkIsValid} from './validation';
import useCgMutation from '../../../../../services/api/useCgMutation';
import {Base} from '../../../../../services/models/base';
import {MethodTypes} from '../../../../../services/constants';
import {
  ADD_EXPERT_PROFILE,
  GET_UPDATED_USERDATA,
} from '../../../../../services/endpoints';
import ExpertCelebration from './component/celebrationModal';
import {UserContext} from '../../../../../store/userStore';
import Loader from '../../../../common/customloader';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {getExpertProfileDetails} from '../../../../../services/models/expert/getExpertProfileDetails';
import {isValueNull} from '../../../../utils/validations';
import {USER_DESHBOARD_TAB} from '../../../../utils/enum';
import {SCREEN} from '../../../../../root/screenname';

const CreateExpertForm = props => {
  const {
    selectedProfile,
    allSelected,
    selectedStatesIds,
    isEdit,
    getExpertProfileLink,
    userSelectedData: userSelectedDataParams,
    selecteList: recivedLeadesParams,
  } = props?.route?.params || {};

  const navigation = useNavigation();
  const {storeData, setDataToStore} = React.useContext(UserContext);
  const [isCelebrationVisible, setisCelebrationVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [screenLoader, setScreenLoader] = useState(false);
  const [bussinessProfileId, setBussinessProfileId] = useState();
  const [recivedLeades, setRecivedLeades] = useState(recivedLeadesParams ?? []);
  const [locationRequest, setLocationRequest] = useState([]);
  const [savedUnselectedIds, setSavedUnselectedIds] = useState();
  const [removedLocation, setremovedLocation] = useState([]);
  const [userSelectedData, setUserSelectedData] = useState(
    userSelectedDataParams ?? {
      nameOfCompnay: '',
      isCompAlsoBrand: translations.NO_SMALL,
      designer: [],
      speciality: [],
      phone: '',
      website: '',
      tagline: '',
      about: '',
      unselectedIds: '',
    },
  );
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [errorMsg, setErrorMsg] = useState({
    nameOfCompnay: '',
    designer: '',
    speciality: '',
    phone: '',
    website: '',
    tagline: '',
    about: '',
    recivedLeades: '',
    selectedLocation: '',
    locationTime: '',
  });

  const [dataSourceCords, setDataSourceCords] = useState({});
  const scrollRef = useRef();

  const body = {
    profile_type: selectedProfile?.name,
    business_title: userSelectedData.nameOfCompnay,
    phone: userSelectedData.phone,
    website: userSelectedData.website,
    tagline: userSelectedData.tagline,
    bio: userSelectedData.about,
    specality: getIDsArrayFromArray(userSelectedData.speciality),
    business_countries: getIDsArrayFromArray(recivedLeades),
    business_states:
      selectedStatesIds === undefined ? savedUnselectedIds : selectedStatesIds,
    all_states: allSelected,
    receiver_id: getIDsArrayFromArray(userSelectedData.designer),
    is_brand: userSelectedData.isCompAlsoBrand,
    location: selectedLocation,
    addtional_location: locationRequest,
    business_profile_id: bussinessProfileId, // for edit
    addtional_location_remove_id: removedLocation,
  };
  const {mutateAsync: addExpertApi} = useCgMutation<Base>({
    key: ADD_EXPERT_PROFILE,
    url: ADD_EXPERT_PROFILE,
    method: MethodTypes.Post,
    disableLoader: true,
    body: body,
  });
  const {mutateAsync: getUpdatedUserData} = useCgMutation<Base>({
    key: GET_UPDATED_USERDATA,
    url: GET_UPDATED_USERDATA,
    method: MethodTypes.GET,
    disableLoader: true,
    offSuccessToast: true,
  });
  const {mutateAsync: getExpertProfileDetailsApi} =
    useCgMutation<getExpertProfileDetails>({
      key: getExpertProfileLink,
      url: getExpertProfileLink,
      method: MethodTypes.GET,
      disableLoader: true,
      offSuccessToast: true,
    });
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused && isEdit) {
      getExpertProfileDetailsApiHit();
    }
  }, [isEdit]);
  const moveToErr = (key: string | undefined) => {
    if (scrollRef?.current) {
      scrollRef?.current?.scrollTo({
        x: 0,
        y: dataSourceCords[removeMiddleSpaces(key)],
        animated: true,
      });
    }
  };
  const OnPressSave = async () => {
    if (
      checkIsValid(
        selectedProfile,
        userSelectedData,
        recivedLeades,
        selectedLocation,
        updateError,
        dataSourceCords,
        moveToErr,
      )
    ) {
      setLoader(true);
      const res = await addExpertApi();
      if (isEdit) {
        if (res.success) {
          navigation?.reset({
            index: 0,
            routes: [
              {
                name: SCREEN.DASHBOARD_NAVIGATION,
              },
            ],
          });

          navigation.navigate(USER_DESHBOARD_TAB.DESHBOARD, {
            redirectedto: selectedProfile.display_name,
          });
        }
        return;
      }
      const updatedUserData = await getUpdatedUserData();
      if (res.success) {
        let updatedUser = updatedUserData.data.user;
        let store = storeData;
        store.data.user = updatedUser;
        setDataToStore(store);
        setisCelebrationVisible(true);
      }
      setLoader(false);
    }
  };

  const updateError = data => {
    setErrorMsg({
      ...errorMsg,
      ...data,
    });
  };

  const getExpertProfileDetailsApiHit = async () => {
    setScreenLoader(true);
    const res: getExpertProfileDetails = await getExpertProfileDetailsApi();
    if (res.success) {
      setUserSelectedData({
        nameOfCompnay: isValueNull(res?.data?.profile?.business_title),
        isCompAlsoBrand: res?.data?.profile?.is_brand,
        designer: res.data?.designerData,
        speciality: res.data?.specalitiesIds,
        phone: isValueNull(res?.data?.profile?.phone),
        website: isValueNull(res?.data?.profile?.website),
        tagline: isValueNull(res?.data?.profile?.tagline),
        about: isValueNull(res?.data?.profile?.bio),
        pending_location_request: res?.data?.pending_location_request,
        advertisingBannerData: res?.data?.advertisingBannerData,
      });
      setSavedUnselectedIds(res?.data?.unselected_stateIds);
      setRecivedLeades(res?.data?.countryIds);
      setSelectedLocation(res?.data?.location);
      setBussinessProfileId(res?.data?.profile?.id);
    }
    setScreenLoader(false);
  };
  const pushIDToremoveLocationArr = id => {
    setremovedLocation([...removedLocation, id]);
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <Loader isLoading={screenLoader} />
      {isCelebrationVisible ? (
        <ExpertCelebration
          selectedProfile={selectedProfile}
          nameOfCompany={userSelectedData.nameOfCompnay}
        />
      ) : (
        <>
          <Header
            lable={
              (isEdit ? translations.EDIT + ' ' : translations.CREATE) +
              selectedProfile?.display_name +
              ' ' +
              translations.PROFILE
            }
            isUnderLineRequired
            rightText={translations.SAVE}
            onPressRightText={OnPressSave}
          />
          <Form
            isEdit={isEdit}
            selectedProfile={selectedProfile}
            recivedLeades={recivedLeades}
            setRecivedLeades={setRecivedLeades}
            userSelectedData={userSelectedData}
            setUserSelectedData={setUserSelectedData}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            errorMsg={errorMsg}
            loader={loader}
            setLoader={setLoader}
            selectedStatesIds={
              selectedStatesIds === undefined
                ? savedUnselectedIds
                : selectedStatesIds
            }
            locationRequest={locationRequest}
            setLocationRequest={setLocationRequest}
            setremovedLocation={pushIDToremoveLocationArr}
            dataSourceCords={dataSourceCords}
            setDataSourceCords={setDataSourceCords}
            scrollRef={scrollRef}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default CreateExpertForm;

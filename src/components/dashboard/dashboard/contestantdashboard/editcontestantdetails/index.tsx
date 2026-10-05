import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import styles from './styles';
import Header from '../../../../common/header';
import translations from '../../../../../assets/translations';
import OvelContainer from '../../../../common/ovelcontainer';
import FloatingDropdown from '../../../../common/floatingdropown';
import FloatingInput from '../../../../common/floatinginput';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {ScrollView} from 'react-native-gesture-handler';
import AppImages from '../../../../../assets/images/AppImages';
import images from '../../../../../assets/images/AppImages';
import {
  internetState,
  toast,
  toastError,
  toastType,
} from '../../../../common/commonalert';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import useCgMutation from '../../../../../services/api/useCgMutation';
import TopSlider from './topslider';
import PageantEntered from './pageantentered';
import SearchCountryState from '../../../../common/searchcountrystate';
import {ITEM_KEY} from '../../../../common/searchcountrystate';
import FloatingButton from '../../../../common/floatingbutton';
import {
  GET_CONTESTANT_DETAILS,
  GET_MASTER_DATA,
  UPDATE_CONTESTANT_EVENT,
} from '../../../../../services/endpoints';
import {UserContext} from '../../../../../store/userStore';
import {MASTERDATA} from '../../../../utils/enum';
import CustomBottomModal from '../../../../common/custombottommodal';
import HeightModal from '../../../../common/heightmodal';
import moment from 'moment';
import {SCREEN} from '../../../../../root/screenname';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import WarningModel from '../../../../common/warningmodel';
import FloatingBigInput from '../../../../common/floatingbiginput';
import {
  checkIsNull,
  doesParaContainersURL,
  isValueNull,
  removeEmojis,
} from '../../../../utils/validations';
import {isIosDevice, keyBoardManager} from '../../../../utils/helperFunction';
import {FLOATING_ICON} from '../../../../utils/enum';
import {ApiStatusType, MethodTypes} from '../../../../../services/constants';
import {TIME_FORMAT} from '../../../../utils/datetimemanger';
import {moderateScale} from '../../../../utils/responsiveSize';
import Loader from '../../../../common/customloader';

const topData = [
  {
    title: translations.PAGEANT_ENTERED,
  },
  {
    title: translations.CONTESTANT_DETAILS,
  },
];

const EditContestantDetails = props => {
  const setLoader = () => {};
  const {storeData} = useContext(UserContext);
  const [contestantState, setState] = useState('');
  const [isCountryStateModalKey, setCountryStateModalKey] = useState(0);
  const [country, setCountry] = useState('');
  const [countryId, setCountryId] = useState('');
  const [hairColorId, setHairColorId] = useState('');
  const [eyeColorId, setEyeColorId] = useState('');
  const [zodiacId, setZodiacId] = useState('');
  const [stateId, setStateId] = useState('');
  const [date, setDate] = useState('');
  const [mode] = useState('date');
  const [open, setOpen] = useState(false);
  const [contestantHairColor, setHairColor] = useState('');
  const [contestantEyeColor, setEyeColor] = useState('');
  const [zodiacSign, setZodiacSign] = useState('');
  const [height, setHeight] = useState('');
  const [countryModalVisible] = useState(false);
  const [hairColorDetails, setHairColorDetails] = useState([]);
  const [stateModalVisible] = useState(false);
  const [hairModalVisible, setHairModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [heightModalVisible, setHeightModalVisible] = useState(false);
  const [eyeColorDetails, setEyeColorDetails] = useState([]);
  const [zodiacSignDetails, setZodiacSignDetails] = useState([]);
  const [zodiacSignModalVisible, setZodiacSignModalVisible] = useState(false);
  const [eyeColorModalVisible, setEyeColorModalVisible] = useState(false);
  const [isBirthModalVisible, setIsBirthModalVisible] = useState(false);
  const [married, setMarried] = useState(translations.NO_SMALL);
  const [minor, setMinor] = useState(translations.NO_SMALL);
  const [hideDob, setHideDob] = useState(translations.NO_SMALL);
  const [kids, setKids] = useState(translations.NO_SMALL);
  const [birthDate, setBirthDate] = useState('');
  const [contestantAboutRef, setAboutRef] = useState('');
  const netInfo = useNetInfo();
  const [data, setData] = useState({
    talent: '',
    ethinicity: '',
    funFacts: '',
    school: '',
    platform: '',
    currentOccupation: '',
    reason: '',
    bio: '',
  });
  const [ethinicityRef, setEthinicityRef] = useState('');
  const [funfactsRef, setFunfactsRef] = useState('');
  const [contestantSchoolRef, setSchoolRef] = useState('');
  const [currentOccupationRef, setCurrentOccupationRef] = useState('');
  const [platformRef, setPlatformRef] = useState('');
  const [reasonRef, setReasonRef] = useState('');
  const [basicDetailsViewVisible, setBasicDetailsViewVisible] =
    React.useState(false);
  const [, setLocationDetailsViewVisible] = React.useState(false);
  const [professionalDetailsViewVisible, setProfessionalDetailsViewVisible] =
    React.useState(false);
  const [isMinorModalVisible, setIsMinorModalVisible] = useState(false);
  const [hideHeight, setHideHeight] = useState(false);
  const [hideHeightError, setHideHeightError] = useState('');
  const [selectedTab, setSelectedTab] = useState('');
  const [birthDateError, setBirthDateError] = useState('');
  const [hairColorError, setHairColorError] = useState('');
  const [eyeColorError, setEyeColorError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [stateError, setStateError] = useState('');
  const [confirm, setConfirm] = useState(false);
  //ERR states
  const [talentErr, setTalentErr] = useState('');
  const [contestantEthnicityErr, setEthnicityErr] = useState('');
  const [funFactErr, setFunFactErr] = useState('');
  const [schoolErr, setschoolErr] = useState('');
  const [platformErr, setPlatformErr] = useState('');
  const [currentOccupationErr, setCurrentOccupationErr] = useState('');
  const [reasonErr, setReasonErr] = useState('');
  const [aboutErr, setAboutErr] = useState('');
  const [loading] = useState(false);
  const isFocuse = useIsFocused();
  const [isCountryStateModalVisible, setCountryStateModalVisible] =
    useState(false);
  const navigation = useNavigation();
  const scrollRef = useRef();

  useEffect(() => {
    keyBoardManager();
  }, []);

  useEffect(() => {
    if (height === -1) {
      setHideHeight(true);
    }
  }, [height]);

  useEffect(() => {
    if (professionalDetailsViewVisible) {
      scrollRef.current?.scrollTo({
        y: 0,
      });
    }
  }, [professionalDetailsViewVisible]);
  useEffect(() => {
    if (isFocuse && selectedTab === translations.CONTESTANT_DETAILS) {
      setBirthDateError('');
      setHairColorError('');
      setEyeColorError('');
      setCountryError('');
      setStateError('');
      setHideHeightError('');
      setConfirm(false);

      NetInfo.fetch().then(state => {
        if (state.isConnected && state.isInternetReachable) {
          getDetails();
          setBasicDetailsViewVisible(true);
          setProfessionalDetailsViewVisible(false);
          setLocationDetailsViewVisible(false);
        } else {
          internetState(netInfo.isConnected!!);
        }
      });
    }
  }, [isFocuse, selectedTab]);

  const checkInterNet = () => {
    if (!netInfo.isConnected) {
      internetState(netInfo.isConnected!!);
      return false;
    }
    return true;
  };

  const checkValidField = (Ddata, setErr) => {
    if (!!Ddata) {
      if (doesParaContainersURL(Ddata)) {
        setErr(translations.THIS_FILED_CANT_CONTAIN_A_LINK);
        return false;
      } else {
        setErr('');
        return true;
      }
    } else {
      setErr('');
      return true;
    }
  };
  const isValidFunFact = () => {
    checkValidField(data.talent, setTalentErr);
    checkValidField(data.ethinicity, setEthnicityErr);
    checkValidField(data.funFacts, setFunFactErr);
    checkValidField(data.reason, setReasonErr);
    checkValidField(data.school, setschoolErr);
    checkValidField(data.platform, setPlatformErr);
    checkValidField(data.currentOccupation, setCurrentOccupationErr);
    checkValidField(data.bio, setAboutErr);
    if (
      checkValidField(data.talent, setTalentErr) &&
      checkValidField(data.ethinicity, setEthnicityErr) &&
      checkValidField(data.funFacts, setFunFactErr) &&
      checkValidField(data.reason, setReasonErr) &&
      checkValidField(data.school, setschoolErr) &&
      checkValidField(data.platform, setPlatformErr) &&
      checkValidField(data.currentOccupation, setCurrentOccupationErr) &&
      checkValidField(data.bio, setAboutErr)
    ) {
      return true;
    } else {
      setProfessionalDetailsViewVisible(true);
      return false;
    }
  };

  const handleClick = () => {
    setBirthDateError('');
    setHairColorError('');
    setEyeColorError('');
    setCountryError('');
    setStateError('');
    setHideHeightError('');
    isValidFunFact();
    const selectedDate = new Date(date);
    const currentDate = new Date();
    if (selectedDate.getFullYear() === currentDate.getFullYear() && !confirm) {
      setIsBirthModalVisible(true);
    } else if (
      birthDate?.length > 0 &&
      checkInterNet() &&
      contestantHairColor?.length > 0 &&
      contestantEyeColor?.length > 0 &&
      country?.length > 0 &&
      contestantState?.length > 0 &&
      isValidFunFact()
    ) {
      if (!hideHeight) {
        if (!checkIsNull(height)) {
          setBasicDetailsViewVisible(true);
          setProfessionalDetailsViewVisible(false);
          setHideHeightError(translations.THIS_FIELD_REQUIRED);
          return;
        }
      }
      updateDetailsAPI();
    } else {
      toastError(translations.MANDATORY_FEILDS_ARE_NOT_FILLED);
      if (!birthDate) {
        setBirthDateError(translations.THIS_FIELD_REQUIRED);
      }

      if (!contestantHairColor) {
        setHairColorError(translations.THIS_FIELD_REQUIRED);
      }

      if (!contestantEyeColor) {
        setEyeColorError(translations.THIS_FIELD_REQUIRED);
      }

      if (!country) {
        setCountryError(translations.THIS_FIELD_REQUIRED);
      }

      if (!contestantState) {
        setStateError(translations.THIS_FIELD_REQUIRED);
      }
      if (!hideHeight && !height) {
        setHideHeightError(translations.THIS_FIELD_REQUIRED);
      }
      setBasicDetailsViewVisible(true);
    }
  };

  const onPressHide = () => {
    hideDob === translations.YES
      ? setHideDob(translations.NO_SMALL)
      : setHideDob(translations.YES);
  };
  const onItemSelection = (id: number, title: string, key: any) => {
    if (key === ITEM_KEY.COUNTRY) {
      setCountryId(id);
      setCountry(title);
      setCountryError('');
      if (countryId !== id) {
        setState('');
      }
      setStateId(0);
    } else if (key === ITEM_KEY.STATE) {
      setState(title);
      setStateId(id);
      setStateError('');
    }
  };
  const onPressMinor = () => {
    minor === translations.YES
      ? setMinor(translations.NO_SMALL)
      : setIsMinorModalVisible(true);
  };
  const onPressMarried = val => {
    setMarried(val);
  };
  const onPressKids = val => {
    setKids(val);
  };
  const onPressBasicDetails = () => {
    setBasicDetailsViewVisible(!basicDetailsViewVisible);
    setProfessionalDetailsViewVisible(false);
    setLocationDetailsViewVisible(false);
  };
  const onPressProfessionalDetails = () => {
    setProfessionalDetailsViewVisible(!professionalDetailsViewVisible);
    setBasicDetailsViewVisible(false);
    setLocationDetailsViewVisible(false);
  };
  const heightCallbackFunction = selectedText => {
    setHeight(selectedText);
  };
  const callbackFunction = item => {
    if (hairModalVisible) {
      setHairColor(item.name);
      setHairColorId(item.id);
    } else if (eyeColorModalVisible) {
      setEyeColor(item.name);
      setEyeColorId(item.id);
    } else if (zodiacSignModalVisible) {
      setZodiacSign(item.name);
      setZodiacId(item.id);
    } else if (countryModalVisible) {
      setCountry(item.name);
      setCountryId(item.id);
    } else if (stateModalVisible) {
      setState(item.name);
      setStateId(item.id);
    }
  };

  const selectedCallbackFunction = title => {
    setSelectedTab(title);
  };

  const {mutateAsync: getMasterDetails} = useCgMutation({
    key: GET_MASTER_DATA,
    url: GET_MASTER_DATA,
    body: {
      master_record_type_id: `${MASTERDATA.EYE_COLOR},${MASTERDATA.HAIR_COLOR},${MASTERDATA.ZODIAC_SIGN},${MASTERDATA.HEIGHT}`,
      is_countries: 0,
    },
    offSuccessToast: true,
    disableLoader: true,
  });
  const getDetails = async () => {
    setLoader(true);

    const res = await getMasterDetails();
    if (res.success || res.status_code === ApiStatusType.Error) {
      setHairColorDetails(res.data.master_records.hair_color);
      setEyeColorDetails(res.data.master_records.eye_color);
      setZodiacSignDetails(res.data.master_records.zodiac);

      getDetailsAPI();
    } else {
      setLoader(false);
    }
  };
  const updatedBody = {
    first_name: firstName,
    last_name: lastName,
    zodiac_sign: zodiacId,
    occupation: data?.currentOccupation,
    college_attend: data?.school,
    pageant_plateform: data?.platform,
    talent: data?.talent,
    height: height,
    hair_color: hairColorId,
    eye_color: eyeColorId,
    start_in_pageant: data?.reason,
    complexion: data?.ethinicity,
    fun_facts: data?.funFacts,
    country_id: countryId,
    city_id: stateId,
    is_married: married,
    have_kids: kids,
    is_minor: minor,
    hide_dob: hideDob,
    dob: moment(birthDate, TIME_FORMAT.MMslashDDslashYYYY).format(
      TIME_FORMAT.MMDDYYYY,
    ),
    bio: data?.bio,
  };

  const {mutateAsync: updateContestantDetails} = useCgMutation({
    key: UPDATE_CONTESTANT_EVENT,
    url: UPDATE_CONTESTANT_EVENT,
    body: updatedBody,
  });

  const updateDetailsAPI = async () => {
    setLoader(true);
    const response = await updateContestantDetails();
    if (response.success || response.status_code === ApiStatusType.Success) {
      setLoader(false);
      
      navigation.goBack();
    } else {
      setLoader(false);
    }
  };

  const {mutateAsync: getContestantDetails} = useCgMutation({
    key: GET_CONTESTANT_DETAILS,
    method: MethodTypes.GET,
    url: GET_CONTESTANT_DETAILS,
    auth: storeData.data?.access_token,
    offSuccessToast: true,
    disableLoader: true,
  });

  const getDetailsAPI = async () => {
    const res = await getContestantDetails();
    if (res.success || res.status_code === ApiStatusType.Success) {
      const dob = res?.data?.contestant?.dob;

      setBirthDate(
        moment(dob, TIME_FORMAT.MM_DD_YYYY).format(
          TIME_FORMAT.MMslashDDslashYYYY,
        ),
      );
      setDate(dob);
      setHairColor(res?.data?.contestant?.contestant_hair_color?.name);
      setHairColorId(res?.data?.contestant?.contestant_hair_color?.id);
      setEyeColor(res?.data?.contestant?.contestant_eye_color?.name);
      setEyeColorId(res?.data?.contestant?.contestant_eye_color?.id);
      setZodiacSign(res?.data?.contestant?.contestant_zodiac?.name);
      setZodiacId(res?.data?.contestant?.contestant_zodiac?.id);
      setHeight(res?.data?.contestant?.contestant_height?.slug);

      if (res?.data?.contestant?.height === -1) {
        setHideHeight(true);
        setHeight(-1);
      }
      setCountry(res?.data?.contestant?.contestant_country?.name);
      setCountryId(res?.data?.contestant?.contestant_country?.id);
      setStateId(res?.data?.contestant?.contestant_state?.id);
      setFirstName(res?.data?.contestant?.owner?.first_name + '');
      setLastName(res?.data?.contestant?.owner?.last_name + '');
      setHideDob(res?.data?.contestant?.hide_dob);
      setMinor(res?.data?.contestant?.is_minor);
      setMarried(res?.data?.contestant?.is_married);
      setKids(res?.data?.contestant?.have_kids);
      setState(res?.data?.contestant?.contestant_state?.name);
      setData({
        ...data,
        talent: isValueNull(res?.data?.contestant?.talent),
        funFacts: isValueNull(res?.data?.contestant?.fun_facts),
        platform: isValueNull(res?.data?.contestant?.pageant_plateform),
        ethinicity: isValueNull(res?.data?.contestant?.complexion),
        school: isValueNull(res?.data?.contestant?.college_attend),
        currentOccupation: isValueNull(res?.data?.contestant?.occupation),
        reason: isValueNull(res?.data?.contestant?.start_in_pageant),
        bio: isValueNull(res?.data?.contestant?.bio),
      });

      setLoader(false);
    }
  };
  const showDatepicker = () => {
    setOpen(true);
  };
  const hideDatepicker = () => {
    setOpen(false);
  };
  const onChange = selectedDate => {
    if (!isIosDevice()) {
      setOpen(false);
    }
    const currentDate = selectedDate || date;
    const tempDate = new Date(currentDate);
    setDate(currentDate);

    const fDate1 = moment(tempDate).format(TIME_FORMAT.MMslashDDslashYYYY);

    setBirthDate(fDate1);
    hideDatepicker();
  };

  const moveToAddEventDetail = () => {
    if (checkInterNet()) {
      navigation.navigate(SCREEN.ADD_EVENT_DETAIL);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader isLoading={loading} />
      <Header
        lable={translations.EDIT_CONTESTANT_DETAILS}
        rightText={
          selectedTab === translations.CONTESTANT_DETAILS
            ? translations.SAVE
            : ''
        }
        onPressRightText={() => handleClick()}
        isUnderLineRequired={true}
      />
      <TopSlider
        data={topData}
        selectedCallback={title => selectedCallbackFunction(title)}
        preSelected={props.route.params?.preSelectedTab}
      />
      <ScrollView
        keyboardShouldPersistTaps={true}
        ref={scrollRef}
        showsVerticalScrollIndicator={false}>
        {selectedTab === translations.CONTESTANT_DETAILS ? (
          <View style={styles.marginTop}>
            <OvelContainer
              lable={translations.DETAILS}
              conditionVar={basicDetailsViewVisible}
              onPress={() => {
                onPressBasicDetails();
              }}
            />
            {open && (
              <DateTimePickerModal
                maximumDate={new Date()}
                display={isIosDevice() ? 'inline' : 'default'}
                isVisible={open}
                mode={mode}
                date={
                  checkIsNull(birthDate)
                    ? new Date(
                        moment(
                          birthDate,
                          TIME_FORMAT.MMslashDDslashYYYY,
                        ).format(TIME_FORMAT.YYYYMMDD),
                      )
                    : new Date()
                }
                onConfirm={onChange}
                onCancel={hideDatepicker}
              />
            )}
            <CustomBottomModal
              isModalVisible={eyeColorModalVisible}
              setIsModalVisible={setEyeColorModalVisible}
              data={eyeColorDetails}
              preSelectedValue={eyeColorId}
              parentCallback={selectedText => callbackFunction(selectedText)}
              heading={translations.EYE_COLOR}
            />
            <CustomBottomModal
              isModalVisible={hairModalVisible}
              setIsModalVisible={setHairModalVisible}
              data={hairColorDetails}
              preSelectedValue={hairColorId}
              parentCallback={selectedText => callbackFunction(selectedText)}
              heading={translations.HAIR_COLOR}
            />

            <CustomBottomModal
              isModalVisible={zodiacSignModalVisible}
              setIsModalVisible={setZodiacSignModalVisible}
              data={zodiacSignDetails}
              preSelectedValue={zodiacId}
              parentCallback={selectedText => callbackFunction(selectedText)}
              heading={translations.ZODIAC_SIGN}
            />

            <HeightModal
              modalVisible={heightModalVisible}
              close={() => setHeightModalVisible(false)}
              onPressCancel={() => setHeightModalVisible(false)}
              onPressSave={() => setHeightModalVisible(false)}
              heightCallback={h => heightCallbackFunction(h)}
              previousHeight={height === -1 ? '' : height}
            />

            {basicDetailsViewVisible && (
              <View style={styles.pinkView}>
                <FloatingDropdown
                  floatingText={translations.DATE_OF_BIRTH}
                  value={birthDate}
                  errorMsg={birthDateError}
                  onFieldFocus={showDatepicker}
                  isMandatory={true}
                  rightIcon={<AppImages.Dashboard.CalenderIcon />}
                  onPressRightIcon={showDatepicker}
                />
                <View style={styles.agreeContainer}>
                  <View>
                    <TouchableOpacity
                      onPress={onPressHide}
                      style={[
                        styles.rowView,
                        {marginRight: moderateScale(24)},
                      ]}>
                      {hideDob === translations.YES ? (
                        <images.Common.Filled_ICON />
                      ) : (
                        <images.Common.UnFilled_ICON />
                      )}

                      <Text
                        style={
                          hideDob === translations.YES
                            ? styles.agreeText1
                            : styles.agreeText
                        }>
                        {translations.HIDE_DOB}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={onPressMinor}
                      style={styles.rowView}>
                      {minor === translations.YES ? (
                        <images.Common.Filled_ICON />
                      ) : (
                        <images.Common.UnFilled_ICON />
                      )}

                      <Text
                        style={
                          minor === translations.YES
                            ? styles.agreeText1
                            : styles.agreeText
                        }>
                        {translations.MINOR}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <FloatingDropdown
                  floatingText={translations.COMPETITION_HAIR_COLOR}
                  value={contestantHairColor}
                  errorMsg={hairColorError}
                  isMandatory={true}
                  onPressDropdown={() => {
                    setHairModalVisible(true);
                  }}
                  onFieldFocus={() => {
                    setHairModalVisible(true);
                  }}
                  dropdown={true}
                />
                <FloatingDropdown
                  floatingText={translations.EYE_COLOR}
                  value={contestantEyeColor}
                  isMandatory={true}
                  errorMsg={eyeColorError}
                  onPressDropdown={() => {
                    setEyeColorModalVisible(true);
                  }}
                  onFieldFocus={() => {
                    setEyeColorModalVisible(true);
                  }}
                  dropdown={true}
                />
                <FloatingDropdown
                  floatingText={translations.ZODIAC_SIGN}
                  onFieldFocus={() => {
                    setZodiacSignModalVisible(true);
                  }}
                  value={zodiacSign}
                  onPressDropdown={() => {
                    setZodiacSignModalVisible(true);
                  }}
                  dropdown={true}
                />
                <View style={hideHeight ? styles.opaceView : {}}>
                  <FloatingDropdown
                    floatingText={translations.HEIGHT}
                    dropdown={true}
                    value={hideHeight ? translations.HIDDEN : height}
                    onFieldFocus={() => {
                      if (hideHeight) {
                        return;
                      } else {
                        setHeightModalVisible(true);
                      }
                    }}
                    isMandatory={true}
                    errorMsg={hideHeightError}
                  />
                </View>

                {hideHeight ? (
                  <Text
                    style={styles.heightTouchLine}
                    onPress={() => {
                      setHideHeight(false);
                      setHeight('');
                      setHideHeightError('');
                    }}>
                    {translations.SHOW_HEIGHT}
                  </Text>
                ) : (
                  <Text
                    style={styles.heightTouchLine}
                    onPress={() => {
                      setHideHeight(true);
                      setHideHeightError('');
                      setHeight(-1);
                    }}>
                    {translations.HIDE_HEIGHT}
                  </Text>
                )}

                <SearchCountryState
                  title={
                    isCountryStateModalKey === ITEM_KEY.COUNTRY
                      ? translations.SEARCH_COUNTRY
                      : translations.SEARCH_STATES
                  }
                  modelId={isCountryStateModalKey}
                  isModalVisible={isCountryStateModalVisible}
                  setIsModalVisible={setCountryStateModalVisible}
                  preSelectedValue={
                    isCountryStateModalKey === ITEM_KEY.COUNTRY
                      ? countryId
                      : stateId
                  }
                  countryId={countryId}
                  onItemSelect={onItemSelection}
                />
                <FloatingDropdown
                  floatingText={translations.COUNTRY}
                  value={country}
                  errorMsg={countryError}
                  onFieldFocus={() => {
                    setCountryStateModalKey(ITEM_KEY.COUNTRY);
                    setCountryStateModalVisible(true);
                  }}
                  isMandatory={true}
                  dropdown={true}
                  maxLength={250}
                />
                <FloatingDropdown
                  floatingText={translations.STATE}
                  value={contestantState}
                  errorMsg={stateError}
                  isMandatory={true}
                  onFieldFocus={() => {
                    if (countryId > 0) {
                      setCountryStateModalKey(ITEM_KEY.STATE);
                      setCountryStateModalVisible(true);
                    } else {
                      toast(
                        translations.PLEASE_SELECT_A_COUNTRY,
                        toastType.SUCESS_TOAST,
                      );
                    }
                  }}
                  dropdown={true}
                  maxLength={100}
                />
                <Text style={styles.inputLabel}>Married</Text>
                <View style={styles.radioContainer}>
                  <TouchableOpacity
                    style={styles.label}
                    onPress={() => onPressMarried(translations.YES)}>
                    {married === translations.YES ? (
                      <AppImages.Common.RadioButton />
                    ) : (
                      <AppImages.Common.Ellipse />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.label}
                    onPress={() => onPressMarried(translations.YES)}>
                    <Text style={married === translations.YES && styles.label1}>
                      {translations.YES}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.label}
                    onPress={() => onPressMarried(translations.NO_SMALL)}>
                    {married === translations.NO_SMALL ? (
                      <AppImages.Common.RadioButton />
                    ) : (
                      <AppImages.Common.Ellipse />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.label}
                    onPress={() => onPressMarried(translations.NO_SMALL)}>
                    <Text
                      style={
                        married === translations.NO_SMALL && styles.label1
                      }>
                      {translations.NO_SMALL}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.inputLabel}>Kids</Text>
                <View style={styles.radioContainer}>
                  <TouchableOpacity
                    style={styles.label}
                    onPress={() => {
                      onPressKids(translations.YES);
                    }}>
                    {kids === translations.YES ? (
                      <AppImages.Common.RadioButton />
                    ) : (
                      <AppImages.Common.Ellipse />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.label}
                    onPress={() => {
                      onPressKids(translations.YES);
                    }}>
                    <Text style={kids === translations.YES && styles.label1}>
                      {translations.YES}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.label}
                    onPress={() => {
                      onPressKids(translations.NO_SMALL);
                    }}>
                    {kids === translations.NO_SMALL ? (
                      <AppImages.Common.RadioButton />
                    ) : (
                      <AppImages.Common.Ellipse />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.label}
                    onPress={() => {
                      onPressKids(translations.NO_SMALL);
                    }}>
                    <Text
                      style={kids === translations.NO_SMALL && styles.label1}>
                      {translations.NO_SMALL}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <OvelContainer
              lable={translations.FUN_FACTS}
              conditionVar={professionalDetailsViewVisible}
              onPress={() => {
                onPressProfessionalDetails();
              }}
            />
            {professionalDetailsViewVisible && (
              <View style={styles.pinkView}>
                <FloatingInput
                  floatingText={translations.TALENT}
                  value={data.talent}
                  nextField={ethinicityRef}
                  setText={value =>
                    setData({
                      ...data,
                      talent: removeEmojis(value),
                    })
                  }
                  returnKeyType={'next'}
                  autoCapitalize={'sentences'}
                  errorMsg={talentErr}
                />

                <FloatingInput
                  floatingText={translations.ETHINICITY}
                  value={data.ethinicity}
                  nextField={funfactsRef}
                  setRef={ref => setEthinicityRef(ref)}
                  setText={value =>
                    setData({
                      ...data,
                      ethinicity: removeEmojis(value),
                    })
                  }
                  returnKeyType={'next'}
                  autoCapitalize={'sentences'}
                  errorMsg={contestantEthnicityErr}
                />

                <FloatingInput
                  floatingText={translations.INTERESTING_FACTS}
                  value={data.funFacts}
                  setText={value =>
                    setData({
                      ...data,
                      funFacts: removeEmojis(value),
                    })
                  }
                  returnKeyType={'next'}
                  setRef={ref => setFunfactsRef(ref)}
                  nextField={contestantSchoolRef}
                  keyboardType={'email-address'}
                  autoCapitalize={'sentences'}
                  errorMsg={funFactErr}
                />

                <FloatingInput
                  floatingText={translations.SCHOOL}
                  value={data.school}
                  setText={value =>
                    setData({
                      ...data,
                      school: removeEmojis(value),
                    })
                  }
                  setRef={ref => setSchoolRef(ref)}
                  returnKeyType={'next'}
                  nextField={platformRef}
                  autoCapitalize={'sentences'}
                  errorMsg={schoolErr}
                />
                <FloatingInput
                  floatingText={translations.PLATFORM}
                  value={data.platform}
                  setRef={ref => setPlatformRef(ref)}
                  nextField={currentOccupationRef}
                  setText={value =>
                    setData({
                      ...data,
                      platform: removeEmojis(value),
                    })
                  }
                  returnKeyType={'next'}
                  autoCapitalize={'sentences'}
                  errorMsg={platformErr}
                />
                <FloatingInput
                  floatingText={translations.CURRENT_OCCUPATION}
                  value={data.currentOccupation}
                  setRef={ref => setCurrentOccupationRef(ref)}
                  returnKeyType={'next'}
                  nextField={reasonRef}
                  setText={value =>
                    setData({
                      ...data,
                      currentOccupation: removeEmojis(value),
                    })
                  }
                  autoCapitalize={'sentences'}
                  errorMsg={currentOccupationErr}
                />
                <FloatingBigInput
                  value={data.reason}
                  setRef={ref => setReasonRef(ref)}
                  returnKeyType={'next'}
                  nextField={contestantAboutRef}
                  multiline={true}
                  floatingText={translations.REASON}
                  textAlignVertical={'top'}
                  lengthCheck={true}
                  setText={value =>
                    setData({
                      ...data,
                      reason: removeEmojis(value),
                    })
                  }
                  forMultiline={true}
                  autoCapitalize={'sentences'}
                  showLength={false}
                  errorMsg={reasonErr}
                />
                <FloatingBigInput
                  returnKeyType={'done'}
                  floatingText={translations.ABOUT}
                  value={data.bio}
                  setRef={ref => setAboutRef(ref)}
                  multiline={true}
                  textAlignVertical={'top'}
                  lengthCheck={true}
                  setText={value =>
                    setData({
                      ...data,
                      bio: removeEmojis(value),
                    })
                  }
                  forMultiline={true}
                  autoCapitalize={'sentences'}
                  errorMsg={aboutErr}
                  showLength={false}
                />
              </View>
            )}
          </View>
        ) : (
          selectedTab === translations.PAGEANT_ENTERED && <PageantEntered />
        )}

        <WarningModel
          msg={translations.MINOR_ERROR}
          isModalVisible={isMinorModalVisible}
          setConfirm={() => setMinor(translations.YES)}
          setIsModalVisible={setIsMinorModalVisible}
          headingStyle={styles.modalLabel}
        />
        <WarningModel
          msg={translations.BIRTHDATE_ERROR}
          isModalVisible={isBirthModalVisible}
          setConfirm={() => {
            setConfirm(true);
            setIsBirthModalVisible(false);
          }}
          setIsModalVisible={setIsBirthModalVisible}
          headingStyle={styles.modalLabel}
        />
      </ScrollView>
      {selectedTab !== translations.CONTESTANT_DETAILS && (
        <FloatingButton
          iconId={FLOATING_ICON.PLUS}
          onPress={() => moveToAddEventDetail()}
        />
      )}
    </SafeAreaView>
  );
};

export default EditContestantDetails;

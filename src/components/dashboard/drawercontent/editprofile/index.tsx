import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {styles} from './styles';
import Header from '../../../common/header';
import translations from '../../../../assets/translations';
import AppImages from '../../../../assets/images/AppImages';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';
import {SCREEN} from '../../../../root/screenname';
import FloatingInput from '../../../common/floatinginput';
import SocialLink from './component/sociallink';
import {
  useSetHideShowBottomBar,
  useSetLoader,
} from '../../../../store/useAppStore';
import FloatingDropdown from '../../../common/floatingdropown';
import BottomModal from '../../../common/bottommodal';
import {color} from '../../../../assets/colorConstant';
import {Auth} from '../../../../services/models/auth';
import {
  GENDER,
  ROLES,
  SOCIAL_HINT_LINK,
  USER_DESHBOARD_TAB,
} from '../../../utils/enum';
import SearchCountryState, {ITEM_KEY} from '../../../common/searchcountrystate';
import FastImageView from '../../../common/fastimageview';
import useCgMutation from '../../../../services/api/useCgMutation';
import {User} from '../../../../services/models/user/user';
import {
  toast,
  toastType,
  internetState,
  toastError,
} from '../../../common/commonalert';
import {
  isURL,
  checkMinLength,
  isValueNull,
  removeEmojis,
} from '../../../utils/validations';
import {
  GET_BASIC_DETAILS,
  UPDATE_BASIC_DETAILS,
} from '../../../../services/endpoints';
import {ApiStatusType, MethodTypes} from '../../../../services/constants';
import {UserContext} from '../../../../store/userStore';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import FloatingBigInput from '../../../common/floatingbiginput';
import SearchAdress from '../../../common/searchaddress';
import {isIosDevice, keyBoardManager} from '../../../utils/helperFunction';
import OvelContainer from '../../../common/ovelcontainer';
// import {GooglePlaceDetail} from 'react-native-google-places-autocomplete';

const EditProfile = props => {
  const navigation = useNavigation();
  const {storeData, setDataToStore} = useContext(UserContext);
  const setLoader = useSetLoader();
  const isFocus = useIsFocused();
  const netInfo = useNetInfo();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameRef, setLastNameRef] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [errFacebookLinkMsg, setFacebookErrMsg] = useState(false);
  const [instaLink, setInstaLink] = useState('');
  const [errInstaLinkMsg, setInstaErrMsg] = useState(false);
  const [youtubelink, setYoutubelink] = useState('');
  const [errYoutubelinkMsg, setYoutubelinkMsg] = useState(false);
  const [twitterLink, settwitterLink] = useState('');
  const [errTwitterLinkMsg, setTwitterErrMsg] = useState(false);
  const [pinterestLink, setPinterestLink] = useState('');
  const [errPintestLinkMsg, setPinterestErrMsg] = useState(false);
  const [linkedInLink, setLinkedInLink] = useState('');
  const [errLinedinLinkMsg, setLinkedinErrMsg] = useState(false);
  const [tiktokLink, setTiktokLink] = useState('');
  const [errTiltokLinkMsg, setTiktokErrMsg] = useState(false);
  const [gender, setGender] = useState('');
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
  const [isCountryStateModalVisible, setCountryStateModalVisible] =
    useState(false);
  const [isAddressModalVisible, setAddressModalVisible] = useState(false);
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [countryId, setCountryId] = useState(-1);
  const [city, setCity] = useState('');
  const [cityId, setCityId] = useState(-1);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [stateError, setStateError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [phoneNumberErr] = useState('');
  const [bioErr, setBioErr] = useState('');
  const [personalDetailsViewVisible, setPersonalDetailsViewVisible] =
    useState(true);
  const [isLocationExpand, setLocationExpand] = useState(false);
  const [contactDetailsViewVisible, setContactDetailsViewVisible] =
    useState(false);
  const [isCountryStateModalKey, setCountryStateModalKey] = useState(-1);
  const [LinkedAccountSViewVisible, setLinkedAccountSViewVisible] =
    useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
    setKeyboardStatus(true);
  });
  const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
    setKeyboardStatus(false);
  });

  const setHideBottomBar = useSetHideShowBottomBar();

  // API ---------------------------------------- Start
  const {mutateAsync: getBasicDetails} = useCgMutation<Auth>({
    key: GET_BASIC_DETAILS,
    method: MethodTypes.GET,
    url: GET_BASIC_DETAILS,
    offSuccessToast: true,
    disableLoader: false,
  });

  const updateBasicDetailsBody = {
    first_name: firstName,
    last_name: lastName,
    gender: gender,
    mobile: phoneNumber,
    country_id: countryId,
    state_id: cityId,
    bio: bio,
    address: address,
    latitude: latitude,
    longitude: longitude,
    facebook_page: facebookLink,
    twitter_page: twitterLink,
    pintrest_page: pinterestLink,
    youtube_page: youtubelink,
    instagram_page: instaLink,
    google_plus_page: null,
    linkedin_page: linkedInLink,
    tiktok_page: tiktokLink,
  };
  const {mutateAsync: updateBasicDetails} = useCgMutation<Auth>({
    key: UPDATE_BASIC_DETAILS,
    method: 'POST',
    body: updateBasicDetailsBody,
    url: UPDATE_BASIC_DETAILS,
  });

  // API ---------------------------------------- End

  /* The above code is using the useEffect hook to subscribe to the keyboard events. */
  useEffect(() => {
    keyBoardManager();
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  /**
   * It sets the countryId, country, and countryError state variables, and if the countryId is not equal
   * to the id passed in, it sets the city and cityId state variables to empty strings
   * @param {number} id - The id of the selected item.
   * @param {string} title - The title of the item selected.
   * @param {any} key - ITEM_KEY.COUNTRY
   */
  const onItemSelection = (id: number, title: string, key: any) => {
    if (key === ITEM_KEY.COUNTRY) {
      setCountryId(id);
      setCountry(title);
      setCountryError('');
      if (countryId !== id) {
        setCity('');
      }
      setCityId(0);
    } else if (key === ITEM_KEY.STATE) {
      setCity(title);
      setCityId(id);
      setStateError('');
    }
  };

  /**
   * A function that is called when the user selects an address from the modal.
   * @param {string} addres - The address of the location
   * @param {string} lat - latitude
   * @param {string} long - longitude
   */
  const onAddresss = (
    addres: string,
    lat: string,
    long: string,
    // details: GooglePlaceDetail,
  ) => {
    setAddress(addres);
    setLatitude(lat);
    setLongitude(long);
  };

  /* The above code is a React Hook. It is a function that lets you “hook into” React features. For
example, useState is a Hook that lets you add React state to function components. */
  useEffect(() => {
    if (isFocus) {
      displayUserDetail(storeData?.data?.user!!);
      NetInfo.fetch().then(state => {
        if (state.isConnected && state.isInternetReachable) {
          getDetails();
        } else {
          internetState(netInfo.isConnected!!);
        }
      });
      setContactDetailsViewVisible(false);
      setLinkedAccountSViewVisible(false);
    }
  }, [isFocus]);

  /**
   * It sets the state of the personalDetailsViewVisible to the opposite of what it currently is
   */
  const onPressPersonalDetails = () => {
    setPersonalDetailsViewVisible(!personalDetailsViewVisible);
    setContactDetailsViewVisible(false);
    setLinkedAccountSViewVisible(false);
    setLocationExpand(false);
  };

  /**
   * `onLocationPress` is a function that closes all the other expandable sections and sets the location
   * expandable section to the opposite of its current state
   */
  const onLocationPress = () => {
    closeAll();
    setLocationExpand(!isLocationExpand);
  };

  /**
   * It sets the state of the contactDetailsViewVisible variable to the opposite of what it currently is
   */
  const onPressContactDetails = () => {
    closeAll();
    setContactDetailsViewVisible(!contactDetailsViewVisible);
  };

  /**
   * It closes all the other views and then sets the LinkedAccountSViewVisible to the opposite of what it
   * was.
   */
  const onPressLinkedAccounts = () => {
    closeAll();
    setLinkedAccountSViewVisible(!LinkedAccountSViewVisible);
  };

  /**
   * It sets all the state variables to false
   */
  const closeAll = () => {
    setPersonalDetailsViewVisible(false);
    setContactDetailsViewVisible(false);
    setLinkedAccountSViewVisible(false);
    setLocationExpand(false);
  };

  /**
   * It takes a user object as an argument and sets the state of the component with the user's details
   * @param {User} user - User - The user object that is returned from the API.
   */
  const displayUserDetail = (user: User) => {
    const {personal_details} = user;
    setFirstName(personal_details?.first_name + '');
    setLastName(personal_details?.last_name + '');
    setGender(isValueNull(personal_details?.gender));
    setBio(isValueNull(user?.bio) + '');
    setCountry(user?.country?.name);
    setCity(user?.state?.name);
    setCityId(user?.state?.id);
    setCountryId(user?.country?.id);
    setAddress(user?.address !== null ? user?.address : '');
    setPhoneNumber(
      personal_details?.contact_details?.mobile === null
        ? ''
        : String(personal_details?.contact_details?.mobile),
    );
    setFacebookLink(personal_details?.linked_accounts?.facebook_page);
    settwitterLink(personal_details?.linked_accounts?.twitter_page);
    setPinterestLink(personal_details?.linked_accounts?.pintrest_page);
    setYoutubelink(personal_details?.linked_accounts?.youtube_page);
    setInstaLink(personal_details?.linked_accounts?.instagram_page);
    setLinkedInLink(personal_details?.linked_accounts?.linkedin_page);
    setTiktokLink(personal_details?.linked_accounts?.tiktok_page);
    setPersonalDetailsViewVisible(true);
  };

  /**
   * `getDetails` is an async function that calls `getBasicDetails` and if the response is successful, it
   * calls `displayUserDetail` with the user data
   */
  const getDetails = async () => {
    const userData = await getBasicDetails();
    if (userData.success) {
      displayUserDetail(userData?.data?.user!!);
    }
  };

  /**
   * The function checks if the user has entered all the required fields and if not, it displays an
   * error message
   */
  const isValid = () => {
    Keyboard.dismiss();
    const firstNameErr = checkMinLength(firstName, 1, translations.FIRST_NAME);
    const genderErr = checkMinLength(gender, 1, translations.GENDER);
    const bioError = checkMinLength(bio, 1, translations.BIO);

    if (firstNameErr !== '' || genderErr !== '' || bioError !== '') {
      setPersonalDetailsViewVisible(true);
      setFirstNameError(firstNameErr);
      setGenderError(genderErr);
      setBioErr(bioError);

      if (
        storeData?.data?.user?.primary_profile_type !== null &&
        storeData?.data?.user?.primary_profile_type === ROLES.CONTESTANT
      ) {
        toast(
          translations.YOUR_PROFILE_INFORMATION_IS_INCOMPLETE_PLEASE_COMPLETE_YOUR_ACCOUNT_DETAIL,
          toastType.ERROR_TOAST,
        );
      }

      return false;
    } else {
      setFirstNameError('');
      setGenderError('');
      setBioErr('');
    }

    const countryErr = checkMinLength(country, 1, translations.COUNTRY);
    const stateErr = checkMinLength(city, 1, translations.STATE);

    if (countryErr !== '' || stateErr !== '') {
      setPersonalDetailsViewVisible(false);
      setCountryError(countryErr);
      setStateError(stateErr);
      setLocationExpand(true);
      if (
        storeData?.data?.user?.primary_profile_type !== null &&
        storeData?.data?.user?.primary_profile_type === ROLES.CONTESTANT
      ) {
        toast(
          translations.YOUR_PROFILE_INFORMATION_IS_INCOMPLETE_PLEASE_COMPLETE_YOUR_ACCOUNT_DETAIL,
          toastType.ERROR_TOAST,
        );
      }
      return false;
    }

    if (!socialLinkValidation()) {
      return false;
    }
    return true;
  };

  /**
   * It checks if the social media links are valid URLs
   */
  const socialLinkValidation = () => {
    if (facebookLink?.length > 0) {
      if (!isURL(facebookLink)) {
        setFacebookErrMsg(true);
        return false;
      } else {
        setFacebookErrMsg(false);
      }
    } else {
      setFacebookErrMsg(false);
    }

    if (instaLink?.length > 0) {
      if (!isURL(instaLink)) {
        setInstaErrMsg(true);
        return false;
      } else {
        setInstaErrMsg(false);
      }
    } else {
      setFacebookErrMsg(false);
    }
    if (youtubelink?.length > 0) {
      if (!isURL(youtubelink)) {
        setYoutubelinkMsg(true);
        return false;
      } else {
        setYoutubelinkMsg(false);
      }
    } else {
      setYoutubelinkMsg(false);
    }
    if (twitterLink?.length > 0) {
      if (!isURL(twitterLink)) {
        setTwitterErrMsg(true);
        return false;
      } else {
        setTwitterErrMsg(false);
      }
    } else {
      setTwitterErrMsg(false);
    }
    if (pinterestLink?.length > 0) {
      if (!isURL(pinterestLink)) {
        setPinterestErrMsg(true);
        return false;
      } else {
        setPinterestErrMsg(false);
      }
    } else {
      setPinterestErrMsg(false);
    }
    if (linkedInLink?.length > 0) {
      if (!isURL(linkedInLink)) {
        setLinkedinErrMsg(true);
        return false;
      } else {
        setLinkedinErrMsg(false);
      }
    } else {
      setLinkedinErrMsg(false);
    }
    if (tiktokLink?.length > 0) {
      if (!isURL(tiktokLink)) {
        setTiktokErrMsg(true);
        return false;
      } else {
        setTiktokErrMsg(false);
      }
    } else {
      setTiktokErrMsg(false);
    }
    return true;
  };

  /**
   * It saves the user data to the server.
   */
  const saveButtonPressed = async () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else if (isValid()) {
      setLoader(true);
      const updatedUserData = await updateBasicDetails();
      if (
        updatedUserData.success ||
        updatedUserData.status_code === ApiStatusType.Error
      ) {
        const newStoreData = await getBasicDetails();
        if (
          newStoreData.success ||
          newStoreData.status_code === ApiStatusType.Error
        ) {
          const store = storeData;
          store.data.user = newStoreData.data?.user;
          setDataToStore(store);

          setHideBottomBar(false);

          if (
            props?.route?.params?.name != null &&
            props?.route?.params?.name === translations.FAN &&
            newStoreData.data?.user?.is_pageant_exist === false
          ) {
            // props.navigation.navigate(SCREEN.CREATE_PROFILE);
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: SCREEN.DASHBOARD_NAVIGATION,
                },
              ],
            });
          } else if (
            props?.route?.params?.name === translations.CLAIM_PROFILE
          ) {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: SCREEN.DASHBOARD_NAVIGATION,
                },
              ],
            });
            props.navigation.navigate(SCREEN.SELL_ITEM_SERVICES);
          } else if (
            props?.route?.params?.name !== null &&
            newStoreData.data?.user?.is_pageant_exist
          ) {
            navigation.reset({
              index: 0,
              routes: [{name: SCREEN.DASHBOARD_NAVIGATION}],
            });
            navigation.navigate(USER_DESHBOARD_TAB.DESHBOARD, {
              openPrimaryDashbord: true,
            });
          } else {
            props.navigation.goBack();
          }
        }
      }
    } else {
      toastError(translations.MANDATORY_FEILDS_ARE_NOT_FILLED);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        lable={translations.EDIT_PROFILE}
        rightText={translations.SAVE}
        onPressRightText={() => saveButtonPressed()}
        onPressBack={() =>
          props?.route?.params?.name === translations.CLAIM_PROFILE
            ? navigation.navigate(USER_DESHBOARD_TAB.CONVO)
            : navigation.goBack()
        }
        isUnderLineRequired
      />
      <ScrollView
        keyboardShouldPersistTaps={true}
        showsHorizontalScrollIndicator={false}>
        <KeyboardAvoidingView>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.demoImageContainer}
              onPress={() => {
                navigation.navigate(SCREEN.PROFLIE_IMAGE);
              }}>
              {storeData?.data?.user?.personal_details.profile_image_url ==
                null ||
              storeData?.data?.user?.personal_details.profile_image_url ==
                '' ? (
                <AppImages.Common.UserPlaceHolder_ICON
                  height={moderateScaleVertical(138)}
                  width={moderateScaleVertical(138)}
                />
              ) : (
                <FastImageView
                  width={moderateScaleVertical(138)}
                  height={moderateScaleVertical(138)}
                  borderRadius={moderateScaleVertical(138)}
                  imageUrl={
                    storeData?.data?.user?.personal_details.profile_image_url
                  }
                  isCircle
                />
              )}

              <View>
                <TouchableOpacity
                  style={styles.editBtnContainer}
                  onPress={() => {
                    navigation.navigate(SCREEN.PROFLIE_IMAGE);
                  }}>
                  <AppImages.EditProfile.Tpp_edit_circle_icon
                    width={moderateScale(24)}
                    height={moderateScale(24)}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <Text style={styles.userFullNameContainer} numberOfLines={1}>
              {storeData?.data?.user?.personal_details.first_name +
                ' ' +
                storeData?.data?.user?.personal_details.last_name}
            </Text>
            <Text style={styles.emailText}>{storeData?.data?.user?.email}</Text>
            <View style={styles.bottomLine} />
            <View style={styles.marHor16}>
              <OvelContainer
                lable={translations.PERSONAL_DETAILS}
                conditionVar={personalDetailsViewVisible}
                onPress={onPressPersonalDetails}
              />
            </View>

            {personalDetailsViewVisible && (
              <View style={styles.pinkView}>
                <FloatingInput
                  floatingText={translations.FIRST_NAME}
                  setText={value => setFirstName(removeEmojis(value))}
                  value={firstName}
                  returnKeyType={'next'}
                  isMandatory={true}
                  nextField={lastNameRef}
                  errorMsg={firstNameError}
                />
                <FloatingInput
                  floatingText={translations.LAST_NAME}
                  setText={value => setLastName(removeEmojis(value))}
                  value={lastName}
                  setRef={ref => setLastNameRef(ref)}
                  returnKeyType={'done'}
                />

                <FloatingDropdown
                  floatingText={translations.GENDER}
                  setText={value => setGender(value)}
                  value={gender}
                  isMandatory={true}
                  onFieldFocus={() => {
                    setIsGenderModalVisible(true);
                  }}
                  errorMsg={genderError}
                />

                <BottomModal
                  isModalVisible={isGenderModalVisible}
                  setIsModalVisible={setIsGenderModalVisible}
                  customStyles={{
                    height: '30%',
                    paddingHorizontal: moderateScaleVertical(16),
                  }}>
                  <View>
                    <View style={styles.headingView}>
                      <Text style={styles.modalHeading}>
                        {translations.GENDER}
                      </Text>
                      <TouchableOpacity
                        style={styles.crossIcon}
                        onPress={() => {
                          setIsGenderModalVisible(false);
                        }}>
                        <AppImages.ProfileImage.Tpp_cross_icon />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.bottomContainer}>
                      <TouchableOpacity
                        style={styles.textView}
                        onPress={() => {
                          setGender(GENDER.MALE);
                          setIsGenderModalVisible(false);
                        }}>
                        <Text
                          style={
                            gender === GENDER.MALE
                              ? {...styles.selectiontext, color: color.P_PINK}
                              : styles.selectiontext
                          }>
                          {translations.MALE}
                        </Text>
                        {gender === GENDER.MALE && (
                          <AppImages.Common.PinkTickIcon />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.textView}
                        onPress={() => {
                          setGender(GENDER.FEMALE);
                          setIsGenderModalVisible(false);
                        }}>
                        <Text
                          style={
                            gender === GENDER.FEMALE
                              ? {...styles.selectiontext, color: color.P_PINK}
                              : styles.selectiontext
                          }>
                          {translations.FEMALE}
                        </Text>
                        {gender === GENDER.FEMALE && (
                          <AppImages.Common.PinkTickIcon />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.textView}
                        onPress={() => {
                          setGender(GENDER.TRANSGENDER);
                          setIsGenderModalVisible(false);
                        }}>
                        <Text
                          style={
                            gender === GENDER.TRANSGENDER
                              ? {...styles.selectiontext, color: color.P_PINK}
                              : styles.selectiontext
                          }>
                          {translations.TRANSGENDER}
                        </Text>
                        {gender === GENDER.TRANSGENDER && (
                          <AppImages.Common.PinkTickIcon />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </BottomModal>
                <FloatingBigInput
                  floatingText={translations.BIO}
                  value={bio}
                  multiline={true}
                  numberOfLines={3}
                  textAlignVertical={'top'}
                  lengthCheck={true}
                  maxLength={250}
                  isMandatory
                  errorMsg={bioErr}
                  setText={value => setBio(removeEmojis(value))}
                  forMultiline={true}
                  autoCapitalize={'sentences'}
                />
              </View>
            )}

            <View style={styles.marHor16}>
              <OvelContainer
                lable={translations.LOCATION}
                conditionVar={isLocationExpand}
                onPress={onLocationPress}
              />
            </View>
            {isLocationExpand && (
              <View style={styles.pinkView}>
                <FloatingDropdown
                  floatingText={translations.COUNTRY}
                  setText={value => setCountry(value)}
                  value={country}
                  isMandatory={true}
                  onFieldFocus={() => {
                    setCountryStateModalKey(ITEM_KEY.COUNTRY);
                    setCountryStateModalVisible(true);
                  }}
                  errorMsg={countryError}
                />
                <FloatingDropdown
                  floatingText={translations.STATE}
                  setText={value => setCity(value)}
                  value={city}
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
                  errorMsg={stateError}
                />
                <FloatingDropdown
                  floatingText={translations.ADDRESS}
                  setText={value => setAddress(removeEmojis(value))}
                  value={address}
                  onFieldFocus={() => {
                    setAddressModalVisible(true);
                  }}
                />

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
                      : cityId
                  }
                  countryId={countryId}
                  onItemSelect={onItemSelection}
                />
                {/* <SearchAdress
                  isModalVisible={isAddressModalVisible}
                  setIsModalVisible={setAddressModalVisible}
                  onItemSelect={onAddresss}
                /> */}
              </View>
            )}

            <View style={styles.marHor16}>
              <OvelContainer
                lable={translations.CONTACT_DETIALS}
                conditionVar={contactDetailsViewVisible}
                onPress={onPressContactDetails}
              />
            </View>
            {contactDetailsViewVisible && (
              <View style={styles.pinkView}>
                <FloatingInput
                  floatingText={translations.PHONE_NUMBER}
                  value={phoneNumber}
                  setText={value => setPhoneNumber(value.replace(/[^\d]/g, ''))}
                  returnKeyType={'done'}
                  keyboardType={'number-pad'}
                  errorMsg={phoneNumberErr}
                  maxLength={15}
                />
              </View>
            )}
            <View style={styles.marHor16}>
              <OvelContainer
                lable={translations.SOCAIL_ACCOUNT}
                conditionVar={LinkedAccountSViewVisible}
                onPress={onPressLinkedAccounts}
              />
            </View>

            {LinkedAccountSViewVisible && (
              <View style={styles.pinkView}>
                <SocialLink
                  image={
                    <AppImages.Drawer.FB
                      width={moderateScale(32)}
                      height={moderateScaleVertical(32)}
                    />
                  }
                  hint={SOCIAL_HINT_LINK.FACEBOOK}
                  lable={translations.FACEBOOK}
                  onChageText={setFacebookLink}
                  valueBack={facebookLink}
                  errMsg={errFacebookLinkMsg}
                />
                <SocialLink
                  image={
                    <AppImages.Drawer.Insta
                      width={moderateScale(32)}
                      height={moderateScaleVertical(32)}
                    />
                  }
                  hint={SOCIAL_HINT_LINK.INSTAGRAM}
                  lable={translations.INSTAGRAM}
                  onChageText={setInstaLink}
                  valueBack={instaLink}
                  errMsg={errInstaLinkMsg}
                />
                <SocialLink
                  image={
                    <AppImages.Drawer.Youtube
                      width={moderateScale(32)}
                      height={moderateScaleVertical(32)}
                    />
                  }
                  hint={SOCIAL_HINT_LINK.YOUTUBE}
                  lable={translations.YOUTUBE}
                  onChageText={setYoutubelink}
                  valueBack={youtubelink}
                  errMsg={errYoutubelinkMsg}
                />
                <SocialLink
                  image={
                    <AppImages.Drawer.Twitter
                      width={moderateScale(32)}
                      height={moderateScaleVertical(32)}
                    />
                  }
                  hint={SOCIAL_HINT_LINK.TWEETER}
                  lable={translations.TWEETER}
                  onChageText={settwitterLink}
                  valueBack={twitterLink}
                  errMsg={errTwitterLinkMsg}
                />
                <SocialLink
                  image={
                    <AppImages.Drawer.Pintrest
                      width={moderateScale(32)}
                      height={moderateScaleVertical(32)}
                    />
                  }
                  hint={SOCIAL_HINT_LINK.PINTEREST}
                  lable={translations.PINTEREST}
                  onChageText={setPinterestLink}
                  errMsg={errPintestLinkMsg}
                  valueBack={pinterestLink}
                />
                <SocialLink
                  image={
                    <AppImages.Drawer.LinkedIn
                      width={moderateScale(32)}
                      height={moderateScaleVertical(32)}
                    />
                  }
                  hint={SOCIAL_HINT_LINK.LINKEDIN}
                  lable={translations.LINKEDIN}
                  errMsg={errLinedinLinkMsg}
                  onChageText={setLinkedInLink}
                  valueBack={linkedInLink}
                />
                <SocialLink
                  image={
                    <AppImages.Drawer.TicTok
                      width={moderateScale(32)}
                      height={moderateScaleVertical(32)}
                    />
                  }
                  hint={SOCIAL_HINT_LINK.TIKTOK}
                  lable={translations.TIKTOK}
                  onChageText={setTiktokLink}
                  errMsg={errTiltokLinkMsg}
                  valueBack={tiktokLink}
                />
              </View>
            )}
          </View>
          {keyboardStatus === true && isIosDevice() ? (
            <View style={styles.staticHeightIOS} />
          ) : (
            <View style={styles.staticHeight} />
          )}
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

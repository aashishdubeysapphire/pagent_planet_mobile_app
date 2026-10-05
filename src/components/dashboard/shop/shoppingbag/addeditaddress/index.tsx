import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Header from '../../../../common/header';
import {styles} from './styles';
import translations from '../../../../../assets/translations';
import {
  checkIsConnected,
  keyBoardManager,
  removeMiddleSpaces,
} from '../../../../utils/helperFunction';
import FloatingInput from '../../../../common/floatinginput';
import FloatingDropdown from '../../../../common/floatingdropown';
import {toast, toastError, toastType} from '../../../../common/commonalert';
import {MethodTypes} from '../../../../../services/constants';
import {
  ADD_EDIT_ADDRESS,
  GET_ADDRESS_DETILS,
} from '../../../../../services/endpoints';
import useCgMutation from '../../../../../services/api/useCgMutation';
import SearchCountryState, {
  ITEM_KEY,
} from '../../../../common/searchcountrystate';
import AppImages from '../../../../../assets/images/AppImages';
import {
  ADDRESS_TYPE,
  FORM_TYPE,
  PAYMENT_FOR,
  REFESH_SCREEN,
} from '../../../../utils/enum';
import CustomButton from '../../../../common/button';
import {isvalid} from './validations';
import {isValueNull, removeEmojis} from '../../../../utils/validations';
import {useNavigation} from '@react-navigation/core';
import {SHOPPING_BAG} from '../localEnum';
import Loader from '../../../../common/customloader';
import {Base} from '../../../../../services/models/base';
import {UserContext} from '../../../../../store/userStore';
import {useSetScreenRefresh} from '../../../../../store/useAppStore';
import {useKeyboard} from '@react-native-community/hooks';

const AddEditAddress = props => {
  const {
    formType,
    addressType,
    firstTimeForm,
    setStep,
    addressId,
    refeshScreenList,
    refectAPI,
    setBillAddressState,
    setIsBillingAddress,
  } = props?.route?.params;
  const {storeData} = useContext(UserContext);
  const {keyboardShown} = useKeyboard();

  const [isCountryStateModalVisible, setCountryStateModalVisible] =
    React.useState(false);
  const [isCountryStateModalKey, setCountryStateModalKey] = React.useState(0);
  const [state, setState] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [countryId, setCountryId] = React.useState('');
  const [stateId, setStateId] = React.useState('');
  const [isDefault, setIsDefault] = React.useState(false);
  const [makeSameAsShippingAddress, setMakeSameAsShippingAddress] =
    useState(false);
  const [data, setData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });
  const scrollRef = useRef();
  const [dataSourceCords, setDataSourceCords] = useState({});
  const [lastNameRef, setLastNameRef] = useState();
  const [emailRef, setEmailRef] = useState();
  const [phoneRef, setPhoneRef] = useState();
  const [addressRef, setAddressRef] = useState();
  const [zipRef, setzipRef] = useState();
  const [errorMsg, setError] = React.useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const setScreenRefresh = useSetScreenRefresh();

  useEffect(() => {
    keyBoardManager();
    formType == FORM_TYPE.EDIT && hitGetAddressDetails();
    getContactDetails();
  }, []);

  const adressBody = {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    phone: data.phone,
    address: data.address,
    country_id: countryId,
    city_id: stateId,
    city: data.city,
    zipcode: data.zipCode,
    type: addressType == ADDRESS_TYPE.BILLING ? 0 : 1,
    id: formType == FORM_TYPE.ADD ? '' : addressId,
    is_default_address: isDefault ? 1 : 0,
    save_as_shipping: makeSameAsShippingAddress ? 1 : 0,
  };
  const {mutateAsync: postAddEditAddress} = useCgMutation<Base>({
    key: ADD_EDIT_ADDRESS,
    url: ADD_EDIT_ADDRESS,
    body: adressBody,
    offSuccessToast: false,
    disableLoader: true,
  });

  const {mutateAsync: getAddressDetails} = useCgMutation({
    key: GET_ADDRESS_DETILS + addressId,
    url: GET_ADDRESS_DETILS + addressId,
    method: MethodTypes.GET,
    offSuccessToast: true,
    disableLoader: true,
  });
  const moveToError = key => {
    if (scrollRef?.current) {
      scrollRef?.current?.scrollTo({
        x: 0,
        y: dataSourceCords[removeMiddleSpaces(key)],
        animated: true,
      });
    }
  };
  const hitGetAddressDetails = async () => {
    if (checkIsConnected()) {
      setIsLoading(true);

      const res = await getAddressDetails();
      if (res.success) {
        let {addresDetails} = res?.data;
        onChangeDetails({
          firstName: addresDetails.first_name,
          lastName: addresDetails.last_name,
          email: addresDetails.email,
          phone: addresDetails.phone,
          address: addresDetails.address,
          city: addresDetails.city,
          zipCode: addresDetails.zipcode,
        });
        setState(addresDetails?.state_name?.name);
        setStateId(addresDetails?.state_name?.id);
        setCountry(addresDetails?.country_name?.name);
        setCountryId(addresDetails?.country_name?.id);
        setIsDefault(addresDetails?.is_default_address == 1 ? true : false);
      }
      setIsLoading(false);
    }
  };
  const hitPostAddEditAddress = async () => {
    if (checkIsConnected()) {
      setIsLoading(true);

      const res = await postAddEditAddress();
      if (res.success) {
        !!props?.route?.params.paymentType !== undefined &&
          props?.route?.params.paymentType ===
            PAYMENT_FOR.BUY_VOTE_FOR_CONTESTANT &&
          setScreenRefresh(REFESH_SCREEN.CONTESTANT_VOTE_SCREEN);

        if (!!setBillAddressState) {
          setBillAddressState(true);
          setScreenRefresh(REFESH_SCREEN.PCA_ADDRESS);
        }
        !!setStep && setStep(SHOPPING_BAG.ADDRESS);
        !!refeshScreenList && refeshScreenList();
        !!refectAPI && refectAPI();
        !!setIsBillingAddress && setIsBillingAddress(true);
        navigation.goBack();
      }
      setIsLoading(false);
    }
  };
  const onChangeErr = val => {
    setError({...errorMsg, ...val});
  };
  const onChangeDetails = val => {
    setData({...data, ...val});
  };

  const onItemSelection = (id: number, title: string, key: any) => {
    if (key === ITEM_KEY.COUNTRY) {
      setCountryId(id);
      setCountry(title);
      if (countryId !== id) {
        setState('');
      }
      setStateId(0);
    } else if (key === ITEM_KEY.STATE) {
      setState(title);
      setStateId(id);
    }
  };

  const headerText = () => {
    if (formType == FORM_TYPE.ADD) {
      return (
        formType + translations.NEW + addressType + ' ' + translations.ADDRESS
      );
    } else {
      return formType + ' ' + addressType + ' ' + translations.ADDRESS;
    }
  };

  const getButtonLable = () => {
    if (formType == FORM_TYPE.ADD) {
      return formType + ' ' + addressType + ' ' + translations.ADDRESS;
    } else {
      return translations.SAVE + ' ' + translations.ADDRESS;
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
    if (firstTimeForm) {
      setStep(SHOPPING_BAG.BAG);
    } else if (
      props?.route?.params.paymentType !== undefined &&
      props?.route?.params.paymentType === PAYMENT_FOR.BUY_VOTE_FOR_CONTESTANT
    ) {
      navigation.goBack();
    } else if (!!setStep) {
      setStep(SHOPPING_BAG.ADDRESS);
    }
  };
  const onPressSubmit = () => {
    if (isvalid(data, countryId, stateId, onChangeErr, moveToError)) {
      hitPostAddEditAddress();
    } else {
      toastError(translations.MANDATORY_FEILDS_ARE_NOT_FILLED);
    }
  };
  const getContactDetails = () => {
    onChangeDetails({
      firstName: storeData.data?.user.first_name,
      lastName: storeData.data?.user.last_name,
      email: storeData.data?.user.email,
      phone: storeData.data?.user.personal_details.contact_details.mobile,
    });
  };
  return (
    <SafeAreaView style={styles.mainContiner}>
      <Loader isLoading={isLoading} />
      <Header
        lable={headerText()}
        isUnderLineRequired
        onPressBack={handleBackPress}
      />
      {firstTimeForm ? (
        <Image
          source={AppImages.SHOPING_BAG.addressHeader}
          style={styles.headerImg}
        />
      ) : props?.route?.params.paymentType !== undefined &&
        props?.route?.params.paymentType ===
          PAYMENT_FOR.BUY_VOTE_FOR_CONTESTANT ? (
        <Image
          source={AppImages.SHOPING_BAG.addressticked}
          style={styles.headerImg}
        />
      ) : null}

      <ScrollView keyboardShouldPersistTaps={'always'} ref={scrollRef}>
        <View style={styles.continer}>
          <Text style={styles.ContactDetilsText}>
            {translations.CONTACT_DETIALS}
          </Text>

          <View style={{flexDirection: 'row'}}>
            <FloatingInput
              floatingText={translations.FIRST_NAME}
              returnKeyType={'next'}
              value={isValueNull(data?.firstName)}
              nextField={lastNameRef}
              setText={val => onChangeDetails({firstName: removeEmojis(val)})}
              isMandatory
              customStyles={styles.dynamicWidth}
              maxLength={250}
              errorMsg={errorMsg?.firstName}
              laoutY={(val: any, index: string) => {
                let obj = dataSourceCords;
                obj[index] = val;
                setDataSourceCords(obj);
              }}
            />
            <FloatingInput
              floatingText={translations.LAST_NAME}
              isMandatory
              returnKeyType={'next'}
              setRef={reff => setLastNameRef(reff)}
              nextField={emailRef}
              setText={val => onChangeDetails({lastName: removeEmojis(val)})}
              value={isValueNull(data?.lastName)}
              customStyles={styles.dynamicWidth2}
              errorMsg={errorMsg?.lastName}
              maxLength={250}
            />
          </View>
          <FloatingInput
            floatingText={translations.EMAIL + translations.ID}
            isMandatory
            returnKeyType={'next'}
            setRef={val => setEmailRef(val)}
            nextField={phoneRef}
            value={isValueNull(data?.email)}
            setText={val => onChangeDetails({email: removeEmojis(val)})}
            errorMsg={errorMsg?.email}
            maxLength={250}
            laoutY={(val: any, index: string) => {
              let obj = dataSourceCords;
              obj[index] = val;
              setDataSourceCords(obj);
            }}
          />
          <Text style={[styles.note]}>
            {translations.NOTE}{' '}
            <Text style={styles.noteText}>{translations.EMAIL_ID_NOTE}</Text>
          </Text>
          <FloatingInput
            floatingText={translations.PHONE}
            isMandatory
            returnKeyType={'next'}
            setRef={reff => setPhoneRef(reff)}
            nextField={addressRef}
            keyboardType="numeric"
            value={isValueNull(data?.phone)}
            setText={val =>
              onChangeDetails({phone: removeEmojis(val).replace(/[^\d]/g, '')})
            }
            errorMsg={errorMsg?.phone}
            maxLength={16}
            laoutY={(val: any, index: string) => {
              let obj = dataSourceCords;
              obj[index] = val;
              setDataSourceCords(obj);
            }}
          />
        </View>

        <View style={styles.seperator} />
          <Text style={[styles.ContactDetilsText,styles.custusInputStyle]}>
            {translations.ADDRESS + ' ' + translations.DETAILS}
          </Text>
          <FloatingInput
            floatingText={translations.ADDRESS}
            isMandatory
            returnKeyType={'done'}
            setRef={reff => setAddressRef(reff)}
            value={isValueNull(data?.address)}
            setText={val => onChangeDetails({address: removeEmojis(val)})}
            errorMsg={errorMsg?.address}
            maxLength={250}
            customStyles={styles.custusInputStyle}
            laoutY={(val: any, index: string) => {
              let obj = dataSourceCords;
              obj[index] = val;
              setDataSourceCords(obj);
            }}
          />

          <FloatingDropdown
            floatingText={translations.COUNTRY}
            value={country}
            errorMsg={errorMsg?.country}
            onFieldFocus={() => {
              setCountryStateModalKey(ITEM_KEY.COUNTRY);
              setTimeout(() => {
                setCountryStateModalVisible(true);
              }, 1000);
            }}
            isMandatory={true}
            laoutY={(val: any, index: string) => {
              let obj = dataSourceCords;
              obj[index] = val;
              setDataSourceCords(obj);
            }}
            customStyles={styles.custusInputStyle}

          />
          <FloatingDropdown
            floatingText={translations.STATE}
            value={state}
            errorMsg={errorMsg?.state}
            isMandatory={true}
            onFieldFocus={() => {
              if (countryId > 0) {
                setCountryStateModalKey(ITEM_KEY.STATE);
                setTimeout(() => {
                  setCountryStateModalVisible(true);
                }, 1000);
              } else {
                toast(
                  translations.PLEASE_SELECT_A_COUNTRY,
                  toastType.ERROR_TOAST,
                );
              }
            }}
            laoutY={(val: any, index: string) => {
              let obj = dataSourceCords;
              obj[index] = val;
              setDataSourceCords(obj);
            }}
            customStyles={styles.custusInputStyle}

          />

          <FloatingInput
            floatingText={translations.CITY}
            isMandatory
            returnKeyType={'next'}
            nextField={zipRef}
            value={isValueNull(data?.city)}
            setText={val => onChangeDetails({city: removeEmojis(val)})}
            errorMsg={errorMsg?.city}
            maxLength={250}
            laoutY={(val: any, index: string) => {
              let obj = dataSourceCords;
              obj[index] = val;
              setDataSourceCords(obj);
            }}
            customStyles={styles.custusInputStyle}

          />
          <FloatingInput
            floatingText={translations.ZIPCODE}
            isMandatory
            returnKeyType={'done'}
            setRef={reff => setzipRef(reff)}
            value={isValueNull(data?.zipCode)}
            setText={val =>
              onChangeDetails({
                zipCode: removeEmojis(val).replace(/[^\d]/g, ''),
              })
            }
            keyboardType="number-pad"
            errorMsg={errorMsg?.zipCode}
            maxLength={10}
            laoutY={(val: any, index: string) => {
              let obj = dataSourceCords;
              obj[index] = val;
              setDataSourceCords(obj);
            }}
            customStyles={styles.custusInputStyle}

          />

          <View style={[styles.rowView , styles.custusInputStyle]}>
            <TouchableOpacity
              onPress={() => setIsDefault(!isDefault)}
              style={styles.tickIcon}>
              {isDefault ? (
                <AppImages.Common.Filled_ICON />
              ) : (
                <AppImages.Common.UnFilled_ICON />
              )}
            </TouchableOpacity>
            <Text
              style={[
                styles.addresText,
                !isDefault && styles.unselectedTickText,
              ]}>
              {translations.SET_AS_DEFAULT +
                addressType +
                ' ' +
                translations.ADDRESS}
            </Text>
          </View>
          {addressType == ADDRESS_TYPE.BILLING && formType == FORM_TYPE.ADD && (
            <View style={[styles.rowView, styles.mar16 , styles.custusInputStyle]}>
              <TouchableOpacity
                onPress={() =>
                  setMakeSameAsShippingAddress(!makeSameAsShippingAddress)
                }
                style={styles.tickIcon}>
                {makeSameAsShippingAddress ? (
                  <AppImages.Common.Filled_ICON />
                ) : (
                  <AppImages.Common.UnFilled_ICON />
                )}
              </TouchableOpacity>
              <Text
                style={[
                  styles.addresText,
                  !makeSameAsShippingAddress && styles.unselectedTickText,
                ]}>
                {translations.MAKE_THIS_AS_YOUR_SHIPPING_ADDRESS}
              </Text>
            </View>
          )}
      </ScrollView>
      {!keyboardShown && (
        <View style={styles.buttonView}>
          <CustomButton
            label={getButtonLable()}
            inactive={true}
            onPress={onPressSubmit}
          />
        </View>
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
          isCountryStateModalKey === ITEM_KEY.COUNTRY ? countryId : stateId
        }
        countryId={countryId}
        onItemSelect={onItemSelection}
      />
    </SafeAreaView>
  );
};

export default AddEditAddress;

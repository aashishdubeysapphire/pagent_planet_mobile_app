import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../../../common/header';
import translations from '../../../../assets/translations';
import {styles} from './styles';
import AppImages from '../../../../assets/images/AppImages';

import FloatingInput from '../../../common/floatinginput';
import FloatingDropdown from '../../../common/floatingdropown';
import CustomBottomModal from '../../../common/custombottommodal';
import {SCREEN} from '../../../../root/screenname';
import {useNavigation} from '@react-navigation/core';
import CustomButton from '../../../common/button';
import {removeEojies} from '../../../utils/validations';
import SearchAdress from '../../../common/searchaddress';
import {
  checkIsConnected,
  removeMiddleSpaces,
} from '../../../utils/helperFunction';
import useCgMutation from '../../../../services/api/useCgMutation';
import {
  GET_DROPDOWN_VALUES,
  SAVE_BANK_DETAILS,
} from '../../../../services/endpoints';
import {MethodTypes} from '../../../../services/constants';
import {Base} from '../../../../services/models/base';
import Loader from '../../../common/customloader';
import {
  accountNumberValidation as isAccountNumberValid,
  confirmAccountNumberValidation as isConfirmAccountNumberValid,
  validation,
} from './validations';
import {toastError} from '../../../common/commonalert';
import {useKeyboard} from '@react-native-community/hooks';

const AddEditBankDetails = props => {
  const {isEdit, refetch} = props.route.params;
  const navigation = useNavigation();
  const {keyboardShown} = useKeyboard();
  const scrollRef = useRef();
  const [dataSourceCords, setDataSourceCords] = useState({});
  const [selectedType, setSelectedType] = useState(translations.USA);
  const [loader, setLoader] = useState(false);
  const [isAccount, setAccountActive] = React.useState(true);
  const [isConfirmAccount, setConfirmAccountActive] = React.useState(true);
  const [isDropWordVisible, setIsDropWordVisible] = useState({
    whereWouldYouLikeTransfer: false,
    currency: false,
    country: false,
    address: false,
  });
  const [data, setData] = useState({
    bankName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    nameOnTheAccount: '',
    whereWouldYouLikeTransfer: '',
    routingNumber: '',
    currency: '',
    country: '',
    address: '',
    swiftCode: '',
    isTandCAccepted: false,
  });
  const [err, setErr] = useState({
    bankName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    nameOnTheAccount: '',
    whereWouldYouLikeTransfer: '',
    routingNumber: '',
    currency: '',
    country: '',
    address: '',
    swiftCode: '',
  });
  const [dropDownData, setDropDownData] = useState({
    whereWouldYouLikeTransfer: [],
    country: [],
    currency: [],
  });
  useEffect(() => {
    hitgetDropDownList();
  }, []);

  const onChangeData = val => {
    setData({...data, ...val});
  };
  const onChangeErr = val => {
    setErr({...err, ...val});
  };

  const {mutateAsync: getDropDownList} = useCgMutation<Base>({
    key: GET_DROPDOWN_VALUES,
    url: GET_DROPDOWN_VALUES,
    offSuccessToast: true,
    method: MethodTypes.GET,
    disableLoader: true,
  });
  const {mutateAsync: saverBankDetails} = useCgMutation<Base>({
    key: SAVE_BANK_DETAILS,
    url: SAVE_BANK_DETAILS,
    method: MethodTypes.Post,
    body: {
      country: selectedType,
      bank_name: data?.bankName,
      account_name: data?.nameOnTheAccount,
      account_number: data?.accountNumber,
      account_type: data?.whereWouldYouLikeTransfer?.id,
      home_address: data?.address,
      currency: data?.currency?.id,
      swift_code: data?.swiftCode,
      routing_number: data?.routingNumber,
      wire_transfer_country_id: data?.country?.id,
    },
    disableLoader: true,
  });
  const hitgetDropDownList = async () => {
    if (checkIsConnected()) {
      setLoader(true);
      let res = await getDropDownList();
      if (res.success) {
        setDropDownData({
          whereWouldYouLikeTransfer: res?.data?.account_types,
          country: res?.data?.countries,
          currency: res?.data?.currencies,
        });
      }
      setLoader(false);
    }
  };

  const hitSaveBankDetails = async () => {
    if (checkIsConnected()) {
      setLoader(true);
      let res = await saverBankDetails();
      if (res.success) {
        if (isEdit) {
          navigation.goBack();
        } else {
          navigation.replace(SCREEN.BANK_DETAILS);
        }
        refetch();
      }
      setLoader(false);
    }
  };


  const moveToError = key => {
    if (scrollRef?.current) {
      scrollRef?.current?.scrollTo({
        x: 0,
        y: dataSourceCords[removeMiddleSpaces(key)],
        animated: true,
      });
    }
  };
  const onPressSave = () => {
    if (validation(data, setErr, selectedType, moveToError)) {
      hitSaveBankDetails();
    } else {
      toastError(translations.MANDATORY_FEILDS_ARE_NOT_FILLED);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Loader isLoading={loader} />
      <Header
        lable={
          (isEdit ? translations.EDIT : translations.ADD) +
          ' ' +
          translations.BANK_DETAIL
        }
        isUnderLineRequired
      />
      <ScrollView style={styles.scrollStyles} ref={scrollRef}>
        <View style={styles.rowView}>
          <TouchableOpacity
            onPress={() => {
              setSelectedType(translations.USA);
              setData({});
              setErr({});
            }}
            style={[
              selectedType == translations.USA
                ? styles.selectedView
                : styles.unselectedView,
              styles.rowView,
              {marginRight: 'auto'},
            ]}>
            {selectedType == translations.USA ? (
              <AppImages.Common.RadioButton />
            ) : (
              <AppImages.Common.Ellipse />
            )}
            <Text
              style={
                selectedType == translations.USA
                  ? styles.selectedText
                  : styles.unselectedText
              }>
              {translations.USA}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedType(translations.OTHER.trim());
              setErr({});
              setData({});
            }}
            style={[
              selectedType == translations.OTHER.trim()
                ? styles.selectedView
                : styles.unselectedView,
              styles.rowView,
              {marginLeft: 'auto'},
            ]}>
            {selectedType == translations.OTHER.trim() ? (
              <AppImages.Common.RadioButton />
            ) : (
              <AppImages.Common.Ellipse />
            )}
            <Text
              style={
                selectedType == translations.OTHER.trim()
                  ? styles.selectedText
                  : styles.unselectedText
              }>
              {translations.OTHER.trim()}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.feildsView} />
        {selectedType == translations.OTHER.trim() && (
          <>
            <FloatingDropdown
              floatingText={translations.CURRENCY}
              value={data.currency?.name}
              isMandatory={true}
              onFieldFocus={() => {
                setIsDropWordVisible({
                  ...isDropWordVisible,
                  currency: true,
                });
              }}
              errorMsg={err.currency}
              laoutY={(val: any, index: string) => {
                let obj = dataSourceCords;
                obj[index] = val;
                setDataSourceCords(obj);
              }}
            />
            <View style={[styles.rowView, {width: '95%'}]}>
              <Text style={styles.note}>{translations.NOTE} </Text>
              <Text style={[styles.noteText]} numberOfLines={2}>
                {translations.CURRENCY_NOTE}
              </Text>
            </View>
          </>
        )}
        {selectedType == translations.USA && (
          <FloatingInput
            floatingText={translations.BANK_NAME}
            setText={val => {
              onChangeData({bankName: removeEojies(val)});
            }}
            value={data.bankName}
            isMandatory={true}
            returnKeyType={'done'}
            errorMsg={err.bankName}
            laoutY={(val: any, index: string) => {
              let obj = dataSourceCords;
              obj[index] = val;
              setDataSourceCords(obj);
            }}
          />
        )}

        {selectedType == translations.OTHER.trim() && (
          <FloatingDropdown
            floatingText={translations.WHAT_COUNTRY_ACCOUNT_LOCATED_IN}
            value={data.country?.name}
            isMandatory={true}
            onFieldFocus={() => {
              setIsDropWordVisible({
                ...isDropWordVisible,
                country: true,
              });
            }}
            errorMsg={err.country}
            laoutY={(val: any, index: string) => {
              let obj = dataSourceCords;
              obj[index] = val;
              setDataSourceCords(obj);
            }}
          />
        )}
        <FloatingInput
          floatingText={translations.ACCOUNT_NUMBER}
          setText={val => {
            onChangeData({accountNumber: val.replace(/[^\d]/g, '')});
          }}
          value={data.accountNumber}
          isMandatory={true}
          password={true}
          returnKeyType={'done'}
          isPassword={isAccount}
          onPasswordToglle={setAccountActive}
          keyboardType={'numeric'}
          maxLength={40}
          onBlur={() => isAccountNumberValid(data, onChangeErr)}
          errorMsg={err.accountNumber}
          laoutY={(val: any, index: string) => {
            let obj = dataSourceCords;
            obj[index] = val;
            setDataSourceCords(obj);
          }}
        />
        <FloatingInput
          floatingText={
            translations.CONFIRM + ' ' + translations.ACCOUNT_NUMBER
          }
          setText={val => {
            onChangeData({confirmAccountNumber: val.replace(/[^\d]/g, '')});
          }}
          value={data.confirmAccountNumber}
          isMandatory={true}
          returnKeyType={'done'}
          keyboardType={'numeric'}
          // secureTextEntry={true}
          maxLength={40}
          onBlur={() => {
            isConfirmAccountNumberValid(data, onChangeErr);
          }}
          password={true}
          isPassword= {isConfirmAccount}
          onPasswordToglle={setConfirmAccountActive}
          errorMsg={err.confirmAccountNumber}
          laoutY={(val: any, index: string) => {
            let obj = dataSourceCords;
            obj[index] = val;
            setDataSourceCords(obj);
          }}
        />
        <FloatingInput
          floatingText={translations.NAME_ON_THE_ACCOUNT}
          setText={val => {
            onChangeData({
              nameOnTheAccount: removeEojies(val.replace(/[^A-Za-z ]/g, '')),
            });
          }}
          value={data.nameOnTheAccount}
          isMandatory={true}
          returnKeyType={'done'}
          maxLength={100}
          errorMsg={err.nameOnTheAccount}
          laoutY={(val: any, index: string) => {
            let obj = dataSourceCords;
            obj[index] = val;
            setDataSourceCords(obj);
          }}
        />

        {selectedType == translations.USA && (
          <>
            <FloatingDropdown
              floatingText={translations.WHERE_WOULD_YOU_LIKE_TO_TRANSFER}
              value={data.whereWouldYouLikeTransfer?.name}
              onFieldFocus={() => {
                setIsDropWordVisible({
                  ...isDropWordVisible,
                  whereWouldYouLikeTransfer: true,
                });
              }}
              isMandatory={true}
              errorMsg={err.whereWouldYouLikeTransfer}
              laoutY={(val: any, index: string) => {
                let obj = dataSourceCords;
                obj[index] = val;
                setDataSourceCords(obj);
              }}
            />
            <FloatingInput
              floatingText={translations.ROUTING_NUMBER}
              setText={val => {
                onChangeData({routingNumber: val.replace(/[^\d]/g, '')});
              }}
              value={data.routingNumber}
              isMandatory={true}
              maxLength={50}
              returnKeyType={'done'}
              keyboardType={'numeric'}
              errorMsg={err.routingNumber}
              laoutY={(val: any, index: string) => {
                let obj = dataSourceCords;
                obj[index] = val;
                setDataSourceCords(obj);
              }}
            />
          </>
        )}
        {selectedType == translations.OTHER.trim() && (
          <>
            <FloatingDropdown
              floatingText={translations.ADDRESS}
              setText={val => {
                onChangeData({address: val});
              }}
              value={data.address}
              isMandatory
              onFieldFocus={() => {
                setIsDropWordVisible({
                  ...isDropWordVisible,
                  address: true,
                });
              }}
              errorMsg={err.address}
              laoutY={(val: any, index: string) => {
                let obj = dataSourceCords;
                obj[index] = val;
                setDataSourceCords(obj);
              }}
            />
            <FloatingInput
              floatingText={translations.SWIFT_CODE}
              setText={val => {
                onChangeData({swiftCode: removeEojies(val)});
              }}
              value={data.swiftCode}
              isMandatory={true}
              returnKeyType={'done'}
              errorMsg={err.swiftCode}
              laoutY={(val: any, index: string) => {
                let obj = dataSourceCords;
                obj[index] = val;
                setDataSourceCords(obj);
              }}
            />
          </>
        )}

        <View style={[styles.rowView]}>
          <TouchableOpacity
            onPress={() =>
              onChangeData({isTandCAccepted: !data.isTandCAccepted})
            }
            style={styles.tickIcon}>
            {data.isTandCAccepted ? (
              <AppImages.Common.Filled_ICON />
            ) : (
              <AppImages.Common.UnFilled_ICON />
            )}
          </TouchableOpacity>
          <Text
            style={[
              styles.addresText,
              !data.isTandCAccepted && styles.unselectedTickText,
            ]}>
            {translations.ACCEPT}
            <Text
              style={styles.T_C}
              onPress={() =>
                navigation.navigate(SCREEN.STATIC_PAGE, {
                  title: translations.TERMS_OF_SERVIC,
                })
              }>
              {translations.T_C}
            </Text>
          </Text>
        </View>
        <View style={styles.height} />
      </ScrollView>
      {!keyboardShown && (
        <View style={styles.saveView}>
          <CustomButton
            inactive
            label={translations.SAVE}
            onPress={onPressSave}
          />
        </View>
      )}

      <CustomBottomModal
        isModalVisible={isDropWordVisible.whereWouldYouLikeTransfer}
        setIsModalVisible={val => {
          setIsDropWordVisible({
            ...isDropWordVisible,
            whereWouldYouLikeTransfer: val,
          });
        }}
        data={dropDownData?.whereWouldYouLikeTransfer}
        preSelectedValue={data?.whereWouldYouLikeTransfer?.id}
        parentCallback={selectedText => {
          onChangeData({whereWouldYouLikeTransfer: selectedText});
        }}
        heading={translations.WHERE_WOULD_YOU_LIKE_TO_TRANSFER}
      />
      <CustomBottomModal
        isModalVisible={isDropWordVisible.currency}
        setIsModalVisible={val => {
          setIsDropWordVisible({
            ...isDropWordVisible,
            currency: val,
          });
        }}
        data={dropDownData?.currency}
        preSelectedValue={data?.currency?.id}
        parentCallback={selectedText => {
          onChangeData({currency: selectedText});
        }}
        heading={translations.SELECT + translations.CURRENCY}
      />
      <CustomBottomModal
        isModalVisible={isDropWordVisible.country}
        setIsModalVisible={val => {
          setIsDropWordVisible({
            ...isDropWordVisible,
            country: val,
          });
        }}
        data={dropDownData?.country}
        preSelectedValue={data?.country?.id}
        parentCallback={selectedText => {
          onChangeData({country: selectedText});
        }}
        heading={translations.SELECT + translations.COUNTRY}
        enableSearch
      />

      <SearchAdress
        isModalVisible={isDropWordVisible.address}
        setIsModalVisible={val => {
          setIsDropWordVisible({
            ...isDropWordVisible,
            address: val,
          });
        }}
        onItemSelect={address => {
          onChangeData({address: address});
        }}
      />
    </SafeAreaView>
  );
};

export default AddEditBankDetails;

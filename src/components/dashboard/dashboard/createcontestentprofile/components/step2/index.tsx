import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import translations from '../../../../../../assets/translations';
import FloatingDropdown from '../../../../../common/floatingdropown';
import image from '../../../../../../assets/images/AppImages';
import CustomBottomModal from '../../../../../common/custombottommodal';
import {styles} from './styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import HeightModal from '../../../../../common/heightmodal';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {useIsFocused} from '@react-navigation/native';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {
  GET_MASTER_DATA,
  GET_STATES,
} from '../../../../../../services/endpoints';
import {MASTERDATA} from '../../../../../utils/enum';
import WarningModel from '../../../../../common/warningmodel';
import {checkIsNull} from '../../../../../utils/validations';
import moment from 'moment';
import {useSetLoader} from '../../../../../../store/useAppStore';
import {
  internetState,
  toast,
  toastError,
  toastType,
} from '../../../../../common/commonalert';
import SearchCountryState, {
  ITEM_KEY,
} from '../../../../../common/searchcountrystate';
import {ApiStatusType, MethodTypes} from '../../../../../../services/constants';
import {TIME_FORMAT} from '../../../../../utils/datetimemanger';
import DynamicradioButton from '../../../../../common/dynamicradiobutton/dynamicradioButton';
import {TWO_OPTIONS} from '../../../pageantdashboard/addpageant/addpagentrules/loccalArray';
import {moderateScale} from '../../../../../utils/responsiveSize';
import {
  isIosDevice,
  removeMiddleSpaces,
} from '../../../../../utils/helperFunction';

const Step2 = ({
  scrollRef,
  step_two,
  onChangeStepTwo,
  isNextPressed,
  setCurrentStep,
  setisNextPressed,
  hitAddContestantDetailsApi,
}) => {
  const setLoader = useSetLoader();

  React.useEffect(() => {
    if (isNextPressed) {
      handleClick();
    }
    setisNextPressed(false);
  }, [isNextPressed]);

  const [isCountryStateModalVisible, setCountryStateModalVisible] =
    React.useState(false);
  const [dataSourceCords, setDataSourceCords] = React.useState({});
  const [isCountryStateModalKey, setCountryStateModalKey] = React.useState(0);
  const [state, setState] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [countryId, setCountryId] = React.useState('');
  const [hairColorId, setHairColorId] = React.useState('');
  const [eyeColorId, setEyeColorId] = React.useState('');
  const [zodiacId, setZodiacId] = React.useState('');
  const [stateId, setStateId] = React.useState('');
  const [date, setDate] = React.useState('');
  const [mode] = React.useState('date');
  const [open, setOpen] = React.useState(false);
  const [stateDetails, setStateDetails] = React.useState([]);
  const [hairColor, setHairColor] = React.useState('');
  const [eyeColor, setEyeColor] = React.useState('');
  const [zodiacSign, setZodiacSign] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [countryModalVisible, setCountryModalVisible] = React.useState(false);
  const [hairColorDetails, setHairColorDetails] = React.useState([]);
  const [stateModalVisible, setStateModalVisible] = React.useState(false);
  const [countryDetails, setCountryDetails] = React.useState([]);
  const [hairModalVisible, setHairModalVisible] = React.useState(false);
  const [birthDateError, setBirthDateError] = React.useState('');
  const [hairColorError, setHairColorError] = React.useState('');
  const [eyeColorError, setEyeColorError] = React.useState('');
  const [countryError, setCountryError] = React.useState('');
  const [stateError, setStateError] = React.useState('');
  const [heightModalVisible, setHeightModalVisible] = React.useState(false);
  const [eyeColorDetails, setEyeColorDetails] = React.useState([]);
  const [zodiacSignDetails, setZodiacSignDetails] = React.useState([]);
  const [zodiacSignModalVisible, setZodiacSignModalVisible] =
    React.useState(false);
  const [eyeColorModalVisible, setEyeColorModalVisible] = React.useState(false);
  const [married, setMarried] = React.useState(translations.NO_SMALL);
  const [isMinor, setIsMinor] = React.useState(false);
  const [minor, setMinor] = React.useState(translations.NO_SMALL);
  const [hideDob, setHideDob] = React.useState(translations.NO_SMALL);
  const [kids, setKids] = React.useState(translations.NO_SMALL);
  const [birthDate, setBirthDate] = React.useState('');
  const netInfo = useNetInfo();
  const [isMinorModalVisible, setIsMinorModalVisible] = React.useState(false);
  const [isBirthModalVisible, setIsBirthModalVisible] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);

  const [hideHeight, setHideHeight] = React.useState(false);
  const [hideHeightError, setHideHeightError] = React.useState('');
  const isFocuse = useIsFocused();

  React.useEffect(() => {
    if (isFocuse) {
      setBirthDateError('');
      setHairColorError('');
      setEyeColorError('');
      setCountryError('');
      setStateError('');
      NetInfo.fetch().then(state => {
        if (state.isConnected && state.isInternetReachable) {
          getDetails();
        } else {
          internetState(netInfo.isConnected!!);
        }
      });
    }
  }, [isFocuse]);
  const scrollHandler = (key: string) => {
    if (!!scrollRef?.current) {
      scrollRef?.current?.scrollTo({
        x: 0,
        y: dataSourceCords[removeMiddleSpaces(key)], //we get the offset value from array based on key
        animated: true,
      });
    }
  };
  const scrollToTopError = () => {
    if (birthDate.length == 0) {
      scrollHandler(translations.DATE_OF_BIRTH);
      return;
    } else if (hairColor?.length == 0) {
      scrollHandler(translations.COMPETITION_HAIR_COLOR);
      return;
    } else if (eyeColor?.length == 0) {
      scrollHandler(translations.EYE_COLOR);
      return;
    } else if (hideHeightError) {
      scrollHandler(translations.HEIGHT);
      return;
    } else if (country?.length == 0) {
      scrollHandler(translations.COUNTRY);
      return;
    } else if (state?.length == 0) {
      scrollHandler(translations.STATE);
      return;
    }
  };
  const handleClick = async () => {
    setBirthDateError('');
    setHairColorError('');
    setEyeColorError('');
    setCountryError('');
    setStateError('');
    scrollToTopError();
    const selectedDate = new Date(date);
    const currentDate = new Date();
    if (selectedDate.getFullYear() === currentDate.getFullYear() && !confirm) {
      setIsBirthModalVisible(true);
    } else if (
      birthDate.length > 0 &&
      hairColor?.length > 0 &&
      eyeColor?.length > 0 &&
      country?.length > 0 &&
      state.length > 0 &&
      checkInterNet()
    ) {
      if (!hideHeight) {
        if (!checkIsNull(height)) {
          setHideHeightError(translations.THIS_FIELD_REQUIRED);
          return;
        }
      }

      await onChangeStepTwo({
        birthDate: birthDate,
        hairColorId: hairColorId,
        eyeColorId: eyeColorId,
        zodiacSignId: zodiacId,
        height: height,
        countryId: countryId,
        stateId: stateId,
        married: married,
        kids: married,
        isMinor: minor,
        hideDob: hideDob,
      });
      hitAddContestantDetailsApi();
    } else {
      toastError(translations.MANDATORY_FEILDS_ARE_NOT_FILLED);
    }
    {
      birthDate ? null : setBirthDateError(translations.THIS_FIELD_REQUIRED);
    }
    {
      hairColor ? null : setHairColorError(translations.THIS_FIELD_REQUIRED);
    }
    {
      eyeColor ? null : setEyeColorError(translations.THIS_FIELD_REQUIRED);
    }
    {
      country ? null : setCountryError(translations.THIS_FIELD_REQUIRED);
    }
    {
      state ? null : setStateError(translations.THIS_FIELD_REQUIRED);
    }
    if (!hideHeight) {
      height ? null : setHideHeightError(translations.THIS_FIELD_REQUIRED);
    }
  };

  const onPressHide = () => {
    hideDob === translations.YES
      ? setHideDob(translations.NO_SMALL)
      : setHideDob(translations.YES);
  };
  const onPressMinor = () => {
    if (isMinor) {
      setIsMinor(!isMinor);
      setMinor(translations.NO_SMALL);
    }
    if (!isMinor) {
      setIsMinorModalVisible(true);
    }
  };
  const onPressMarried = val => {
    setMarried(val);
  };
  const onPressKids = val => {
    setKids(val);
  };

  const callbackFunction = selectedText => {
    hairModalVisible
      ? (setHairColor(selectedText.name), setHairColorId(selectedText.id))
      : eyeColorModalVisible
      ? (setEyeColor(selectedText.name), setEyeColorId(selectedText.id))
      : zodiacSignModalVisible
      ? (setZodiacSign(selectedText.name), setZodiacId(selectedText.id))
      : countryModalVisible
      ? (setCountry(selectedText.name), setCountryId(selectedText.id))
      : stateModalVisible
      ? (setState(selectedText.name), setStateId(selectedText.id))
      : null;
  };
  const heightCallbackFunction = selectedText => {
    setHeight(selectedText);
  };

  const {mutateAsync: getMasterDetails} = useCgMutation({
    key: GET_MASTER_DATA,
    url: GET_MASTER_DATA,
    body: {
      master_record_type_id: `${MASTERDATA.EYE_COLOR},${MASTERDATA.HAIR_COLOR},${MASTERDATA.ZODIAC_SIGN},${MASTERDATA.HEIGHT}`,
      is_countries: 1,
    },
    offSuccessToast: true,
  });

  const checkInterNet = () => {
    if (!netInfo.isConnected) {
      internetState(netInfo.isConnected!!);
      return false;
    }

    return true;
  };
  const getDetails = async () => {
    setLoader(true);
    const res = await getMasterDetails();
    if (res.success || res.status_code === ApiStatusType.Error) {
      setHairColorDetails(res.data.master_records.hair_color);
      setEyeColorDetails(res.data.master_records.eye_color);
      setZodiacSignDetails(res.data.master_records.zodiac);
      setCountryDetails(res.data.countries);
      setLoader(false);
    }
    setLoader(false);
  };

  const {mutateAsync: getStatesDetails} = useCgMutation({
    key: GET_STATES,
    method: MethodTypes.GET,
    url: GET_STATES + `${countryId}`,
    offSuccessToast: true,
  });

  const getStateDetails = async () => {
    setLoader(true);
    const res = await getStatesDetails();
    if (res.success || res.status_code === ApiStatusType.Error) {
      setStateDetails(res.data.states);
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

    const fDate1 = moment(tempDate).format(TIME_FORMAT.MMDDYYYY);

    setBirthDate(fDate1);
    hideDatepicker();
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
  return (
    <View style={styles.bottomSpace}>
      <View style={styles.parentContainer}>
        {open && (
          <DateTimePickerModal
            maximumDate={new Date()}
            display={isIosDevice() ? 'inline' : 'default'}
            isVisible={open}
            mode={mode}
            date={
              checkIsNull(birthDate)
                ? new Date(
                    moment(birthDate, TIME_FORMAT.MMDDYYYY).format(
                      TIME_FORMAT.YYYYMMDD,
                    ),
                  )
                : new Date()
            }
            onConfirm={onChange}
            onCancel={hideDatepicker}
          />
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
        <CustomBottomModal
          isModalVisible={hairModalVisible}
          setIsModalVisible={setHairModalVisible}
          data={hairColorDetails}
          preSelectedValue={hairColorId}
          parentCallback={selectedText => callbackFunction(selectedText)}
          heading={translations.HAIR_COLOR}
        />

        <CustomBottomModal
          isModalVisible={eyeColorModalVisible}
          setIsModalVisible={setEyeColorModalVisible}
          data={eyeColorDetails}
          preSelectedValue={eyeColorId}
          parentCallback={selectedText => callbackFunction(selectedText)}
          heading={translations.EYE_COLOR}
        />
        <CustomBottomModal
          isModalVisible={zodiacSignModalVisible}
          setIsModalVisible={setZodiacSignModalVisible}
          data={zodiacSignDetails}
          preSelectedValue={zodiacId}
          parentCallback={selectedText => callbackFunction(selectedText)}
          heading={translations.ZODIAC_SIGN}
        />
        <CustomBottomModal
          isModalVisible={countryModalVisible}
          setIsModalVisible={setCountryModalVisible}
          data={countryDetails}
          preSelectedValue={countryId}
          parentCallback={selectedText => callbackFunction(selectedText)}
          heading={translations.COUNTRY}
          enableSearch={true}
        />
        <CustomBottomModal
          isModalVisible={stateModalVisible}
          setIsModalVisible={setStateModalVisible}
          data={stateDetails}
          preSelectedValue={stateId}
          parentCallback={selectedText => callbackFunction(selectedText)}
          heading={translations.STATE}
          enableSearch={true}
        />
        <HeightModal
          modalVisible={heightModalVisible}
          close={() => setHeightModalVisible(false)}
          onPressCancel={() => setHeightModalVisible(false)}
          onPressSave={() => setHeightModalVisible(false)}
          heightCallback={he => heightCallbackFunction(he)}
        />

        <FloatingDropdown
          floatingText={translations.DATE_OF_BIRTH}
          value={
            birthDate
              ? moment(birthDate, TIME_FORMAT.MMDDYYYY).format(
                  TIME_FORMAT.MMslashDDslashYYYY,
                )
              : ''
          }
          errorMsg={birthDateError}
          onFieldFocus={showDatepicker}
          isMandatory={true}
          rightIcon={<image.Dashboard.CalenderIcon />}
          onPressRightIcon={showDatepicker}
          laoutY={(val: any, index: string) => {
            let obj = dataSourceCords;
            obj[index] = val;
            setDataSourceCords(obj);
          }}
        />
        <View style={styles.agreeContainer}>
          <View>
            <TouchableOpacity
              onPress={onPressHide}
              style={[styles.rowView, {marginRight: moderateScale(24)}]}>
              {hideDob === translations.YES ? (
                <image.Common.Filled_ICON />
              ) : (
                <image.Common.UnFilled_ICON />
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
            <TouchableOpacity onPress={onPressMinor} style={styles.rowView}>
              {isMinor ? (
                <image.Common.Filled_ICON />
              ) : (
                <image.Common.UnFilled_ICON />
              )}

              <Text style={isMinor ? styles.agreeText1 : styles.agreeText}>
                {translations.MINOR}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <FloatingDropdown
          floatingText={translations.COMPETITION_HAIR_COLOR}
          value={hairColor}
          isMandatory={true}
          errorMsg={hairColorError}
          onPressDropdown={() => {
            setHairModalVisible(true);
          }}
          onFieldFocus={() => {
            setHairModalVisible(true);
          }}
          dropdown={true}
          laoutY={(val: any, index: string) => {
            let obj = dataSourceCords;
            obj[index] = val;
            setDataSourceCords(obj);
          }}
        />
        <FloatingDropdown
          floatingText={translations.EYE_COLOR}
          value={eyeColor}
          isMandatory={true}
          errorMsg={eyeColorError}
          onFieldFocus={() => {
            setEyeColorModalVisible(true);
          }}
          onPressDropdown={() => {
            setEyeColorModalVisible(true);
          }}
          dropdown={true}
          laoutY={(val: any, index: string) => {
            let obj = dataSourceCords;
            obj[index] = val;
            setDataSourceCords(obj);
          }}
        />
        <FloatingDropdown
          floatingText={translations.ZODIAC_SIGN}
          value={zodiacSign}
          onFieldFocus={() => {
            setZodiacSignModalVisible(true);
          }}
          onPressDropdown={() => {
            setZodiacSignModalVisible(true);
          }}
          dropdown={true}
          laoutY={(val: any, index: string) => {
            let obj = dataSourceCords;
            obj[index] = val;
            setDataSourceCords(obj);
          }}
        />
        <FloatingDropdown
          floatingText={translations.HEIGHT}
          value={hideHeight ? translations.HIDDEN : height}
          onFieldFocus={() => {
            if (hideHeight) {
              return;
            } else {
              setHeightModalVisible(true);
            }
          }}
          onPressDropdown={() => {
            setHeightModalVisible(true);
          }}
          dropdown={true}
          isMandatory={true}
          errorMsg={hideHeightError}
          laoutY={(val: any, index: string) => {
            let obj = dataSourceCords;
            obj[index] = val;
            setDataSourceCords(obj);
          }}
          opacity={hideHeight ? 0.5 : 1}
          customStyles={hideHeight ? styles.opaceView : {}}
        />
        {hideHeight ? (
          <Text
            style={styles.heightTouchLine}
            onPress={() => {
              setHideHeight(false);
              setHideHeightError('');
              setHeight('');
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

        <FloatingDropdown
          floatingText={translations.COUNTRY}
          value={country}
          errorMsg={countryError}
          onFieldFocus={() => {
            setCountryStateModalKey(ITEM_KEY.COUNTRY);
            setCountryStateModalVisible(true);
          }}
          onPressDropdown={() => {
            setCountryModalVisible(true);
          }}
          isMandatory={true}
          dropdown={true}
          laoutY={(val: any, index: string) => {
            let obj = dataSourceCords;
            obj[index] = val;
            setDataSourceCords(obj);
          }}
        />
        <FloatingDropdown
          floatingText={translations.STATE}
          value={state}
          errorMsg={stateError}
          isMandatory={true}
          onFieldFocus={() => {
            if (countryId > 0) {
              setCountryStateModalKey(ITEM_KEY.STATE);
              setCountryStateModalVisible(true);
            } else {
              toast(
                translations.PLEASE_SELECT_A_COUNTRY,
                toastType.ERROR_TOAST,
              );
            }
          }}
          onPressDropdown={() => {
            setStateModalVisible(true);
            getStateDetails();
          }}
          dropdown={true}
          laoutY={(val: any, index: string) => {
            let obj = dataSourceCords;
            obj[index] = val;
            setDataSourceCords(obj);
          }}
        />
      </View>

      <Text style={styles.input_label}>{translations.MARRIED}</Text>

      <DynamicradioButton
        data={TWO_OPTIONS}
        selectedRadio={married}
        setSelectedRadio={val => onPressMarried(val)}
        customStyles={styles.marginRight32}
        numColumns={3}
      />
      <Text style={styles.input_label}>{translations.KIDS}</Text>
      <DynamicradioButton
        data={TWO_OPTIONS}
        selectedRadio={kids}
        setSelectedRadio={val => onPressKids(val)}
        customStyles={styles.marginRight32}
        numColumns={3}
      />

      <WarningModel
        msg={translations.MINOR_ERROR}
        isModalVisible={isMinorModalVisible}
        setConfirm={() => {
          setIsMinor(true);
          setMinor(translations.YES);
        }}
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
    </View>
  );
};

export default Step2;

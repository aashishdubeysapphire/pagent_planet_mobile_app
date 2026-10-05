import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import FloatingInput from '../../../../../../../../../common/floatinginput';
import translations from '../../../../../../../../../../assets/translations';
import {styles} from './styles';
import FloatingDropdown from '../../../../../../../../../common/floatingdropown';
import AppImages from '../../../../../../../../../../assets/images/AppImages';
import MultiSelectinput from '../../../../../../../../../common/multiselectinput';
import FloatingBigInput from '../../../../../../../../../common/floatingbiginput';
import HeadShotImage from '../../../../../../../../../common/headshotimage';
import {
  EVENT_STATUS,
  FLOATING_ICON,
  IMAGE_TYPE,
  MASTERDATA,
  REFESH_SCREEN,
} from '../../../../../../../../../utils/enum';
import useCgMutation from '../../../../../../../../../../services/api/useCgMutation';
import {
  GET_AGE_DEVISION,
  GET_MASTER_DATA,
  GET_PAGEANT_AND_EVENT_DETAIL,
  GET_PAGEANT_RULES_ASSOCIATED_DATA,
  UPLOADE_IMAGE,
} from '../../../../../../../../../../services/endpoints';
import {useSetScreenRefresh} from '../../../../../../../../../../store/useAppStore';
import CustomBottomModal from '../../../../../../../../../common/custombottommodal';
import moment from 'moment';
import {
  ConTwoDecDigit,
  createFormData,
  getIDsArrayFromArray,
  isIosDevice,
  keyBoardManager,
  randomString,
  removeMiddleSpaces,
} from '../../../../../../../../../utils/helperFunction';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {
  checkIsNull,
  doesParaContainersURL,
  isValueNull,
  phoneValidation,
  _validateEmail,
  removeEmojis,
} from '../../../../../../../../../utils/validations';
import SearchAdress from '../../../../../../../../../common/searchaddress';
import FloatingButton from '../../../../../../../../../common/floatingbutton';
import {SCREEN} from '../../../../../../../../../../root/screenname';
import {
  toast,
  toastError,
  toastType,
} from '../../../../../../../../../common/commonalert';
import WarningModel from '../../../../../../../../../common/warningmodel';
import {
  MethodTypes,
  UpgradPlan,
} from '../../../../../../../../../../services/constants';
import {
  checkIfDatesAreupcomingCurrent,
  dateDifference,
  TIME_FORMAT,
} from '../../../../../../../../../utils/datetimemanger';
import {Base} from '../../../../../../../../../../services/models/base';
import {PageantDetails} from '../../../../../../../../../../services/models/pageantdetails/contestantPublicDetails';
import Loader from '../../../../../../../../../common/customloader';
// import {GooglePlaceDetail} from 'react-native-google-places-autocomplete';
import ViewPlanModal from '../../../../../components/viewplanmodal';
interface Props {
  isEditting: boolean;
  pageantDetail: PageantDetails;
  setIsSavePressed: Function;
  isSavePressed: boolean;
  setAddBody: Function;
  createNewPagentEvent: Function;
  updateEvent: Function;
  setIsSaveActive: Function;
  showPCAWarningMessage: boolean;
  isSaveActive: boolean;
  setAddContestentMsg: Function;
  setShowCelebration: Function;
  pageantPlanDetail: any;
  setEventId: Function;
}

const AddEventComp = ({
  isEditting,
  pageantDetail: pageantDetails,
  setIsSavePressed,
  isSavePressed,
  setAddBody,
  createNewPagentEvent,
  updateEvent,
  setIsSaveActive,
  showPCAWarningMessage,
  isSaveActive,
  setAddContestentMsg,
  setShowCelebration,
  pageantPlanDetail,
  setEventId = () => {},
}: Props) => {
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
  const setScreenRefresh = useSetScreenRefresh();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      keyBoardManager();
      hitGetMasterDetails();
    }
  }, [isFocused]);
  useEffect(() => {
    if (isSavePressed) {
      validations(false);
    }
    setIsSavePressed(false);
  }, [isSavePressed]);
  const [ref, setRef] = useState<ScrollView>();
  const [dataSourceCords] = useState({});
  const [activatePCAmodalConfimation, setActivatePCAmodalConfimation] =
    useState(false);
  const [removeResultConfirmation, setRemoveResultConfirmation] = useState(0);
  const [removeResModalVisible, setremoveResModalVisible] = useState(false);
  const [pageantDetail, setPageantDetail] =
    useState<PageantDetails>(pageantDetails);
  const [pageantId, setPageantId] = useState();
  let pca_activation_confirm = false;
  const setPcaActivationConfirm = (val: boolean) => {
    pca_activation_confirm = val;
  };
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const [isPcaActive, setIsPcaActive] = useState(false);
  const [uploadeLogoBody, setUploadeLogoBody] = useState({});
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const [userData, setUserData] = useState({
    eventTitle: '',
    pageant: '',
    years: {name: '', id: ''},
    startDate: '',
    endDate: '',
    address: '',
    email: '',
    phone: '',
    ageDevision: [],
    phasesOfComp: [],
    prize: '',
    eventLogo: '',
    eventBanner: '',
    lat: '',
    long: '',
    entryFee: '',
    ticketPrice: '',
  });
  const [isEventLogoUpdated, setIsEventLogoUpdated] = useState(false);
  const [isBannerImageUpdated, setIsBannerImageUpdated] = useState(false);
  const [isStartDateSelected, setIsStartDateSelected] = useState(false);
  const [isEndDateSelected, setIsEndDateSelected] = useState(false);
  const [dateNotSure, setDateNotSure] = useState(false);
  const [addressNotSure, setAddressNotSure] = useState(false);
  const [entryFeeError, setentryFeeError] = useState('');
  const [ticketPriceError, setTicketPriceError] = useState('');
  const [editLogo, setEditLogo] = useState(
    pageantDetail?.main_image_full_url
      ? pageantDetail?.main_image_full_url
      : '',
  );
  const [isEventStatusActive] = useState(false);
  const [isPagentInActive, setIsPagentInActive] = useState(false);
  const [editbanner, setEditbanner] = useState(
    checkIsNull(pageantDetail?.banner_image)
      ? pageantDetail?.banner_image_full_url
      : '',
  );
  const [isPlanActive, setPlanActive] = useState(false);

  //ERROR msg var

  const [eventTitleErr, setEventTitleErr] = useState('');
  const [yearErr, setYearErr] = useState('');
  const [startDateErr, setStartDateErr] = useState('');
  const [endDateErr, setEndDateErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [phoneErr, setPhoneErr] = useState('');
  const [ageDevisionErr, setageDevisionErr] = useState('');
  const [phasesOfCOmpErr, setPhasesOfCOmpErr] = useState('');
  const [addressErr, setAddressErr] = useState('');
  const [prizeErr, setPrizeErr] = useState('');
  const [logoErr, setLogoErr] = useState('');

  useEffect(() => {
    moveDataToScreen();
  }, [userData, isFocused]);

  const onChangeUserData = data => {
    moveDataToScreen();
    setUserData({...userData, ...data});
  };
  const [modalData, setmodalData] = useState({
    years: [],
    ageDevision: [],
    phasesOfComp: [],
  });

  const [isModalVisible, setIsModalVisible] = useState({
    years: false,
    ageDevision: false,
    phasesOfComp: false,
    address: false,
  });

  const {mutateAsync: getMasterDetails} = useCgMutation({
    key: GET_MASTER_DATA,
    url: GET_MASTER_DATA,
    body: {
      master_record_type_id: `${MASTERDATA.YEARS} ,${MASTERDATA.PHASES_OF_COMPETETION} `,
    },
    offSuccessToast: true,
    disableLoader: true,
  });
  const {mutateAsync: getAgeDevision} = useCgMutation({
    key: GET_AGE_DEVISION,
    method: MethodTypes.GET,
    url: GET_AGE_DEVISION,
    offSuccessToast: true,
    disableLoader: true,
  });

  const randString = useMemo(() => randomString(5), []);
  const {mutateAsync: getPageantDetailsbyID} = useCgMutation<
    Base<PageantDetails>
  >({
    key: GET_PAGEANT_AND_EVENT_DETAIL + randString,
    method: MethodTypes.GET,
    url: GET_PAGEANT_AND_EVENT_DETAIL + pageantDetail.id,
    offSuccessToast: true,
    disableLoader: true,
  });
  const {mutateAsync: getPageantRulesAssociatedData} = useCgMutation<Base>({
    key: GET_PAGEANT_RULES_ASSOCIATED_DATA,
    method: MethodTypes.GET,
    url: GET_PAGEANT_RULES_ASSOCIATED_DATA + pageantDetail.id,
    offSuccessToast: true,
    disableLoader: true,
  });
  const {mutateAsync: uploadeLogo} = useCgMutation({
    key: UPLOADE_IMAGE,
    body: createFormData(uploadeLogoBody),
    url: UPLOADE_IMAGE,
    offSuccessToast: true,
    disableLoader: true,
    isJson: false,
    customHeader: {'Content-Type': 'multipart/form-data'},
  });

  const setDataForFronEnd = async () => {
    if (isEditting !== true) {
      const associateRules = await getPageantRulesAssociatedData();
      if (associateRules.success) {
        if (pageantDetail.status === EVENT_STATUS.INACTIVE) {
          setIsPagentInActive(true);
          setIsSaveActive(false);
        } else {
          onChangeUserData({
            ageDevision:
              associateRules?.data?.pageantRulesAssociatedData.ageDivisionsData,
            phasesOfComp:
              associateRules?.data?.pageantRulesAssociatedData
                .pageantPhaseOfCompetitionsData,
            email: pageantDetail.email,
            phone: isValueNull(pageantDetail?.phone),
            eventTitle: pageantDetail.title,
            pageant: pageantDetail.title,
          });
        }
        setLoader(false);
      } else {
        setLoader(false);
      }
    } else {
      const pageantDetailAPi = await getPageantDetailsbyID();
      if (pageantDetailAPi.success) {
        setPageantId(pageantDetailAPi.data?.pageant_details.master_pageant_id);
        setPageantDetail(pageantDetailAPi.data.pageant_details);
        onChangeUserData({
          eventTitle: pageantDetailAPi.data.pageant_details.title + '',
          pageant:
            pageantDetailAPi?.data?.pageant_details?.master_pageant.title,
          years: pageantDetailAPi.data.pageant_details.year_name,
          startDate: checkIsNull(
            pageantDetailAPi.data.pageant_details.start_date,
          )
            ? moment(
                pageantDetailAPi.data.pageant_details.start_date,
                TIME_FORMAT.YYYYMMDD,
              ).format(TIME_FORMAT.DDmilnusMMmilusYYYY)
            : '',
          endDate: checkIsNull(pageantDetailAPi.data.pageant_details.end_date)
            ? moment(
                pageantDetailAPi.data.pageant_details.end_date,
                TIME_FORMAT.YYYYMMDD,
              ).format(TIME_FORMAT.DDmilnusMMmilusYYYY)
            : '',
          address: pageantDetailAPi.data.pageant_details.address,
          email: pageantDetailAPi.data.pageant_details.email,
          phone: isValueNull(pageantDetailAPi.data.pageant_details.phone),
          ageDevision:
            pageantDetailAPi.data.pageant_details.pageantAgeDivisionsData,
          phasesOfComp:
            pageantDetailAPi.data.pageant_details
              .pageantPhaseOfCompetitionsData,
          prize: isValueNull(pageantDetailAPi.data.pageant_details.description),
          eventLogo: checkIsNull(
            pageantDetailAPi.data.pageant_details.main_image_full_url,
          )
            ? pageantDetailAPi.data.pageant_details.main_image_full_url
            : null,
          eventBanner: checkIsNull(
            pageantDetailAPi.data.pageant_details.banner_image,
          )
            ? pageantDetailAPi.data.pageant_details.banner_image_full_url
            : null,
        });
        if (pageantDetailAPi.data.pageant_details.is_pca_activated === 'Yes') {
          setPcaActivationConfirm(true);
        } else {
          setPcaActivationConfirm(false);
        }
        setIsPcaActive(
          pageantDetailAPi.data.pageant_details.is_pca_activated === 'Yes',
        );
        if (pageantDetailAPi.data.pageant_details.not_sure_address === 1) {
          setAddressNotSure(true);
        }
        if (pageantDetailAPi.data.pageant_details.not_sure === 1) {
          setDateNotSure(true);
        }
        setPlanActive(
          pageantDetailAPi?.data?.advertisingBannerData?.is_active_advertiser ==
            UpgradPlan.YES,
        );
        if (
          pageantDetailAPi?.data?.pageant_details?.master_pageant?.status !=
          EVENT_STATUS.ACTIVE
        ) {
          setIsPagentInActive(true);
          setIsSaveActive(false);
        }
        setLoader(false);
      } else {
        setLoader(false);
      }
    }
  };

  const hitGetMasterDetails = async () => {
    setLoader(true);
    const masterDataRes = await getMasterDetails();
    if (masterDataRes.success) {
      const ageDevisionRes = await getAgeDevision();
      if (ageDevisionRes.success) {
        setmodalData({
          ...modalData,
          phasesOfComp: masterDataRes.data.master_records.phases_of_competition,
          years: masterDataRes.data.master_records.years,
          ageDevision: ageDevisionRes.data.age_divisions,
        });
        setDataForFronEnd();
      } else {
        setLoader(false);
      }
    } else {
      setLoader(false);
    }
  };
  const setMaxDate = () => {
    const presentYear = new Date().getFullYear();
    if (Number(userData.years.name) === Number(presentYear) + 1) {
      return new Date(`${Number(userData.years.name)}-12-31`);
    } else {
      return new Date(`${Number(userData.years.name) + 1}-12-31`);
    }
  };
  const setMinDate = () => {
    return new Date(`${Number(userData.years.name) - 1}-01-01`);
  };
  const hideDatepicker = () => {
    setIsDateModalOpen(false);
  };
  const onChange = selectedDate => {
    if (!isIosDevice()) {
      setIsDateModalOpen(false);
    }
    const currentDate = selectedDate || date;
    const tempDate = new Date(currentDate);

    const fDate1 = moment(tempDate).format(TIME_FORMAT.DDmilnusMMmilusYYYY);
    if (isStartDateSelected) {
      onChangeUserData({
        startDate: fDate1,
      });
      setIsStartDateSelected(false);
    }
    if (isEndDateSelected) {
      onChangeUserData({
        endDate: fDate1,
      });
      setIsEndDateSelected(false);
    }
    hideDatepicker();
  };

  const datesView = () => {
    return (
      <>
        <FloatingDropdown
          floatingText={translations.EVENT_START_DATE}
          value={
            dateNotSure
              ? translations.NOT_SURE_CAPITALIZED
              : userData.startDate
              ? moment(
                  userData.startDate,
                  TIME_FORMAT.DDmilnusMMmilusYYYY,
                ).format(TIME_FORMAT.MMslashDDslashYYYY)
              : ''
          }
          onFieldFocus={
            dateNotSure
              ? () => {}
              : () => {
                  if (!checkIsNull(userData.years.name)) {
                    setYearErr(translations.THIS_FIELD_REQUIRED);
                  } else {
                    setIsDateModalOpen(true);
                    setIsStartDateSelected(true);
                    setIsEndDateSelected(false);
                  }
                }
          }
          isMandatory={true}
          errorMsg={startDateErr}
          rightIcon={<AppImages.Dashboard.CalenderIcon />}
          customStyles={dateNotSure ? styles.opacity : {}}
          laoutY={(val: any, index: string) => {
            dataSourceCords[index] = val;
          }}
        />
        <FloatingDropdown
          floatingText={translations.EVENT_END_DATE}
          value={
            dateNotSure
              ? translations.NOT_SURE_CAPITALIZED
              : userData.endDate
              ? moment(
                  userData.endDate,
                  TIME_FORMAT.DDmilnusMMmilusYYYY,
                ).format(TIME_FORMAT.MMslashDDslashYYYY)
              : ''
          }
          onFieldFocus={
            dateNotSure
              ? () => {}
              : () => {
                  if (!checkIsNull(userData.years.name)) {
                    setYearErr(translations.THIS_FIELD_REQUIRED);
                  } else {
                    setIsDateModalOpen(true);
                    setIsStartDateSelected(false);
                    setIsEndDateSelected(true);
                  }
                }
          }
          isMandatory={true}
          errorMsg={endDateErr}
          rightIcon={<AppImages.Dashboard.CalenderIcon />}
          customStyles={dateNotSure ? styles.opacity : {}}
          laoutY={(val: any, index: string) => {
            dataSourceCords[index] = val;
          }}
        />
        {endDateErr === translations.PCA_END_DATE_ERROR && (
          <Text style={styles.dateNotSure} onPress={navigateToPCA}>
            {translations.CLICK_HERE}
            <Text style={styles.errorText}>
              {translations.TO_UPGRADE_END_DATE}
            </Text>
          </Text>
        )}
      </>
    );
  };

  const navigateToPCA = () => {
    navigation.navigate(SCREEN.PCA_FORM, {eventId: pageantDetail.id});
  };

  const addressView = () => {
    return (
      <FloatingDropdown
        floatingText={translations.ADDRESS_OF_THE_EVENT}
        setText={value => onChangeUserData({address: value})}
        value={
          addressNotSure ? translations.NOT_SURE_CAPITALIZED : userData.address
        }
        onFieldFocus={() => {
          if (addressNotSure) {
            // Do nothing or perform any desired action
          } else {
            setIsModalVisible({
              ...isModalVisible,
              address: true,
            });
          }
        }}
        returnKeyType={'done'}
        isMandatory={true}
        editable={!addressNotSure}
        errorMsg={addressErr}
        opacity={addressNotSure ? 0.5 : 1}
        customStyles={addressNotSure ? styles.opacity : {}}
      />
    );
  };

  const onAddresss = (
    addres: string,
    lat: string,
    long: string,
    // details: GooglePlaceDetail,
  ) => {
    onChangeUserData({address: addres, lat: lat, long: long});
  };

  const datesValidation = () => {
    if (!dateNotSure) {
      if (userData.startDate === '' && userData.endDate === '') {
        setEndDateErr(translations.THIS_FIELD_REQUIRED);
        setStartDateErr(translations.THIS_FIELD_REQUIRED);
        return false;
      }
      if (userData.startDate === '') {
        setStartDateErr(translations.THIS_FIELD_REQUIRED);
        return false;
      }
      if (userData.endDate === '') {
        setEndDateErr(translations.THIS_FIELD_REQUIRED);
        return false;
      }

      if (isPcaActive) {
        if (
          dateDifference(
            moment(pageantDetail?.end_date, TIME_FORMAT.YYYYMMDD).format(
              TIME_FORMAT.DDMMYYYY,
            ),
            moment(userData.endDate, TIME_FORMAT.DDmilnusMMmilusYYYY).format(
              TIME_FORMAT.DDMMYYYY,
            ),
            TIME_FORMAT.DDMMYYYY,
          ) < 0
        ) {
          setEndDateErr(translations.PCA_END_DATE_ERROR);
          return false;
        }
      }
      const endDate = moment(
        userData.endDate,
        TIME_FORMAT.DDmilnusMMmilusYYYY,
      ).format(TIME_FORMAT.DDMMYYYY);
      const startDate = moment(
        userData.startDate,
        TIME_FORMAT.DDmilnusMMmilusYYYY,
      ).format(TIME_FORMAT.DDMMYYYY);
      const a = moment(startDate, TIME_FORMAT.DDMMYYYY);
      const b = moment(endDate, TIME_FORMAT.DDMMYYYY);
      const diffDays = b.diff(a, 'days');
      if (diffDays < 0) {
        setEndDateErr(translations.SMALL_END_DATE);
        setStartDateErr(translations.GREATER_START_DATE);
        return false;
      } else if (diffDays > 32) {
        setEndDateErr(translations.START_END_DATE_RANGE);
        return false;
      } else {
        setEndDateErr('');
        setStartDateErr('');
        return true;
      }
    } else {
      return true;
    }
  };

  const addressValidation = () => {
    if (!addressNotSure) {
      if (!checkIsNull(userData.address)) {
        setAddressErr(translations.THIS_FIELD_REQUIRED);
        return false;
      } else {
        setAddressErr('');
        return true;
      }
    } else {
      return true;
    }
  };

  const emailValidation = () => {
    if (!!!userData.email) {
      setEmailErr(translations.THIS_FIELD_REQUIRED);
      return false;
    } else if (!_validateEmail(userData.email)) {
      setEmailErr(translations.PLEASE_ENER_A_VALID_EMAIL);
      return false;
    } else {
      setEmailErr('');
      return true;
    }
  };

  const phoneNumberValidation = () => {
    if (!!userData.phone.trim()) {
      if (!phoneValidation(userData.phone)) {
        setPhoneErr(translations.PLEASE_ENER_A_VALID_PHONE);
        return false;
      } else {
        setPhoneErr('');
        return true;
      }
    } else {
      setPhoneErr('');
      return true;
    }
  };
  const prizeValidation = () => {
    if (!!userData.prize) {
      if (doesParaContainersURL(userData.prize)) {
        setPrizeErr(translations.THIS_FILED_CANT_CONTAIN_A_LINK);
        return false;
      } else {
        setPrizeErr('');
        return true;
      }
    } else {
      setPrizeErr(translations.THIS_FIELD_REQUIRED);
      return false;
    }
  };

  const scrollHandler = (key: string) => {
    if (!!ref?.scrollTo) {
      ref?.scrollTo({
        x: 0,
        y: dataSourceCords[removeMiddleSpaces(key)], //we get the offset value from array based on key
        animated: true,
      });
    }
  };
  const moveToTopError = () => {
    if (userData.eventTitle.trim().length === 0) {
      scrollHandler(translations.NAME_OF_EVENT);
      return;
    } else if (userData.years?.name.length === 0) {
      scrollHandler(translations.YEAR_SHOW_ON_THE_SASH);
      return;
    } else if (!datesValidation()) {
      scrollHandler(translations.EVENT_START_DATE);
      return;
    } else if (!emailValidation()) {
      scrollHandler(translations.EMAIL);
      return;
    } else if (!phoneNumberValidation()) {
      scrollHandler(translations.PHONE_NUMBER);
      return;
    } else if (!isEntryFeeValid()) {
      scrollHandler(translations.HOW_MUCH_IS_YOUR_ENTRY_FEE);
      return;
    } else if (!isTicketPriceValid()) {
      scrollHandler(translations.HOW_MUCH_IS_A_TICKET);
      return;
    } else if (userData.ageDevision.length !== 0) {
      scrollHandler(translations.AGE_DEVISION);
      return;
    } else if (userData.phasesOfComp.length === 0) {
      scrollHandler(translations.PHASES_OF_COMPETETION);
      return;
    } else if (!addressValidation()) {
      scrollHandler(translations.ADDRESS_OF_THE_EVENT);
      return;
    } else if (!prizeValidation() || (!!userData.eventLogo && !!editLogo)) {
      scrollHandler(translations.PRICE_PACKGE);
      return;
    } else {
      return;
    }
  };
  const isEntryFeeValid = () => {
    if (isEditting == true) {
      return true;
    } else {
      let num = !!userData?.entryFee
        ? Number(userData?.entryFee).toFixed(2)
        : '';

      if (!!userData?.entryFee) {
        if (num === '0.00' || isNaN(num)) {
          setentryFeeError(translations.DIGIT_IS_NOT_PERMITTED);
          return false;
        } else {
          setentryFeeError('');
          return true;
        }
      } else {
        setentryFeeError(translations.THIS_FIELD_REQUIRED);
        return false;
      }
    }
  };

  const isTicketPriceValid = () => {
    if (isEditting == true) {
      return true;
    } else {
      let num = !!userData.ticketPrice
        ? Number(userData.ticketPrice).toFixed(2)
        : '';

      if (!!userData.ticketPrice) {
        if (num === '0.00' || isNaN(num)) {
          setTicketPriceError(translations.DIGIT_IS_NOT_PERMITTED);
          return false;
        } else {
          setTicketPriceError('');
          return true;
        }
      } else {
        setTicketPriceError('');
        return true;
      }
    }
  };

  const validations = (isAddContestentPressed = false) => {
    moveDataToScreen();
    userData.eventTitle.trim().length === 0
      ? setEventTitleErr(translations.THIS_FIELD_REQUIRED)
      : setEventTitleErr('');
    userData.years?.name.length === 0
      ? setYearErr(translations.THIS_FIELD_REQUIRED)
      : setYearErr('');

    userData.ageDevision.length === 0
      ? setageDevisionErr(translations.THIS_FIELD_REQUIRED)
      : setageDevisionErr('');
    userData.phasesOfComp.length === 0
      ? setPhasesOfCOmpErr(translations.THIS_FIELD_REQUIRED)
      : setPhasesOfCOmpErr('');

    !!userData.eventLogo && !!editLogo
      ? setLogoErr('')
      : setLogoErr(translations.PLEASE_ADD_A_LOGO);
    prizeValidation();
    datesValidation();
    addressValidation();
    emailValidation();
    phoneNumberValidation();
    isEntryFeeValid();
    isTicketPriceValid();

    if (
      userData.eventTitle.length !== 0 &&
      userData.years?.name.length !== 0 &&
      userData.ageDevision.length !== 0 &&
      userData.phasesOfComp.length !== 0 &&
      !!userData.eventLogo &&
      !!editLogo &&
      emailValidation() &&
      _validateEmail(userData.email) &&
      datesValidation() &&
      addressValidation() &&
      phoneNumberValidation() &&
      moveDataToScreen() &&
      prizeValidation() &&
      isEntryFeeValid() &&
      isTicketPriceValid()
    ) {
      if (isEditting !== true) {
        hitCreateEventAPi(isAddContestentPressed);
      } else if (isAddContestentPressed === true) {
        navigation.navigate(SCREEN.EVENT_ADD_CONSTESTANT, {
          eventId: pageantDetail.id,
        });
      } else {
        if (
          pageantDetail.event_result_count > 0 &&
          checkIfDatesAreupcomingCurrent(
            userData.endDate,
            TIME_FORMAT.DDmilnusMMmilusYYYY,
          )
        ) {
          setremoveResModalVisible(true);
        } else {
          PCA_activationCofimation();
        }
      }
    } else {
      toastError(translations.MANDATORY_FEILDS_ARE_NOT_FILLED);
      moveToTopError();
    }
  };
  const PCA_activationCofimation = () => {
    if (
      !isPcaActive &&
      checkIfDatesAreupcomingCurrent(
        userData.endDate,
        TIME_FORMAT.DDmilnusMMmilusYYYY,
      ) &&
      dateDifference(
        new Date(),
        userData.endDate,
        TIME_FORMAT.DDmilnusMMmilusYYYY,
      ) >= 3
    ) {
      setScreenRefresh(REFESH_SCREEN.NONE);
      setActivatePCAmodalConfimation(true);
    } else {
      hitUpdateEvent(false);
    }
  };
  const hitUpdateEvent = async isAddContestentPressed => {
    setLoader(true);
    const res = await updateEvent();

    if (res.success) {
      setAddContestentMsg(
        translations.UNLOCKED_YPUR_EVENT_MANAGER +
          moment(
            res.data.event.pca_start_date_only,
            TIME_FORMAT.DDmilnusMMmilusYYYY,
          ).format(TIME_FORMAT.MMslashDDslashYYYY) +
          ' ' +
          res.data.event.pca_start_time_only +
          ' ' +
          translations.EST +
          translations.CLICK_BELOW_TO_ADD_YOUR_CONTESTANTS,
      );

      checkAndUploadebannerImage(res.data.event.id, isAddContestentPressed);
      setLoader(false);
      setScreenRefresh(REFESH_SCREEN.PAGEANT_EVENT_DETAIL);
    } else {
      setLoader(false);
    }
  };

  const checkAndUploadebannerImage = async (id, isAddContestentPressed) => {
    if (isEventLogoUpdated) {
      setUploadeLogoBody({
        type: IMAGE_TYPE.MAIN_IMAGE,
        profile_image: userData.eventLogo,
        pageant_id: id,
      });
      const uploadLogo = await uploadeLogo();
      if (uploadLogo.success) {
        checkAndUploadeBannerImg(id, isAddContestentPressed);
      }
    } else {
      checkAndUploadeBannerImg(id, isAddContestentPressed);
      setLoader(false);
    }
  };

  const onLogoImageChange = data => {
    setIsEventLogoUpdated(true);
    setEditLogo(data);

    onChangeUserData({
      eventLogo:
        data === undefined
          ? ''
          : {
              name: data?.name,
              type: data?.type,
              uri: data?.uri,
            },
    });
  };

  const onBannerImageChange = data => {
    setIsBannerImageUpdated(true);
    setEditbanner('');
    onChangeUserData({eventBanner: data === undefined ? '' : data});
  };
  const moveDataToScreen = (pcaActivationConfirm = false) => {
    if (isEditting) {
      setAddBody({
        title: userData.eventTitle,
        id: pageantDetail.id,
        year_id: userData.years.id,
        pageant_age_divisions: getIDsArrayFromArray(userData.ageDevision),
        pageant_phase_of_competitions: getIDsArrayFromArray(
          userData.phasesOfComp,
        ),
        start_date: checkIsNull(userData.startDate)
          ? moment(userData.startDate, TIME_FORMAT.DDmilnusMMmilusYYYY).format(
              TIME_FORMAT.MMDDYYYY,
            )
          : userData.startDate,
        end_date: checkIsNull(userData.endDate)
          ? moment(userData.endDate, TIME_FORMAT.DDmilnusMMmilusYYYY).format(
              TIME_FORMAT.MMDDYYYY,
            )
          : userData.endDate,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        latitude: userData.lat,
        longitude: userData.long,
        not_sure: dateNotSure ? 1 : 0,
        not_sure_end_date: dateNotSure ? 1 : 0,
        not_sure_address: addressNotSure ? 1 : 0,
        description: userData.prize.trim(),
        pca_activation_confirm: pcaActivationConfirm === true ? 1 : 0,
        should_result_remove: removeResultConfirmation,
      });
    } else {
      setAddBody({
        title: userData.eventTitle,
        master_pageant_id: pageantDetail.id,
        year_id: userData.years.id,
        pageant_age_divisions: getIDsArrayFromArray(userData.ageDevision),
        pageant_phase_of_competitions: getIDsArrayFromArray(
          userData.phasesOfComp,
        ),
        start_date: dateNotSure
          ? ''
          : moment(userData.startDate, TIME_FORMAT.DDmilnusMMmilusYYYY).format(
              TIME_FORMAT.MMDDYYYY,
            ),
        end_date: dateNotSure
          ? ''
          : moment(userData.endDate, TIME_FORMAT.DDmilnusMMmilusYYYY).format(
              TIME_FORMAT.MMDDYYYY,
            ),
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        latitude: userData.lat,
        longitude: userData.long,
        not_sure: dateNotSure ? 1 : 0,
        not_sure_end_date: dateNotSure ? 1 : 0,
        not_sure_address: addressNotSure ? 1 : 0,
        description: userData.prize.trim(),
        entry_fees: !!userData.entryFee
          ? Number(userData.entryFee).toFixed(2)
          : '',
        attend_fees: !!userData.ticketPrice
          ? Number(userData.ticketPrice).toFixed(2)
          : '',
      });
    }

    return true;
  };

  useEffect(() => {
    if (removeResultConfirmation === 1) {
      setremoveResModalVisible(false);
      moveDataToScreen(true);

      setTimeout(() => {
        PCA_activationCofimation();
      }, 1000);
    }
  }, [removeResultConfirmation]);

  const updateResultConfirm = async () => {
    await setRemoveResultConfirmation(1);
  };
  const hitCreateEventAPi = async (isAddContestentPressed: boolean) => {
    setLoader(true);
    const res = await createNewPagentEvent();
    if (res.success) {
      setEventId(res?.data?.event?.id);
      setAddContestentMsg(res.data.infoMessage);
      setUploadeLogoBody({
        type: IMAGE_TYPE.MAIN_IMAGE,
        profile_image: userData.eventLogo,
        pageant_id: res.data.event.id,
      });
      const uploadLogo = await uploadeLogo();
      if (uploadLogo.success) {
        checkAndUploadeBannerImg(
          (id = res.data.event.id),
          isAddContestentPressed,
        );
      }
    } else {
      setLoader(false);
    }
  };

  const checkAndUploadeBannerImg = async (id, isAddContestentPressed) => {
    if (isBannerImageUpdated) {
      setUploadeLogoBody({
        type: IMAGE_TYPE.BANNER_IMAGE,
        profile_image: userData.eventBanner,
        pageant_id: id,
      });

      const uploadBanner = await uploadeLogo();
    }

    if (isEditting) {
      if (pageantDetail.contestants_participated_count <= 5) {
        setScreenRefresh(REFESH_SCREEN.PAGEANT_DETAIL);
        if (
          !checkIfDatesAreupcomingCurrent(
            userData.endDate,
            TIME_FORMAT.DDmilnusMMmilusYYYY,
          )
        ) {
          setAddContestentMsg(translations.NOW_LETS_ADD);
          setShowCelebration(true);
          setScreenRefresh(REFESH_SCREEN.PAGEANT_EVENT_DETAIL);
        } else {
          if (!isPcaActive) {
            !pca_activation_confirm &&
              setAddContestentMsg(translations.NOW_LETS_ADD);
          }
          setShowCelebration(true);
          setScreenRefresh(REFESH_SCREEN.PAGEANT_EVENT_DETAIL);
        }
      } else {
        if (
          checkIfDatesAreupcomingCurrent(
            userData.endDate,
            TIME_FORMAT.DDmilnusMMmilusYYYY,
          )
        ) {
          if (!isPcaActive) {
            !pca_activation_confirm &&
              setAddContestentMsg(translations.NOW_LETS_ADD);
          }

          setScreenRefresh(REFESH_SCREEN.PAGEANT_EVENT_DETAIL);
          setShowCelebration(true);
        } else {
          setAddContestentMsg(translations.NOW_LETS_ADD);
          setShowCelebration(true);
          setScreenRefresh(REFESH_SCREEN.PAGEANT_EVENT_DETAIL);
        }
      }
    } else {
      setScreenRefresh(REFESH_SCREEN.PAGEANT_DETAIL);
      setShowCelebration(true);
    }

    setLoader(false);
  };
  const showSelectdDate = () => {
    if (isStartDateSelected) {
      if (!!userData.startDate) {
        return new Date(
          moment(userData.startDate, TIME_FORMAT.DDmilnusMMmilusYYYY).format(
            TIME_FORMAT.YYYYMMDD,
          ),
        );
      } else {
        const date = new Date();
        let finalDate;
        if (String(date.getMonth()).length === 1) {
          finalDate =
            userData.years.name +
            '-' +
            '0' +
            (date.getMonth() + 1) +
            '-' +
            date.getDate();
        } else {
          finalDate =
            userData.years.name +
            '-' +
            (date.getMonth() + 1) +
            '-' +
            date.getDate();
        }
        return new Date(
          moment(finalDate, TIME_FORMAT.YYYYMMDD).format(TIME_FORMAT.YYYYMMDD),
        );
      }
    }
    if (isEndDateSelected) {
      if (!!userData.endDate) {
        return new Date(
          moment(userData.endDate, TIME_FORMAT.DDmilnusMMmilusYYYY).format(
            TIME_FORMAT.YYYYMMDD,
          ),
        );
      } else {
        const date = new Date();
        let endFinalDate;

        if (String(date.getMonth()).length === 1) {
          endFinalDate =
            userData.years.name +
            '-' +
            '0' +
            (date.getMonth() + 1) +
            '-' +
            date.getDate();
        } else {
          endFinalDate =
            userData.years.name +
            '-' +
            (date.getMonth() + 1) +
            '-' +
            date.getDate();
        }
        return new Date(
          moment(endFinalDate, TIME_FORMAT.YYYYMMDD).format(
            TIME_FORMAT.YYYYMMDD,
          ),
        );
      }
    }
  };

  const emailView = () => {
    return (
      <FloatingInput
        floatingText={translations.EMAIL}
        setText={value => onChangeUserData({email: removeEmojis(value)})}
        value={userData.email}
        returnKeyType={'done'}
        isMandatory={true}
        editable={isEditting !== true}
        errorMsg={emailErr}
        customStyles={isEditting === true ? styles.opacity : null}
        laoutY={(val: any, index: string) => {
          dataSourceCords[index] = val;
        }}
      />
    );
  };
  return (
    <View style={{flex: 1}}>
      <Loader isLoading={loader} />
      {isEventStatusActive && (
        <View style={styles.inactiveMessageStyle}>
          <Text style={styles.inactiveMessageLabel}>
            {translations.MAKE_PAGEANT_ACTIVE_TO_ACTIVATE_YOUR_EVENT}
          </Text>
        </View>
      )}
      {isPagentInActive && (
        <View style={styles.inactiveMessageStyle}>
          <Text style={styles.inactiveMessageLabel}>
            {translations.MAKE_PAGEANT_ACTIVE_TO_ACTIVATE_YOUR_EVENT}
          </Text>
        </View>
      )}
      {showPCAWarningMessage && (
        <View style={styles.inactiveMessageStyle}>
          <Text style={styles.inactiveMessageLabel}>
            {translations.ADD_YOUR_UPCOMING_EVENT_TO_ACTIVATE_PCA}
          </Text>
        </View>
      )}
      <ScrollView
        style={styles.continer}
        ref={r => {
          setRef(r);
        }}>
        {isDateModalOpen && (
          <DateTimePicker
            maximumDate={setMaxDate()}
            minimumDate={setMinDate()}
            display={isIosDevice() ? 'inline' : 'default'}
            isVisible={isDateModalOpen}
            mode={'date'}
            date={showSelectdDate()}
            onConfirm={onChange}
            onCancel={hideDatepicker}
          />
        )}

        <FloatingInput
          floatingText={translations.NAME_OF_EVENT}
          setText={value => onChangeUserData({eventTitle: removeEmojis(value)})}
          value={userData.eventTitle}
          returnKeyType={'done'}
          isMandatory={true}
          errorMsg={eventTitleErr}
          laoutY={(val: any, index: string) => {
            dataSourceCords[index] = val;
          }}
        />
        <FloatingInput
          floatingText={translations.PAGEANT}
          setText={value => onChangeUserData({pageant: removeEmojis(value)})}
          value={userData.pageant}
          returnKeyType={'done'}
          isMandatory={true}
          editable={false}
          customStyles={styles.opacity}
          laoutY={(val: any, index: string) => {
            dataSourceCords[index] = val;
          }}
        />

        <FloatingDropdown
          floatingText={translations.YEAR_SHOW_ON_THE_SASH}
          value={String(userData.years.name)}
          onFieldFocus={() => {
            setIsModalVisible({
              ...isModalVisible,
              years: true,
            });
          }}
          isMandatory={true}
          errorMsg={yearErr}
          isMandatory={true}
          laoutY={(val: any, index: string) => {
            dataSourceCords[index] = val;
          }}
        />
        <CustomBottomModal
          isModalVisible={isModalVisible.years}
          setIsModalVisible={val =>
            setIsModalVisible({
              ...isModalVisible,
              years: val,
            })
          }
          data={modalData.years}
          parentCallback={selectedText => {
            onChangeUserData({years: selectedText, startDate: '', endDate: ''});
          }}
          heading={translations.YEAR_SHOW_ON_THE_SASH}
          enableSearch={true}
          preSelectedValue={userData.years.id}
        />

        {datesView()}

        <Text
          style={styles.dateNotSure}
          onPress={() => {
            setDateNotSure(!dateNotSure);
            setStartDateErr('');
            setEndDateErr('');
            onChangeUserData({endDate: '', startDate: ''});
          }}>
          {!dateNotSure ? translations.NOT_SURE : translations.SELECT_DATE}
        </Text>

        {emailView()}

        <FloatingInput
          floatingText={translations.PHONE_NUMBER}
          setText={value =>
            onChangeUserData({phone: value.replace(/[^\d]/g, '')})
          }
          value={userData.phone}
          returnKeyType={'done'}
          errorMsg={phoneErr}
          maxLength={16}
          keyboardType={'numeric'}
          laoutY={(val: any, index: string) => {
            dataSourceCords[index] = val;
          }}
        />
        {!isPlanActive && (
          <Text style={styles.notVisibleText}>
            {translations.NOT_VISIBLE_ON_PROFILE}
            <Text
              style={styles.dateNotSure}
              onPress={() => {
                setIsPreviewModalVisible(true);
              }}>
              {translations.TAP_HERE}
            </Text>
            {translations.TO_UPGRADE}
          </Text>
        )}
        {isEditting !== true && (
          <>
            <FloatingInput
              floatingText={translations.HOW_MUCH_ARE_YOUR_ENTRY_FEE}
              returnKeyType={'done'}
              value={isValueNull(userData?.entryFee)}
              setText={val => {
                onChangeUserData({entryFee: ConTwoDecDigit(val.trim())});
              }}
              isMandatory
              keyboardType="numeric"
              errorMsg={entryFeeError}
              maxLength={6}
              laoutY={(val: any, index: string) => {
                dataSourceCords[index] = val;
              }}
            />
            <FloatingInput
              floatingText={translations.HOW_MUCH_IS_A_TICKET}
              returnKeyType={'done'}
              value={isValueNull(userData?.ticketPrice)}
              setText={val => {
                onChangeUserData({ticketPrice: ConTwoDecDigit(val.trim())});
              }}
              keyboardType="numeric"
              errorMsg={ticketPriceError}
              maxLength={6}
              laoutY={(val: any, index: string) => {
                dataSourceCords[index] = val;
              }}
            />
          </>
        )}

        <MultiSelectinput
          floatingText={translations.AGE_DEVISION}
          value={userData?.ageDevision}
          isMandatory={true}
          onFieldFocus={() => {
            setIsModalVisible({
              ...isModalVisible,
              ageDevision: true,
            });
          }}
          onDelete={val => {
            onChangeUserData({ageDevision: val});
          }}
          addMore={() => {
            setIsModalVisible({
              ...isModalVisible,
              ageDevision: true,
            });
          }}
          errorMsg={ageDevisionErr}
          laoutY={(val: any, index: string) => {
            dataSourceCords[index] = val;
          }}
        />

        <CustomBottomModal
          isModalVisible={isModalVisible.ageDevision}
          setIsModalVisible={val =>
            setIsModalVisible({
              ...isModalVisible,
              ageDevision: val,
            })
          }
          data={modalData.ageDevision}
          parentCallback={selectedText =>
            onChangeUserData({ageDevision: selectedText})
          }
          heading={translations.AGE_DEVISION}
          preSelectedValue={userData.ageDevision}
          enableSearch={true}
          enableMultiselect={true}
        />
        <MultiSelectinput
          floatingText={translations.PHASES_OF_COMPETETION}
          value={userData?.phasesOfComp}
          isMandatory={true}
          onFieldFocus={() => {
            setIsModalVisible({
              ...isModalVisible,
              phasesOfComp: true,
            });
          }}
          errorWarningMsg={
            translations.TO_REMOVE_PHASE_OF_COMPETITION_FIRST_REMOVE_FROM_THE_EVENT_GALLERY
          }
          onDelete={val => {
            onChangeUserData({phasesOfComp: val});
          }}
          addMore={() => {
            setIsModalVisible({
              ...isModalVisible,
              phasesOfComp: true,
            });
          }}
          errorMsg={phasesOfCOmpErr}
          laoutY={(val: any, index: string) => {
            dataSourceCords[index] = val;
          }}
        />
        <CustomBottomModal
          isModalVisible={isModalVisible.phasesOfComp}
          setIsModalVisible={val =>
            setIsModalVisible({
              ...isModalVisible,
              phasesOfComp: val,
            })
          }
          data={modalData.phasesOfComp}
          parentCallback={selectedText =>
            onChangeUserData({phasesOfComp: selectedText})
          }
          heading={translations.PHASES_OF_COMPETETION}
          preSelectedValue={userData.phasesOfComp}
          enableSearch={true}
          enableMultiselect={true}
        />

        {addressView()}

        {/* <SearchAdress
          isModalVisible={isModalVisible.address}
          setIsModalVisible={val => {
            setIsModalVisible({
              ...isModalVisible,
              address: val,
            });
          }}
          onItemSelect={onAddresss}
        /> */}
        <Text
          style={styles.dateNotSure}
          onPress={() => {
            setAddressNotSure(!addressNotSure);
            onChangeUserData({address: ''});
            setAddressErr('');
          }}>
          {!addressNotSure
            ? translations.NOT_SURE_ABOUT_ADDRESS
            : translations.SELECT_THE_ADDRESS}
        </Text>

        <FloatingBigInput
          floatingText={translations.PRIZE_PACKAGE}
          value={userData.prize}
          returnKeyType={'done'}
          multiline={true}
          numberOfLines={5}
          textAlignVertical={'top'}
          lengthCheck={true}
          setText={value => onChangeUserData({prize: removeEmojis(value)})}
          forMultiline={true}
          autoCapitalize={'sentences'}
          showLength={false}
          errorMsg={prizeErr}
          isMandatory={true}
          laoutY={(val: any, index: string) => {
            dataSourceCords[index] = val;
          }}
        />

        <HeadShotImage
          onImageFound={onLogoImageChange}
          url={isEditting ? editLogo : userData.eventLogo}
          label={translations.UPLOAD_LOGO_FOR_EVENT}
          showNote={false}
          isMandatory={true}
          heading={translations.LOGO_FOR_EVENT}
          errorMsg={logoErr}
          displayHeadUrl={userData.eventLogo ? true : false}
        />
        <HeadShotImage
          onImageFound={onBannerImageChange}
          url={isEditting ? editbanner : userData.eventBanner}
          showNote={false}
          note={translations.PAGEANT_BANNER}
          heading={'Banner Image'}
          id={IMAGE_TYPE.BANNER_IMAGE}
          label={translations.UPLOAD_BANNER_IMAGE}
          displayHeadUrl={userData.eventBanner ? true : false}
        />
        <View style={styles.bottmHeigt} />
      </ScrollView>
      <WarningModel
        msg={translations.EVENT_PCA_AVTIVATION_CONFIRAMATION}
        isModalVisible={activatePCAmodalConfimation}
        setConfirm={() => {
          setPcaActivationConfirm(true);
          moveDataToScreen(true);
          setTimeout(() => {
            hitUpdateEvent(false);
            setActivatePCAmodalConfimation(false);
          }, 1000);
        }}
        setIsModalVisible={setActivatePCAmodalConfimation}
        headingStyle={styles.modalHeading}
        onDenay={() => {
          setPcaActivationConfirm(false);
          hitUpdateEvent(false);
          setActivatePCAmodalConfimation(false);
        }}
        yesButtonText={translations.YES}
      />
      <WarningModel
        msg={translations.UPDATE_EVENT_DATES_WILL_ROMOVE_RESULTS}
        isModalVisible={removeResModalVisible}
        setConfirm={updateResultConfirm}
        setIsModalVisible={setremoveResModalVisible}
        headingStyle={styles.modalHeading}
        onDenay={() => {
          onChangeUserData({
            startDate: checkIsNull(pageantDetail.start_date)
              ? moment(pageantDetail.start_date, TIME_FORMAT.YYYYMMDD).format(
                  TIME_FORMAT.DDmilnusMMmilusYYYY,
                )
              : '',
            endDate: checkIsNull(pageantDetail.end_date)
              ? moment(pageantDetail.end_date, TIME_FORMAT.YYYYMMDD).format(
                  TIME_FORMAT.DDmilnusMMmilusYYYY,
                )
              : '',
          });

          setremoveResModalVisible(false);
        }}
      />
      <ViewPlanModal
        isPreviewModalVisible={isPreviewModalVisible}
        setIsPreviewModalVisible={setIsPreviewModalVisible}
        pageantPlanDetail={pageantPlanDetail}
        pageantId={pageantId}
      />
      {isEditting && (
        <FloatingButton
          iconId={FLOATING_ICON.PLUS}
          onPress={() => {
            isSaveActive
              ? validations(true)
              : toast(
                  translations.ACTIVATE_YOUR_EVENT_TO_ADD_CONTESTENT,
                  toastType.ERROR_TOAST,
                );
          }}
        />
      )}
    </View>
  );
};

export default AddEventComp;

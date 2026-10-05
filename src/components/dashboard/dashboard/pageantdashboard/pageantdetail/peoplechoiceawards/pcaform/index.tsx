import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './styles';
import Header from '../../../../../../common/header';
import translations from '../../../../../../../assets/translations';
import ActivateContestView from './components/activatecontestView';
import CheckBoxView from './components/checkboxview';
import VotePriceAndPcaName from './components/votepriceandpcanameView';
import {
  checkIsConnected,
  keyBoardManager,
  removeMiddleSpaces,
} from '../../../../../../utils/helperFunction';
import StartEndDateView from './components/startenddateView';
import HideVotesView from './components/hidevotesview';
import HalfPriceVoteView from './components/halfpricevoteview';
import HideVotesScheduler from './components/hidevotescheduler';
import AdjustAgeDevision from './components/adjustagedevision';
import {INFO_ARRAY} from './localArray';
import {REFESH_SCREEN} from '../../../../../../utils/enum';
import moment from 'moment';
import useCgMutation from '../../../../../../../services/api/useCgMutation';
import {
  GET_PAGEANT_AND_EVENT_DETAIL,
  UPDATE_PCA,
} from '../../../../../../../services/endpoints';
import {useSetScreenRefresh} from '../../../../../../../store/useAppStore';
import {PageantDetailData} from '../../../../../../../services/models/pageantdetails/pageantDetailData';
import {Base} from '../../../../../../../services/models/base';
import {checkIsNull, isValueNull} from '../../../../../../utils/validations';
import {
  StackActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/core';
import {color} from '../../../../../../../assets/colorConstant';
import {SCREEN} from '../../../../../../../root/screenname';
import {
  BACKEND_NULL_VAR,
  dateDifference,
  getCustomDateFormat,
  TIME_FORMAT,
  verifyIfDateLiesBtw,
} from '../../../../../../utils/datetimemanger';
import {CountryResponse} from '../../../../../../../services/models/country/countryResponse';
import {MethodTypes} from '../../../../../../../services/constants';
import {useBackHandler, useKeyboard} from '@react-native-community/hooks';
import Loader from '../../../../../../common/customloader';
import {moderateScaleVertical} from '../../../../../../utils/responsiveSize';
import {EVENT_DETAIL_MENU_ID} from '../../eventlist/eventdetail/components/menu';
import {toastError} from '../../../../../../common/commonalert';

const PcaForm = props => {
  const {
    eventId,
    plan,
    parentImageUrl,
    parentBannerImageUrl,
    parentWebsiteUrl,
    parentTitle,
    isCommingFormPagentDetails,
  } = props?.route?.params;

  const [loader, setLoader] = useState(false);
  const isFocused = useIsFocused();
  const setScreenRefresh = useSetScreenRefresh();
  const navigation = useNavigation();
  const keyBoard = useKeyboard();
  useEffect(() => {
    getPcaDetails();
    keyBoardManager();
  }, []);
  useEffect(() => {
    if (isFocused) {
      getPcaDetailsForVarUpdate();
    }
  }, [isFocused]);

  const scrollViewRef = useRef();
  const [count, setCount] = useState(0);
  const [dataSourceCords, setDataSourceCords] = useState({});
  const [showPinkMessage, setShowPinkMessage] = useState(false);
  const [ageDevisionVisible, setAgeDevisionVisible] = useState(false);
  const [activateContestent, setActivateContestent] = useState(false);
  const [oneWinnerAllAge, setOneWinnerAllAge] = useState(true);
  const [hideLastName, setHideLastName] = useState(false);
  const [hideVotes, setHideVotes] = useState(false);
  const [halfPrice, sethalfPrice] = useState(false);
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [notSureStartDate, setNotSureStartDate] = useState(0);
  const [notSureEndDate, setNotSureEndDate] = useState(0);
  const [tapHere, setTapHere] = useState(false);
  const [tapHeretoAdd, setTapHeretoAdd] = useState(false);
  const [pageantDetail, setPageantDetail] = useState([]);
  const [ageDivisionData, setAgeDivisionData] = useState([]);
  const [hide_pca_status_message, setHide_pca_status_message] = useState('');
  const [pcaData, setPcaData] = useState({
    perVotePrice: '0',
    pcaname: translations.PEOPLE_CHOICE_AWARD,
    startDate: '',
    endDate: '',
    contestentSortBy: translations.NUMBER_OF_VOTES,
    showPredictiveMatrix: translations.YES,
    halfPriceStartDate: '',
    halfPriceEndDate: '',
    hideVoteSchedulerDate: '',
    ageDevisionArray: [],
  });
  const [pcaError, setPcaError] = useState();
  const getPagentAgeDivisionArrForBackend = () => {
    let newArr = [];
    if (ageDivisionData.length > 0) {
      for (let index = 0; index < ageDivisionData.length; index++) {
        const element = ageDivisionData[index];
        const arr = {
          age_division_id: element?.id,
          pca_end_date: getCustomDateFormat(
            element?.pca_end_date_time_est,
            TIME_FORMAT.DDMMYYYYHHMMA,
            TIME_FORMAT.YYYYDDMMhhmmA,
          ),
          hide_vote_date_schedulers: getCustomDateFormat(
            element?.hide_votes_scheduler_date_time_est,
            TIME_FORMAT.DDMMYYYYHHMMA,
            TIME_FORMAT.YYYYDDMMhhmmA,
          ),
        };

        newArr.push(arr);
      }

      return newArr;
    } else {
      return [];
    }
  };
  const updatePCABody = {
    id: eventId,
    pca_start_date: getCustomDateFormat(
      pcaData.startDate,
      TIME_FORMAT.DDMMYYYYHHMMA,
      TIME_FORMAT.YYYYDDMMhhmmA,
    ),
    pca_end_date: getCustomDateFormat(
      pcaData.endDate,
      TIME_FORMAT.DDMMYYYYHHMMA,
      TIME_FORMAT.YYYYDDMMhhmmA,
    ),
    is_pca_activated: activateContestent
      ? translations.YES
      : translations.NO_SMALL,
    hide_vote_count: hideVotes ? translations.YES : translations.NO_SMALL,
    hide_contestant_last_name: hideLastName
      ? translations.YES
      : translations.NO_SMALL,
    different_pca_end_dates: !oneWinnerAllAge
      ? translations.YES
      : translations.NO_SMALL,
    contestants_sort_by_vote_count:
      pcaData.contestentSortBy === translations.NUMBER_OF_VOTES ? 1 : 0,
    show_predictive_matrix: pcaData.showPredictiveMatrix,
    one_winner_only:
      oneWinnerAllAge === true ? translations.YES : translations.NO_SMALL,
    hide_votes_scheduler_date: getCustomDateFormat(
      pcaData.hideVoteSchedulerDate,
      TIME_FORMAT.DDMMYYYYHHMMA,
      TIME_FORMAT.YYYYDDMMhhmmA,
    ),
    is_half_price:
      halfPrice === true ? translations.YES : translations.NO_SMALL,
    half_price_start_date_time: getCustomDateFormat(
      pcaData.halfPriceStartDate,
      TIME_FORMAT.DDMMYYYYHHMMA,
      TIME_FORMAT.YYYYDDMMhhmmA,
    ),
    half_price_end_date_time: getCustomDateFormat(
      pcaData.halfPriceEndDate,
      TIME_FORMAT.DDMMYYYYHHMMA,
      TIME_FORMAT.YYYYDDMMhhmmA,
    ),
    per_vote_price: pcaData.perVotePrice,
    people_award_name: pcaData.pcaname,
    pageantAgeDivisionsArr: getPagentAgeDivisionArrForBackend(),
  };

  const lengthValidation = (val: string | any[]) => {
    if (val.length > 0) {
      return '';
    } else {
      return translations.THIS_FIELD_REQUIRED;
    }
  };

  const {mutateAsync: eventData} = useCgMutation<Base<PageantDetailData>>({
    key: GET_PAGEANT_AND_EVENT_DETAIL,
    method: MethodTypes.GET,
    url: GET_PAGEANT_AND_EVENT_DETAIL + eventId,
    offSuccessToast: true,
    disableLoader: true,
  });
  const {mutateAsync: updatePCAEvent} = useCgMutation<Base>({
    key: UPDATE_PCA,
    url: UPDATE_PCA,
    body: updatePCABody,
    disableLoader: true,
  });

  const onBack = () => {
    if (isCommingFormPagentDetails !== undefined) {
      navigation.dispatch(
        StackActions.replace(SCREEN.EVENT_DETAIL, {
          pageantEventDetailId: eventId,
          plan: plan,
          pagentLogo: parentImageUrl,
          parentBannerImageUrl: parentBannerImageUrl,
          parentWebsiteUrl: parentWebsiteUrl,
          parentTitle: parentTitle,
          isCommingFormPagentDetails: isCommingFormPagentDetails,
          tab: EVENT_DETAIL_MENU_ID.PEOPLE_CHOICE_AWARD,
        }),
      );
    } else {
      navigation.goBack();
    }
  };

  useBackHandler(() => {
    onBack();

    return true;
  });

  const hitUpdatePCA = async () => {
    if (checkIsConnected()) {
      setLoader(true);
      const res = await updatePCAEvent();
      if (res.success) {
        if (!activateContestent) {
          if (isCommingFormPagentDetails === true) {
            setScreenRefresh(REFESH_SCREEN.PAGEANT_DETAIL);
          } else {
            setScreenRefresh(REFESH_SCREEN.ACTIVATE_PCA_EVENT_SECTION);
          }
          setShowPinkMessage(true);
        } else if (pageantDetail.participants_count < 5) {
          setScreenRefresh(REFESH_SCREEN.ACTIVATE_PCA_EVENT_SECTION);
          navigation.dispatch(
            StackActions.replace(SCREEN.EVENT_ADD_CONSTESTANT, {
              eventId: eventId,
            }),
          );
        } else {
          if (isCommingFormPagentDetails === true) {
            setScreenRefresh(REFESH_SCREEN.PAGEANT_DETAIL);
            navigation.dispatch(
              StackActions.replace(SCREEN.EVENT_DETAIL, {
                pageantEventDetailId: eventId,
                plan: plan,
                pagentLogo: parentImageUrl,
                parentBannerImageUrl: parentBannerImageUrl,
                parentWebsiteUrl: parentWebsiteUrl,
                parentTitle: parentTitle,
                isCommingFormPagentDetails: isCommingFormPagentDetails,
                tab: EVENT_DETAIL_MENU_ID.PEOPLE_CHOICE_AWARD,
              }),
            );
          } else {
            setScreenRefresh(REFESH_SCREEN.ACTIVATE_PCA_EVENT_SECTION);
            navigation.goBack();
          }
        }
      }
    }
    setLoader(false);
  };

  const checkDatesAreNull = (
    data: string | Base<CountryResponse> | null | undefined,
  ) => {
    if (!checkIsNull(data) || data === BACKEND_NULL_VAR.ALL_ZEROS) {
      return '';
    } else {
      return data;
    }
  };

  const ageDevisionDatahandeling = data => {
    let newArr = [];
    for (let item = 0; item < data.length; item++) {
      const element = data[item];
      const ageArr = [
        {
          id: element.age_division.id,
          name: element.age_division.name,
          pca_end_date_time_est: element.pca_end_date_time_est,
          hide_votes_scheduler_date_time_est:
            element.hide_votes_scheduler_date_time_est,
          isValidPCAEndDate: false,
          isValidHideVoteSchedulerDate: false,
        },
      ];
      newArr = [...newArr, ...ageArr];
      setAgeDivisionData(newArr);
      setCount(count + 1);
    }
  };
  const getPcaDetailsForVarUpdate = async () => {
    if (checkIsConnected()) {
      setLoader(true);
      const res = await eventData();
      if (res.success) {
        const data = res.data.pageant_details;
        setNotSureStartDate(data.not_sure);
        setNotSureEndDate(data.not_sure_end_date);
        setEventStartDate(
          moment(data.start_date, TIME_FORMAT.YYYYMMDD).format(
            TIME_FORMAT.DDMMYYYYHHMMA,
          ),
        );
        setEventEndDate(
          moment(`${data.end_date} 23:59`, TIME_FORMAT.YYYYMMDDHHMM).format(
            TIME_FORMAT.DDMMYYYYHHMMA,
          ),
        );
      }
      setLoader(false);
    }
    setLoader(false);
  };

  const getPcaDetails = async () => {
    if (checkIsConnected()) {
      setLoader(true);
      const res = await eventData();
      if (res.success) {
        const data = res.data.pageant_details;
        ageDevisionDatahandeling(data.pageant_age_division);
        setPageantDetail(data);
        ageDevisionDatahandeling(data.pageant_age_division);
        setActivateContestent(
          data.is_pca_activated === translations.NO_SMALL ? false : true,
        );
        setOneWinnerAllAge(data.one_winner_only === 0 ? false : true);
        setHideLastName(
          data.hide_contestant_last_name === translations.NO_SMALL
            ? false
            : true,
        );
        setHideVotes(data.hide_vote_count === 0 ? false : true);
        sethalfPrice(data.is_half_price === 0 ? false : true);
        setNotSureStartDate(data.not_sure);
        setNotSureEndDate(data.not_sure_end_date);
        setEventStartDate(
          moment(data.start_date, TIME_FORMAT.YYYYMMDD).format(
            TIME_FORMAT.DDMMYYYYHHMMA,
          ),
        );
        setEventEndDate(
          moment(`${data.end_date} 23:59`, TIME_FORMAT.YYYYMMDDHHMM).format(
            TIME_FORMAT.DDMMYYYYHHMMA,
          ),
        );
        setHide_pca_status_message(data?.hide_pca_status_message);
        onChangePcaData({
          perVotePrice:
            isValueNull(data.per_vote_price) === ''
              ? '0'
              : isValueNull(data.per_vote_price),
          pcaname: data.people_award_name,
          startDate: checkDatesAreNull(data.pca_start_date_time_est),
          endDate: checkDatesAreNull(data.pca_end_date_time_est),
          contestentSortBy:
            data.contestants_sort_by_vote_count === 0
              ? translations.DEFAULT
              : translations.NUMBER_OF_VOTES,
          showPredictiveMatrix:
            data.show_predictive_matrix == 0
              ? translations.NO_SMALL
              : translations.YES,
          halfPriceStartDate: checkDatesAreNull(
            data.half_price_start_date_time_est,
          ),
          halfPriceEndDate: checkDatesAreNull(
            data.half_price_end_date_time_est,
          ),
          hideVoteSchedulerDate: checkDatesAreNull(
            data.hide_votes_scheduler_date_time_est,
          ),
          ageDevisionArray: data.pageant_age_division,
        });
      }

      setLoader(false);
    }
    setLoader(false);
  };
  const startDateValidation = () => {
    if (pcaData.startDate === '' && activateContestent) {
      return translations.THIS_FIELD_REQUIRED;
    } else if (dateDifference(pcaData.startDate, pcaData.endDate) < 0) {
      return translations.GREATER_PCA_START_DATE;
    } else if (
      dateDifference(pcaData.startDate, pcaData.endDate) >= 0 &&
      dateDifference(pcaData.startDate, pcaData.endDate) <= 3
    ) {
      return translations.CONTEST_LENGTH;
    } else {
      return true;
    }
  };
  const halfPriceStartDateValidation = () => {
    if (halfPrice) {
      if (pcaData.halfPriceStartDate === '' && halfPrice) {
        return translations.THIS_FIELD_REQUIRED;
      } else if (
        dateDifference(pcaData.halfPriceStartDate, pcaData.startDate) >= 0 ||
        dateDifference(pcaData.halfPriceStartDate, pcaData.endDate) <= 0
      ) {
        return translations.HALF_PRICE_START_DATE;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  const halfPriceEndDateValidation = () => {
    if (halfPrice) {
      if (dateDifference(pcaData.endDate, pcaData.halfPriceEndDate) >= 0) {
        return translations.HALF_PRICE_END_DATE;
      } else if (
        dateDifference(pcaData.halfPriceStartDate, pcaData.halfPriceEndDate) <=
        0
      ) {
        return translations.SAME_HALF_PRICE_START_END_TIME;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  const endDateValidation = () => {
    setTapHere(false);

    setTapHeretoAdd(false);
    if (pcaData.endDate === '' && activateContestent) {
      return translations.THIS_FIELD_REQUIRED;
    } else if (
      dateDifference(eventEndDate, pcaData.endDate) > 0 &&
      activateContestent
    ) {
      setTapHere(true);
      return translations.CONTEST_DATE_VALIDATION;
    } else if (dateDifference(pcaData.startDate, pcaData.endDate) < 0) {
      return translations.SMALL_PCA_END_DATE;
    } else if (
      dateDifference(pcaData.startDate, pcaData.endDate) >= 0 &&
      dateDifference(pcaData.startDate, pcaData.endDate) <= 3
    ) {
      return translations.CONTEST_LENGTH;
    } else if (
      (notSureEndDate ||
        notSureStartDate === 1 ||
        eventEndDate === '' ||
        eventEndDate === null ||
        eventStartDate === '' ||
        eventStartDate === null) &&
      activateContestent
    ) {
      setTapHeretoAdd(true);
      return translations.FILL_EVENT_DATES;
    } else {
      return true;
    }
  };
  const checkIfAgeDevisionDatesArevalid = () => {
    let trueCount = 0;
    if (oneWinnerAllAge === true) {
      return true;
    } else {
      for (let index = 0; index < ageDivisionData.length; index++) {
        const element = ageDivisionData[index];
        if (element.isValidPCAEndDate === true) {
          trueCount = trueCount + 1;
        }
      }

      if (trueCount === ageDivisionData.length) {
        return true;
      } else {
        return false;
      }
    }
  };
  const checkIsValidHideVoteSchedulerDate = () => {
    let trueCount = 0;
    if (oneWinnerAllAge) {
      return true;
    } else {
      if (!hideVotes) {
        return true;
      } else {
        for (let index = 0; index < ageDivisionData.length; index++) {
          const element = ageDivisionData[index];
          if (element.isValidHideVoteSchedulerDate === true) {
            trueCount = trueCount + 1;
          }
        }

        if (trueCount === ageDivisionData.length) {
          return true;
        } else {
          return false;
        }
      }
    }
  };

  const hideVoteSchedulerValidation = () => {
    if (hideVotes) {
      if (
        verifyIfDateLiesBtw(
          pcaData.startDate,
          pcaData.endDate,
          pcaData.hideVoteSchedulerDate,
        )
      ) {
        return translations.SCHEDULER_DATE_SHOULD_BE_BETWEEN_PCA_START_END_DATE;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  const perVotePrice = () => {
    if (!!pcaData.perVotePrice && activateContestent) {
      if (Number(pcaData.perVotePrice).toFixed(2) === '0.00') {
        return translations.THIS_FIELD_REQUIRED;
      } else {
        return '';
      }
    } else {
      return '';
    }
  };
  const moveToError = key => {
    if (scrollViewRef?.current) {
      scrollViewRef?.current?.scrollTo({
        x: 0,
        y: dataSourceCords[removeMiddleSpaces(key)],
        animated: true,
      });
    }
  };

  const scrollToTopError = () => {
    if (
      perVotePrice(pcaData.perVotePrice) !== '' ||
      lengthValidation(pcaData.pcaname)
    ) {
      moveToError(removeMiddleSpaces(translations.PER_VOTE_PRICE));
    } else if (startDateValidation() !== true || endDateValidation() !== true) {
      moveToError(removeMiddleSpaces(translations.START_END_DATE));
    } else if (
      halfPriceStartDateValidation() !== true ||
      halfPriceEndDateValidation() !== true
    ) {
      moveToError(removeMiddleSpaces(translations.HALF_PRICE_VOTES));
    } else if (
      checkIsValidHideVoteSchedulerDate() !== true ||
      checkIfAgeDevisionDatesArevalid() !== true
    ) {
      moveToError(
        removeMiddleSpaces(translations.ADJUST_AGE_DEVISION_END_DATE),
      );
    }
  };
  const isValidSetErrorMsg = () => {
    scrollToTopError();
    onChangePcaError({
      perVotePrice: perVotePrice(pcaData.perVotePrice),
      pcaname: lengthValidation(pcaData.pcaname),
      startDate: startDateValidation(),
      endDate: endDateValidation(),
      halfPriceStartDate: halfPriceStartDateValidation(),
      halfPriceEndDate: halfPriceEndDateValidation(),
      hideVoteSchedulerDate: hideVoteSchedulerValidation(),
    });
    checkIsValidHideVoteSchedulerDate();
    checkIfAgeDevisionDatesArevalid();
    getPagentAgeDivisionArrForBackend();
    if (
      perVotePrice(pcaData.perVotePrice) === '' &&
      lengthValidation(pcaData.pcaname) === '' &&
      startDateValidation() === true &&
      endDateValidation() === true &&
      halfPriceStartDateValidation() === true &&
      halfPriceEndDateValidation() === true &&
      hideVoteSchedulerValidation() === true &&
      checkIsValidHideVoteSchedulerDate() === true &&
      checkIfAgeDevisionDatesArevalid() === true
    ) {
      hitUpdatePCA();
    } else {
      toastError(translations.MANDATORY_FEILDS_ARE_NOT_FILLED);
    }
  };

  const onChangePcaData = val => {
    setPcaData({...pcaData, ...val});
  };
  const onChangePcaError = val => {
    setPcaError({...pcaError, ...val});
  };

  const scroolToBottom = () => {
    scrollViewRef.current.scrollToEnd({animated: true});
  };
  useEffect(() => {
    scrollOnKeybordOpen();
  }, [keyBoard.keyboardShown]);

  const scrollOnKeybordOpen = () => {
    if (keyBoard.keyboardShown) {
      setTimeout(() => {
        scrollViewRef.current.scrollTo({
          animated: true,
          y: moderateScaleVertical(50),
        });
      }, 300);
    }
  };
  const onPressSave = () => {
    if (!!hide_pca_status_message) {
      return false;
    } else {
      isValidSetErrorMsg();
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Loader isLoading={loader} />
      <View>
        <Header
          lable={translations.PEOPLE_CHOICE_AWARD}
          rightText={translations.SAVE}
          isUnderLineRequired
          onPressRightText={onPressSave}
          infoIcon={true}
          infoDataArray={INFO_ARRAY}
          onPressBack={onBack}
          isSaveActive={!!hide_pca_status_message ? false : true}
        />
        {showPinkMessage && (
          <View style={styles.inactiveMessageStyle}>
            <Text style={styles.inactiveMessageLabel}>
              {translations.SELECT_ACTIVATE_CONTESTENT_TO_UNLOACK}
            </Text>
          </View>
        )}
        {!!hide_pca_status_message && (
          <View style={styles.inactiveMessageStyle}>
            <Text style={styles.inactiveMessageLabel}>
              {hide_pca_status_message}
            </Text>
          </View>
        )}
        <ScrollView ref={scrollViewRef}>
          <View style={[styles.innerView, styles.innerViewpaddingTop]}>
            <ActivateContestView
              activateContestent={activateContestent}
              setActivateContestent={setActivateContestent}
              onChangePcaData={onChangePcaData}
            />
            <CheckBoxView
              activateContestent={activateContestent}
              oneWinnerAllAge={oneWinnerAllAge}
              setOneWinnerAllAge={setOneWinnerAllAge}
              hideLastName={hideLastName}
              setHideLastName={setHideLastName}
              hideVotes={hideVotes}
              setHideVotes={setHideVotes}
              halfPrice={halfPrice}
              sethalfPrice={sethalfPrice}
              onChangePcaData={onChangePcaData}
              onChangePcaError={onChangePcaError}
            />
          </View>
          <View
            style={styles.innerView}
            onLayout={event => {
              const layout = event.nativeEvent.layout;
              let obj = dataSourceCords;
              obj[removeMiddleSpaces(translations.PER_VOTE_PRICE)] = layout.y;
              setDataSourceCords(obj);
            }}>
            <VotePriceAndPcaName
              pcaData={pcaData}
              pcaError={pcaError}
              activateContestent={activateContestent}
              onChangePcaData={onChangePcaData}
              scrollOnKeybordOpen={scrollOnKeybordOpen}
              setDataSourceCords={setDataSourceCords}
            />
          </View>
          <View
            onLayout={event => {
              const layout = event.nativeEvent.layout;
              let obj = dataSourceCords;
              obj[removeMiddleSpaces(translations.START_END_DATE)] = layout.y;
              setDataSourceCords(obj);
            }}>
            <StartEndDateView
              pcaData={pcaData}
              onChangePcaData={onChangePcaData}
              pcaError={pcaError}
            />
          </View>
          {tapHere && (
            <TouchableOpacity
              style={styles.innerView}
              onPress={() =>
                navigation.navigate(SCREEN.ADD_PAGENT_EVENT, {
                  pageantDetail: pageantDetail,
                  isEditting: true,
                  tapHere: true,
                })
              }>
              <Text style={styles.notVisible}>
                {translations.ADD_EVENT_DATE}
                <Text style={{...styles.notVisible, color: color.P_PINK}}>
                  {translations.TAP_HERE}
                </Text>
                <Text style={styles.notVisible}>
                  {translations.EDIT_EVENT_DATE}
                </Text>
              </Text>
            </TouchableOpacity>
          )}
          {tapHeretoAdd && (
            <TouchableOpacity
              style={styles.innerView}
              onPress={() =>
                navigation.navigate(SCREEN.ADD_PAGENT_EVENT, {
                  pageantDetail: pageantDetail,
                  isEditting: true,
                  tapHere: true,
                })
              }>
              <Text style={styles.notVisible}>
                {translations.PLEASE}
                <Text style={{...styles.notVisible, color: color.P_PINK}}>
                  {translations.TAP_HERE}
                </Text>
                <Text style={styles.notVisible}>
                  {translations.TAP_HERE_ADD}
                </Text>
              </Text>
            </TouchableOpacity>
          )}
          <View style={styles.innerView}>
            {hideVotes && (
              <HideVotesView
                pcaData={pcaData}
                onChangePcaData={onChangePcaData}
              />
            )}
          </View>
          <View
            style={styles.innerView}
            onLayout={event => {
              const layout = event.nativeEvent.layout;
              let obj = dataSourceCords;
              obj[removeMiddleSpaces(translations.HALF_PRICE_VOTES)] = layout.y;
              setDataSourceCords(obj);
            }}>
            {halfPrice && (
              <HalfPriceVoteView
                halfPrice={halfPrice}
                pcaData={pcaData}
                onChangePcaData={onChangePcaData}
                pcaError={pcaError}
              />
            )}
          </View>

          <View style={styles.innerView}>
            {hideVotes && (
              <HideVotesScheduler
                pcaData={pcaData}
                pcaError={pcaError}
                onChangePcaData={onChangePcaData}
              />
            )}
          </View>

          {!oneWinnerAllAge && pcaData.ageDevisionArray.length > 0 && (
            <>
              <View style={styles.underline}></View>
              <View
                onLayout={event => {
                  const layout = event.nativeEvent.layout;
                  let obj = dataSourceCords;
                  obj[
                    removeMiddleSpaces(
                      translations.ADJUST_AGE_DEVISION_END_DATE,
                    )
                  ] = layout.y;
                  setDataSourceCords(obj);
                }}>
                <AdjustAgeDevision
                  ageDevisionVisible={ageDevisionVisible}
                  setAgeDevisionVisible={setAgeDevisionVisible}
                  pcaData={pcaData}
                  hideVotes={hideVotes}
                  setAgeDivisionData={setAgeDivisionData}
                  ageDivisionData={ageDivisionData}
                  scroolToBottom={scroolToBottom}
                  oneWinnerAllAge={oneWinnerAllAge}
                  setCount={setCount}
                  count={count}
                />
              </View>
            </>
          )}
          <View style={styles.bottomView} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PcaForm;

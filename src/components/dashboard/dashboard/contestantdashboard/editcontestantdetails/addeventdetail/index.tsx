import {
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import translations from '../../../../../../assets/translations';
import Header from '../../../../../common/header';
import {styles} from './styles';
import {
  EVENT_TYPE,
  IMAGE_TYPE,
  PLACEMENT,
  REFESH_SCREEN,
  ROLES,
  USER_DESHBOARD_TAB,
} from '../../../../../utils/enum';
import Step1 from '../../../createcontestentprofile/components/step1';
import {
  GET_EVENT_DATA,
  UPLOADE_IMAGE,
} from '../../../../../../services/endpoints';
import {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../../store/useAppStore';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {SCREEN} from '../../../../../../root/screenname';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {internetState} from '../../../../../common/commonalert';

import {
  UPDATE_EVENT_DETAILS,
  ADD_EVENT_DETAILS,
} from '../../../../../../services/endpoints';
import moment from 'moment';
import {checkIsNull, isValueNull} from '../../../../../utils/validations';
import {createFormData} from '../../../../../utils/helperFunction';
import {useIsFocused} from '@react-navigation/core';
import {ApiStatusType, MethodTypes} from '../../../../../../services/constants';
import {TIME_FORMAT} from '../../../../../utils/datetimemanger';
const AddEventDetail = props => {
  const setLoader = useSetLoader();
  const isFocused = useIsFocused();
  const setScreenRefresh = useSetScreenRefresh();
  const scrollRef = useRef();
  const [isEventData, setIsEventData] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isNextPressed, setisNextPressed] = useState(false);
  const [updateImageBody, setUpdateImageBody] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [eventState, setEventState] = useState(0);

  const [step_one, setStep_one] = useState({
    yourName: '',
    nameOfPageant: {title: '', id: ''},
    eventType: EVENT_TYPE.UPCOMING,
    placement: PLACEMENT.NONE,
    year: {name: '', id: ''},
    weight: {name: '', slug: ''},
    awards: [],
    description: {name: '', id: ''},
    event: {title: '', id: ''},
    age: {name: '', id: ''},
    startDate: '',
    endDate: '',
    contestant_title: '',
    nameOfTheTitle: '',
    nameOfTheAward: '',
    contestant_image: '',
  });
  React.useEffect(() => {
    if (!props.route.params) {
      setStep_one({
        yourName: '',
        nameOfPageant: {title: '', id: ''},
        eventType: EVENT_TYPE.UPCOMING,
        placement: PLACEMENT.NONE,
        year: {name: '', id: ''},
        weight: {id: '', name: '', slug: ''},
        awards: [],
        description: {name: '', id: ''},
        event: {title: '', id: ''},
        age: {name: '', id: ''},
        startDate: '',
        endDate: '',
        contestant_title: '',
        nameOfTheTitle: '',
        nameOfTheAward: '',
        contestant_image: '',
      });
    }

    setisNextPressed(false);
    setCurrentStep(1);
    scrollToTop();
  }, [isFocused]);
  const scrollToTop = () => {
    if (!!scrollRef?.current) {
      scrollRef?.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }
  };
  const netInfo = useNetInfo();
  React.useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected && state.isInternetReachable) {
        if (props.route.params) {
          getEventDataAPI();
        }
      } else {
        internetState(netInfo.isConnected!!);
      }
    });
  }, [props.route.params, isFocused]);
  const checkInterNet = () => {
    if (!netInfo.isConnected) {
      internetState(netInfo.isConnected!!);
      return false;
    }
    return true;
  };

  React.useEffect(() => {
    if (currentStep === 2) {
      saveButtonPressed();
    }
  }, [currentStep]);

  const getAwardIdAsList = () => {
    let idArray = [];
    step_one.awards.map(i => {
      idArray.push(String(i.id));
    });
    return idArray;
  };
  const getAwardList = data => {
    let awardArray = [];
    data.map(i => {
      awardArray.push(i.award);
    });
    return awardArray;
  };
  const getPlacementON = val => {
    if (val === step_one.placement) {
      return translations.ON;
    } else {
      return '';
    }
  };
  const updatedBody = {
    id: props.route.params?.id,
    contestant_name: step_one.yourName,
    contestant_title: step_one.contestant_title,
    contestant_image: '',
    additional_title: step_one.description.id,
    award_ids: getAwardIdAsList(),
    pageant_id: step_one.nameOfPageant.id,
    year_id: step_one.year.id,
    start_date: step_one.startDate,
    end_date: step_one.endDate,
    event_id: step_one.event.id,
    age_division_id: step_one.age.id,
    weight_id: step_one.weight.slug,
    got_title: step_one.nameOfTheAward,
    title_awarded_text: step_one.nameOfTheTitle,
    won: getPlacementON(PLACEMENT.WINNER),
    first_runner_up: getPlacementON(PLACEMENT.RUNNER_UP1),
    second_runner_up: getPlacementON(PLACEMENT.RUNNER_UP2),
    third_runner_up: getPlacementON(PLACEMENT.RUNNER_UP3),
    fourth_runner_up: getPlacementON(PLACEMENT.RUNNER_UP4),
  };
  const updatedAddBody = {
    contestant_name: step_one.yourName,
    pageant_id: step_one.nameOfPageant.id,
    year_id: step_one.year.id,
    start_date: step_one.startDate,
    end_date: step_one.endDate,
    event_id: step_one.event.id,
    age_division_id: step_one.age.id,
    weight_id: step_one.weight.slug,
    contestant_title: step_one.contestant_title,
    contestant_image: '',
    won: getPlacementON(PLACEMENT.WINNER),
    first_runner_up: getPlacementON(PLACEMENT.RUNNER_UP1),
    second_runner_up: getPlacementON(PLACEMENT.RUNNER_UP2),
    third_runner_up: getPlacementON(PLACEMENT.RUNNER_UP3),
    fourth_runner_up: getPlacementON(PLACEMENT.RUNNER_UP4),
    additional_title: step_one.description.id,
    award_ids: getAwardIdAsList(),
    got_title: step_one.nameOfTheAward,
    title_awarded_text: step_one.nameOfTheTitle,
  };
  const {mutateAsync: updateEventDetails} = useCgMutation({
    key: UPDATE_EVENT_DETAILS,
    url: UPDATE_EVENT_DETAILS,
    body: updatedBody,
  });
  const {mutateAsync: addEventDetails} = useCgMutation({
    key: ADD_EVENT_DETAILS,
    url: ADD_EVENT_DETAILS,
    body: updatedAddBody,
    offSuccessToast: true,
  });

  const {mutateAsync: uploadHeatShotImage} = useCgMutation({
    key: UPLOADE_IMAGE,
    url: UPLOADE_IMAGE,
    body: createFormData(updateImageBody),
    isJson: false,
    customHeader: {'Content-Type': 'multipart/form-data'},
    offSuccessToast: true,
  });
  const updateEventDetailsApi = async () => {
    setLoader(true);
    const res = await updateEventDetails();
    if (res.success) {
      setUpdateImageBody({
        type: IMAGE_TYPE.HEADSHOT_IMAGE,
        profile_image: step_one.contestant_image,
        pageant_contestant_id: res.data.pageant_contestants.id,
      });
      const imgRes = await uploadHeatShotImage();
      if (imgRes.success) {
        setLoader(false);
      }
      if (props.route.params?.fromViewAll) {
        props.navigation.goBack(); // Redirect them back to view all only not to dashboard.
      } else {
        props.navigation.navigate(USER_DESHBOARD_TAB.DESHBOARD, {
          redirectedto: ROLES.CONTESTANT,
        });
      }
    }
  };
  const addEventDetailsApi = async () => {
    setLoader(true);
    const res = await addEventDetails();
    if (res.success) {
      if (step_one.contestant_image !== '') {
        setUpdateImageBody({
          type: IMAGE_TYPE.HEADSHOT_IMAGE,
          profile_image: step_one.contestant_image,
          pageant_contestant_id: res.data.pageant_contestants.id,
        });
        await uploadHeatShotImage();

        setLoader(false);
      }

      props.navigation.navigate(SCREEN.CONFIRMATION_STEP, {
        eventName: step_one.nameOfPageant.title + ' ' + step_one.year.name,
        eventType: step_one.eventType,
      });
      setTimeout(() => {
        setScreenRefresh(REFESH_SCREEN.CONTESTANT_DASHBOARD);
      }, 200);
    }
  };
  const saveButtonPressed = () => {
    setisNextPressed(true);
    if (checkInterNet() && currentStep === 2) {
      if (props.route.params) {
        updateEventDetailsApi();
      } else {
        addEventDetailsApi();
      }
    }
  };
  const {mutateAsync: eventData} = useCgMutation({
    key: GET_EVENT_DATA,
    method: MethodTypes.GET,
    url: GET_EVENT_DATA + `${props.route.params?.id}`,
    offSuccessToast: true,
  });
  const getEventDataAPI = async () => {
    setLoader(true);
    const res = await eventData();
    if (res.success || res.status_code === ApiStatusType.Success) {
      setStep_one({
        ...step_one,
        nameOfTheAward: isValueNull(res?.data?.pageant_contestant?.got_title),
        contestant_image: res?.data?.pageant_contestant?.contestant_image
          ? res?.data?.pageant_contestant?.contestant_image_url
          : null,

        age: {
          name: res?.data?.pageant_contestant?.age_division?.name,
          id: res?.data?.pageant_contestant?.age_division?.id,
        },
        nameOfTheTitle: isValueNull(
          res?.data?.pageant_result?.title_awarded_text,
        ),
        nameOfPageant: {
          title: res?.data?.pageant_contestant?.pageant?.title,
          id: res?.data?.pageant_contestant?.pageant?.master_pageant?.id,
        },
        yourName: isValueNull(res?.data?.pageant_contestant?.contestant_name),
        startDate: checkIsNull(
          res?.data?.pageant_contestant?.pageant?.start_date,
        )
          ? moment(
              res?.data?.pageant_contestant?.pageant?.start_date,
              TIME_FORMAT.YYYYMMDD,
            ).format(TIME_FORMAT.MMDDYYYY)
          : null,
        endDate: checkIsNull(res?.data?.pageant_contestant?.pageant?.end_date)
          ? moment(
              res?.data?.pageant_contestant?.pageant?.end_date,
              TIME_FORMAT.YYYYMMDD,
            ).format(TIME_FORMAT.MMDDYYYY)
          : null,
        awards: getAwardList(res?.data?.pageant_awards),
        event: {
          title: res?.data?.pageant_contestant?.pageant?.title,
          id: res?.data?.pageant_contestant?.pageant?.id,
        },
        contestant_title: isValueNull(
          res?.data?.pageant_contestant?.contestant_title,
        ),
        year: {
          name: res?.data?.pageant_contestant?.pageant?.year_name?.name,
          id: res?.data?.pageant_contestant?.pageant?.year_name?.id,
        },
        weight: {
          id: res?.data?.pageant_contestant?.weight?.id,
          name: isValueNull(res?.data?.pageant_contestant?.weight?.name),
          slug: isValueNull(res?.data?.pageant_contestant?.weight?.slug),
        },
        description: {
          name:
            res?.data?.pageant_result?.additional_title === 2
              ? translations.ADVANCED
              : res?.data?.pageant_result?.additional_title === 3
              ? translations.DETHRONED
              : res?.data?.pageant_result?.additional_title === 4
              ? translations.RESIGEND
              : res?.data?.pageant_result?.additional_title === 5
              ? translations.TITLE_AWARDED
              : null,
          id: res?.data?.pageant_result?.additional_title,
        },

        placement:
          res?.data?.pageant_result?.type === 0
            ? PLACEMENT.NONE
            : res?.data?.pageant_result?.type === 1
            ? PLACEMENT.WINNER
            : res?.data?.pageant_result?.type === 2
            ? PLACEMENT.RUNNER_UP1
            : res?.data?.pageant_result?.type === 3
            ? PLACEMENT.RUNNER_UP2
            : res?.data?.pageant_result?.type === 4
            ? PLACEMENT.RUNNER_UP3
            : res?.data?.pageant_result?.type === 5
            ? PLACEMENT.RUNNER_UP4
            : PLACEMENT.NONE,
      });
      res?.data?.pageant_contestant?.pageant?.end_date
        ? setIsEditable(false)
        : setIsEditable(true);
      setIsEventData(true);
    }
  };
  const onChangeStepOne = data => {
    setStep_one({...step_one, ...data});
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header
        lable={
          props.route.params
            ? translations.EDIT_EVENT_DETAIL
            : translations.ADD_EVENT_DETAIL
        }
        rightText={translations.SAVE}
        onPressRightText={() => saveButtonPressed()}
        isUnderLineRequired
      />
      <ScrollView
        keyboardShouldPersistTaps={true}
        contentContainerStyle={{flexGrow: 1}}
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}>
        <KeyboardAvoidingView>
          <View style={styles.viewContainer}>
            {props.route.params ? (
              <>
                {isEventData && (
                  <Step1
                    step_one={step_one}
                    onChangeStepOne={onChangeStepOne}
                    editScrenView={true}
                    isEditable={isEditable}
                    isNextPressed={isNextPressed}
                    setCurrentStep={setCurrentStep}
                    setisNextPressed={setisNextPressed}
                    hitAddContestantDetailsApi={() => {
                      setCurrentStep(2);
                    }}
                    eventState={eventState}
                    setEventState={setEventState}
                    scrollRef={scrollRef}
                  />
                )}
              </>
            ) : (
              <Step1
                step_one={step_one}
                onChangeStepOne={onChangeStepOne}
                isNextPressed={isNextPressed}
                setCurrentStep={setCurrentStep}
                setisNextPressed={setisNextPressed}
                hitAddContestantDetailsApi={() => {
                  setCurrentStep(2);
                }}
                eventState={eventState}
                setEventState={setEventState}
                scrollRef={scrollRef}
              />
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddEventDetail;

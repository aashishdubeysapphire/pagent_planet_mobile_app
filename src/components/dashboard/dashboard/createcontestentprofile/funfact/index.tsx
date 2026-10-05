import {ScrollView, SafeAreaView, View, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useBackHandler} from '@react-native-community/hooks';
import {SCREEN} from '../../../../../root/screenname';
import {
  EVENT_TYPE,
  IMAGE_TYPE,
  PLACEMENT,
  REFESH_SCREEN,
  ROLES,
  USER_DESHBOARD_TAB,
} from '../../../../utils/enum';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {styles} from './styles';
import Header from '../../../../common/header';
import translations from '../../../../../assets/translations';
import Step3 from '../components/step3';
import {
  checkIsConnected,
  createFormData,
} from '../../../../utils/helperFunction';
import useCgMutation from '../../../../../services/api/useCgMutation';
import {
  ADD_EVENT_DETAILS,
  UPDATE_EVENT_DETAILS,
  UPDATE_FUN_FACT,
  UPLOADE_IMAGE,
} from '../../../../../services/endpoints';
import {Base} from '../../../../../services/models/base';
import Loader from '../../../../common/customloader';
import {moderateScaleVertical} from '../../../../utils/responsiveSize';
import AppImages from '../../../../../assets/images/AppImages';
import {UserContext} from '../../../../../store/userStore';
import Step1 from '../components/step1';
import WarningModel from '../../../../common/warningmodel';
import {useSetScreenRefresh} from '../../../../../store/useAppStore';

const FunFact = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {storeData} = React.useContext(UserContext);
  const scrollRef = useRef();
  const [eventState, setEventState] = useState(0);
  const [goBackWarningModal, setGoBackWarningModal] = useState(false);
  const [pagentId, setPagentId] = useState();
  const [updateImageBody, setUpdateImageBody] = useState({});
  const setScreenRefresh = useSetScreenRefresh();

  const [newVar, setnewVar] = useState(0);
  setTimeout(() => {
    setnewVar(2);
  }, 300);

  useBackHandler(() => {
    onBack();
    return true;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [step_three, setStep_three] = useState({
    talent: '',
    ethinicity: '',
    funFacts: '',
    school: '',
    platform: '',
    currentOccupation: '',
    reason: '',
    bio: '',
  });
  const [isNextPressed, setisNextPressed] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  useEffect(() => {
    scrollRef.current?.scrollTo({
      y: 0,
    });
  }, [currentStep]);
  const [step_one, setStep_one] = useState({
    yourName:
      storeData.data?.user.personal_details.first_name +
      ' ' +
      storeData.data?.user.personal_details.last_name,
    nameOfPageant: {title: ''},
    eventType: EVENT_TYPE.UPCOMING,
    placement: PLACEMENT.NONE,
    year: {name: ''},
    weight: {name: '', slug: ''},
    awards: [],
    description: {name: '', id: ''},
    event: {title: '', id: ''},
    age: {name: ''},
    startDate: '',
    endDate: '',
    contestant_title: '',
    contestant_image: '',
    nameOfTheTitle: '',
    nameOfTheAward: '',
  });
  let updatedBodyFunFact = {
    bio: step_three?.bio,
    start_in_pageant: step_three?.reason,
    occupation: step_three?.currentOccupation,
    college_attend: step_three?.school,
    pageant_plateform: step_three?.platform,
    talent: step_three?.talent,
    complexion: step_three?.ethinicity,
    fun_facts: step_three?.funFacts,
  };
  const {mutateAsync: hitupdateFunFact} = useCgMutation<Base>({
    key: UPDATE_FUN_FACT,
    url: UPDATE_FUN_FACT,
    body: updatedBodyFunFact,
    disableLoader: true,
  });
  const onBack = () => {
    setGoBackWarningModal(true);
  };
  const getAwardIdAsList = () => {
    let idArray = [];
    step_one.awards.map(i => {
      idArray.push(String(i.id));
    });
    return idArray;
  };

  const getPlacementON = val => {
    if (val === step_one.placement) {
      return translations.ON;
    } else {
      return '';
    }
  };
  const updatedBody = {
    id: pagentId,
    contestant_name: step_one.yourName,
    contestant_title: step_one.contestant_title,
    pageant_id: step_one.nameOfPageant.id,
    year_id: step_one.year.id,
    start_date: step_one.startDate,
    end_date: step_one.endDate,
    contestant_image: '',
    age_division_id: step_one.age.id,
    weight_id: step_one.weight.slug,
    got_title: step_one.nameOfTheAward,
    title_awarded_text: step_one.nameOfTheTitle,
    additional_title: step_one.description.id,
    award_ids: getAwardIdAsList(),
    won: getPlacementON(PLACEMENT.WINNER),
    event_id: step_one.event.id,
    first_runner_up: getPlacementON(PLACEMENT.RUNNER_UP1),
    second_runner_up: getPlacementON(PLACEMENT.RUNNER_UP2),
    third_runner_up: getPlacementON(PLACEMENT.RUNNER_UP3),
    fourth_runner_up: getPlacementON(PLACEMENT.RUNNER_UP4),
  };

  const updatedAddBody = {
    contestant_name: step_one.yourName,
    weight_id: step_one.weight.slug,
    contestant_image: '',
    year_id: step_one.year.id,
    pageant_id: step_one.nameOfPageant.id,
    event_id: step_one.event.id,
    start_date: step_one.startDate,
    end_date: step_one.endDate,
    age_division_id: step_one.age.id,
    contestant_title: step_one.contestant_title,
    additional_title: step_one.description.id,
    got_title: step_one.nameOfTheAward,
    title_awarded_text: step_one.nameOfTheTitle,
    award_ids: getAwardIdAsList(),
    won: getPlacementON(PLACEMENT.WINNER),
    first_runner_up: getPlacementON(PLACEMENT.RUNNER_UP1),
    second_runner_up: getPlacementON(PLACEMENT.RUNNER_UP2),
    third_runner_up: getPlacementON(PLACEMENT.RUNNER_UP3),
    fourth_runner_up: getPlacementON(PLACEMENT.RUNNER_UP4),
  };
  const {mutateAsync: addEventDetails} = useCgMutation({
    key: ADD_EVENT_DETAILS,
    url: ADD_EVENT_DETAILS,
    body: updatedAddBody,
  });
  const {mutateAsync: updateEventDetails} = useCgMutation({
    key: UPDATE_EVENT_DETAILS,
    url: UPDATE_EVENT_DETAILS,
    body: updatedBody,
  });

  const {mutateAsync: uploadHeatShotImage} = useCgMutation({
    key: UPLOADE_IMAGE,
    url: UPLOADE_IMAGE,
    body: createFormData(updateImageBody),
    isJson: false,
    customHeader: {'Content-Type': 'multipart/form-data'},
    offSuccessToast: true,
  });
  const hitAddFunFactApi = async () => {
    if (checkIsConnected()) {
      setIsLoading(true);
      const res = await hitupdateFunFact();
      if (res.success) {
        goToContestantDashboard();
      }
      setIsLoading(false);
    }
  };
  const updateEventDetailsApi = async () => {
    setIsLoading(true);

    const res = await updateEventDetails();
    if (res.success) {
      setUpdateImageBody({
        type: IMAGE_TYPE.HEADSHOT_IMAGE,
        profile_image: step_one.contestant_image,
        pageant_contestant_id: res.data.pageant_contestants.id,
      });
      const imgRes = await uploadHeatShotImage();
      if (imgRes.success) {
        setIsLoading(false);
      }
      setCurrentStep(2);
    }
  };
  const onChangeStepThree = data => {
    setStep_three({
      ...step_three,
      ...data,
    });
  };
  const onChangeStepOne = data => {
    setStep_one({...step_one, ...data});
  };
  const goToContestantDashboard = () => {
    navigation?.reset({
      index: 0,
      routes: [
        {
          name: SCREEN.DASHBOARD_NAVIGATION,
        },
      ],
    });
    setTimeout(() => {
      navigation.navigate(USER_DESHBOARD_TAB.DESHBOARD, {
        redirectedto: ROLES.CONTESTANT,
        tabIndex: 1,
      });
    }, 400);
  };

  const onPressSkip = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      goToContestantDashboard();
    }
  };
  const onDenay = () => {};
  const setConfirm = () => {
    goToContestantDashboard();
  };

  const addUpdatePagent = async () => {
    setIsLoading(true);
    if (!!pagentId) {
      updateEventDetailsApi();
    } else {
      const res = await addEventDetails();
      if (res.success) {
        if (step_one.contestant_image !== '') {
          setUpdateImageBody({
            type: IMAGE_TYPE.HEADSHOT_IMAGE,
            profile_image: step_one.contestant_image,
            pageant_contestant_id: res.data.pageant_contestants.id,
          });
          const resImg = await uploadHeatShotImage();

          onChangeStepOne({
            contestant_image: {
              name: step_one.contestant_image?.name,
              type: step_one.contestant_image?.type,
              uri: resImg?.data?.image_url,
            },
          });
        }
        setPagentId(res.data.pageant_contestants.id);

        setTimeout(() => {
          setScreenRefresh(REFESH_SCREEN.CONTESTANT_DASHBOARD);
        }, 200);
        setCurrentStep(2);
        setIsLoading(false);
      }
    }
  };

  const isNextActive = () => {
    if (currentStep === 1) {
      return (
        !!step_one.nameOfPageant?.title ||
        !!step_one.year.name ||
        !!step_one.event.id ||
        !!step_one.age.name
      );
    } else {
      return (
        !!step_three?.bio.trim() ||
        !!step_three?.reason.trim() ||
        !!step_three?.currentOccupation.trim() ||
        !!step_three?.school.trim() ||
        !!step_three?.platform.trim() ||
        !!step_three?.talent.trim() ||
        !!step_three?.ethinicity.trim() ||
        !!step_three?.funFacts.trim()
      );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header
        lable={translations.ADD_ADDITIONAL_INFORMATION}
        rightText={currentStep === 1 ? translations.NEXT : translations.SAVE}
        onPressRightText={() => {
          setisNextPressed(true);
        }}
        isSaveActive={isNextActive()}
        isUnderLineRequired
        onPressBack={onBack}
      />
      <Loader isLoading={isLoading} />
      <ScrollView showsVerticalScrollIndicator={false} ref={scrollRef}>
        {currentStep === 1 && (
          <>
            <View style={styles.stepsImage}>
              <AppImages.CreateContestentProfile.tpp_add_pageant
                height={moderateScaleVertical(132)}
                width={'100%'}
              />
            </View>
            <View style={styles.greyView}>
              <Text style={styles.greyViewText} numberOfLines={2}>
                {translations.TAG_YOUR_PAGENT_TO_CUSTOM_PREP_SCHEDULE}
              </Text>
              <Text style={styles.skipText} onPress={onPressSkip}>
                {translations.SKIP_BUTTON}
              </Text>
            </View>
            <View style={styles.scrollView}>
              <Step1
                step_one={step_one}
                onChangeStepOne={onChangeStepOne}
                focused={newVar}
                isNextPressed={isNextPressed}
                setCurrentStep={setCurrentStep}
                setisNextPressed={setisNextPressed}
                hitAddContestantDetailsApi={addUpdatePagent}
                isAdditionalInfoScreen={true}
                eventState={eventState}
                scrollRef={scrollRef}
                setEventState={setEventState}
              />
            </View>
          </>
        )}
        {currentStep === 2 && (
          <>
            <View style={styles.stepsImage}>
              <AppImages.CreateContestentProfile.tpp_fun_facts
                height={moderateScaleVertical(132)}
                width={'100%'}
              />
            </View>
            <View style={[styles.greyView, styles.marginB]}>
              <Text style={styles.greyViewText} numberOfLines={2}>
                {translations.BOOST_PROFILE_ADD_FUN_FACT}
              </Text>
              <Text style={styles.skipText} onPress={onPressSkip}>
                {translations.SKIP_BUTTON}
              </Text>
            </View>
            <View style={styles.scrollView}>
              <Step3
                onChangeStepThree={onChangeStepThree}
                isNextPressed={isNextPressed}
                setCurrentStep={setCurrentStep}
                setisNextPressed={setisNextPressed}
                hitAddContestantDetailsApi={hitAddFunFactApi}
              />
            </View>
          </>
        )}
      </ScrollView>
      <WarningModel
        msg={
          translations.ADD_PAGENT_WARNING
        }
        isModalVisible={isFocused && goBackWarningModal}
        setConfirm={() => setGoBackWarningModal(false)}
        setIsModalVisible={setGoBackWarningModal}
        headingStyle={styles.modalHeading}
        onDenay={onDenay}
        setConfirm={setConfirm}
        yesButtonText={translations.YES}
        cancleButtonText={translations.NO}
      />
    </SafeAreaView>
  );
};

export default FunFact;

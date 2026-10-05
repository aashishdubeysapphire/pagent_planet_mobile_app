import {ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import translations from '../../../../assets/translations';
import Header from '../../../common/header';
import {styles} from './styles';
import {UserContext} from '../../../../store/userStore';
import {useSetLoader} from '../../../../store/useAppStore';
import {ROLES, USER_DESHBOARD_TAB} from '../../../utils/enum';
import Step2 from './components/step2';
import {checkIsConnected, keyBoardManager} from '../../../utils/helperFunction';
import WarningModel from '../../../common/warningmodel';
import useCgMutation from '../../../../services/api/useCgMutation';
import {
  CREATE_CONTESTANT_DETAILS,
  GET_INACTIVE_CONTESTANT_LIST,
  GET_UPDATED_USERDATA,
} from '../../../../services/endpoints';
import {SCREEN} from '../../../../root/screenname';
import {Base} from '../../../../services/models/base';
import UnclaimedProfileModal from './components/unclaimedprofilemodal';
import FunFactConfirmation from './components/funfactconfiration';
import {useBackHandler} from '@react-native-community/hooks';
import {MethodTypes} from '../../../../services/constants';
import {checkIsNull} from '../../../utils/validations';
import {useIsFocused} from '@react-navigation/core';

const CreateContestentProfile = ({navigation}) => {
  const setLoader = useSetLoader();
  const isFocused = useIsFocused();
  const {storeData, setDataToStore} = React.useContext(UserContext);

  useEffect(() => {
    setLoader(false);
    setCelebrationVisible(false);
    keyBoardManager();
    hitGetInactiveContetantList();
  }, []);

  const checkInterNet = () => {
    return checkIsConnected();
  };
  const scrollRef = useRef();

  const [goBackWarningModal, setGoBackWarningModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isNextPressed, setisNextPressed] = useState(false);
  const [unclaimedProfileModalVisible, setUnclaimedProfileModalVisible] =
    useState(false);
  const [celebrationVisible, setCelebrationVisible] = useState(false);
  const [inactiveClaimedProfileList, setInactiveClaimedProfileList] =
    useState();
  useEffect(() => {
    scrollRef.current?.scrollTo({
      y: 0,
    });
  }, [currentStep]);

  useBackHandler(() => {
    if (celebrationVisible) {
      onBack();
      return true;
    }
    // let the default thing happen
    return false;
  });
  const onBack = () => {
    navigation?.reset({
      index: 0,
      routes: [
        {
          name: SCREEN.DASHBOARD_NAVIGATION,
        },
      ],
    });
    navigation.navigate(USER_DESHBOARD_TAB.DESHBOARD, {
      redirectedto: ROLES.CONTESTANT,
    });
  };

  const [step_two, setStep_two] = useState({
    birthDate: '',
    hairColorId: '',
    eyeColorId: '',
    zodiacSignId: '',
    height: '',
    countryId: '',
    stateId: '',
    married: '',
    kids: '',
    isMinor: '',
    hideDob: '',
  });

  const onChangeStepTwo = data => {
    setStep_two({...step_two, ...data});
  };

  const onPressBack = () => {
    setGoBackWarningModal(true);
  };
  const onDenay = () => {
    setTimeout(() => {
      navigation.goBack();
    }, 200);
  };

  let updatedBody = {
    first_name: storeData.data?.user.personal_details.first_name,
    last_name: storeData.data?.user.personal_details.last_name,
    zodiac_sign: step_two.zodiacSignId,
    height: step_two.height,
    hair_color: step_two.hairColorId,
    eye_color: step_two.eyeColorId,
    country_id: step_two.countryId,
    city_id: step_two.stateId,
    is_married: step_two.married,
    have_kids: step_two.kids,
    is_minor: step_two.isMinor,
    hide_dob: step_two.hideDob,
    dob: step_two.birthDate,
  };

  const {mutateAsync: addContestantDetails} = useCgMutation<Base>({
    key: CREATE_CONTESTANT_DETAILS,
    url: CREATE_CONTESTANT_DETAILS,
    body: updatedBody,
    disableLoader: true,
  });

  const {mutateAsync: getInactiveContestentList} = useCgMutation<Base>({
    key: GET_INACTIVE_CONTESTANT_LIST,
    url: GET_INACTIVE_CONTESTANT_LIST,
    method: MethodTypes.GET,
    disableLoader: true,
    offSuccessToast: true,
  });
  const {mutateAsync: getUpdatedUserData} = useCgMutation<Base>({
    key: GET_UPDATED_USERDATA,
    url: GET_UPDATED_USERDATA,
    method: MethodTypes.GET,
    disableLoader: true,
    offSuccessToast: true,
  });
  const updateStoredata = async res => {
    const updatedUserData = await getUpdatedUserData();
    if (updatedUserData.success) {
      let updatedUser = updatedUserData.data.user;
      let store = storeData;
      store.data.user = updatedUser;
      setDataToStore(store);
    }
  };

  const hitAddContestantDetailsApi = async () => {
    if (checkInterNet()) {
      setLoader(true);
      const res = await addContestantDetails();
      if (res.success) {
        await updateStoredata(res);
        setCelebrationVisible(true);
        setLoader(false);
      } else {
        setLoader(false);
      }
    }
  };
  const onPressRightText = () => {
    setisNextPressed(true);
  };
  const hitGetInactiveContetantList = async () => {
    if (checkInterNet()) {
      setLoader(true);
      const res = await getInactiveContestentList();
      if (res.success) {
        if (checkIsNull(res.data)) {
          setTimeout(() => {
            setUnclaimedProfileModalVisible(true);
          }, 200);
          setInactiveClaimedProfileList(res.data);
        } else {
          setCurrentStep(1);
        }
      } else {
        setCurrentStep(1);
      }

      setLoader(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {celebrationVisible ? (
        <FunFactConfirmation />
      ) : (
        <>
          <Header
            lable={translations.CREATE_CONTESTENT_PROFILE}
            rightText={translations.SAVE}
            onPressRightText={() => {
              onPressRightText();
            }}
            isUnderLineRequired
            onPressBack={onPressBack}
          />

          <ScrollView
            style={styles.innerContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            nestedScrollEnabled={true}
            ref={scrollRef}>
            {currentStep === 1 && (
              <>
                <Step2
                  scrollRef={scrollRef}
                  step_two={step_two}
                  onChangeStepTwo={onChangeStepTwo}
                  isNextPressed={isNextPressed}
                  setCurrentStep={setCurrentStep}
                  setisNextPressed={setisNextPressed}
                  hitAddContestantDetailsApi={hitAddContestantDetailsApi}
                />
              </>
            )}
          </ScrollView>
        </>
      )}
      <WarningModel
        msg={
          currentStep === 1
            ? translations.COMPLETE_YOUR_PROFILE_TO_CREATE_A_CONTESTENT_ROLE
            : translations.ADD_PAGENT_TO_CREATE_CONTESTANT
        }
        isModalVisible={isFocused && goBackWarningModal}
        setConfirm={() => setGoBackWarningModal(false)}
        setIsModalVisible={setGoBackWarningModal}
        headingStyle={styles.modalHeading}
        onDenay={onDenay}
        yesButtonText={translations.YES}
      />
      <UnclaimedProfileModal
        unclaimedProfileModalVisible={unclaimedProfileModalVisible} //unclaimedProfileModalVisible
        setUnclaimedProfileModalVisible={setUnclaimedProfileModalVisible}
        inactiveClaimedProfileList={inactiveClaimedProfileList}
        setCurrentStep={setCurrentStep}
      />
    </SafeAreaView>
  );
};

export default CreateContestentProfile;

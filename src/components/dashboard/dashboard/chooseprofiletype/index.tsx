import React, {useContext, useState, useEffect} from 'react';
import {BackHandler} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import translations from '../../../../assets/translations';
import {SCREEN} from '../../../../root/screenname';
import {UserContext} from '../../../../store/userStore';
import DashboardHeader from '../../../common/dashboardheader';
import Header from '../../../common/header';
import SelectProfile from './selectprofile';
import {styles} from './styles';
import {RootContext} from '../../../../store/rootStore';
import {PARAM_VALUE} from '../../../utils/enum';
import {useNetInfo} from '@react-native-community/netinfo';
import {internetState} from '../../../common/commonalert';
import {useNavigation} from '@react-navigation/core';

const ChooseProfile = props => {
  const {storeData} = useContext(UserContext);
  const {showHeader} = props.route.params || true;

  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const {isWelcomePopViewed} = useContext(RootContext);
  const [isSkipButton] = useState(
    (storeData?.data?.user?.personal_details?.gender == null ||
      storeData?.data?.user?.personal_details?.gender === undefined) &&
      isWelcomePopViewed,
  );
  const moveToDirectoryScreen = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      props.navigation.navigate(SCREEN.DIRECTORY);
    }
  };

  const onPressBack = () => {
    backButtonHandled();
    return true;
  };
  const backButtonHandled = () => {
    if (isSkipButton) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: SCREEN.DASHBOARD_NAVIGATION,
          },
        ],
      });
    } else {
      navigation.goBack();
    }
  };
  useEffect(() => {
    const pressBack = BackHandler.addEventListener(
      'hardwareBackPress',
      onPressBack,
    );
    return () => pressBack.remove();
  }, [onPressBack]);

  return (
    <SafeAreaView style={styles.wrapper}>
      {(storeData?.data?.user?.primary_profile_type == null ||
        storeData?.data?.user?.primary_profile_type == undefined) &&
      storeData?.data?.user?.is_pageant_exist != true &&
      !showHeader ? (
        <DashboardHeader
          onPressSearchIcon={moveToDirectoryScreen}
          label={null}
          isUnderLineRequired={true}
        />
      ) : (
        <Header
          lable={translations.SELECT_PROFILE}
          isUnderLineRequired={true}
          onPressBack={() => {
            props.navigation.goBack();
          }}
          onCustomPressBack={backButtonHandled}
        />
      )}

      <SelectProfile
        showModal={
          (storeData?.data?.user?.personal_details?.gender == null ||
            storeData?.data?.user?.personal_details?.gender === undefined) &&
          isWelcomePopViewed
        }
        name={props?.route?.params?.name}
        contestantProfile={
          storeData?.data?.contestant?.status === PARAM_VALUE.ACTIVE
            ? true
            : false
        }
        fanProfile={
          storeData?.data?.user?.personal_details?.gender == null ||
          storeData?.data?.user?.personal_details?.gender === undefined
            ? false
            : true
        }
        pageantProfile={
          storeData?.data?.user?.is_pageant_exist === false ? false : true
        }
        expertProfile={
          storeData?.data?.user?.is_expert_exist === false ? false : true
        }
        contestantStatus={
          storeData?.data?.contestant?.status === PARAM_VALUE.ACTIVE ||
          storeData?.data?.contestant?.status === undefined // It is the case when contestant is not created yet, so we cannot show inactive in that case.
            ? true
            : false
        }
        selectedRole={props?.route?.params?.selectedRole}
      />
    </SafeAreaView>
  );
};

export default ChooseProfile;

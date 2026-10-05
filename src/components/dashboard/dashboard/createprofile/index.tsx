import React, {useContext, useEffect} from 'react';
import {TouchableOpacity, Text, View } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../root/screenname';
import translations from '../../../../assets/translations';
import AppImages from '../../../../assets/images/AppImages';
import DashboardHeader from '../../../common/dashboardheader';
import {useIsFocused} from '@react-navigation/native';
import {useSetHideShowBottomBar} from '../../../../store/useAppStore';
import {useNetInfo} from '@react-native-community/netinfo';
import {internetState} from '../../../common/commonalert';
import {UserContext} from '../../../../store/userStore';

const CreateProfile = () => {
  const navigation = useNavigation();
  const setHideBottomBar = useSetHideShowBottomBar();
  const isFocused = useIsFocused();
  const netInfo = useNetInfo();
  const {storeData} = useContext(UserContext);
  useEffect(() => {
    if (isFocused) {
      setHideBottomBar(false);
      if (
        storeData?.data?.user?.primary_profile_type != null &&
        storeData?.data?.user?.primary_profile_type !== undefined
      ) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: SCREEN.DASHBOARD_NAVIGATION,
            },
          ],
        });
      }
    }
  }, [isFocused]);

  const handleOnClick = index => {
    if (index === 0) {
      navigation.navigate(SCREEN.CREATE_CONTESTENT_PROFILE);
    } else if (index === 1) {
      navigation.navigate(SCREEN.ADD_PAGEANT);
    } else if (index === 2) {
      navigation.navigate(SCREEN.CHOOSE_EXPERT_PROFILE);
    }
  };

  const CreateContestant = (index, label, text, icon) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => handleOnClick(index)}>
        <View style={styles.topSection}>
          {icon}
          <Text style={styles.headerLabel}>{label}</Text>
        </View>
        <Text style={styles.textLabel}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const moveToDirectoryScreen = () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      navigation.navigate(SCREEN.DIRECTORY);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <DashboardHeader
        onPressSearchIcon={moveToDirectoryScreen}
        label={null}
        showMessageIcon
        isUnderLineRequired={true}
      />
      <View style={styles.createProfileSection}>
        {CreateContestant(
          0,
          translations.CONTESTANT_CREATE_HEADER,
          translations.CONTESTANT_CREATELABEL,
          <AppImages.Dashboard.CreateContestant_ICON />,
        )}
        {CreateContestant(
          1,
          translations.DIRECTOR_CREATE_HEADER,
          translations.DIRECTOR_CREATELABEL,
          <AppImages.Dashboard.CreateDirector_ICON />,
        )}
        {CreateContestant(
          2,
          translations.EXPERT_CREATE_HEADER,
          translations.EXPERT_CREATELABEL,
          <AppImages.Dashboard.CreateExpert_ICON />,
        )}
      </View>
    </SafeAreaView>
  );
};

export default CreateProfile;

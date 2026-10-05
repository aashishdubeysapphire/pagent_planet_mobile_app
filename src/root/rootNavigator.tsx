import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {UserContext} from '../store/userStore';
import useAppStore, {useClaimAlertModalVisible} from '../store/useAppStore';

import DashboardNavigation from '../components/dashboard/dashboard/navigation';
import LoginNavigation from '../components/onboarding/navigation';

import {SCREEN} from '../root/screenname';
import useHtQuery from '../services/api/useHtQuery';
import {versionData} from '../services/models/auth';
import {APP_VERSION} from '../services/endpoints';
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';
import {isVersionLower} from '../components/utils/versionCheck';
import ForceUpdateScreen from '../components/forceUpdate/forceUpdate';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const {storeData} = useContext(UserContext);
  const isLoggedIn = !!storeData?.data?.user;
  const currentVersion = DeviceInfo.getVersion();

  const {
    storeData: {claimAlertModalVisible},
  } = useAppStore();

  const setClaimAlertModalVisible = useClaimAlertModalVisible();
  const {data, isLoading} = useHtQuery<{data: versionData}>({
    key: APP_VERSION,
    url: APP_VERSION,
    offSuccessToast: true,
  });
  const versionData = data?.data;
  const requiredVersion =
    Platform.OS === 'android'
      ? versionData?.android_version || '1.0'
      : versionData?.ios_version || '1.0';
  const needsUpdate = isVersionLower(currentVersion, requiredVersion);
  return (
    <React.Fragment>
      {!needsUpdate || isLoading ? (
        <RootStack.Navigator screenOptions={{headerShown: false}}>
          {isLoggedIn ? (
            <RootStack.Screen
              name={SCREEN.DASHBOARD_NAVIGATION}
              component={DashboardNavigation}
            />
          ) : (
            <RootStack.Screen
              name={SCREEN.WELCOME}
              component={LoginNavigation}
            />
          )}
        </RootStack.Navigator>
      ) : (
        <ForceUpdateScreen />
      )}

      {claimAlertModalVisible && (
        <AlertBottomModal
          isModalVisible={claimAlertModalVisible}
          setIsModalVisible={setClaimAlertModalVisible}
        />
      )}
    </React.Fragment>
  );
};

export default RootNavigator;

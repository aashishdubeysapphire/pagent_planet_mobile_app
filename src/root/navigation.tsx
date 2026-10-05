import {NavigationContainer} from '@react-navigation/native';
import React, {useContext} from 'react';
import {UserContext} from '../store/userStore';
import useAppInit from './useAppInit';
import useAppStore, {useClaimAlertModalVisible} from '../store/useAppStore';
import {navigationRef} from './navigatorref';
import linking from './linking';
import RootNavigator from './rootNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Navigation = () => {
  const {storeData} = useContext(UserContext);
  const setClaimAlertModalVisible = useClaimAlertModalVisible();
  const {
    storeData: {claimAlertModalVisible},
  } = useAppStore();
  useAppInit();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer linking={linking} ref={navigationRef}>
        <RootNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default Navigation;

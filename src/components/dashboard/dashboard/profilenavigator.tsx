import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import Dashboard from '.';
import {SCREEN} from '../../../root/screenname';
import {RootContext} from '../../../store/rootStore';
import {UserContext} from '../../../store/userStore';
import ChooseProfile from './chooseprofiletype';
import CreateProfile from './createprofile';

const Stack = createStackNavigator();

const CreateProfileNavigator = ({route, navigation}) => {
  const {storeData} = useContext(UserContext);

  const isWelcomePopViewed = useContext(RootContext);
  const [isBottomTabHidden, setBottomTabHidden] = useState(
    isWelcomePopViewed.isWelcomePopViewed,
  );
  const [isPrimaryProfileAdded, setPrimaryProfileAdded] = useState(
    storeData?.data?.user?.primary_profile_type,
  );

  useEffect(() => {
    setBottomTabHidden(isWelcomePopViewed.isWelcomePopViewed);
  }, [isWelcomePopViewed.isWelcomePopViewed]);

  useEffect(() => {
    setPrimaryProfileAdded(storeData?.data?.user?.primary_profile_type);
  }, [storeData?.data?.user?.primary_profile_type]);

  return (
    <Stack.Navigator
      initialRouteName={
        isPrimaryProfileAdded != null && isPrimaryProfileAdded !== undefined
          ? SCREEN.CONTESTANT_DASHBOARD
          : isBottomTabHidden !== undefined && isBottomTabHidden
          ? SCREEN.CHOOSE_PROFILE
          : SCREEN.CREATE_PROFILE
      }
      screenOptions={{animationEnabled: false, headerShown: false}}>
      <Stack.Screen name={SCREEN.CHOOSE_PROFILE} component={ChooseProfile} />
      <Stack.Screen name={SCREEN.CREATE_PROFILE} component={CreateProfile} />
      <Stack.Screen
        name={SCREEN.CONTESTANT_DASHBOARD}
        component={Dashboard}
        initialParams={route?.params}
      />
    </Stack.Navigator>
  );
};

export default CreateProfileNavigator;

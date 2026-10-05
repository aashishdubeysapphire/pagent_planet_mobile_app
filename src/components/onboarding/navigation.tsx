import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Welcome from './welcome';
import Login from './welcome/login';
import OnBoarding from '.';
import WebPage from './welcome/signup/webpage';
import ForgotPassword from './welcome/login/forgotpassword';
import EmailVerification from './welcome/login/forgotpassword/emailverification';
import ResetPassword from './welcome/login/forgotpassword/emailverification/resetpassword';
import ChangePassword from '../dashboard/drawercontent/changepassword';
import SignUp from './welcome/signup';
import DashbaordNavigation from '../dashboard/drawercontent/navigation';
import {SCREEN} from '../../root/screenname';
import useAppStore from '../../store/useAppStore';
import Shop from '../dashboard/shop';
import SearchSreen from '../dashboard/shop/searchscreen';
import FilterProduct from '../dashboard/shop/filterproduct';
import ProductDetail from '../dashboard/shop/productdetail';
import SoldAndExportBy from '../dashboard/shop/productdetail/soldandshiped';

const Stack = createStackNavigator();

const LoginNavigation = () => {
  const {
    storeData: {isOnBoardingViewed},
  } = useAppStore();
  const screenName = isOnBoardingViewed ? SCREEN.WELCOME : SCREEN.ONBORADING;
  return (
    <Stack.Navigator
      initialRouteName={screenName}
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({current, layouts}) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}>
      <Stack.Screen name={SCREEN.ONBORADING} component={OnBoarding} />
      <Stack.Screen name={SCREEN.LOGIN} component={Login} />
      <Stack.Screen name={SCREEN.FORGOT} component={ForgotPassword} />
      <Stack.Screen
        name={SCREEN.OTP_VERIFICATION}
        component={EmailVerification}
      />
      <Stack.Screen name={SCREEN.PASSWORD_RESET} component={ResetPassword} />
      <Stack.Screen name={SCREEN.CHANGE_PASSWORD} component={ChangePassword} />

      <Stack.Screen name={SCREEN.WELCOME} component={Welcome} />
      <Stack.Screen name={SCREEN.SIGNUP} component={SignUp} />

      <Stack.Screen name={SCREEN.DASHBOARD} component={DashbaordNavigation} />
      <Stack.Screen name={SCREEN.STATIC_PAGE} component={WebPage} />
      <Stack.Screen name={SCREEN.SHOP} component={Shop} />
      <Stack.Screen name={SCREEN.SEARCH_SCREEN} component={SearchSreen} />

      <Stack.Screen
        name={SCREEN.FILTER_PRODUCT}
        component={FilterProduct}
        getId={({params}) => params?.displayKey + ''}
      />
      <Stack.Screen name={SCREEN.PRODUCT_DETAIL} component={ProductDetail} />
      <Stack.Screen
        name={SCREEN.SOLD_AND_SHIPPED_BY}
        component={SoldAndExportBy}
      />
    </Stack.Navigator>
  );
};

export default LoginNavigation;

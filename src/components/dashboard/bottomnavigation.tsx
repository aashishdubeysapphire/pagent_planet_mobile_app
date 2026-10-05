import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useContext, useEffect, useState} from 'react';
import Canvo from './convo';
import Shop from './shop';
import {StyleSheet} from 'react-native';
import images from '../../assets/images/AppImages';
import {color} from '../../assets/colorConstant';
import {font} from '../../assets/fonts/fontsConstant';
import {moderateScaleVertical} from '../utils/responsiveSize';
// import CreateProfileNavigator from './dashboard/profilenavigator';
import {USER_DESHBOARD_TAB} from '../utils/enum';
import {RootContext} from '../../store/rootStore';
import {isIosDevice, onTabPress} from '../utils/helperFunction';
// import Directory from './directory';
import SellItemServices from './sellitemservices';
import AddCrownConvo from './convo/addcrownconvo';
// import Compose from './message/compose';

const BottomTabs = createBottomTabNavigator();

const DashboardNavigation = () => {
  const isWelcomePopViewed = useContext(RootContext);
  const [isBottomTabHidden, setBottomTabHidden] = useState(
    isWelcomePopViewed.isWelcomePopViewed ?? false,
  );
  useEffect(() => {
    setBottomTabHidden(isWelcomePopViewed.isWelcomePopViewed);
  }, []);
  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          height: isIosDevice()
            ? moderateScaleVertical(80)
            : moderateScaleVertical(60),
          paddingBottom: 0,
        },
      }}
      initialRouteName={USER_DESHBOARD_TAB.CONVO}>
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <images.Dashboard.ConvoActive_ICON />
            ) : (
              <images.Dashboard.Convo_ICON />
            );
          },
          tabBarActiveTintColor: color.P_PINK,
          tabBarInactiveTintColor: color.S_GRAY_4,
          tabBarLabelStyle: styles.text,
        }}
        listeners={({navigation, route}) => ({
          tabPress: () => onTabPress(navigation, route),
        })}
        name={USER_DESHBOARD_TAB.CONVO}
        component={Canvo}
      />

      <BottomTabs.Screen
        name={USER_DESHBOARD_TAB.ASK_QUESTIONS}
        component={AddCrownConvo}
        initialParams={{
          fromBottomTab: true,
          isAdd: true,
        }}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <images.Dashboard.DirectoryActive_ICON />
            ) : (
              <images.Dashboard.Directory_ICON />
            ),
          tabBarActiveTintColor: color.P_PINK,
          tabBarInactiveTintColor: color.S_GRAY_4,
          tabBarLabelStyle: styles.text,
        }}
      />

      <BottomTabs.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <images.Dashboard.ShopActive_ICON />
            ) : (
              <images.Dashboard.Shop_ICON />
            );
          },
          tabBarActiveTintColor: color.P_PINK,
          tabBarInactiveTintColor: color.S_GRAY_4,
          tabBarLabelStyle: styles.text,
        }}
        name={USER_DESHBOARD_TAB.SHOP}
        component={Shop}
      />

      <BottomTabs.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <images.Dashboard.sell_Item_Active />
            ) : (
              <images.Dashboard.sell_Item />
            );
          },

          tabBarActiveTintColor: color.P_PINK,
          tabBarInactiveTintColor: color.S_GRAY_4,
          tabBarLabelStyle: styles.text,
        }}
        name={USER_DESHBOARD_TAB.SELL_ITEM_SERVICES}
        component={SellItemServices}
      />
      {/* <BottomTabs.Screen
        options={{
          tabBarStyle: {
            display:
              isBottomTabHidden !== undefined && isBottomTabHidden
                ? 'none'
                : 'flex',
            height:
              isIosDevice()
                ? moderateScaleVertical(80)
                : moderateScaleVertical(60),
          },
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <images.Dashboard.DeshboardActive_ICON />
            ) : (
              <images.Dashboard.Deshboard_ICON />
            );
          },
          tabBarActiveTintColor: color.P_PINK,
          tabBarInactiveTintColor: color.S_GRAY_4,
          tabBarLabelStyle: styles.text,
        }}
        name={USER_DESHBOARD_TAB.DESHBOARD}
        component={CreateProfileNavigator}
      /> */}
    </BottomTabs.Navigator>
  );
};

export default DashboardNavigation;

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    marginBottom: 4,
    fontFamily: font.LatoSemiBold,
  },
});

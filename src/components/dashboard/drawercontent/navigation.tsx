import React from 'react';
import DrawerContent from '.';
import HomeScreen from '../bottomnavigation';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {SCREEN} from '../../../root/screenname';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';
import { StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import { isIosDevice } from '../../utils/helperFunction';

const Drawer = createDrawerNavigator();
const DashboardNavigation = ({route}) => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent />}
      initialRouteName={SCREEN.HOME}
      screenOptions={{
        overlayColor: 'rgba(0,0,0,0.1)',
        drawerStyle:
          isIosDevice() ? styles.iosStyles : styles.androidStyles,
        swipeEnabled: true,
      }}>
      <Drawer.Screen
        name={SCREEN.HOME}
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DashboardNavigation;
const styles = StyleSheet.create({
  androidStyles: {
    width: moderateScale(310),
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  iosStyles: {
    width: moderateScale(310),
    backgroundColor: color.OVERLAY,
  },
  drawerArea: {
    height: moderateScaleVertical(40),
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: moderateScale(16),
  },
});

import {Dimensions, StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {font} from '../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';
import { isIosDevice } from '../../utils/helperFunction';

export const styles = StyleSheet.create({
  tabContainer: {
    marginTop: moderateScaleVertical(12),
    flex: 1,
    height:
    isIosDevice()
        ? Dimensions.get('window').height * (moderateScaleVertical(75.6) / 100)
        : Dimensions.get('window').height * (moderateScaleVertical(78) / 100),
    marginLeft: moderateScale(16),
    width: '100%',
  },
  labelStyle: {
    fontFamily: font.RobotoMedium,
    fontSize: isIosDevice() ? textScale(13) : textScale(14),
    color: color.BLACK,
    textTransform: 'none',
    marginHorizontal: moderateScale(2),
    width: '100%',
  },
  tabTopAreaStyles: {
    backgroundColor: color.WHITE,
    borderBottomColor: color.S_GRAY_2,
    borderBottomWidth: 1,
    paddingRight: moderateScaleVertical(10),
    shadowOffset: {height: 0, width: 0},
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  indicator: {
    backgroundColor: color.P_PINK,
    height: moderateScaleVertical(3),
    marginBottom: -moderateScaleVertical(2),
  },
  tabStyle: {
    width: 'auto',
    paddingHorizontal: moderateScale(8),
    borderWidth: 0,
  },
});

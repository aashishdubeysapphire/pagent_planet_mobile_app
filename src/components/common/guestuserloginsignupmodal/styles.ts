import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {font} from '../../../assets/fonts/fontsConstant';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: color.WHITE,
    paddingHorizontal: moderateScale(70),
    borderTopRightRadius: moderateScaleVertical(20),
    borderTopLeftRadius: moderateScaleVertical(20),
  },
  viewcontainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(22),
    marginTop: moderateScaleVertical(50),
  },
  crossIcon: {
    position: 'absolute',
    right: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(16),
  },
  borderButtonText: {
    ...CommonStyles.latoBoldWhite14,
    color: color.P_PINK,
    lineHeight: moderateScaleVertical(20),
  },

  containerLogin: {
    height: moderateScaleVertical(40),
    marginBottom: moderateScaleVertical(24),
  },

  header: {
    marginEnd: moderateScaleVertical(35),
    marginTop: moderateScaleVertical(80),
    marginBottom: moderateScaleVertical(60),
    marginStart: moderateScaleVertical(33),
  },

  text: {
    fontSize: moderateScaleVertical(18),
    lineHeight: moderateScaleVertical(24),
    marginBottom: moderateScaleVertical(25),
    textAlign: 'center',
    color: color.BLACK,
    fontFamily: font.LatoBold,
  },

  row: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(36),
    alignItems: 'center',
  },
  continueas: {
    fontSize: moderateScaleVertical(16),
    marginLeft: moderateScaleVertical(10),
    fontWeight: '500',
    fontFamily: font.LatoRegular,
    lineHeight: moderateScaleVertical(22),
    color: color.INPUT_TEXT,
  },

  guestuser: {
    fontSize: moderateScaleVertical(16),
    color: color.P_PINK,
    fontWeight: '500',
    lineHeight: moderateScaleVertical(22),
    fontFamily: font.LatoRegular,
    textTransform: 'capitalize',
  },
});

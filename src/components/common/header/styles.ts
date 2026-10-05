import { StyleSheet } from 'react-native';
import { color } from '../../../assets/colorConstant';
import { CommonStyles } from '../../../assets/commonStyles';
import { font } from '../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: color.WHITE,
    // marginTop: 30,
    zIndex: 1000,
    height: moderateScaleVertical(55),
    paddingStart: moderateScale(16),
    paddingEnd: moderateScale(8),
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  drawerIcon: {
    marginVertical: moderateScaleVertical(18),
    marginEnd: moderateScale(16),
    width: 500,
  },
  backIcon: {
    marginVertical: moderateScaleVertical(18),
    marginRight: moderateScale(20),
    width: 500,
  },
  infoIcon: {
    justifyContent: 'center',
    width: moderateScale(34),
    alignItems: 'center',
    height: '102%',
  },
  lableStyle: {
    fontFamily: font.LatoBold,
    fontSize: textScale(18),
    width: '80%',
    color: color.BLACK,
    marginEnd: moderateScaleVertical(5),
    marginTop: 'auto',
    textTransform: 'capitalize',
    marginBottom: 'auto',
    lineHeight: moderateScaleVertical(24),
  },
  dropIcon: {
    marginStart: moderateScaleVertical(8),
    alignSelf: 'center',
  },
  shortLableStyle: {
    fontFamily: font.LatoBold,
    fontSize: textScale(18),
    textTransform: 'capitalize',
    paddingEnd: moderateScale(4),
    color: color.BLACK,
    marginTop: 'auto',
    marginBottom: 'auto',
    width: '105%',
    lineHeight: moderateScaleVertical(24),
  },
  infoLabelStyle: {
    fontFamily: font.LatoBold,
    fontSize: textScale(18),
    color: color.BLACK,
    marginTop: 'auto',
    textTransform: 'capitalize',
    marginBottom: 'auto',
    maxWidth: width - moderateScale(94),
    alignSelf: 'stretch',
    lineHeight: moderateScaleVertical(24),
  },
  bottomLine: {
    height: 0.7,
    backgroundColor: color.BLACK,
    opacity: 0.2,
  },
  otherIcon: {
    marginVertical: moderateScaleVertical(18),
    marginHorizontal: moderateScale(7),
    width: 500,
  },
  rightText: {
    ...CommonStyles.lotoBold16,
    color: color.P_PINK,
    marginRight: moderateScale(12),
  },
  rightTextTouch: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: moderateScale(27),
  },
  rightIcons: {
    marginLeft: moderateScale(12),
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  faveIcon: {
    marginLeft: moderateScale(9),
  },
  leftImageIcon: {
    alignSelf: 'center',
    marginRight: moderateScale(8),
    marginTop: moderateScaleVertical(5),
  },
  imageCountStyles: {
    fontFamily: font.LatoBold,
    fontSize: textScale(18),
    color: color.BLACK,
    marginTop: 'auto',
    marginBottom: 'auto',
    lineHeight: moderateScaleVertical(24),
  },
});

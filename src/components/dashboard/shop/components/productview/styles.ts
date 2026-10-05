import { StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {font} from '../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  animcontainer: {
    width: '24%',
    right: moderateScaleVertical(2),
    top: moderateScaleVertical(2),
    position: 'absolute',
    height: '24%',
  },
  container: {
    borderRadius: moderateScale(25),
    borderColor: color.S_GRAY_2,
    borderWidth: 1,
    paddingBottom: 0,
    backgroundColor: color.S_GRAY_1,
    zIndex: 1,
  },
  options: {
    fontFamily: font.LatoSemiBold,
    fontSize: isIosDevice() ? textScale(11) : textScale(12),
    color: color.S_GRAY_4,
    lineHeight: moderateScaleVertical(14),
    marginLeft: moderateScale(8),
  },
  bottomSection: {
    flexDirection: 'row',
    width: moderateScale(150),
    backgroundColor: color.TRANSPARENT,
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
    justifyContent: 'center',
    borderColor: color.S_GRAY_2,
    alignSelf: 'center',
    borderWidth: 1,
    paddingTop: moderateScaleVertical(16),
    paddingBottom: moderateScaleVertical(8),
    marginTop: moderateScaleVertical(-8),
  },

  title: {
    ...CommonStyles.tpp_s2,
    textAlign: 'center',
    lineHeight: moderateScaleVertical(17),
    textAlignVertical: 'center',
    color: color.BLACK,
  },
  priceStyle: {
    ...CommonStyles.robotoMedium14,
    lineHeight: moderateScaleVertical(20),
    color: color.P_PINK,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScaleVertical(4),
  },
  MRPStyle: {
    ...CommonStyles.robotoMedium14,
    lineHeight: moderateScaleVertical(20),
    color: color.S_GRAY_3,
    textDecorationLine: 'line-through',
  },
  imageSection: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -moderateScale(0.6),
  },
  titleSection: {
    alignItems: 'stretch',
    padding: moderateScale(8),
    justifyContent: 'center',
    textAlign: 'center',
    height: moderateScaleVertical(72),
  },
  favCircleIcon: {
    position: 'absolute',
    right: moderateScale(10),
    top: moderateScaleVertical(10),
  },
});

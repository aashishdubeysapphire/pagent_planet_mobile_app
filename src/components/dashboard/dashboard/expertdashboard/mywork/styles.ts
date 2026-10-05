import { StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {font} from '../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../utils/helperFunction';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  mainimage: {
    width: moderateScale(321),
    height: moderateScaleVertical(239),
  },
  emptycontainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: moderateScaleVertical(88),
    backgroundColor: color.WHITE,
  },
  containerLogin: {
    width: width,
    alignSelf: 'center',
    marginTop: moderateScaleVertical(88),
    paddingHorizontal: moderateScaleVertical(16),
    height: moderateScaleVertical(60),
  },
  borderButtonText: {
    color: color.P_PINK,
    fontSize: textScale(18),
    fontFamily: font.LatoBold,
    lineHeight: moderateScaleVertical(24),
  },
  titleContainer: {
    fontFamily: font.LatoBold,
    fontSize: textScale(18),
    textTransform: 'capitalize',
    color: color.BLACK,
    lineHeight: moderateScaleVertical(24),
  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginEnd: moderateScaleVertical(10),
    marginStart: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(10),
  },
  awardSection: {
    width: '100%',
    paddingLeft: moderateScale(18),
    paddingVertical: moderateScaleVertical(24),
    backgroundColor: color.S_GRAY_1,
  },
  addPageantRuleontainer: {
    marginEnd: moderateScaleVertical(16),
  },
  rowSection: {
    flexDirection: 'row',
  },
  staticHeight: {
    height: moderateScaleVertical(200),
  },
  heading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    width: '83%',
  },
  viewButton: {
    fontFamily: font.LatoMedium,
    fontSize: isIosDevice() ? textScale(11) : textScale(12),
    color: color.BLACK,
    fontWeight: '600',
    marginRight: moderateScale(16),
  },
  viewStyles: {
    marginTop: moderateScaleVertical(2),
  },
});

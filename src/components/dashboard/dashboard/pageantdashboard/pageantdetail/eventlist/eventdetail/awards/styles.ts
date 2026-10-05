import {Dimensions, StyleSheet} from 'react-native';
import {color} from '../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  subView: {
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  heading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    margin: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(0),
  },
  continer: {
    width: Dimensions.get('window').width / 2 - moderateScale(24),
    height: moderateScaleVertical(210),
    marginStart: moderateScaleVertical(18),
    marginBottom: moderateScaleVertical(18),
  },
  subcontiner: {
    width: moderateScale(150),
    height: moderateScaleVertical(210),
    borderColor: color.S_GRAY_2,
    borderWidth: moderateScaleVertical(1),
    borderRadius: moderateScaleVertical(20),
  },
  downloadView: {
    width: moderateScale(150),
    height: moderateScaleVertical(35),
    borderColor: color.S_GRAY_2,
    borderWidth: 1,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderTopColor: color.TRANSPARENT,
    bottom: 4,
  },
  downloadViewIcon: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  innerView: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  downloadText: {
    fontFamily: font.LatoMedium,
    fontSize: isIosDevice() ? textScale(11) : textScale(12),
    color: color.S_GRAY_4,
    marginLeft: moderateScale(8),
    lineHeight: moderateScaleVertical(14),
  },
  zindex: {
    zIndex: 1000,
  },
  height: {
    height: moderateScaleVertical(95),
  },
});

import { StyleSheet} from 'react-native';
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
  textContainer: {
    padding: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateScaleVertical(50),
    backgroundColor: color.S_GRAY_1
  },
  name: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,
    lineHeight: moderateScaleVertical(16),
  },
  title: {
    ...CommonStyles.tpp_p4,
    lineHeight: moderateScaleVertical(14),
    marginTop: moderateScaleVertical(4),
    fontWeight: '400',
  },
  gridSection: {
    marginRight: moderateScale(12),
    width: moderateScale(154),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
    overflow: 'hidden',
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  claimSection: {
    position: 'absolute',
    width: '100%',
    height: moderateScaleVertical(31),
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomEndRadius: moderateScale(20),
    borderBottomStartRadius: moderateScale(20),
    flexDirection: 'row',
    backgroundColor: color.SHADOW_COLOR
  },
  noProfileSection: {
    position: 'absolute',
    top: -0.5,
    left: -moderateScale(4),
  },
  claimLabel: {
    fontFamily: font.LatoMedium,
    fontSize: isIosDevice() ? textScale(11) : textScale(12),
    color: color.WHITE,
    fontWeight: '600',
    marginLeft: moderateScale(8),
  },
});

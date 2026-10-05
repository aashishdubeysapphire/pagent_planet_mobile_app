import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.WHITE,
    flex: 1,
  },
  bgColor: {
    backgroundColor: color.S_GRAY_1,
    flex: 1,
    // paddingBottom: moderateScaleVertical(60),
  },
  customButtonStyles: {
    width: moderateScale(230),
    alignSelf: 'center',
    marginTop: moderateScaleVertical(32),
  },
  imageView: {
    backgroundColor: color.WHITE,
    alignItems: 'center',
    paddingVertical: moderateScaleVertical(48),
  },
  productContainer: {
    marginTop: moderateScaleVertical(12),
    padding: moderateScale(16),
    backgroundColor: color.WHITE,
    paddingRight: 0,
  },
  headingStyles: {
    fontFamily: font.RobotoRegular,
    fontSize: textScale(12),
    lineHeight: moderateScaleVertical(18),
  },

  heading: {
    ...CommonStyles.tpp_h5,
    fontSize: textScale(13),
    color: color.INPUT_TEXT,
    lineHeight: moderateScaleVertical(20),
    marginTop: moderateScaleVertical(42),
    marginBottom: moderateScaleVertical(12),
  },

  bottomEmptySpace: {
    height: moderateScaleVertical(200),
  },
});

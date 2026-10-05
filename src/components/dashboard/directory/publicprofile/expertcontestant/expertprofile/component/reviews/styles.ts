import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: moderateScale(16),
  },
  heading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    fontWeight: '800',
    marginTop: moderateScaleVertical(24),
  },
  writeReviewView: {
    marginTop: moderateScaleVertical(16),
    borderColor: color.S_GRAY_2,
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScaleVertical(18),
    borderRadius: 100,
    borderWidth: 1,
    flexDirection: 'row',
  },
  writeReviewText: {
    ...CommonStyles.tpp_s2,
    color: color.P_PINK,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: moderateScale(12),
  },
  aboveFlatlist: {
    height: moderateScaleVertical(16),
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
    marginBottom: 'auto',
  },
  oneyearText: {
    ...CommonStyles.tpp_s2,
    fontFamily: font.RobotoRegular,
    marginTop: moderateScaleVertical(14),
    marginHorizontal: moderateScale(16),
  },
  oneyearTextBold: {
    ...CommonStyles.tpp_s2,
  },
});

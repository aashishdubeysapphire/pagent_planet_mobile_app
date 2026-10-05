import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../assets/commonStyles';
import { font } from '../../../../../../../../assets/fonts/fontsConstant';
import {moderateScale,moderateScaleVertical} from '../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  reviewHeading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    margin: moderateScale(16),
    marginTop: 0,
  },
  mainView: {
    marginHorizontal: moderateScale(16),
  },
  writeReviewView: {
    marginBottom: moderateScaleVertical(16),
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
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
    marginBottom: 'auto',
  },
  ratingBody:{
    ...CommonStyles.tpp_p3,
    color : color.INPUT_TEXT,
    fontWeight: '400',
    marginHorizontal: moderateScale(16)
  },
  oneyearText: {
    ...CommonStyles.tpp_s2,
    fontFamily: font.RobotoRegular,
    marginBottom: moderateScaleVertical(16),
    marginHorizontal: moderateScale(16),
  },
  oneyearTextBold: {
    ...CommonStyles.tpp_s2,
  },
});

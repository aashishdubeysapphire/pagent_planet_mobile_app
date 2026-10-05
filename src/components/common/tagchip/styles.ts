import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {font} from '../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';
export const styles = StyleSheet.create({
  container: {
    backgroundColor: color.WHITE,
    paddingStart: moderateScaleVertical(16),
    paddingEnd: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(10),
  },
  emptyContainer: {
    backgroundColor: color.WHITE,
    paddingStart: moderateScaleVertical(16),
    paddingEnd: moderateScaleVertical(16),
  },
  headerTitle: {
    ...CommonStyles.robotoMedium14,
    marginBottom: moderateScaleVertical(8),
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(20),
    marginTop: moderateScaleVertical(5),
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    marginBottom: 'auto',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
  clickable: {
    borderWidth: 1,
    borderColor: color.S_GRAY_E1,
    marginBottom: moderateScaleVertical(8),
    paddingVertical: moderateScaleVertical(8),
    paddingStart: moderateScale(12),
    marginRight: moderateScaleVertical(8),
    borderRadius: 30,
    flexDirection: 'row',
    backgroundColor: color.S_GRAY_1,
  },
  whiteclickable: {
    borderWidth: 1,
    borderColor: color.S_GRAY_E1,
    marginBottom: moderateScaleVertical(8),
    paddingVertical: moderateScaleVertical(8),
    paddingHorizontal: moderateScale(12),
    marginRight: moderateScaleVertical(8),
    borderRadius: 30,
    flexDirection: 'row',
    backgroundColor: color.WHITE,
  },
  inactiveclickable: {
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
    marginBottom: moderateScaleVertical(8),
    paddingVertical: moderateScaleVertical(8),
    paddingHorizontal: moderateScale(12),
    marginRight: moderateScaleVertical(8),
    borderRadius: 30,
    flexDirection: 'row',
    backgroundColor: color.S_GRAY_2,
  },
  awardName: {
    ...CommonStyles.tpp_p3,
  },
  imageAvaialbeName: {
    ...CommonStyles.tpp_p3,
    marginStart: moderateScale(30),
  },
  addMore: {
    color: color.P_PINK,
    fontFamily: font.LatoSemiBold,
    fontSize: textScale(12),
    marginLeft: 'auto',
  },
  uploadImageInnerVIew: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginEnd: moderateScaleVertical(8),
    marginStart: moderateScaleVertical(8),
  },
  circleImageContainer: {
    position: 'absolute',
    left: 0,
    marginTop: moderateScaleVertical(1),
    marginStart: moderateScaleVertical(-0.8),
  },
});

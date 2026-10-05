import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  containerStyle: {
    paddingBottom: moderateScaleVertical(170),
  },
  demoImageContainer: {
    borderColor: color.S_GRAY_2,
    borderWidth: moderateScaleVertical(1),
    alignContent: 'center',
    maxHeight: moderateScaleVertical(84),
    maxWidth: moderateScaleVertical(84),
    borderRadius: moderateScaleVertical(84),
  },
  inactiveContainer: {
    marginHorizontal: moderateScale(16),
    borderRadius: moderateScale(16),
    alignItems: 'center',
    borderWidth: 1,
    marginTop: moderateScaleVertical(16),
    borderColor: color.P_PINK,
    flexDirection: 'row',
    backgroundColor: color.WHITE,
    padding: moderateScale(12),
    marginBottom: moderateScaleVertical(16),
  },
  inactiveLabel: {
    ...CommonStyles.tpp_s2,
    color: color.S_GRAY_4,
    paddingRight: moderateScale(12),
  },
  editIconTouch: {
    position: 'absolute',
    bottom: moderateScaleVertical(0),
    right: moderateScaleVertical(0),
    borderWidth: 1,
    borderRadius: 100,
    borderColor: color.WHITE,
  },
  row: {
    flexDirection: 'row',
    left: moderateScaleVertical(16),
    position: 'absolute',
  },
  nameText: {
    ...CommonStyles.robotoMedium16,
    marginTop: moderateScaleVertical(10),
    lineHeight: moderateScaleVertical(22),
    paddingHorizontal: moderateScale(12),
    width: '70%',
  },
  businessTitle: {
    ...CommonStyles.robotoMedium16,
    marginTop: moderateScaleVertical(60),
    lineHeight: moderateScaleVertical(22),
    paddingHorizontal: moderateScale(16),
  },
  businessSubTitle: {
    ...CommonStyles.tpp_p3,
    color: color.INPUT_TEXT,
    lineHeight: moderateScaleVertical(18),
    paddingHorizontal: moderateScale(16),
  },
  detailsArea: {
    width: '100%',
    marginTop: moderateScaleVertical(40),
    paddingBottom: moderateScaleVertical(16),
    backgroundColor: color.S_PINK,
  },
  editIcon: {
    paddingHorizontal: moderateScaleVertical(16),
    paddingTop: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(40),
    marginEnd: moderateScaleVertical(16),
    marginLeft: 'auto',
  },
  clickableLink: {
    ...CommonStyles.tpp_s2,
    marginLeft: moderateScale(8),
    alignSelf: 'center',
    marginTop: moderateScaleVertical(-5),
    color: color.P_PINK,
    marginRight: moderateScale(16),
    width: '95%',
  },
  subHeadingLabel: {
    ...CommonStyles.tpp_s2,
    textAlign: 'center',
    alignSelf: 'stretch',
    marginLeft: moderateScale(8),
    lineHeight: moderateScaleVertical(16),
    color: color.S_GRAY_4,
    marginTop: -1,
  },
  phoneTitle: {
    ...CommonStyles.tpp_h5,
    marginStart: moderateScaleVertical(8),
    color: color.P_PINK,
    lineHeight: moderateScaleVertical(16),
  },
  profileArea: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(8),
    paddingHorizontal: moderateScale(16),
  },
  phoneContainer: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(16),
    marginTop: moderateScaleVertical(8),
  },
  whiteView: {
    height: '20%',
  },
  moveAbove: {
    top: moderateScaleVertical(-22),
  },
});

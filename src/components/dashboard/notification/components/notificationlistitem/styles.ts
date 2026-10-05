import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: color.WHITE,
    padding: moderateScale(8),
    flexDirection: 'row',
  },
  unreadStyle: {
    ...CommonStyles.tpp_s1,
    color: color.P_PINK,
    lineHeight: moderateScaleVertical(12),
    marginTop: moderateScaleVertical(4),
  },
  textUnreadStyle: {
    ...CommonStyles.tpp_p3,
    lineHeight: moderateScaleVertical(18),
    color: color.INPUT_TEXT,
  },
  readStyle: {
    ...CommonStyles.tpp_s1,
    lineHeight: moderateScaleVertical(12),
    marginTop: moderateScaleVertical(4),
  },
  typeStyle: {
    ...CommonStyles.tpp_p3,
    lineHeight: moderateScaleVertical(18),
    color: color.S_GRAY_4,
  },
  headerText: {
    flex: 1,
    marginTop: moderateScaleVertical(4),
    marginEnd: moderateScaleVertical(10),
  },
  imageView: {
    width: moderateScale(60),
    height: moderateScale(60),
    justifyContent: 'center',
    marginStart: moderateScaleVertical(2),
    marginRight: moderateScale(6),
  },
  circle: {
    minHeight: moderateScaleVertical(8),
    maxHeight: moderateScaleVertical(8),
    alignSelf: 'center',
    minWidth: moderateScaleVertical(8),
    borderRadius: moderateScaleVertical(8),
    backgroundColor: color.P_PINK,
  },
  circleGap: {
    minHeight: moderateScaleVertical(8),
    maxHeight: moderateScaleVertical(8),
    alignSelf: 'center',
    minWidth: moderateScaleVertical(8),
  },
});

export default styles;

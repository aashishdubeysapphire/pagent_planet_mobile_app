import {StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {CommonStyles} from '../../../../assets/commonStyles';
import {moderateScaleVertical} from '../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.S_GRAY_1,
    flex: 1,
  },
  seperatorStyle: {
    height: moderateScaleVertical(8),
    backgroundColor: color.S_GRAY_1,
  },
  haaderBg: {
    paddingBottom: moderateScaleVertical(8),
    backgroundColor: color.S_GRAY_1,
  },
  freeHeight: {
    marginBottom: moderateScaleVertical(50),
  },
  row: {
    padding: moderateScaleVertical(16),
    flexDirection: 'row',
    backgroundColor: color.WHITE,
  },
  noNotification: {
    ...CommonStyles.robotoMedium14,
    lineHeight: moderateScaleVertical(20),
    marginTop: moderateScaleVertical(24),
  },
  heading: {
    ...CommonStyles.tpp_s3,
    flex: 1,
    lineHeight: moderateScaleVertical(22),
    color: color.BLACK,
  },
  readCount: {
    ...CommonStyles.tpp_h5,
    lineHeight: moderateScaleVertical(16),
    color: color.P_PINK,
  },
});

import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';

export const styles = StyleSheet.create({
  flatlistContainer: {
    paddingBottom: moderateScale(100),
  },
  crossIcon: {
    marginLeft: 'auto',
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: 'auto',
    marginBottom: 'auto',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
  headingView: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(20),
  },
  infoHeadingLabel: {
    ...CommonStyles.robotoMedium14,
    lineHeight: moderateScaleVertical(20),
    marginBottom: moderateScaleVertical(4),
  },
  infoLabel: {
    ...CommonStyles.tpp_p3,
    lineHeight: moderateScaleVertical(18),
    fontWeight: '400',
    color: color.INPUT_TEXT,
  },
  line: {
    borderBottomColor: color.S_GRAY_2,
    borderBottomWidth: 1,
    marginVertical: moderateScaleVertical(16),
  },
  tapHereStyles: {
    ...CommonStyles.tpp_h5,
    color: color.P_PINK,
  },
  tapHereView: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(8),
    alignItems: 'center',
  },
});

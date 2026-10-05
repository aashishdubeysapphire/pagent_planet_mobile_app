import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  overlay: {
    opacity: 0.5,
  },
  mainView: {
    marginBottom: moderateScaleVertical(16),
    marginTop: 1,
  },
  container: {
    flexDirection: 'row',
  },
  textStyles: {
    marginLeft: moderateScale(8),
    flex: 1,
  },
  headingView: {
    flexDirection: 'row',
    bottom: 4,
  },
  userName: {
    ...CommonStyles.tpp_s2,
    textTransform: 'capitalize',
  },
  timeText: {
    ...CommonStyles.tpp_s1,
    marginLeft: 'auto',
    color: color.S_GRAY_4,
  },
  description: {
    ...CommonStyles.tpp_p3,
    lineHeight: moderateScaleVertical(18),
  },
  TouchText: {
    ...CommonStyles.tpp_s1,
    color: color.S_GRAY_4,
    marginRight: moderateScale(12),
  },
  bottmView: {
    marginLeft: moderateScale(48),
    marginTop: moderateScaleVertical(4),
    bottom: 0,
  },
  pinkColor: {
    color: color.P_PINK,
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: 'auto',
    marginBottom: 'auto',
    textAlign: 'center',
    lineHeight: moderateScaleVertical(24),
  },
  editedText: {
    ...CommonStyles.tpp_p3,
    fontSize: textScale(10),
    color: color.S_GRAY_4,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

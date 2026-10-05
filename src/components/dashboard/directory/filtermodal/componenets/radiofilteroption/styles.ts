import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: moderateScaleVertical(450),
  },
  filterOptionValueTextContainer: {
    ...CommonStyles.tpp_s2,
    lineHeight: moderateScaleVertical(16),
    fontWeight: '500',
    marginBottom: moderateScaleVertical(16),
  },

  selected: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(16),
  },
  selectedDefaultText: {
    ...CommonStyles.tpp_p3,
    fontWeight: '400',
    color: color.INPUT_TEXT,
    lineHeight: moderateScaleVertical(18),
    marginLeft: moderateScale(8),
  },
  staticHeight: {
    height: moderateScaleVertical(20),
  },
  circleImage: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  unselectedText: {
    ...CommonStyles.tpp_p3,
    color: color.S_GRAY_4,
    fontWeight: '400',
    marginLeft: moderateScale(8),
    lineHeight: moderateScaleVertical(18),
  },
});

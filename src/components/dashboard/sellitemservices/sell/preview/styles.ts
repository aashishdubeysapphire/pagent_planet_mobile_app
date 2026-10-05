import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.WHITE,
    flex: 1,
  },
  bottomSection: {
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScaleVertical(16),
    width: '100%',
  },
  descriptionHeading: {
    ...CommonStyles.robotoMedium14,
    color: color.BLACK,
    lineHeight: moderateScaleVertical(20),
  },
  descriptionLabel: {
    ...CommonStyles.tpp_p3,
    lineHeight: moderateScaleVertical(18),
    marginTop: moderateScaleVertical(8),
  },
  modalButtonBottom: {
    marginBottom: moderateScaleVertical(40),
  },
  customHeight: {
    height: moderateScaleVertical(356),
  },
  scrollViewContainer: {
    paddingBottom: moderateScaleVertical(80),
  },
});

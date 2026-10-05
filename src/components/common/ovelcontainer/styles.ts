import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';

export const styles = StyleSheet.create({
  subHeading: {
    ...CommonStyles.robotoMedium16,
    color: color.INPUT_TEXT,
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingLeft: moderateScale(24),
  },
  subHeadingContainer: {
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
    flexDirection: 'row',
    borderRadius: moderateScale(50),
    marginBottom: moderateScaleVertical(16),
    marginHorizontal: moderateScale(16),
    height: moderateScaleVertical(62),
  },
  arrowIcon: {
    marginVertical: moderateScaleVertical(20),
    marginRight: moderateScale(24),
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

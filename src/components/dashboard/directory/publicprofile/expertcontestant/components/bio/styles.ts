import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {
  moderateScaleVertical,
  textScale,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(24),
  },
  headerTitle: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
  },
  subHeaderTitle: {
    ...CommonStyles.tpp_p3,
    marginTop: moderateScaleVertical(16),
    lineHeight: moderateScaleVertical(18),
  },
  viewMore: {
    ...CommonStyles.tpp_s1,
    textAlign: 'right',
    color: color.P_PINK,
    lineHeight: moderateScaleVertical(16),
    fontSize: textScale(10),
    marginTop: moderateScaleVertical(5),
  },
});

export default styles;

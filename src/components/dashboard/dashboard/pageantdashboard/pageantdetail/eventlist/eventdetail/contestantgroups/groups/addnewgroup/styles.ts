import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  subContainer: {
    marginTop: moderateScaleVertical(16),
    marginHorizontal: moderateScale(16),
  },

  uploadeImage: {
    ...CommonStyles.tpp_h5,
    marginBottom: moderateScaleVertical(8),
  },
});

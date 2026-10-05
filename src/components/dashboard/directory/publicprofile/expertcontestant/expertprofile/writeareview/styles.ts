import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  subcontainer: {
    paddingHorizontal: moderateScale(16),
  },
  subHeading: {
    ...CommonStyles.tpp_h5,
    fontSize:textScale(14),
    marginBottom: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(24),
  },
  aboveButtonView:{
    height:moderateScaleVertical(16)
  }
});

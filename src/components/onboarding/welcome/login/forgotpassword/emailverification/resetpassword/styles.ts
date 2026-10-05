import { StyleSheet } from 'react-native';
import { color } from '../../../../../../../assets/colorConstant';
import { CommonStyles } from '../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  enterEmailTExt: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: moderateScaleVertical(32),
  },
  continerView: {
    paddingHorizontal: moderateScale(16),
  },
  loginContainer: {
    marginTop: moderateScaleVertical(48),
  },
});

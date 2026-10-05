import {StyleSheet} from 'react-native';
import {moderateScaleVertical, textScale} from '../../../../../utils/responsiveSize';
import { CommonStyles } from '../../../../../../assets/commonStyles';
import { color } from '../../../../../../assets/colorConstant';

export const styles = StyleSheet.create({
  centerImage: {
    alignItems: 'center',
    marginTop: moderateScaleVertical(24),
  },
  eventname:{
    ...CommonStyles.capitalizedCase,
    ...CommonStyles.tpp_h5,
    fontSize:textScale(14),
    color:color.P_PINK,
    textAlign:"center",
    marginTop: moderateScaleVertical(16),

  }
});

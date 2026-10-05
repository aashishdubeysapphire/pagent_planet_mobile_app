import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  borderButtonText: {
    ...CommonStyles.robotoMedium14,
    textAlign: 'center',
  },
  btn: {
    width: moderateScale(230),
    marginTop: moderateScaleVertical(48),
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  centerView: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
});

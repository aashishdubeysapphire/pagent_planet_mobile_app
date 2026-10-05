import {StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {CommonStyles} from '../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  container: {
    marginTop: moderateScaleVertical(32),
    marginHorizontal: moderateScale(20),
    flex: 1,
  },
  oldPasswordText: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    textAlign: 'center',
    lineHeight: moderateScaleVertical(24)
  },
  inputFieldView: {
    marginTop: moderateScaleVertical(32),
  },
  buttonView: {
    marginTop: 'auto',
    marginBottom: moderateScaleVertical(20),
  },
});

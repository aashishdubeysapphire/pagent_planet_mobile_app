import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  mainView: {
    padding: moderateScale(16),
  },
  continer: {
    marginTop: moderateScaleVertical(40),
    marginBottom: moderateScaleVertical(16),
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  name: {
    marginBottom: moderateScaleVertical(16),
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  qty: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  rowView: {
    flexDirection: 'row',
  },
  circle: {
    marginTop: moderateScaleVertical(40),
  },
  status: {
    marginTop: moderateScaleVertical(5),
    marginLeft: moderateScale(8),
  },
  raiseIssue: {
    marginTop: moderateScaleVertical(52),
    marginLeft: 'auto',
  },
  seperator: {
    height: moderateScaleVertical(12),
    backgroundColor: color.S_GRAY_1,
    marginVertical: moderateScaleVertical(16),
  },
});

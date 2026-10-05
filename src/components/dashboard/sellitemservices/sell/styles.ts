import {StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {moderateScaleVertical} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  wrapper:{
    backgroundColor: color.WHITE,
    flex: 1,
  },
  bg:{
    backgroundColor: color.S_PINK,
    height: 100,
    borderRadius: moderateScaleVertical(20),
    margin: moderateScaleVertical(16),
    width: '91.5%',
  },
  redCircleText: {
    alignSelf: 'center',
    color: color.WHITE,
  },
  redCircle: {
    backgroundColor: color.P_PINK,
    width: moderateScaleVertical(50),
    justifyContent: 'center',
    alignSelf: 'center',
    height: moderateScaleVertical(50),
    borderRadius: moderateScaleVertical(50),
  },
  row: {
    padding: moderateScaleVertical(16),
    flexDirection: 'row',
  },
  rowText: {
    flexDirection: 'row',
    paddingStart: moderateScaleVertical(16),
    paddingEnd: moderateScaleVertical(16),
    paddingBottom: moderateScaleVertical(16),
    justifyContent: 'space-between',
  },
  line: {
    alignSelf: 'center',
    color: color.P_PINK,
  },
});

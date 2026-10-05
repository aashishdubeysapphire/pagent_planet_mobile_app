import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {moderateScaleVertical} from '../../utils/responsiveSize';

export const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 30,
    borderColor: color.S_GRAY_E1,
    backgroundColor: color.HEADER_GRAY,
    borderWidth: 1,
    height: moderateScaleVertical(60),
  },
  activeButtonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    backgroundColor: color.P_PINK,
    borderRadius: 30,
  },
  inActiveButtonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  activeLabelStyles: {
    ...CommonStyles.latoBoldWhite14,
  },
  inActiveLabelStyles: {
    ...CommonStyles.latoBoldWhite14,
    color: color.BLACK,
  },
});

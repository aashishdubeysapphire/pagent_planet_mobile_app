import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';

export const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 30,
    borderColor: color.S_GRAY_E1,
    borderWidth: 1,
    marginHorizontal: moderateScale(16),
    height: moderateScaleVertical(60),
    backgroundColor: color.HEADER_GRAY,
  },
  activeButtonView: {
    flex: 1,
    backgroundColor: color.P_PINK,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    borderRadius: 30,
  },
  inActiveButtonView: {
    flex: 1,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeLabelStyles: {
    ...CommonStyles.latoBoldWhite14,
  },
  inActiveLabelStyles: {
    ...CommonStyles.latoBoldWhite14,
    color: color.BLACK,
  },
});

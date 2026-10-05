import {StyleSheet} from 'react-native';
import {CommonStyles} from '../../../assets/commonStyles';
import {moderateScale} from '../../utils/responsiveSize';

export const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginHorizontal: moderateScale(16),
  },
  imageArea: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textArea: {
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
  },
  textStyle: {
    marginLeft: moderateScale(8),
    ...CommonStyles.robotoMedium14,
  },
});

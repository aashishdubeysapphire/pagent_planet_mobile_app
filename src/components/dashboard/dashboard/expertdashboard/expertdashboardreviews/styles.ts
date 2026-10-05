import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {moderateScaleVertical} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  heading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    fontWeight: '800',
    margin: moderateScaleVertical(16),
    marginTop: 0,
  },
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  emptycontainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

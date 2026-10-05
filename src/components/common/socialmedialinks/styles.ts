import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  socialLinks: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScaleVertical(12),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  socialLinksTOuch: {
    marginHorizontal: moderateScale(6),
  },
});

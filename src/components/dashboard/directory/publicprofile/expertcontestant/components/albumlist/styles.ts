import { StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: moderateScale(8),
  },
  headerSection: {
    flexDirection: 'row',
    marginVertical: moderateScaleVertical(24),
    paddingLeft: moderateScale(16),
    alignItems: 'center',
  },
  viewButton: {
    fontFamily: font.LatoMedium,
    fontSize: isIosDevice() ? textScale(11) : textScale(12),
    color: color.BLACK,
    fontWeight: '600',
    marginRight: moderateScale(16),
  },
  heading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    width: '83%',
  },
  customTitleStyles: {
    ...CommonStyles.tpp_s2,
    lineHeight: moderateScaleVertical(16),
    padding: moderateScale(8),
    alignSelf: 'stretch',
    textAlign: 'center',
  },
});

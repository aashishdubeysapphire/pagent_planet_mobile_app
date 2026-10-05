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
  eventSection: {
    width: '100%',
    paddingLeft: moderateScale(18),
    paddingTop: moderateScaleVertical(24),
    backgroundColor: color.S_GRAY_1,
    paddingBottom: moderateScaleVertical(8),
    // marginTop: moderateScaleVertical(24),
  },
  heading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    fontWeight: '800',
    width: '83%',
  },
  headingPublic:{
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    width: '83%',
  },
  viewButton: {
    fontFamily: font.LatoMedium,
    fontSize: isIosDevice() ? textScale(11) : textScale(12),
    color: color.BLACK,
    fontWeight: '600',
    marginRight: moderateScale(16),
  },
  viewStyles: {
    marginTop: moderateScaleVertical(2),
  },
  rowSection: {
    flexDirection: 'row',
  },
  flatlistView: {
    marginTop: moderateScaleVertical(24),
  },
});

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
    width: '100%',
    backgroundColor: color.S_GRAY_1,
    paddingLeft: moderateScale(18),
    paddingVertical: moderateScaleVertical(24),
  },
  heading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    width: '83%',
  },
  viewButton: {
    color: color.BLACK,
    fontWeight: '600',
    marginRight: moderateScale(16),
    fontFamily: font.LatoMedium,
    fontSize: isIosDevice() ? textScale(11) : textScale(12),
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
  postDateLabel: {
    ...CommonStyles.tpp_s1,
    textAlign: 'right',
    lineHeight: moderateScaleVertical(12),
    width: moderateScale(88),
  },
  userName: {
    ...CommonStyles.tpp_s2,
    marginTop: moderateScaleVertical(8),
    lineHeight: moderateScaleVertical(16),

    color: color.BLACK,
  },
  info: {
    ...CommonStyles.tpp_p4,
    lineHeight: moderateScaleVertical(14),
    marginTop: moderateScaleVertical(8),
  },
  gridSection: {
    marginRight: moderateScale(12),
    paddingHorizontal: moderateScale(8),
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
    backgroundColor: color.WHITE,
    width: moderateScale(154),
    height: moderateScaleVertical(188),
    paddingTop: moderateScaleVertical(12),
    borderRadius: moderateScale(16),
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

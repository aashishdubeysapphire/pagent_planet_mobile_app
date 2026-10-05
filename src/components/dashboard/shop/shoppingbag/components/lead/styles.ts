import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  leadTitleText: {
    ...CommonStyles.robotoMedium14,
    lineHeight: moderateScaleVertical(22),
    textAlign: 'center',
    paddingHorizontal: moderateScaleVertical(16),
  },
  noteHeader: {
    ...CommonStyles.tpp_h5,
    lineHeight: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(2),
    marginEnd: moderateScaleVertical(4),
    textAlign: 'center',
  },
  leadHeaderTitle: {
    ...CommonStyles.robotoMedium14,
    flex: 1,
    lineHeight: moderateScaleVertical(16),
  },
  leadHeaderCount: {
    ...CommonStyles.robotoMedium14,
    lineHeight: moderateScaleVertical(20),
    color: color.P_PINK,
  },
  realPrice: {
    ...CommonStyles.robotoMedium14,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: color.S_GRAY_4,
    marginStart: moderateScaleVertical(8),
    marginEnd: moderateScaleVertical(8),
    lineHeight: moderateScaleVertical(20),
  },
  noteText: {
    ...CommonStyles.tpp_p3,
    flex: 1,
    marginBottom: moderateScaleVertical(10),
    lineHeight: moderateScaleVertical(18),
    color: color.S_GRAY_4,
  },
  container: {
    marginTop: moderateScale(16),
    backgroundColor: color.WHITE,
    paddingVertical: moderateScaleVertical(10),
    paddingHorizontal: moderateScaleVertical(16),
  },
  priceView: {
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(16),
    flex: 1,
  },
  rowView: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(-8),
  },
  rowLeadView: {
    marginBottom: moderateScaleVertical(16),
    flexDirection: 'row',
  },
  divider: {
    backgroundColor: color.P_PINK,
    marginVertical: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(24),
    height: moderateScaleVertical(1),
  },
  mainimage: {
    width: moderateScale(239),
    height: moderateScaleVertical(178),
    alignSelf: 'center',
    marginBottom: moderateScaleVertical(16),
  },
  container1: {
    flexGrow: 1,
    height: '90%',
    paddingBottom: moderateScaleVertical(16),
  },
});

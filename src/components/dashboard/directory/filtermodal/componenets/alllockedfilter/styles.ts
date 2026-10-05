import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: color.S_GRAY_1,
  },
  filterOptionContainer: {
    flex: 0.6,
    flexDirection: 'row',
    backgroundColor: color.S_GRAY_1,
    paddingVertical: moderateScaleVertical(16),
    paddingLeft: moderateScale(12),
    paddingRight: moderateScale(8),
  },
  filterOptionValueContainer: {
    flex: 1,
    backgroundColor: color.WHITE,
    paddingVertical: moderateScaleVertical(16),
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: moderateScaleVertical(16),
  },
  filterOptionContainerText: {
    ...CommonStyles.tpp_p3,
    color: color.S_GRAY_4,
    paddingLeft: moderateScale(4),
    lineHeight: moderateScaleVertical(16),
    flex: 1,
  },
  unlockFilterText: {
    ...CommonStyles.robotoMedium14,
    lineHeight: moderateScaleVertical(20),
  },
  unlockDscrpText: {
    ...CommonStyles.tpp_p3,
    lineHeight: moderateScaleVertical(18),
    textAlign: 'center',
    color: color.INPUT_TEXT,
    paddingTop: moderateScaleVertical(24),
    paddingBottom: moderateScaleVertical(24),
    textTransform: 'capitalize',
  },
  UnlockBtn: {
    backgroundColor: color.P_PINK,
    borderRadius: moderateScale(30),
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  upgradeBtnText: {
    ...CommonStyles.latoBoldBlack12,
    color: color.WHITE,
    lineHeight: moderateScaleVertical(16),
  },
});

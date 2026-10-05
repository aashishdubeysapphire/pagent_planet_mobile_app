import {StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {CommonStyles} from '../../../../assets/commonStyles';
import {
  moderateScaleVertical,
} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.S_GRAY_1,
  },
  filterTextContainer: {
    ...CommonStyles.latoBoldPink14,
    fontWeight: '700',
    color: color.INPUT_TEXT,
    marginStart: moderateScaleVertical(8),
    lineHeight: moderateScaleVertical(17),
  },
  loader: {
    height: moderateScaleVertical(100),
    justifyContent: 'center',
    bottom : moderateScaleVertical(50)
  },
  filterButtonContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateScaleVertical(60),
  },
  filterButtonDividerContainer: {
    height: moderateScaleVertical(30),
    borderTopRightRadius: moderateScaleVertical(20),
    backgroundColor: color.S_GRAY_3,
    alignSelf: 'center',
    width: moderateScaleVertical(1),
  },
  filterAppliedCircleContainer: {
    minHeight: moderateScaleVertical(6),
    minWidth: moderateScaleVertical(6),
    marginStart: moderateScaleVertical(8),
    borderRadius: moderateScaleVertical(6),
    backgroundColor: color.P_PINK,
  },
  bottomFilterContainer: {
    flexDirection: 'row',
    maxHeight: moderateScaleVertical(60),
    borderTopLeftRadius: moderateScaleVertical(20),
    borderTopRightRadius: moderateScaleVertical(20),
    backgroundColor: color.S_GRAY_1,
  },
  shimmerContainer: {
    backgroundColor: color.WHITE,
  },
  bottomFilterShadowContainer: {
    height: moderateScaleVertical(62),
    borderTopLeftRadius: moderateScaleVertical(20),
    borderTopRightRadius: moderateScaleVertical(20),
    backgroundColor: color.shadow,
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
});

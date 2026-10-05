import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../assets/commonStyles';
import {moderateScaleVertical} from '../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },

  staticHeight: {
    height: moderateScaleVertical(100),
  },
  gap: {
    marginBottom: moderateScaleVertical(16),
  },

  bottomFilterShadowContainer: {
    backgroundColor: color.shadow,
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
    height: moderateScaleVertical(62),
    borderTopLeftRadius: moderateScaleVertical(20),
    borderTopRightRadius: moderateScaleVertical(20),
    bottom: 0,
  },
  filterButtonContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateScaleVertical(60),
  },
  filterTextContainer: {
    ...CommonStyles.latoBoldPink14,
    fontWeight: '700',
    color: color.INPUT_TEXT,
    marginStart: moderateScaleVertical(8),
    lineHeight: moderateScaleVertical(17),
  },
  bottomFilterContainer: {
    backgroundColor: color.S_GRAY_1,
    maxHeight: moderateScaleVertical(60),
    borderTopLeftRadius: moderateScaleVertical(20),
    borderTopRightRadius: moderateScaleVertical(20),
  },
  filterAppliedCircleContainer: {
    minHeight: moderateScaleVertical(6),
    minWidth: moderateScaleVertical(6),
    marginStart: moderateScaleVertical(8),
    borderRadius: moderateScaleVertical(6),
    backgroundColor: color.P_PINK,
  },
});

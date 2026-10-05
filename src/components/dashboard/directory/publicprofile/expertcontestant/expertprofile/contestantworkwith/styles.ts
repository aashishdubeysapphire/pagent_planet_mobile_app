import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {moderateScaleVertical} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  space: {
    height: moderateScaleVertical(16),
  },
  container1: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },

  noRecord: {
    ...CommonStyles.tpp_s2,
    alignSelf: 'center',
    lineHeight: moderateScaleVertical(16),
  },
  staticHeight: {
    height: moderateScaleVertical(100),
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
  bottomCWWFilterContainer: {
    maxHeight: moderateScaleVertical(60),
    borderTopLeftRadius: moderateScaleVertical(20),
    borderTopRightRadius: moderateScaleVertical(20),
    backgroundColor: color.S_GRAY_1,
  },
  filterCWWAppliedCircleContainer: {
    minHeight: moderateScaleVertical(6),
    minWidth: moderateScaleVertical(6),
    marginStart: moderateScaleVertical(8),
    borderRadius: moderateScaleVertical(6),
    backgroundColor: color.P_PINK,
  },
  filterCWWButtonContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateScaleVertical(60),
  },
  filterCWWTextContainer: {
    ...CommonStyles.latoBoldPink14,
    fontWeight: '700',
    color: color.INPUT_TEXT,
    marginStart: moderateScaleVertical(8),
    lineHeight: moderateScaleVertical(17),
  },
});

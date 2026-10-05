import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },

  modeContainer: {
    alignSelf: 'flex-end',
    marginHorizontal: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(18),
  },

  staticHeight: {
    height: moderateScaleVertical(70),
  },
  eventBottomFilterShadowContainer: {
    height: moderateScaleVertical(62),
    borderTopLeftRadius: moderateScaleVertical(20),
    borderTopRightRadius: moderateScaleVertical(20),
    backgroundColor: color.shadow,
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  eventFilterButtonContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateScaleVertical(60),
  },
  eventFilterTextContainer: {
    ...CommonStyles.latoBoldPink14,
    fontWeight: '700',
    color: color.INPUT_TEXT,
    marginStart: moderateScaleVertical(8),
    lineHeight: moderateScaleVertical(17),
  },
  eventBottomFilterContainer: {
    maxHeight: moderateScaleVertical(60),
    borderTopLeftRadius: moderateScaleVertical(20),
    borderTopRightRadius: moderateScaleVertical(20),
    backgroundColor: color.S_GRAY_1,
  },
  eventFilterAppliedCircleContainer: {
    minHeight: moderateScaleVertical(6),
    minWidth: moderateScaleVertical(6),
    marginStart: moderateScaleVertical(8),
    borderRadius: moderateScaleVertical(6),
    backgroundColor: color.P_PINK,
  },
});

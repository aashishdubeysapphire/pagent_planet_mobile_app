import { StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../../../../../utils/helperFunction';
export const styles = StyleSheet.create({
  shimmerContainer: {
    marginStart: moderateScale(-16),
  },

  staticHeight: {
    height: moderateScaleVertical(50),
  },

  flatlistView: {
    marginTop: moderateScaleVertical(16),
  },
  contestantItemContainer: {
    marginTop: moderateScaleVertical(16),
  },

  timerContainer: {
    backgroundColor: color.S_PINK,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: moderateScaleVertical(20),
    padding: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(16),
    marginEnd: moderateScaleVertical(32),
  },
  timerTitleTextContainer: {
    ...CommonStyles.robotoMedium14,
    flex: 1,
    alignSelf: 'center',
    lineHeight: moderateScaleVertical(20),
    color: color.INPUT_TEXT,
  },
  simmerContainer: {
    marginStart: moderateScaleVertical(16),
  },

  dotDivider: {
    ...CommonStyles.robotoMedium14,
    color: color.P_PINK,
    fontSize: textScale(18),
    alignSelf: 'center',
    marginTop: moderateScaleVertical(10),
    marginStart: moderateScaleVertical(8),
    marginEnd: moderateScaleVertical(8),
  },
  timer: {
    ...CommonStyles.robotoMedium14,
    color: color.P_PINK,
    backgroundColor: color.WHITE,
    marginTop: moderateScaleVertical(4),
    borderRadius:
      isIosDevice()
        ? moderateScaleVertical(6)
        : moderateScaleVertical(4),
    paddingHorizontal: moderateScaleVertical(4),
    paddingVertical: moderateScaleVertical(6),
    lineHeight: moderateScaleVertical(20),
  },
  duration: {
    ...CommonStyles.robotoMedium14,
    color: color.P_PINK,
    fontSize: textScale(10),
    alignSelf: 'center',
    lineHeight: moderateScaleVertical(12),
  },
  durationRow: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

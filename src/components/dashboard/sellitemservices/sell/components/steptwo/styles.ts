import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';

import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  sellStepTwoContainer: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  row: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(10),
    flex: 1,
  },
  colorTitle: {
    ...CommonStyles.robotoMedium14,
    color: color.INPUT_TEXT,
    marginBottom: moderateScaleVertical(5),
    lineHeight: moderateScaleVertical(24),
  },
  titleMandetoryStyles: {
    position: 'absolute',
    fontSize: moderateScaleVertical(15),
    color: color.P_PINK,
  },
  sellStepTwoColorContainer: {
    paddingStart: moderateScaleVertical(16),
    paddingEnd: moderateScaleVertical(16),
    backgroundColor: color.WHITE,
  },
  colorEditContainer: {
    position: 'absolute',
    right: moderateScaleVertical(0),
    marginTop: 'auto',
    marginBottom: 'auto',
    alignSelf: 'center',
    // marginEnd: moderateScaleVertical(8),
    // marginStart: moderateScaleVertical(8),
  },

  colorDeleteContainer: {
    position: 'absolute',
    right: moderateScaleVertical(0),
    marginTop: 'auto',
    marginBottom: 'auto',
    alignSelf: 'center',
    marginEnd: moderateScaleVertical(8),
    marginStart: moderateScaleVertical(8),
  },

  colorCircle: {
    borderRadius: moderateScaleVertical(36),
    marginEnd: moderateScaleVertical(9),
    marginTop: moderateScaleVertical(3),
    marginBottom: moderateScaleVertical(16),
    width: moderateScaleVertical(36),
    height: moderateScaleVertical(36),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },

  label: {
    ...CommonStyles.tpp_h4,
    marginEnd: moderateScaleVertical(32),
  },

  activeRadioButton: {
    ...CommonStyles.tpp_h4,
    color: color.P_GRAY_BLACK_1,
    marginStart: moderateScaleVertical(8),
    fontSize: textScale(13),
  },
  inActiveRadioButton: {
    ...CommonStyles.tpp_h4,
    color: color.P_GRAY_BLACK_1,
    marginStart: moderateScaleVertical(8),
    fontSize: textScale(13),
  },
});

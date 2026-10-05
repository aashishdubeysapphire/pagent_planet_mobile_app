import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';

import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
  },
  typeRow: {
    flexDirection: 'row',
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    marginTop: moderateScaleVertical(8),
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
  colorCloseContainer: {
    position: 'absolute',
    right: moderateScaleVertical(-2),
    marginTop: 'auto',
    marginBottom: 'auto',
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

  radioButtonContainer: {
    ...CommonStyles.tpp_h4,
    marginBottom: moderateScaleVertical(10),
  },

  activeRadioButton: {
    ...CommonStyles.tpp_h4,
    color: color.P_GRAY_BLACK_1,
    marginStart: moderateScaleVertical(8),
    fontSize: textScale(15),
    alignSelf: 'center',
    marginBottom: moderateScaleVertical(3),
    lineHeight: moderateScaleVertical(22),
    fontWeight: '400',
  },
  inActiveRadioButton: {
    ...CommonStyles.tpp_h4,
    color: color.S_GRAY_4,
    alignSelf: 'center',
    marginBottom: moderateScaleVertical(3),
    marginStart: moderateScaleVertical(8),
    fontSize: textScale(15),
    lineHeight: moderateScaleVertical(22),
    fontWeight: '400',
  },
  selectItem: {
    ...CommonStyles.tpp_h5,
    marginStart: moderateScaleVertical(8),
    lineHeight: moderateScaleVertical(16),
    color: color.BLACK,
    fontWeight: '500',
  },
  selectItemNew: {
    ...CommonStyles.tpp_h5,
    marginStart: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(5),
    lineHeight: moderateScaleVertical(16),
    color: color.BLACK,
    fontWeight: '500',
  },
  selectType: {
    ...CommonStyles.tpp_p3,
    lineHeight: moderateScaleVertical(16),
    color: color.INPUT_TEXT,
  },
});

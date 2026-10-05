import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  addItemContainer: {
    backgroundColor: color.WHITE,
    paddingTop: moderateScaleVertical(16),
    paddingEnd: moderateScaleVertical(16),
    paddingStart: moderateScaleVertical(16),
  },
  rowVariantPrice: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(16),
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  rowSalePrice: {
    flexDirection: 'row',
    flex: 1,
    marginStart: moderateScaleVertical(16),
  },
  selected: {
    flexDirection: 'row',
  },
  radio: {
    marginTop: moderateScaleVertical(2),
  },
  selectedText: {
    ...CommonStyles.latoBoldPink14,
    marginLeft: moderateScale(8),
    fontWeight: '500',
    color: color.INPUT_TEXT,
    lineHeight: moderateScaleVertical(22),
  },
  radioButtonImage: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  unselectedText: {
    ...CommonStyles.latoBoldPink14,
    marginLeft: moderateScale(8),
    color: color.S_GRAY_4,
    fontWeight: '500',
    lineHeight: moderateScaleVertical(22),
  },

  inputLabel: {
    ...CommonStyles.tpp_h5,
    color: color.BLACK,
    alignSelf: 'flex-start',
  },

  radioContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(16),
  },

  label: {
    ...CommonStyles.tpp_h4,
    marginEnd: moderateScaleVertical(32),
  },
  labelNo: {
    ...CommonStyles.tpp_h4,
    marginEnd: moderateScaleVertical(30),
  },
  activeRadioButton: {
    ...CommonStyles.tpp_h4,
    color: color.P_GRAY_BLACK_1,
    marginStart: moderateScaleVertical(8),
    fontSize: textScale(13),
  },
  inActiveRadioButton: {
    ...CommonStyles.tpp_h4,
    color: color.S_GRAY_4,
    marginStart: moderateScaleVertical(8),
    fontSize: textScale(13),
  },
});

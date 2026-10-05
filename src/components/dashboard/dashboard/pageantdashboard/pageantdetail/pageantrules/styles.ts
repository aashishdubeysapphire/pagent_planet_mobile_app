import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../../utils/helperFunction';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginEnd: moderateScaleVertical(16),
    marginStart: moderateScaleVertical(16),
  },
  itemContainer: {
    borderColor: color.S_GRAY_2,
    backgroundColor: color.S_GRAY_1,
    padding: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(16),
    borderRadius: moderateScaleVertical(20),
    borderWidth: 1,
  },
  floatingTitle: {
    ...CommonStyles.tpp_p2,
    color: color.S_GRAY_4,
    lineHeight: moderateScaleVertical(20),
    ...CommonStyles.capitalizedCase
  },
  valueText: {
    ...CommonStyles.tpp_p2_large,
    color: color.INPUT_TEXT,
    marginTop: moderateScaleVertical(8),
    lineHeight: moderateScaleVertical(20),
    ...CommonStyles.capitalizedCase

  },
  inputField: {
    ...CommonStyles.tpp_p2_large,
    color: color.INPUT_TEXT,
    maxHeight: moderateScaleVertical(100),
    minHeight: 'auto',
    marginStart: moderateScaleVertical(-2),
    marginTop:
      isIosDevice()
        ? moderateScaleVertical(5)
        : moderateScaleVertical(-3),
    marginBottom:
      isIosDevice()
        ? moderateScaleVertical(16)
        : moderateScaleVertical(2),
    textAlignVertical: 'top',
    lineHeight: moderateScaleVertical(22),
  },
});

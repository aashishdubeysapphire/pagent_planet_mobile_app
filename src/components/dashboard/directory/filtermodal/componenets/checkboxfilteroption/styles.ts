import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: moderateScaleVertical(450),
  },
  filterOptionValueTextContainer: {
    ...CommonStyles.tpp_s2,
    fontWeight: '500',
    lineHeight: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(16),
  },
  row: {
    flexDirection: 'row',
  },
  rowItem: {
    flex: 1,
    flexDirection: 'row',
  },
  selected: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(16),
  },
  selectedText: {
    ...CommonStyles.tpp_p3,
    marginLeft: moderateScale(4),
    fontWeight: '400',
    flex: 1,
    color: color.INPUT_TEXT,
    lineHeight: moderateScaleVertical(18),
  },
  selectedTextAll: {
    ...CommonStyles.tpp_p3,
    marginLeft: moderateScale(4),
    fontWeight: '400',
    color: color.INPUT_TEXT,
    lineHeight: moderateScaleVertical(18),
  },
  staticHeight: {
    height: moderateScaleVertical(20),
  },

  radioButtonImageAll: {
    marginTop: moderateScale(3),
    marginEnd: moderateScale(4),
  },
  checkboxImageContainer: {
    marginTop: moderateScale(3),
    marginEnd: moderateScale(4),
  },
  unselectedText: {
    ...CommonStyles.tpp_p3,
    marginLeft: moderateScale(4),
    color: color.S_GRAY_4,
    flex: 1,
    fontWeight: '400',
    lineHeight: moderateScaleVertical(18),
  },
  unselectedTextAll: {
    ...CommonStyles.tpp_p3,
    marginLeft: moderateScale(4),
    color: color.S_GRAY_4,
    fontWeight: '400',
    lineHeight: moderateScaleVertical(18),
  },
  colorCircle: {
    borderRadius: moderateScaleVertical(14),
    width: moderateScaleVertical(14),
    height: moderateScaleVertical(14),
    marginStart: moderateScaleVertical(4),
    marginTop: moderateScaleVertical(2),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
});

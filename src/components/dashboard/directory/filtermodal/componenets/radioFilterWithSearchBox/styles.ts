import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  selected: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(16),
  },

  staticHeight: {
    height: moderateScaleVertical(20),
  },
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

  radioButtonImage: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  unselectedText: {
    ...CommonStyles.tpp_p3,
    marginLeft: moderateScale(8),
    color: color.S_GRAY_4,
    fontWeight: '400',
    lineHeight: moderateScaleVertical(18),
  },
  searchBOx: {
    borderColor: color.S_GRAY_2,
    backgroundColor: color.S_GRAY_1,
    borderWidth: 1,
    borderRadius: moderateScaleVertical(22),
    flexDirection: 'row',
    maxHeight: moderateScaleVertical(44),
    minHeight: moderateScaleVertical(44),
    marginBottom: moderateScaleVertical(12),
  },
  searchTExtinput: {
    flex: 0.9,
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScaleVertical(12),
    ...CommonStyles.tpp_p2,
    color: color.BLACK,
  },
  selectedText: {
    ...CommonStyles.tpp_p3,
    marginLeft: moderateScale(8),
    fontWeight: '400',
    color: color.INPUT_TEXT,
    lineHeight: moderateScaleVertical(18),
  },
  searchImage: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: moderateScale(16),
  },
});

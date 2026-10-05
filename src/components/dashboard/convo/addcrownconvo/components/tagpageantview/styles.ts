import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  tagHeader: {
    marginBottom: moderateScaleVertical(8),
    justifyContent: 'space-between',
  },
  tagHeaderLabel: {
    ...CommonStyles.robotoMedium14,
    lineHeight: moderateScaleVertical(20),
  },
  tagPageantSection: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  tagPageantText: {
    ...CommonStyles.robotoMedium14,
    color: color.P_PINK,
    marginLeft: moderateScale(8),
  },
  selectedPageantView: {
    height: moderateScale(35),
    borderRadius: moderateScale(17),
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
    backgroundColor: color.S_GRAY_1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(16),
  },
  pageantCrossButton: {
    width: moderateScale(35),
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    right: moderateScale(2),
    position: 'absolute',
  },
  pageantLabel: {
    ...CommonStyles.tpp_p3,
    color: color.INPUT_TEXT,
    fontWeight: '400',
    marginLeft: moderateScale(8),
    width: moderateScale(250),
  },
});

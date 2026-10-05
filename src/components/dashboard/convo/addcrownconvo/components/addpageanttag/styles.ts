import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {font} from '../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  inputContainer: {
    marginTop: moderateScaleVertical(16),
    paddingHorizontal: moderateScale(16),
  },
  tagPageantSection: {
    marginTop: moderateScaleVertical(16),
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  tagPageantText: {
    ...CommonStyles.robotoMedium14,
    color: color.P_PINK,
    marginLeft: moderateScale(8),
  },
  bottomHeight: {
    height: moderateScaleVertical(100),
  },
  listContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: moderateScale(16),
    marginTop: moderateScaleVertical(1.5),
  },
  pageantNameLabel: {
    ...CommonStyles.tpp_h4,
    color: color.INPUT_TEXT,
    fontWeight: '400',
    marginLeft: moderateScale(12),
    width: moderateScale(width - 100),
    lineHeight: moderateScaleVertical(22),
  },
  searchView: {
    height: moderateScaleVertical(55),
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    borderBottomColor: color.LIGHT_GREY,
    borderBottomWidth: 1,
  },
  textInputStyles: {
    fontFamily: font.LatoBold,
    fontSize: textScale(18),
    marginLeft: moderateScale(16),
    alignSelf: 'center',
    color: color.BLACK,
    flex: 1,
    lineHeight: moderateScaleVertical(24),
  },
});

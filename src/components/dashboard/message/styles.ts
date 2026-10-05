import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import { font } from '../../../assets/fonts/fontsConstant';
import {moderateScale, moderateScaleVertical, textScale,width} from '../../utils/responsiveSize';
import { isIosDevice } from '../../utils/helperFunction';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.WHITE,
    flex: 1,
  },
  headerStyle: {
    padding: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: color.WHITE
  },
  headingStyle: {
    ...CommonStyles.tpp_s3,
    lineHeight: moderateScaleVertical(22),
    color: color.BLACK,
  },
  searchView: {
    height: moderateScaleVertical(55),
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
    borderBottomColor: color.LIGHT_GREY,
    borderBottomWidth: 1,
    backgroundColor: color.WHITE
  },
  textInputStyles: {
    fontFamily: font.LatoBold,
    fontSize: isIosDevice() ? textScale(17) : textScale(18),
    marginLeft: moderateScale(16),
    alignSelf: 'center',
    color: color.BLACK,
    flex: 1,
    lineHeight: moderateScaleVertical(24),
  },
  composeIcon:{
    top: moderateScaleVertical(60)
  }, 
  noRecordStyle:{
    flex : 1, 
    backgroundColor: color.WHITE,
    paddingBottom: moderateScale(80)
  },
});

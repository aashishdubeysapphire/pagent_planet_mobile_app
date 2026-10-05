import {StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {CommonStyles} from '../../../../assets/commonStyles';
import {font} from '../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../utils/responsiveSize';
import { isIosDevice } from '../../../utils/helperFunction';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.WHITE,
    flex: 1,
  },
  textInputStyles: {
    fontFamily: font.LatoBold,
    marginLeft: moderateScale(16),
    alignSelf: 'center',
    color: color.BLACK,
    flex: 1,
    fontSize: isIosDevice() ? textScale(17) : textScale(18),
    lineHeight: moderateScaleVertical(24),
  },
  headerStyle: {
    padding: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: color.WHITE,
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    marginBottom: 'auto',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
  noRecordStyle: {
    flex: 1,
    paddingBottom: moderateScale(80),
    backgroundColor: color.WHITE,
  },
  gap: {
    marginTop: moderateScaleVertical(8),
  },
  headingStyle: {
    ...CommonStyles.tpp_s3,
    color: color.BLACK,
    lineHeight: moderateScaleVertical(22),
  },
  searchView: {
    height: moderateScaleVertical(55),
    width: width,
    paddingHorizontal: moderateScale(16),
    borderBottomColor: color.LIGHT_GREY,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: color.WHITE,
  },

  composeIcon: {
    top: moderateScaleVertical(60),
  },
});

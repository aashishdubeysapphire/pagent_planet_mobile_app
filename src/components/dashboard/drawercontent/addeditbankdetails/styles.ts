import { StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {CommonStyles} from '../../../../assets/commonStyles';
import { font } from '../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../utils/responsiveSize';
import { isIosDevice } from '../../../utils/helperFunction';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  scrollStyles: {
    flex: 1,
    paddingHorizontal: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(16),
  },
  rowView: {
    flexDirection: 'row',
  },
  selectedView: {
    backgroundColor: color.S_PINK,
    paddingVertical: moderateScaleVertical(18),
    paddingLeft: moderateScale(16),
    paddingRight: moderateScale(90),
    borderRadius: 20,
    alignItems: 'center',
    width: moderateScale(164),
  },
  unselectedView: {
    backgroundColor: color.S_GRAY_1,
    paddingVertical: moderateScaleVertical(18),
    paddingLeft: moderateScale(16),
    paddingRight: moderateScale(90),
    borderRadius: 20,
    alignItems: 'center',
    width: moderateScale(164),
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
  },
  selectedText: {
    ...CommonStyles.tpp_h4,
    color: color.INPUT_TEXT,
    marginLeft: moderateScale(8),
  },
  unselectedText: {
    ...CommonStyles.tpp_h4,
    color: color.S_GRAY_4,
    marginLeft: moderateScale(8),
  },
  feildsView: {
    marginTop: moderateScaleVertical(16),
  },
  tickIcon: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  addresText: {
    ...CommonStyles.latoSemiBold16,
    ...CommonStyles.capitalizedCase,
    fontSize: isIosDevice() ? textScale(13) : textScale(14),
    marginLeft: moderateScale(8),
    color: color.P_GRAY_BLACK_1,
  },
  unselectedTickText: {
    color: color.S_GRAY_4,
  },

  T_C: {
    ...CommonStyles.latoBoldPink14,
    fontFamily:font.LatoBold,
    color: color.P_PINK,
  },
  saveView: {
    marginTop:  moderateScaleVertical(16),
    height: moderateScaleVertical(60),
    paddingHorizontal: moderateScale(16),
    marginBottom: moderateScaleVertical(16),
  },
  note: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,
    ...CommonStyles.capitalizedCase,
    marginTop: moderateScaleVertical(-8),
    marginBottom: moderateScaleVertical(16),
  },
  noteText: {
    ...CommonStyles.tpp_p3,
    color: color.S_GRAY_4,
    ...CommonStyles.capitalizedCase,
    marginTop: moderateScaleVertical(-8),
    marginBottom: moderateScaleVertical(16),
  },
  height:{
    height:moderateScaleVertical(60)
  }
});

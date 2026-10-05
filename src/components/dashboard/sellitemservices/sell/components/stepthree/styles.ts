import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {font} from '../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.WHITE,
    flex: 1,
  },
  note: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,
    bottom: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(8),
  },
  noteLine: {
    ...CommonStyles.tpp_p3,
    color: color.S_GRAY_4,
  },
  rowView: {
    flexDirection: 'row',
  },
  textStyle: {
    ...CommonStyles.latoBoldPink14,
    color: color.S_GRAY_4,
    marginLeft: moderateScale(8),
    lineHeight: moderateScaleVertical(22),
    marginHorizontal: moderateScale(10),
    width:"90%"

  },
  extraInfoText: {
    ...CommonStyles.tpp_h5,
    fontSize: textScale(14),
    marginBottom: moderateScaleVertical(8),
    marginTop: 0,
  },
  extraInfolable: {
    ...CommonStyles.tpp_p2,
    color: color.BLACK,
    marginLeft: moderateScale(8),
  },
  image: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  extraInfoView: {
    backgroundColor: color.WHITE,
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScaleVertical(8),
    borderRadius: 50,
    marginRight: moderateScale(7.5),
    // marginRight: moderateScale(8),
    marginBottom: moderateScaleVertical(8),
  },
  row: {
    marginTop: moderateScaleVertical(2),
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(100),
  },
  error: {
    color: color.RED,
    marginStart: moderateScale(2),
    fontSize: textScale(8),
    fontFamily: font.RobotoMedium,
  },
  exraInfoView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: moderateScaleVertical(8),
  },
  extraSpace: {
    marginBottom: 100,
  },
  marginTop4: {
    marginTop: moderateScaleVertical(4),
  },
  marginTop8: {
    marginTop: moderateScaleVertical(8),
  },
});

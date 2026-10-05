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
  radio_container: {
    flexDirection: 'row',
    width: '100%',
    marginTop: '2%',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: '2%',
  },
  agreeContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: moderateScaleVertical(-8),
    marginBottom: moderateScaleVertical(20),
    justifyContent: 'flex-start',
  },
  marginRight32: {
    marginRight: moderateScale(32),
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(16),
  },
  agreeText: {
    color: color.S_GRAY_4,
    fontSize: textScale(12),
    marginLeft: moderateScale(8),
    marginRight: moderateScale(16),
    fontFamily: font.LatoRegular,
  },
  agreeText1: {
    color: color.BLACK,
    fontSize: textScale(12),
    marginLeft: moderateScale(8),
    marginRight: moderateScale(16),
    fontFamily: font.LatoRegular,
  },
  rowView: {flexDirection: 'row'},
  input_label: {
    ...CommonStyles.tpp_h5,
    fontSize: textScale(14),
    color: color.BLACK,
    alignSelf: 'flex-start',
  },
  label: {
    color: color.P_GRAY_BLACK_1,
    margin: '2%',
    fontFamily: font.RobotoRegular,
    fontSize: 15,
  },
  label1: {
    color: color.BLACK,
    fontFamily: font.RobotoRegular,
    fontSize: textScale(12),
  },
  headerView: {
    height: moderateScaleVertical(60),
    borderRadius: moderateScale(30),
    borderColor: color.LIGHT_GREY,
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: moderateScaleVertical(16),
    marginHorizontal: moderateScale(16),
    backgroundColor: color.HEADER_GRAY,
  },
  modalLabel: {
    fontFamily: font.RobotoMedium,
    fontSize: textScale(14),
    color: color.BLACK,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    marginBottom: 'auto',
  },
  selectedHeaderView: {
    backgroundColor: color.P_PINK,
    flex: 0.5,
    borderRadius: moderateScale(30),
  },
  selectedHeadingText: {
    ...CommonStyles.latoBoldWhite14,
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  unselectedHeadingText: {
    ...CommonStyles.latoBoldWhite14,
    color: color.BLACK,
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  unselectedHeaderView: {
    flex: 0.5,
    borderRadius: moderateScale(30),
  },
  marginTop: {
    marginTop: moderateScaleVertical(16),
  },
  bottomSpace: {
    marginBottom: moderateScaleVertical(80),
  },
  heightTouchLine: {
    ...CommonStyles.tpp_s2,
    color: color.P_PINK,
    marginTop: moderateScaleVertical(-8),
    marginBottom: moderateScaleVertical(16),
  },
  opaceView: {
    opacity: 0.5,
  },
});

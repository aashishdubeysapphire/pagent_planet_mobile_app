import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {font} from '../../../../../assets/fonts/fontsConstant';
import {isIosDevice} from '../../../../utils/helperFunction';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../utils/responsiveSize';

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.WHITE,
    flex: 1,
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
  marginTop: {
    marginBottom: moderateScaleVertical(40),
  },
  pinkView: {
    backgroundColor: color.S_PINK,
    paddingTop: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(16),
    paddingHorizontal: moderateScale(16),
  },
  radioContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: '2%',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: moderateScaleVertical(16),
  },
  agreeContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: moderateScaleVertical(-8),
    marginBottom: moderateScaleVertical(20),
    justifyContent: 'flex-start',
  },

  agreeText: {
    color: color.S_GRAY_4,
    fontSize: textScale(12),
    marginLeft: moderateScale(8),
    marginRight: moderateScale(20),
    fontFamily: font.LatoRegular,
  },
  rowView: {
    flexDirection: 'row',
  },
  agreeText1: {
    color: color.BLACK,
    fontSize: textScale(12),
    marginLeft: moderateScale(8),
    marginRight: moderateScale(20),
    fontFamily: font.LatoRegular,
  },

  inputLabel: {
    ...CommonStyles.tpp_h5,
    color: color.BLACK,
    alignSelf: 'flex-start',
    marginTop: '2%',
    fontSize: isIosDevice() ? textScale(13) : textScale(14),
  },
  label: {
    ...CommonStyles.tpp_h4,
    marginRight: moderateScale(8),
    fontSize: isIosDevice() ? textScale(16) : textScale(15),
  },
  label1: {
    color: color.P_GRAY_BLACK_1,
  },

  modalLabel: {
    fontFamily: font.RobotoMedium,
    fontSize: textScale(14),
    color: color.BLACK,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    marginBottom: 'auto',
  },
});

export default styles;

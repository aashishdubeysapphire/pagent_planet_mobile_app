import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {font} from '../../../assets/fonts/fontsConstant';
import {moderateScaleVertical} from '../../utils/responsiveSize';

export const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: moderateScaleVertical(16),
  },

  container: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderRadius: 30,
    minHeight: moderateScaleVertical(60),
    maxHeight: moderateScaleVertical(60),
    borderColor: color.S_GRAY_2,
    backgroundColor: color.WHITE,
    borderWidth: moderateScaleVertical(0.8),
    paddingEnd: moderateScaleVertical(35),
    paddingStart: moderateScaleVertical(10),
    paddingTop: moderateScaleVertical(12),
  },

  containerEmpty: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    minHeight: moderateScaleVertical(60),
    borderRadius: 30,
    maxHeight: moderateScaleVertical(60),
    borderColor: color.S_GRAY_2,
    backgroundColor: color.S_GRAY_1,
    borderWidth: moderateScaleVertical(0.8),
    paddingEnd: moderateScaleVertical(35),
    paddingStart: moderateScaleVertical(10),
  },

  containerFocus: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    minHeight: moderateScaleVertical(60),
    borderRadius: 30,
    maxHeight: moderateScaleVertical(60),
    borderColor: color.S_GRAY_2,
    backgroundColor: color.WHITE,
    borderWidth: moderateScaleVertical(0.8),
    paddingEnd: moderateScaleVertical(35),
    paddingStart: moderateScaleVertical(10),
    paddingTop: moderateScaleVertical(10),
  },

  textInputAndroid: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: moderateScaleVertical(12),
    fontSize: moderateScaleVertical(14),
    color: color.INPUT_TEXT,
    lineHeight: moderateScaleVertical(18),
    fontFamily: font.RobotoRegular,
    placeholderTextColor: color.S_GRAY_4,
    underlineColorAndroid: color.INPUT_BOX_BOTTOM_LINE,
    marginBottom: moderateScaleVertical(1),
  },
  textInputIOS: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: moderateScaleVertical(12),
    fontSize: moderateScaleVertical(15),
    color: color.INPUT_TEXT,
    lineHeight: moderateScaleVertical(18),
    fontFamily: font.RobotoRegular,
    placeholderTextColor: color.S_GRAY_4,
    underlineColorAndroid: color.INPUT_BOX_BOTTOM_LINE,
    maxHeight: moderateScaleVertical(100),
    marginBottom: moderateScaleVertical(10),
    marginTop: moderateScaleVertical(8),
  },
  textInputUnfocus: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: moderateScaleVertical(12),
    fontSize: moderateScaleVertical(12),
    marginBottom: moderateScaleVertical(6),
    color: color.INPUT_TEXT,
    lineHeight: moderateScaleVertical(18),
    fontFamily: font.RobotoRegular,
    placeholderTextColor: color.S_GRAY_4,
    underlineColorAndroid: color.INPUT_BOX_BOTTOM_LINE,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  row: {
    alignItems: 'center',
    marginTop: moderateScaleVertical(2),
    flexDirection: 'row',
  },

  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    width: moderateScaleVertical(65),
    position: 'absolute',
  },

  titleStyles: {
    position: 'absolute',
    marginBottom: moderateScaleVertical(10),
    left: moderateScaleVertical(13),
    fontSize: moderateScaleVertical(10),
    color: color.S_GRAY_4,
    textAlignVertical: 'center',
  },

  titleMandetory: {
    position: 'absolute',
    marginBottom: moderateScaleVertical(10),
    left: moderateScaleVertical(10),
    fontSize: moderateScaleVertical(10),
    color: color.P_PINK,
  },
  error: {
    color: color.RED,
    fontSize: moderateScaleVertical(8),
    marginStart: moderateScaleVertical(2),
    fontFamily: font.RobotoMedium,
  },

  noError: {
    height: 0,
  },

  lengthText: {
    position: 'absolute',
    top: moderateScaleVertical(5),
    right: moderateScaleVertical(20),
  },
  titleContainer: {
    width: '100%',
  },
});

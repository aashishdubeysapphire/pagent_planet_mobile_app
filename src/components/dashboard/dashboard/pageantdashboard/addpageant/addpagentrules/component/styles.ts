import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  parentScrool: {
    flex: 1,
    paddingTop: moderateScaleVertical(16),
    marginHorizontal: moderateScale(16),
  },
  whoCanCompeteText: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    marginTop: moderateScaleVertical(8),
  },
  heading: {
    ...CommonStyles.tpp_h5,
    color: color.BLACK,
    marginTop: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(12),
  },
  red: {
    color: color.RED,
  },
  dynamicWidth: {
    width: '48%',
    marginRight: 'auto',
  },
  dynamicWidth2: {
    width: '48%',
    marginLeft: 'auto',
  },
  topZero: {
    marginTop: moderateScaleVertical(0),
  },
  bottomZero: {
    marginBottom: moderateScaleVertical(0),
  },
  marginRight32: {
    marginRight: moderateScale(32),
    marginTop: moderateScaleVertical(8),
  },
  footerComp: {
    height: moderateScaleVertical(120),
  },
  rowView: {
    marginRight: moderateScale(32),
    flexDirection: 'row',
  },
  radioButtonImage: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  unselectedText: {
    ...CommonStyles.tpp_h4,
    marginLeft: moderateScale(8),
    color: color.S_GRAY_4,
  },
  selectedText: {
    ...CommonStyles.tpp_h4,
    marginLeft: moderateScale(8),
  },
  upArrow: {
    marginTop: moderateScaleVertical(14),
    marginHorizontal: moderateScale(16),
  },
  pinkView: {
    backgroundColor: color.S_PINK,
    // height:100,
    paddingHorizontal: moderateScale(16),
    bottom: 3,
    paddingBottom: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(30),
  },
  selected: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(16),
  },
  textInput: {
    ...CommonStyles.tpp_p2,
    color: color.BLACK,
    flex: 1,
    backgroundColor: color.WHITE,
    borderColor: color.S_GRAY_E1,
    borderWidth: 1,
    borderRadius: moderateScale(100),
    marginTop: moderateScaleVertical(8),
    paddingHorizontal: moderateScale(24),
    height: moderateScaleVertical(50),
  },
  moreText: {
    ...CommonStyles.tpp_p2,
    color: color.BLACK,
    marginLeft: moderateScale(8),
    fontSize: textScale(13),
  },
  inactiveText: {
    color: color.S_GRAY_4,
  },
  row: {
    flexDirection: 'row',
    bottom: moderateScale(9),
  },
  error: {
    color: color.RED,
    fontSize: textScale(8),
    marginStart: moderateScaleVertical(2),
    fontFamily: font.RobotoMedium,
  },
  inactiveMessageStyle: {
    width: '100%',
    height: moderateScaleVertical(40),
    backgroundColor: color.S_PINK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveMessageLabel: {
    ...CommonStyles.robotoMedium14,
    color: color.P_PINK,
    ...CommonStyles.capitalizedCase
  },
  
});

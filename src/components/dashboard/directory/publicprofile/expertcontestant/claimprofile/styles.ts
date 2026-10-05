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
  
  modalLabel1: {
    fontFamily: font.RobotoMedium,
    fontSize: textScale(14),
    color: color.BLACK,
    textAlign: 'center',
  },
  modalButtonBottom: {
    marginBottom: moderateScaleVertical(40),
    paddingTop:moderateScaleVertical(0)
  },
  why: {
    ...CommonStyles.tpp_h5,
    color: color.BLACK,
    textAlign: 'left',
    fontSize: textScale(12),
    lineHeight: moderateScaleVertical(20),
    textAlignVertical: 'center',
  },

  tellwhy: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(16),
    marginTop: moderateScaleVertical(24),
    marginBottom: moderateScaleVertical(16),
    alignItems: 'center',
  },
  menuContainer: {
    flex: 1,
  },

  benefits: {
    fontFamily: font.LatoBold,
    fontSize: textScale(18),
    color: color.BLACK,
    fontWeight: '700',
    textAlign: 'left',
    marginHorizontal: moderateScale(8),
    marginVertical: moderateScaleVertical(24),
  },

  container: {
    marginHorizontal: moderateScale(4),
    width: moderateScale(109),
    height: moderateScaleVertical(102),
    marginBottom: moderateScaleVertical(8),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    paddingVertical: moderateScaleVertical(12),
    paddingHorizontal: moderateScale(8),
    flexGrow:1,
   
  },
  containerItem: {
    marginHorizontal: moderateScale(4),
    width: moderateScale(180),
    height: moderateScaleVertical(102),
    marginBottom: moderateScaleVertical(8),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    paddingVertical: moderateScaleVertical(12),

  },
  subContainer: {
    marginHorizontal: moderateScale(16),
  },
  sumbitButtonStyle: {
    marginVertical: moderateScaleVertical(80),
    paddingHorizontal: moderateScale(16),
    alignSelf: 'center',
    width: '100%',
  },
  container2: {
    marginHorizontal: moderateScale(4),
    width: moderateScale(343),
    marginBottom: moderateScaleVertical(8),
    height: moderateScaleVertical(102),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    paddingVertical: moderateScaleVertical(12),
  },

  pinkView: {
    backgroundColor: color.S_PINK,
    paddingHorizontal: moderateScale(8),
    paddingBottom: moderateScaleVertical(24),
  },

  inactiveTitle3: {
    fontFamily: font.RobotoMedium,
    fontSize: textScale(10),
    lineHeight: moderateScaleVertical(14),
    color: color.INPUT_TEXT,
    marginTop: moderateScaleVertical(12),
    textAlign: 'center',
    
  },
  pageantBenefits: {
    fontFamily: font.RobotoMedium,
    fontSize: textScale(9),
    lineHeight: moderateScaleVertical(14),
    marginHorizontal: moderateScale(16),
    color: color.INPUT_TEXT,
    marginTop: moderateScaleVertical(12),
    textAlign: 'center',
  },
  inactiveTitle2: {
    fontFamily: font.RobotoMedium,
    fontSize: textScale(9),
    lineHeight: moderateScaleVertical(14),
    marginHorizontal: moderateScale(8),
    color: color.INPUT_TEXT,
    marginTop: moderateScaleVertical(12),
    textAlign: 'center',
    maxWidth: moderateScale(159),
  },
});

import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../../assets/commonStyles';
import { font } from '../../../../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../../../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(24),
    borderColor: color.S_GRAY_2,
    borderWidth: 1,
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: moderateScale(16),
    backgroundColor: color.S_GRAY_1,
    marginBottom: moderateScaleVertical(16),
  },
  awardSection: {
    backgroundColor: color.P_PINK,
    borderRadius: moderateScale(24),
    alignItems: 'center',
    overflow: 'hidden',
  },
  title: {
    ...CommonStyles.tpp_s2,
    textAlign: 'center',
    alignSelf: 'stretch',
  },
  imageSection: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(24),
    backgroundColor: color.WHITE,
  },
  titleSection: {
    alignItems: 'center',
    padding: moderateScale(8),
    justifyContent: 'center',
  },
  awardLabel: {
    ...CommonStyles.tpp_s2,
    color: color.WHITE,
    paddingHorizontal: moderateScale(12),
    textAlign: 'center',
  },
  awardLabelArea: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScaleVertical(8),
  },
  infoLabel: {
    ...CommonStyles.tpp_p4,
    color: color.INPUT_TEXT,
    fontWeight: '400',
    marginTop: moderateScaleVertical(4),
    textAlign : 'center',
    alignSelf: 'stretch',
  },
  additionalTitleLabel:{
    ...CommonStyles.tpp_s1,
    color: color.S_GRAY_4,
    marginTop: moderateScaleVertical(8),
    textAlign : 'center',
    alignSelf: 'stretch',
  },
  claimSection: {
    backgroundColor: color.SHADOW_COLOR,    
    position:'absolute',
    width : '100%',
    height : moderateScaleVertical(31),
    alignItems:'center',
    justifyContent:'center',
    borderBottomEndRadius: moderateScale(20),
    borderBottomStartRadius: moderateScale(20),
    flexDirection:'row'
  },
  noProfileSection:{
    position:'absolute',
    top: -0.5,
    left: -moderateScale(4),
  },
  claimLabel: {
    fontFamily: font.LatoMedium,
    fontSize: isIosDevice() ? textScale(11) : textScale(12),
    color: color.WHITE,
    fontWeight: '600',
    marginLeft : moderateScale(8),
  },
});

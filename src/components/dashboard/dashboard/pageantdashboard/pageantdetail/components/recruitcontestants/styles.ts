import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  gradientStyles: {
    // width:"100%",
    // height: moderateScaleVertical(128),
    marginHorizontal: moderateScale(16),
  
    paddingHorizontal: moderateScale(16),
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(16),
  },
  textStyle: {
    ...CommonStyles.tpp_s2,
    width: '90%',
    marginBottom: moderateScaleVertical(16),
    marginRight: moderateScale(16),
    lineHeight: moderateScaleVertical(18),
    ...CommonStyles.capitalizedCase,
  },
  btnText: {
    ...CommonStyles.latoBoldBlack12,
    color: color.P_PINK,
    marginVertical: moderateScaleVertical(8),
    marginHorizontal: moderateScale(24),
    textTransform: 'uppercase',
  },
  btnStyle: {
    borderWidth: 1,
    borderColor: color.P_PINK,
    borderRadius: 20,
    marginRight: 'auto',
  },
  height: {
    height: 100,
  },
  imgStyles: {
    // width: moderateScale(136),
    // height: moderateScaleVertical(96),
  },
  imgView: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  leftView:{
    flex:1,
    paddingTop: moderateScaleVertical(24),
    paddingBottom:moderateScaleVertical(24),
  }
});

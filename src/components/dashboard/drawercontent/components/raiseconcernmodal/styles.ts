import { StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  width
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.WHITE,
    borderRadius: moderateScale(30),
    paddingBottom: moderateScaleVertical(0),
  },
  crossIconStyle: {
    marginTop: moderateScaleVertical(16),
    alignSelf:'flex-end',
    marginRight : moderateScale(16)
  },
  middleSection: {
    width: width - moderateScale(40),
    marginTop: moderateScaleVertical(24),
    paddingHorizontal: moderateScale(16)
  },
  headerLabel: {
    ...CommonStyles.tpp_h3,
    lineHeight: moderateScaleVertical(24),
    marginBottom: moderateScaleVertical(24)
  },
  buttonStyles: {
    alignItems: 'center',
    marginTop: moderateScaleVertical(24),
    width: moderateScale(230),
    marginBottom: moderateScaleVertical(40),
    height: moderateScaleVertical(40)
  },
  overlayLoadingContainer:{
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent:'center',
    alignItems:'center',
    zIndex: 1,
    backgroundColor: color.P_PINK,
    borderRadius: moderateScale(20)
 },
});

import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.WHITE,
    borderRadius: moderateScale(30),
    paddingBottom: moderateScaleVertical(48)
  },
  container: {
    width: width- moderateScale(32),
    marginTop: moderateScaleVertical(18),
    alignItems: 'center',
    marginBottom: moderateScaleVertical(24),
  },
  crossIcon: {
    marginTop: moderateScaleVertical(16),
    alignSelf:'flex-end',
    marginRight : moderateScale(16)
  },
  bgIcon1:{
    height : moderateScaleVertical(107),
  },
  bgIcon2:{
    height : moderateScaleVertical(208),
  }
});

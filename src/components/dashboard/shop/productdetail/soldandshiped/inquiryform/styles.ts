import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  scrollMainView: {
    padding: moderateScale(16),
  },
  radiolable: {
    ...CommonStyles.tpp_h5,
    ...CommonStyles.capitalizedCase
  },
  customStyles: {
    marginTop: moderateScaleVertical(10),
    flex: 0.33,
  },
  starRed:{
    color:color.RED
  },
  extraSpace:{
    marginTop:moderateScaleVertical(16)
  },
  uploadView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upload: {
    ...CommonStyles.tpp_h5,
    color: color.P_PINK,
    fontSize: textScale(13),
    lineHeight: moderateScaleVertical(20),
    marginLeft: moderateScale(6),
  },
  btnStyle:{
    marginVertical:moderateScaleVertical(40)
  }
  
});

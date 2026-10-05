import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: color.WHITE,
    padding: moderateScale(16),
  },
  heading: {
    ...CommonStyles.tpp_h5,
    color: color.BLACK,
    marginTop: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(12),
  },
  bottomZero: {
    marginBottom: moderateScaleVertical(0),
  },
  marginRight32: {
    marginRight: moderateScale(32),
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(16),
  },
  red: {
    color: color.RED,
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
    bottom: 2,
  },
  audioHeading: {
    ...CommonStyles.tpp_h5,
    fontSize: textScale(13),
    lineHeight: moderateScaleVertical(20),
    marginBottom: moderateScaleVertical(8),
  },
  audioName: {
    ...CommonStyles.tpp_p3,
    marginLeft: moderateScale(8),
    lineHeight: moderateScale(18),
  },
  clickable: {
    borderWidth: 1,
    borderColor: color.S_GRAY_E1,
    marginBottom: moderateScaleVertical(16),
    borderRadius: 30,
    height: moderateScaleVertical(36),
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: color.S_GRAY_1,
  },
  uploadImageInnerVIew: {
    marginRight: moderateScale(10),
    marginLeft: moderateScale(12),
  },
  btnView:{
    marginTop:"auto"
  }
});

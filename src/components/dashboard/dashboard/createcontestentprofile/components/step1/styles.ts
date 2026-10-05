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
  heading: {
    ...CommonStyles.tpp_h5,
    marginTop: moderateScaleVertical(8),
    color: color.BLACK,
    fontSize:textScale(14)
  },
  mainView: {
    marginTop: moderateScaleVertical(18),
  },
  clickHereLine: {
    ...CommonStyles.tpp_s5,
    fontSize: textScale(12),
    marginBottom: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(-8),
  },
  clickHereText: {
    ...CommonStyles.tpp_s2,
    color: color.P_PINK,
    fontWeight: '500',
    lineHeight: moderateScaleVertical(18),
  },

  height24: {
    height: moderateScaleVertical(24),
  },
  placementText: {
    ...CommonStyles.tpp_h5,
    fontSize:textScale(14),
    marginBottom:moderateScaleVertical(-8)
  },
  upladImageView: {
    height: moderateScaleVertical(132),
    width: '100%',
    borderColor: color.P_PINK,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 30,
  },

  noteMsg: {
    ...CommonStyles.tpp_p2,
    color: color.S_GRAY_4,
    marginLeft: 'auto',
    fontSize: moderateScaleVertical(13),
    marginRight: 'auto',
    marginTop: moderateScaleVertical(8),
  },
  note: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(12),
    fontSize: moderateScaleVertical(13),
    marginBottom: moderateScaleVertical(20),
    color: color.BLACK,
  },
  headShotImageText: {
    ...CommonStyles.tpp_p2,
    color: color.INPUT_TEXT,
    marginTop: moderateScaleVertical(16),
  },
  uploadImageInnerVIew: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  cameraCenter: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  selectedAwards: {
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
    marginBottom: moderateScaleVertical(16),
    paddingVertical: moderateScaleVertical(10),
    paddingHorizontal: moderateScale(24),
    borderRadius: 30,
  },
  awardsText: {
    fontFamily: font.RobotoRegular,
    fontSize: textScale(12),
    color: color.S_GRAY_4,
    marginBottom: moderateScaleVertical(8),
  },
  starMArk: {
    color: color.RED,
  },
  clickable: {
    borderWidth: 1,
    borderColor: color.S_GRAY_E1,
    marginBottom: moderateScaleVertical(8),
    paddingVertical: moderateScaleVertical(8),
    paddingHorizontal: moderateScale(12),
    marginRight: moderateScaleVertical(8),
    borderRadius: 30,
    flexDirection: 'row',
    backgroundColor: color.S_GRAY_1,
  },

  addMore: {
    color: color.P_PINK,
    fontFamily: font.LatoSemiBold,
    fontSize: textScale(12),
    marginLeft: 'auto',
  },
  awardName: {
    ...CommonStyles.tpp_p3,
    marginRight: moderateScale(8),
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    marginBottom: 'auto',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
  radioCustomStyle: { marginTop: moderateScaleVertical(8) , marginRight:moderateScale(24)},
});

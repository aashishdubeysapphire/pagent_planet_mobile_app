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
  wrapper: {
    backgroundColor: color.WHITE,
    flex: 1,
  },
  note: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,
    bottom: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(8),
  },
  uploadImageInnerVIew: {
    marginRight: moderateScale(10),
    marginLeft: moderateScale(12),
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
  row: {
    alignItems: 'center',
    marginBottom: moderateScaleVertical(8),
    flexDirection: 'row',
  },

  error: {
    color: color.RED,
    fontSize: textScale(8),
    marginStart: moderateScale(2),

    fontFamily: font.RobotoMedium,
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
  noteLine: {
    ...CommonStyles.tpp_p3,
    color: color.S_GRAY_4,
  },
  rowView: {
    flexDirection: 'row',
  },
  textStyle: {
    ...CommonStyles.latoBoldPink14,
    color: color.S_GRAY_4,
    marginLeft: moderateScale(8),
    lineHeight: moderateScaleVertical(22),
    marginHorizontal: moderateScale(10),
    marginBottom: moderateScaleVertical(100),
    width: '90%',
  },
  extraSpace: {
    marginBottom: 100,
  },
  marginTop4: {
    marginTop: moderateScaleVertical(4),
  },
  marginTop8: {
    marginTop: moderateScaleVertical(8),
  },
});

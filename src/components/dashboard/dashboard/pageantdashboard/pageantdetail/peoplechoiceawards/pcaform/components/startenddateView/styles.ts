import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../../../utils/responsiveSize';

export default StyleSheet.create({
  heading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
  },
  flexRow: {
    paddingHorizontal: moderateScale(16),
    flexDirection: 'row',
  },
  subheading: {
    ...CommonStyles.latoBoldPink14,
    fontFamily: font.LatoBold,
    marginLeft: 'auto',
    marginTop: moderateScaleVertical(4),
  },
  pinkView: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(16),
    backgroundColor: color.S_PINK,
    bottom: 4,
  },

  main: {
    paddingHorizontal: moderateScale(16),
    marginTop: moderateScaleVertical(16),
  },
  uparrow: {
    marginLeft: 'auto',
    marginRight: moderateScale(19),
  },
  greyText: {
    ...CommonStyles.tpp_p3,
    color: color.S_GRAY_4,
    textAlign: 'center',
  },
  blackText: {
    ...CommonStyles.tpp_h5,
    fontSize: textScale(14),
    color: color.BLACK,
    textAlign: 'center',
  },
  margin: {
    marginTop: moderateScaleVertical(10),
  },
});

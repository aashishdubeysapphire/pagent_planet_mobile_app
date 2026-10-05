import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  closedContainer: {
    borderWidth: 1,
    borderRadius: moderateScale(20),
    marginBottom: moderateScaleVertical(16),
    marginHorizontal: moderateScale(16),
    borderColor: color.S_GRAY_2,
    backgroundColor: color.TRANSPARENT,
  },
  icon: {
    marginRight: moderateScale(8),
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    marginBottom: 'auto',
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
  column: {
    flexDirection: 'column',
    marginHorizontal: moderateScale(16),
    paddingBottom: moderateScaleVertical(16),
  },
  topRow: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(16),
    justifyContent: 'space-between',
    marginBottom: moderateScaleVertical(9),
  },
  toDoHeading: {
    ...CommonStyles.tpp_h5,
    maxWidth: '80%',
    fontSize: textScale(13),
    lineHeight: moderateScaleVertical(20),
  },

  toDoText: {
    ...CommonStyles.tpp_p3,
    lineHeight: moderateScaleVertical(18),
    fontSize: textScale(10.7),
    marginTop: moderateScaleVertical(8),
  },

  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: moderateScale(46),
  },

  infoText: {
    fontFamily: font.RobotoMedium,
    marginHorizontal: moderateScale(4),
    marginTop: moderateScaleVertical(1),
    fontSize: textScale(9.6),
    lineHeight: moderateScaleVertical(12),
    color: color.P_PINK,
  },

  infoView: {
    flexDirection: 'row',
  },
});

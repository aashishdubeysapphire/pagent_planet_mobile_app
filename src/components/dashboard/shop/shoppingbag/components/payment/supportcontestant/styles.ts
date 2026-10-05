import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: color.WHITE,
    flex: 1,
  },
  listContainer: {
    marginStart: moderateScaleVertical(16),
    paddingBottom: moderateScaleVertical(100),
  },
  heading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    marginTop: moderateScaleVertical(32),

    textAlign: 'center',
    lineHeight: 24,
    ...CommonStyles.capitalizedCase,
  },
  subHeading: {
    ...CommonStyles.tpp_h5,
    color: color.P_PINK,
    marginTop: moderateScaleVertical(8),

    marginBottom: moderateScaleVertical(24),
    textAlign: 'center',
    lineHeight: 20,
    marginHorizontal: moderateScale(16),
    ...CommonStyles.capitalizedCase,
  },
  shadowView: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: color.shadow,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: moderateScaleVertical(100),
  },

  paymentView: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(16),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: moderateScaleVertical(99),
    backgroundColor: color.WHITE,
    marginTop: moderateScaleVertical(2),
    flexDirection: 'row',
  },
  containerDelete: {
    flex: 0.5,
    borderColor: color.S_GRAY_3,
    borderWidth: 1,
    borderRadius: 30,
    marginRight: moderateScale(16),
    height: moderateScaleVertical(48),
  },
  containerConfirm: {
    flex: 0.5,
    borderColor: color.P_PINK,
    borderWidth: 1,
    borderRadius: 30,
    height: moderateScaleVertical(48),
  },
  borderButtonText: {
    color: color.P_PINK,
    fontSize: textScale(14),
    fontWeight: 'bold',
    fontFamily: font.LatoBold,
    textTransform: 'uppercase',
    marginTop: 'auto',
    marginBottom: 'auto',
    textAlign: 'center',
  },
});

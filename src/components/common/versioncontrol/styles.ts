import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';

export const styles = StyleSheet.create({
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.WHITE,
    borderRadius: moderateScale(30),
  },
  container: {
    alignItems: 'center',
    paddingTop: moderateScaleVertical(45),
  },

  headerLabel: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    marginTop: moderateScaleVertical(47),
    lineHeight: moderateScaleVertical(24)
  },
  textLabel: {
    ...CommonStyles.tpp_p2,
    color: color.BLACK,
    marginEnd: moderateScaleVertical(50),
    marginStart: moderateScaleVertical(50),
    marginTop: moderateScaleVertical(12),
    textAlign: 'center',
  },
  skipContainer: {
    justifyContent: 'center',
    marginBottom: moderateScaleVertical(40),
  },
  skip: {
    ...CommonStyles.tpp_p2,
    fontSize: textScale(16),
    color: color.P_PINK,
    fontWeight: '700',
    lineHeight: moderateScaleVertical(22),
  },
  buttonStyles: {
    alignItems: 'center',
    paddingTop: moderateScaleVertical(40),
  },
});

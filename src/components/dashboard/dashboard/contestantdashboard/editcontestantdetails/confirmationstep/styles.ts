import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: moderateScaleVertical(62),
  },
  animcontainer: {
    width: '100%',
    marginTop: moderateScaleVertical(-50),
    height: '70%',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: moderateScaleVertical(20),
  },

  msgLabel: {
    ...CommonStyles.tpp_p2,
    color: color.INPUT_TEXT,
    lineHeight: moderateScaleVertical(20),
    textAlign: 'center',
    marginBottom: moderateScaleVertical(8),
    paddingHorizontal: moderateScaleVertical(43),
    ...CommonStyles.capitalizedCase,
  },

  rectangular: {
    flex: 0.48,
    height: moderateScaleVertical(108),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: color.P_PINK,
  },
  touchContiner: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(-140),
    marginHorizontal: moderateScaleVertical(16),
  },
  title: {
    ...CommonStyles.tpp_h2,
    color: color.P_PINK,
    fontWeight: '700',
    marginTop: moderateScaleVertical(-26),
    marginBottom: moderateScaleVertical(8),
    textAlign: 'center',
    backgroundColor: 'transparent',
    marginHorizontal: moderateScale(16),
  },
  buttonContainer: {
    paddingStart: moderateScaleVertical(16),
    paddingEnd: moderateScaleVertical(16),
    alignItems: 'center',
    width: '100%',
    marginTop: moderateScaleVertical(40),
  },
  clock: {
    marginTop: moderateScaleVertical(16),
    alignItems: 'center',
  },
  insideButtonText: {
    ...CommonStyles.tpp_p3,
    textAlign: 'center',
    marginTop: moderateScaleVertical(8),
    marginHorizontal: moderateScaleVertical(16),
  },
});

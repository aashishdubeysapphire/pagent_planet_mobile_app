import {Dimensions, StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {CommonStyles} from '../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },

  wrapper: {
    flex: 1,
    marginTop: moderateScaleVertical(20),
  },
  wrapperPageant: {
    flex: 1,
    marginTop: moderateScaleVertical(13),
  },

  title: {
    ...CommonStyles.tpp_s3,
    marginTop: moderateScaleVertical(16),
    lineHeight: moderateScaleVertical(22),
    marginLeft: moderateScale(16),
  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: moderateScaleVertical(18),
  },
  gap: {
    marginTop: moderateScaleVertical(16),
  },
  noRecord: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height * 0.6,
  },
});

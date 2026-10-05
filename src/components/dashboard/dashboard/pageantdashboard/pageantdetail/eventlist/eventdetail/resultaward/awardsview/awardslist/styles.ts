import {Dimensions, StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../../utils/responsiveSize';
const windowDimensions = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: moderateScaleVertical(16),
    width: windowDimensions / 2 - moderateScale(24 - 16),
  },
  container: {
    borderRadius: moderateScale(24),
    borderColor: color.S_GRAY_2,
    borderWidth: 1,
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: color.S_GRAY_1,
    marginLeft: moderateScaleVertical(16),
  },
  awardSection: {
    backgroundColor: color.P_PINK,
    borderRadius: moderateScale(24),
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageSection: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(24),
    backgroundColor: color.WHITE,
  },
  awardLabel: {
    ...CommonStyles.tpp_s1,
    color: color.WHITE,
    textAlign: 'center',
  },
  awardView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScaleVertical(8),
    height: moderateScaleVertical(42),
  },
  contestantName: {
    ...CommonStyles.tpp_s2,
    textAlign: 'center',
    lineHeight: moderateScaleVertical(17),
  },
});

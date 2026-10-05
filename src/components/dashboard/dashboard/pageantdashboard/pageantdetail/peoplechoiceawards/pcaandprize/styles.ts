import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 100,
  },
  subContainer: {
    flex: 1,
    marginTop: moderateScaleVertical(24),
    marginHorizontal: moderateScale(16),
  },
  bgImage: {
    width: '100%',
    height: moderateScaleVertical(100),
  },
  setupArea: {
    position: 'absolute',
    padding: moderateScale(16),
  },
  eventLabel: {
    ...CommonStyles.robotoMedium14,
    lineHeight: moderateScaleVertical(20),
  },
  knowMoreButton: {
    paddingHorizontal: moderateScale(22),
    paddingVertical: moderateScaleVertical(8),
    borderRadius: moderateScale(30),
    borderColor: color.P_PINK,
    borderWidth: 1,
    marginTop: moderateScaleVertical(12),
    width: '50%',
  },
  knowMoreLabel: {
    ...CommonStyles.latoSemiBold12,
    fontWeight: '700',
    textAlign: 'center',
  },
  activeArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScaleVertical(4),
  },
  activeView: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScaleVertical(3),
    borderRadius: moderateScale(20),
    borderWidth: 1,
  },
  voteSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(32),
  },
  activeLabel: {
    ...CommonStyles.tpp_s1,
  },
  perVotePriceLabel: {
    ...CommonStyles.tpp_p3,
    color: color.S_GRAY_4,
    fontWeight: '400',
    lineHeight: moderateScaleVertical(18),
  },
  pcaSetupSection: {
    marginHorizontal: moderateScale(16),
    borderRadius: moderateScale(16),
    overflow: 'hidden',
    marginBottom: moderateScaleVertical(24),
  },
});

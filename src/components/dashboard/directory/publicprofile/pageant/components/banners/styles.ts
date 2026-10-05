import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  headerSection: {
    position: 'absolute',
    justifyContent: 'space-between',
    height: '92%',
    padding: moderateScale(20),
    width: moderateScale(325),
  },
  header2: {
    justifyContent: 'center',
    flex: 1,
  },
  borderButtonText: {
    ...CommonStyles.latoSemiBold12,
    paddingVertical: moderateScaleVertical(8),
    paddingHorizontal: moderateScale(16),
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  headerTitle: {
    ...CommonStyles.tpp_s2,
    width: '68%',
    lineHeight: moderateScaleVertical(16),
    color: color.BLACK,
    marginTop: moderateScaleVertical(12),
    ...CommonStyles.capitalizedCase
  },
  dotContainerStyle: {
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: moderateScale(12),
  },
  inactiveDotBanner: {
    width: moderateScale(14),
    height: moderateScale(14),
    borderRadius: moderateScale(7),
    marginHorizontal: -moderateScale(10),
    backgroundColor: color.S_GRAY_3,
  },
  activeDotBanner: {
    width: moderateScale(20),
    height: moderateScale(6),
    borderRadius: moderateScale(8),
    marginHorizontal: -moderateScale(4),
    backgroundColor: color.P_PINK,
  },

  carouselContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  buttonAreaStyles: {
    borderRadius: moderateScaleVertical(30),
    borderColor: color.P_PINK,
    borderWidth: 1,
    position: 'relative',
    marginTop: moderateScaleVertical(16),
    marginRight: 'auto',
  },
  messageLabel: {
    ...CommonStyles.tpp_s2,
    color: color.P_PINK,
    lineHeight: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(16),
  },
});

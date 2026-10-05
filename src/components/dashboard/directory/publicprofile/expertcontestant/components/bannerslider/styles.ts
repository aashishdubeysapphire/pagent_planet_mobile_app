import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  headerSection: {
    position: 'absolute',
    justifyContent: 'space-between',
    height: '100%',
    padding: moderateScale(16),
    width: moderateScale(325),
    paddingTop: moderateScale(18),
    flexDirection: 'row',
  },
  header2: {
    justifyContent: 'center',
    flex: 1,
  },
  headerSection2: {
    position: 'absolute',
    height: '100%',
    width: moderateScale(325),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(2),
    justifyContent: 'center',
    paddingVertical: moderateScaleVertical(12),
  },
  borderActionButton: {
    ...CommonStyles.tpp_h4,
    color: color.P_PINK,
    fontWeight: 'bold',
    paddingVertical: moderateScaleVertical(8),
    textAlign: 'center',
    fontSize: moderateScaleVertical(12),
    textTransform: 'uppercase',
  },
  activeDotStyle: {
    width: moderateScale(20),
    height: moderateScale(6),
    marginHorizontal: -moderateScale(4),
    borderRadius: moderateScale(8),
    backgroundColor: color.P_PINK,
  },
  container: {
    width: '100%',
    marginTop: moderateScaleVertical(4 + 8),
  },
  carouselContainer: {
    height: moderateScaleVertical(135),
    flexDirection: 'row',
    alignSelf: 'center',
  },
  headerTitle: {
    ...CommonStyles.tpp_s2,
    lineHeight: moderateScaleVertical(16),
  },
  paginationContainerStyle: {
    paddingBottom: 0,
    paddingTop: 0,
    marginTop: moderateScale(12),
  },
  messageText: {
    ...CommonStyles.tpp_s2,
    color: color.P_PINK,
    lineHeight: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(16),
  },
  prizeImage: {
    height: moderateScaleVertical(84),
    aspectRatio: 1,
    borderRadius: moderateScale(12),
    marginTop: moderateScaleVertical(4),
  },
  inactiveDotStyle: {
    width: moderateScale(14),
    borderRadius: moderateScale(7),
    height: moderateScale(14),
    marginHorizontal: -moderateScale(10),
    backgroundColor: color.S_GRAY_3,
  },
  actionButtonAreaStyles: {
    borderRadius: moderateScaleVertical(30),
    borderColor: color.P_PINK,
    borderWidth: 1,
    position: 'relative',
    marginTop: moderateScaleVertical(16),
  },
});

import {Dimensions, StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: moderateScaleVertical(18),
  },
  gap: {
    marginStart: moderateScaleVertical(16),
  },
  noRecord: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height * 0.6,
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    marginBottom: 'auto',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
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
    ...CommonStyles.tpp_s2,
    marginTop: moderateScaleVertical(4),
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: moderateScaleVertical(17),
  },
  options: {
    ...CommonStyles.tpp_s2,
    fontWeight: '500',
    marginLeft: moderateScale(8),
  },
  bottomSection: {
    flexDirection: 'row',
    height: moderateScaleVertical(40),
    width: moderateScale(140),
    alignItems: 'center',
    marginLeft: moderateScale(8),
    backgroundColor: color.WHITE,
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
    justifyContent: 'center',
    borderColor: color.S_GRAY_2,
    top: moderateScaleVertical(194),
    borderWidth: 1,
  },
  imageSection: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(20),
    backgroundColor: color.WHITE,
  },
  titleSection: {
    width: moderateScale(160),
    alignItems: 'center',
    paddingHorizontal: moderateScale(8),
    backgroundColor: 'transparent',
    paddingTop: moderateScaleVertical(2),
  },
  bottomArea: {
    width: moderateScale(154),
    marginRight: moderateScale(12),
  },
  editCircleIcon: {
    position: 'absolute',
    right: moderateScale(13),
    top: moderateScaleVertical(15),
  },
  ratingIcon: {
    marginTop: moderateScaleVertical(5),
  },
});

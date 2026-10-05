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
  },
  nameLabel: {
    ...CommonStyles.tpp_s3,
    textAlign: 'center',
    lineHeight: moderateScaleVertical(22),
    marginTop: moderateScaleVertical(16),
  },
  subHeadingLabel: {
    ...CommonStyles.tpp_s2,
    textAlign: 'center',
    alignSelf: 'stretch',
    marginLeft: moderateScale(8),
    lineHeight: moderateScaleVertical(16),
    color: color.S_GRAY_4,
    marginTop: -1,
  },
  tagLabel: {
    ...CommonStyles.tpp_p3,
    color: color.INPUT_TEXT,
    textAlign: 'center',
    alignSelf: 'stretch',
    lineHeight: moderateScaleVertical(16),
  },
  separatorLine: {
    height: 1,
    width: '100%',
    backgroundColor: color.P_PINK,
    marginTop: moderateScaleVertical(24),
  },
  circleImageContainer: {
    marginTop: moderateScaleVertical(24),
  },
  profileArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScaleVertical(8),
    paddingHorizontal: moderateScale(8),
  },
  ratingArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(8),
    marginTop: moderateScale(6),
    marginBottom: moderateScaleVertical(2),
  },
  locationArea: {
    alignSelf: 'flex-start',
    marginTop: moderateScaleVertical(1),
  },
  textShimmer: {
    alignSelf: 'center',
    marginTop: moderateScaleVertical(16),
  },
  otherdetailcontainer: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingStart: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(8),
  },
  clickableLink: {
    ...CommonStyles.tpp_s2,
    marginLeft: moderateScale(8),
    color: color.P_PINK,
  },
  lifetimeParticipantLabel: {
    ...CommonStyles.tpp_s2,
    marginLeft: moderateScale(8),
  },
  phoneTitle: {
    ...CommonStyles.tpp_h5,
    marginStart: moderateScaleVertical(8),
    color: color.P_PINK,
    lineHeight: moderateScaleVertical(16),
  },
  phoneContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: moderateScaleVertical(8),
  },
});

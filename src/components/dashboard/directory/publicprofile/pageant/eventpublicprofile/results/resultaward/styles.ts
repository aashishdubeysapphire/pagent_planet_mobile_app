import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  resultHeadingArea: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(24),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: moderateScale(32),
    marginBottom: moderateScale(8),
  },
  staticHeight: {
    height: moderateScaleVertical(100),
  },
  gap: {
    height: moderateScaleVertical(12),
  },
  shimmerList: {
    marginVertical: moderateScaleVertical(20),
    marginLeft: moderateScale(16),
  },

  headingLabel: {
    ...CommonStyles.robotoMedium14,
    justifyContent: 'center',
    lineHeight: moderateScaleVertical(20),
    width: '84%',
  },
  flatlistView: {
    marginRight: moderateScale(16),
    paddingTop: moderateScaleVertical(16),
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: 'auto',
    lineHeight: moderateScaleVertical(24),
  },
  awardsHeading: {
    ...CommonStyles.tpp_s3,
    color: color.BLACK,
  },
  topGridListSection: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  noRecordView: {
    marginLeft: -moderateScale(15),
    marginTop: moderateScale(8),
    marginRight: moderateScale(16),
  },
  shimmerStyles: {
    marginTop: moderateScaleVertical(16),
    marginLeft: -moderateScale(15),
  },
  wrapper: {
    alignItems: 'center',
    marginLeft: moderateScale(8),
    marginRight : moderateScale(16)
  },
  imageArea: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    marginLeft: moderateScale(8),
    ...CommonStyles.robotoMedium14,
  },
});

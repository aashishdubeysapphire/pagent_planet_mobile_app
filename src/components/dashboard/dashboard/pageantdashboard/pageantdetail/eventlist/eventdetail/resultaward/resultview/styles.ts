import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../utils/responsiveSize';

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
    height: moderateScaleVertical(200),
  },
  gap: {
    height: moderateScaleVertical(12),
  },
  flatlistContainer: {
    flex: 1,
  },
  headingLabel: {
    ...CommonStyles.robotoMedium14,
    justifyContent: 'center',
    lineHeight: moderateScaleVertical(20),
    width: '84%',
  },
  flatlistView: {
    marginRight: moderateScale(16),
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    marginBottom: 'auto',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
  awardsHeading: {
    ...CommonStyles.tpp_s3,
    color: color.BLACK,
  },
  topGridListSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  noRecordView: {
    marginLeft: -moderateScale(15),
    marginRight: moderateScale(16),
    marginTop: moderateScale(8),
  },
  shimmerStyles: {
    marginTop: moderateScaleVertical(16),
    marginLeft: -moderateScale(15),
  },
});

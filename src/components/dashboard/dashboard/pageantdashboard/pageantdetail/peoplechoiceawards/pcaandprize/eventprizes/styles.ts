import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    marginTop: moderateScaleVertical(24),
  },
  eventLabel: {
    ...CommonStyles.robotoMedium14,
    lineHeight: moderateScaleVertical(20),
  },
  activeArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScaleVertical(18),
    marginHorizontal: moderateScale(16),
  },
  activeView: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScaleVertical(4),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: color.UPCOMING,
  },
  voteSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(32),
    marginBottom: moderateScaleVertical(16),
  },
  activeLabel: {
    ...CommonStyles.tpp_s1,
    color: color.UPCOMING,
  },
  title: {
    ...CommonStyles.tpp_p3,
    color: color.INPUT_TEXT,
    fontWeight: '400',
    lineHeight: moderateScaleVertical(18),
  },
  staticHeight: {
    height: moderateScaleVertical(100),
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    marginBottom: 'auto',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
  noRecordView: {
    marginBottom: moderateScaleVertical(24),
  },
});

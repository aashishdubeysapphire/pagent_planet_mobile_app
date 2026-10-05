import {StyleSheet, Dimensions} from 'react-native';
import {color} from '../../../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  infoStyle: {
    ...CommonStyles.tpp_p3,
    color: color.INPUT_TEXT,
    fontWeight: '400',
    lineHeight: moderateScaleVertical(18),
  },
  noRecordView: {
    alignItems: 'center',
    padding: moderateScale(16),
    justifyContent: 'center',
    height: '82%',
  },
  noRecordStyles: {
    ...CommonStyles.robotoMedium14,
    textAlign: 'center',
    paddingHorizontal: moderateScale(16),
    top: -106,
  },
  shimmerView: {
    marginTop: moderateScaleVertical(24),
  },
  staticHeight: {
    height: moderateScaleVertical(240),
  },
  pendingListArea: {
    height: Dimensions.get('window').height,
    marginTop: moderateScaleVertical(16),
  },
  tapHereStyle: {
    ...CommonStyles.tpp_p3,
    color: color.P_PINK,
    fontWeight: '400',
    lineHeight: moderateScaleVertical(18),
  },
  tapHereArea: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(24),
    alignItems: 'center',
    paddingHorizontal : moderateScale(16),
  },
});

import {StyleSheet} from 'react-native';
import {CommonStyles} from '../../../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  flatlistContainer: {},
  arrowSection: {
    justifyContent: 'center',
  },
  flatlistView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: moderateScale(16),
    marginBottom: moderateScaleVertical(16),
    marginTop: moderateScale(8),
  },
  awardsHeading: {
    ...CommonStyles.tpp_s3,
    lineHeight: moderateScaleVertical(22),
  },
  listViewContainer: {
    marginLeft: -moderateScale(14),
  },
});

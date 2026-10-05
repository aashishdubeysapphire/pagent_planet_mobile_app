import {StyleSheet} from 'react-native';
import {CommonStyles} from '../../../assets/commonStyles';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';

export const styles = StyleSheet.create({
  itemSeperator: {
    height: moderateScaleVertical(16),
  },
  freeHeight: {
    marginBottom: moderateScaleVertical(170),
  },
  noRecordImg: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '30%',
  },
  noContestantView: {
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: moderateScaleVertical(8),
  },
  textStyle: {
    marginLeft: moderateScale(8),
    ...CommonStyles.robotoMedium14,
  },
});

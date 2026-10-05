import {StyleSheet} from 'react-native';
import {CommonStyles} from '../../../../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    marginTop: moderateScaleVertical(17),
  },
  infoArea: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(24),
    alignItems: 'center',
  },
  noRecordView: {
    alignItems: 'center',
    padding: moderateScale(16),
    justifyContent: 'center',
    marginTop: '38%',
  },
  noRecordStyles: {
    ...CommonStyles.robotoMedium14,
    marginTop: moderateScaleVertical(24),
    textAlign: 'center',
  },
  staticHeight: {
    height: moderateScaleVertical(160),
  },
});

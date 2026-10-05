import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    marginTop: moderateScaleVertical(8),
  },
  staticHeight: {
    height: moderateScaleVertical(200),
  },
  flatlistContainer: {
    marginLeft: -moderateScale(15),
    marginTop: moderateScaleVertical(16),
  },
  noRecordView: {
    marginLeft: moderateScale(-15),
  },
});

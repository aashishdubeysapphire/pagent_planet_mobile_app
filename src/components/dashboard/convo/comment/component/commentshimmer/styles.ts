import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  webSiteShimmerContainer: {
    alignContent: 'center',
  },
  headerView: {
    flexDirection: 'row',
    paddingStart: moderateScale(16),
    marginTop: moderateScaleVertical(16),
  },
  headerDetail: {
    flexDirection: 'column',
    marginLeft: moderateScale(8),
    justifyContent: 'center',
  },
  seperatorStyle: {
    height: moderateScaleVertical(0),
  },
  contentRow: {
    flexDirection: 'column',
    paddingStart: moderateScale(16),
  },
  likeRow: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(16),
    justifyContent: 'space-between',
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(4),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: moderateScale(92),
  },
});

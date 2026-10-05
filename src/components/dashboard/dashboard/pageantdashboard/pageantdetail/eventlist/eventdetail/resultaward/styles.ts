import {StyleSheet} from 'react-native';
import {CommonStyles} from '../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eventHeadingArea: {
    flexDirection: 'row',
    paddingLeft: moderateScale(16),
    paddingRight: moderateScale(32),
    marginTop: moderateScaleVertical(24),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headingLabel: {
    ...CommonStyles.robotoMedium14,
  },
  flatlistView: {
    marginTop: moderateScaleVertical(16),
  },
  flatlistContainer: {
    marginLeft: -moderateScaleVertical(16),
  },
  mainView: {
    flex: 1,
    marginHorizontal: moderateScale(16),
  },
});

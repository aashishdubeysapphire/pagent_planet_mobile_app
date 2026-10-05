import {StyleSheet} from 'react-native';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  modalHeight: {
    height: '95%',
    paddingHorizontal: moderateScale(0),
  },
  container: {
    paddingHorizontal: moderateScale(16),
    flex: 1,
  },
  heading: {
    ...CommonStyles.tpp_h3,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  headingView: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(16),
  },
  crossIcon: {
    marginLeft: 'auto',
  },
  replyView: {
    marginLeft: moderateScale(19),
    paddingLeft: moderateScale(19 + 8),
  },
});

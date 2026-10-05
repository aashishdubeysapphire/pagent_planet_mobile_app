import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    marginBottom: 'auto',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
  chooseExistingContestant: {
    ...CommonStyles.tpp_s2,
    color: color.P_PINK,
    marginTop: moderateScaleVertical(-8),
    fontWeight: '500',
    marginBottom: moderateScaleVertical(16),
    lineHeight: moderateScaleVertical(16),
  },
  titleContainer: {
    flex: 1,
    margin: moderateScaleVertical(16),
  },
});

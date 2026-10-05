import {StyleSheet} from 'react-native';
import {CommonStyles} from '../../../assets/commonStyles';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';

export const styles = StyleSheet.create({
  modalHeading: {
    ...CommonStyles.tpp_h3,
    textTransform: 'capitalize',
    textAlign: 'center',
    lineHeight: moderateScaleVertical(24),
  },
  crossIcon: {
    marginLeft: 'auto',
  },

  headingView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: moderateScaleVertical(5),
  },
  colorName: {
    ...CommonStyles.tpp_p4,
    textAlign: 'center',
  },
  colorRound: {
    borderRadius: moderateScale(100),
    width: moderateScale(36),
    backgroundColor: 'red',
    height: moderateScaleVertical(36),
    alignSelf: 'center',
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(8),
  },
  row: {
    marginRight: moderateScale(14),
  },
});

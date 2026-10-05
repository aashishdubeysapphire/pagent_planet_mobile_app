import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../../assets/commonStyles';
import {moderateScaleVertical} from '../../../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  itemRootContainer: {
    marginStart: moderateScaleVertical(16),
    marginEnd: moderateScaleVertical(16),
  },

  addCompetitorTitle: {
    ...CommonStyles.tpp_size18,
    textAlign: 'right',
    fontWeight: '700',
    lineHeight: moderateScaleVertical(24),
  },

  topContainer: {
    flex: 1,
    backgroundColor: color.WHITE,
  },

  container: {
    paddingTop: moderateScaleVertical(16),
    paddingBottom: moderateScaleVertical(16),
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    marginBottom: 'auto',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
});

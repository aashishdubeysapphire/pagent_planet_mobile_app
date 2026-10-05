import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {moderateScaleVertical} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  crossIcon: {
    marginLeft: 'auto',
  },
  rowView: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(20),
    marginRight: 'auto',
  },
  textstyle: {
    ...CommonStyles.tpp_h4,
    color: color.INPUT_TEXT,
    marginBottom: moderateScaleVertical(16),
  },

  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: 'auto',
    marginBottom: 'auto',
    flex: 1,
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
});

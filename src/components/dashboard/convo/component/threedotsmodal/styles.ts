import {StyleSheet} from 'react-native';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  crossIcon: {
    marginLeft: 'auto',
  },
  rowView: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(24),
    marginRight: 'auto',
  },
  textstyle: {
    ...CommonStyles.tpp_h4,
    marginLeft: moderateScale(12),
  },
  imageView: {
    marginTop: 'auto',
    // marginBottom:"auto"
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: 'auto',
    marginBottom: 'auto',
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
});

import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  ovelContainer: {
    paddingVertical: moderateScaleVertical(20),
    paddingHorizontal: moderateScale(24),
    backgroundColor: color.HEADER_GRAY,
    borderColor: color.S_GRAY_2,
    borderWidth: 1,
    borderRadius: 100,
    marginBottom: moderateScaleVertical(16),
  },
  textStyle: {
    // ...CommonStyles.tpp_h4,
    ...CommonStyles.tpp_s3,
    lineHeight: moderateScaleVertical(22),
  },
  continer: {
    marginVertical: moderateScaleVertical(24),
    marginHorizontal: moderateScale(16),
  },

  arrowIcon: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    transform: [{rotate: '-90deg'}],
  },
  rowView: {
    flexDirection: 'row',
  },
});

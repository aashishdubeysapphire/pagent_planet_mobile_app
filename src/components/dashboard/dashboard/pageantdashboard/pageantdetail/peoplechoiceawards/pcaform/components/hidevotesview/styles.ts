import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../../../utils/responsiveSize';

export default StyleSheet.create({
  heading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    marginBottom: moderateScaleVertical(8),
  },
  subHeading: {
    ...CommonStyles.tpp_h5,
    fontSize:textScale(14)
  },
  redStar: {
    color: color.RED,
  },
  marginRight32: {
    marginTop: moderateScaleVertical(8),
    marginRight: moderateScale(32),
    marginBottom: moderateScaleVertical(16),
  },
  extraHeight: {
    height: moderateScaleVertical(8),
  },
});

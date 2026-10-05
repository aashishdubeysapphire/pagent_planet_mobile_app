import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../utils/responsiveSize';

export default StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(16),
  },
  imgView: {
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  imageView: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  lableStylesUnselected: {
    ...CommonStyles.tpp_h6,
    color: color.S_GRAY_4,
    marginLeft: moderateScale(12),
  },
  lableStylesSelected: {
    ...CommonStyles.tpp_h6,
    color: color.S_GRAY_4,
    marginLeft: moderateScale(12),
  },
  bottomHeight: {
    marginBottom: moderateScaleVertical(10),
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: 'auto',
    marginBottom: 'auto',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});

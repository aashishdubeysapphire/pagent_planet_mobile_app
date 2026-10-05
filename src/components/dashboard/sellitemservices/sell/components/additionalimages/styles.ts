import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  headShotDeleteContainer: {
    position: 'absolute',
    right: moderateScaleVertical(0),
    top: moderateScaleVertical(0),
    padding: moderateScaleVertical(6),
  },
  addMoreContiner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItemContainer: {
    marginTop: moderateScaleVertical(8),
    marginLeft: moderateScale(12),
    height: moderateScaleVertical(92),
  },
  headShotImageText: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,
    lineHeight: moderateScaleVertical(20),
  },
  removehorizontalPading: {
    marginHorizontal: moderateScale(-16),
  },
});

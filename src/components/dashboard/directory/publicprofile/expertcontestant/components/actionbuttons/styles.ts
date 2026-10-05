import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  roleContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScaleVertical(24),
    flexWrap: "wrap"
  },
  roleItemContainer1: {
    borderColor: color.S_GRAY_2,
    borderRadius: moderateScaleVertical(20),
    borderWidth: 1,
    paddingVertical: moderateScaleVertical(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleTextStyles1: {
    ...CommonStyles.latoBoldBlack12,
    fontSize: moderateScaleVertical(12),
    marginLeft: moderateScale(8),
    lineHeight: moderateScaleVertical(17)
  },
  upgradeLabelStyle: {
    ...CommonStyles.latoBoldBlack12,
    fontSize: moderateScaleVertical(12),
    color: color.WHITE,
    marginLeft: moderateScale(8),
    lineHeight: moderateScaleVertical(17)
  },
});

export default styles;

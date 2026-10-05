import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    marginTop: moderateScaleVertical(16),
    backgroundColor: color.WHITE,
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
    borderRadius: moderateScale(20),
    alignSelf: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  radioSection: {
    width: moderateScale(32),
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    backgroundColor: color.GREY_WITH_OPACITY,
  },
  circle: {
    width: moderateScale(16),
    height: moderateScale(16),
    borderRadius: moderateScale(8),
    borderColor: color.S_GRAY_4,
    borderWidth: 1,
  },
  rightSection: {
    padding: moderateScale(12),
    width: width - moderateScale(64),
  },
  nameSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameStyles: {
    ...CommonStyles.robotoMedium14,
    lineHeight: moderateScaleVertical(20),
  },
  defaultStyles: {
    ...CommonStyles.tpp_p3,
    color: color.S_GRAY_4,
    lineHeight: moderateScaleVertical(18),
    marginLeft: moderateScale(4),
    marginRight: moderateScale(8),
  },
  editSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

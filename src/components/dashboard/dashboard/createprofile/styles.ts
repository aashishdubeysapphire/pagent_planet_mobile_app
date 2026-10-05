import {StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {CommonStyles} from '../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.WHITE,
    flex: 1,
  },
  container: {
    width: moderateScale(344),
    borderStyle: 'dashed',
    borderWidth: moderateScale(1.2),
    borderColor: color.P_PINK,
    borderRadius: moderateScale(30),
    marginTop: moderateScaleVertical(25),
    paddingVertical: moderateScaleVertical(16),
  },
  headerLabel: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    marginLeft: moderateScale(12),
  },
  textLabel: {
    ...CommonStyles.tpp_p3,
    paddingHorizontal: moderateScale(15),
    paddingTop: moderateScaleVertical(8),
    color: color.INPUT_TEXT,
    fontWeight: '400',
    lineHeight: moderateScaleVertical(18),
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(15),
  },
  createProfileSection: {
    backgroundColor: color.WHITE,
    flex: 1,
    alignItems: 'center',
  },
});

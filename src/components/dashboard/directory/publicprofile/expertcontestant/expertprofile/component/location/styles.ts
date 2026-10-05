import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: moderateScaleVertical(24),
    marginStart: moderateScaleVertical(16),
    marginEnd: moderateScaleVertical(16),
  },
  phoneContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(3),
  },
  itemRootContainer: {
    marginBottom: moderateScaleVertical(16),
  },
  icon: {
    alignSelf: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScaleVertical(11),
    alignItems: 'center',
  },
  locationTitle: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
  },
  phoneTitle: {
    ...CommonStyles.tpp_h5,
    marginStart: moderateScaleVertical(8),
    color: color.P_PINK,
    lineHeight: moderateScaleVertical(16),
  },

  subHeadingLabel: {
    ...CommonStyles.tpp_p3,
    marginStart: moderateScale(10),
    lineHeight: moderateScaleVertical(18),
    color: color.INPUT_TEXT,
  },
  openContainer: {
    ...CommonStyles.tpp_h5,
    marginStart: moderateScale(8),
    lineHeight: moderateScaleVertical(18),
    color: color.INPUT_TEXT,
    marginEnd: moderateScaleVertical(8),
  },
});

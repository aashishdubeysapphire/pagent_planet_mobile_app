import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {font} from '../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  detailsArea: {
    flex: 1,
    width: '100%',
    paddingBottom: moderateScaleVertical(100),
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
    marginTop: moderateScaleVertical(24),
    marginBottom: moderateScaleVertical(30),
  },
  basicHeader: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(18),
  },
  detailsTopSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: moderateScale(18),
    marginTop: moderateScaleVertical(12),
    alignItems: 'center',
  },
  name: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
  },
  basicSection: {
    flexDirection: 'row',
    width: moderateScale(118),
    height: '78%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScale(8),
  },
  infoSection: {
    marginLeft: moderateScale(8),
    justifyContent: 'center',
  },
  infoStyles: {
    ...CommonStyles.tpp_h5,
    width: moderateScale(80),
    marginTop: moderateScaleVertical(4),
  },
  title: {
    ...CommonStyles.tpp_s1,
    width: moderateScale(80),
  },
  editIcon: {
    width: moderateScale(45),
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  row: {
    alignItems: 'center',
    marginTop: -moderateScaleVertical(10),
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(16),
  },
  error: {
    color: color.RED,
    fontSize: textScale(9),
    marginStart: moderateScale(2),
    fontFamily: font.RobotoMedium,
  },
  noError: {
    height: 0,
  },
});

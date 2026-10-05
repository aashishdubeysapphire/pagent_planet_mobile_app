import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  shadow: {
    height: 2,
    backgroundColor: color.shadow,
    opacity: 0.5,
  },
  container: {
    height: moderateScaleVertical(88),
    paddingVertical: moderateScaleVertical(24),
    paddingHorizontal: moderateScale(16),
    flexDirection: 'row',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  favBtn: {
    backgroundColor: color.S_GRAY_1,
    borderColor: color.S_GRAY_2,
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: moderateScale(16),
  },
  btnText: {
    ...CommonStyles.latoBoldBlack12,
    marginLeft: moderateScale(8),
  },
  rowView: {
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  marginLeft: {
    marginLeft: moderateScale(8),
  },
  addToBag: {
    paddingHorizontal: moderateScale(20),
    backgroundColor: color.P_PINK,
    borderColor: color.P_PINK,
  },
  addToBagTxt: {
    color: color.WHITE,
  },
  share: {
    paddingHorizontal: moderateScale(15.5),
  },
});

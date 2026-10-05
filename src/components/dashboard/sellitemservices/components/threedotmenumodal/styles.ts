import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  outerview: {
    backgroundColor: color.TRANSPARNT,
    flex: 1,
  },
  innerview: {
    position: 'absolute',
    right: 0,
    top: moderateScale(80),
    backgroundColor: color.WHITE,
    borderRadius: moderateScaleVertical(12),
    marginHorizontal: moderateScale(16),
    padding: moderateScale(16),
    paddingVertical: moderateScaleVertical(10),
    ...CommonStyles.shadow,
  },
  menuLable: {
    ...CommonStyles.tpp_p2,
    color: color.INPUT_TEXT,
    marginLeft : moderateScale(10),
    width : moderateScale(90),
  },
  cardTouch: {
    flexDirection: 'row',
    paddingVertical: moderateScale(8),
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  importIconStyle:{
    transform: [{ rotate: '180deg'}]
  },
});

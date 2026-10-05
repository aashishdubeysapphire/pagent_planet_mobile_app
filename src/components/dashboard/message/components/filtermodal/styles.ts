import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  outerview: {
    flex: 1,
  },
  innerview: {
    position: 'absolute',
    right: 0,
    backgroundColor: color.WHITE,
    borderRadius: moderateScaleVertical(12),
    marginHorizontal: moderateScale(16),
    padding: moderateScale(16),
    paddingVertical: moderateScaleVertical(10),
    ...CommonStyles.shadow,
    opacity : 1
  },
  menuLable: {
    ...CommonStyles.tpp_p2,
    lineHeight: moderateScale(20),
  },
  cardTouch: {
    flexDirection: 'row',
    paddingVertical: moderateScale(8),
    alignItems:'center'
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40
  },
  tickIconStyle:{
    alignItems:'flex-end',
    flex:1
  }
});

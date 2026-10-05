import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.WHITE,
    flex: 1,
  },
  dynamicWidth: {
    width: '48%',
    marginRight: 'auto',
  },
  dynamicWidth2: {
    width: '48%',
    marginLeft: 'auto',
  },
  opacity: {
    opacity: 0.5,
  },

  htmlBoxStyle: {
    width: '100%',
    borderRadius: 30,
    minHeight: moderateScaleVertical(60),
    maxHeight: moderateScaleVertical(60),
    borderColor: color.S_GRAY_2,
    backgroundColor: color.WHITE,
    borderWidth: moderateScaleVertical(0.8),
    // alignItems: 'flex-end',
    justifyContent: 'center',
    paddingEnd: moderateScaleVertical(35),
    paddingStart: moderateScaleVertical(10),
    paddingVertical: moderateScaleVertical(12),
  },

  
});

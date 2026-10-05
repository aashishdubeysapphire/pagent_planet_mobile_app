import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },

  cardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalLabel: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    fontSize: textScale(16),
    marginTop: moderateScaleVertical(16),
    textAlign: 'center',
    lineHeight: moderateScaleVertical(24),
    marginHorizontal: moderateScale(-10),
  },
});

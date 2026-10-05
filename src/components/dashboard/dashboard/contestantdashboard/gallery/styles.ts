import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {font} from '../../../../../assets/fonts/fontsConstant';
import {
  moderateScaleVertical,
  textScale,
} from '../../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  titleContainer: {
    fontFamily: font.LatoBold,
    fontSize: textScale(18),
    textTransform: 'capitalize',
    color: color.BLACK,
    lineHeight: moderateScaleVertical(24),
  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginEnd: moderateScaleVertical(10),
    marginStart: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(10),
  },
  addPageantRuleontainer: {
    marginEnd: moderateScaleVertical(16),
  },
  staticHeight: {
    height: moderateScaleVertical(200),
  },
});

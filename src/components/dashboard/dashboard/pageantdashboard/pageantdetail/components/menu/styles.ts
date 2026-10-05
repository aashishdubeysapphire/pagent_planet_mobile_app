import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: moderateScaleVertical(55),
  },
  outerview: {
    backgroundColor: color.MODEL_BG,
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    marginBottom: moderateScale(8),
    marginEnd: moderateScale(3),
  },
  innerview: {
    position: 'absolute',
    right: 0,
    bottom: moderateScale(115),
    backgroundColor: color.WHITE,
    borderRadius: moderateScale(12),
    marginHorizontal: moderateScale(10),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(10),
    marginEnd: moderateScale(13),
    ...CommonStyles.shadow,
  },
  staticCardLable: {
    ...CommonStyles.tpp_p2,
    color: color.INPUT_TEXT,
    lineHeight: moderateScaleVertical(20),
  },
  selectedCardLable: {
    ...CommonStyles.robotoMedium14,
    color: color.P_PINK,
    lineHeight: moderateScaleVertical(20),
  },
  card: {
    flexDirection: 'row',
    paddingVertical: moderateScale(8),
  },
  cardNone: {
    height: 0,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  staticCadImage: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingRight: moderateScale(10),
  },
});

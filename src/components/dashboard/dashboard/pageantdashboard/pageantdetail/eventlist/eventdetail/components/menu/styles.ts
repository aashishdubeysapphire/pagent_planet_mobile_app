import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  outerviewContainer: {
    backgroundColor: color.MODEL_BG,
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    marginBottom: moderateScale(8),
    marginEnd: moderateScale(3),
  },

  staticCardLable: {
    ...CommonStyles.tpp_p2,
    color: color.INPUT_TEXT,
  },
  selectedCardLableContainer: {
    ...CommonStyles.robotoMedium14,
    color: color.P_PINK,
    lineHeight: moderateScaleVertical(20),
  },

  cardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    paddingVertical: moderateScale(8),
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

  staticCadImage: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingRight: moderateScale(10),
  },
});

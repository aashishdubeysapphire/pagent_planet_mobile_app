import {StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {CommonStyles} from '../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  lableTOuch: {
    paddingVertical: moderateScaleVertical(8),
  },
  lightPinkVIew: {
    backgroundColor: color.S_PINK,
    paddingTop: moderateScaleVertical(8),
    paddingBottom: moderateScaleVertical(8),
    paddingHorizontal: moderateScale(48),
    marginVertical: moderateScaleVertical(8),
  },
  expandViewlable: {
    ...CommonStyles.tpp_p2,
    color: color.BLACK,
    marginRight: 'auto',
  },
  staticCardLable: {
    ...CommonStyles.tpp_h4,
    marginRight: 'auto',
  },
  cardTOuch: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(12),
    marginTop: moderateScaleVertical(17),
    alignItems: 'center',
  },
  staticheightView: {
    height: moderateScale(12),
  },
  staticCadImage: {
    marginLeft: moderateScale(15),
    marginEnd: moderateScale(10),
  },
  downImage: {
    transform: [{rotate: '360deg'}],
    marginLeft: 'auto',
    marginTop: moderateScaleVertical(4),
    marginRight: moderateScaleVertical(4),
  },
  staticCardLableExpanded: {
    ...CommonStyles.tpp_h4,
    color: color.P_PINK,
    marginRight: 'auto',
  },
  downImageExpanded: {
    transform: [{rotate: '360deg'}],
    marginLeft: 'auto',
    marginTop: moderateScaleVertical(4),
    tintColor: color.P_PINK,
    marginRight: moderateScaleVertical(4),
  },
});

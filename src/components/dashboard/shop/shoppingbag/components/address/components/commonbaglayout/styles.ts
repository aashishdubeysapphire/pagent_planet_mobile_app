import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../assets/commonStyles';
import {
  moderateScaleVertical,
  moderateScale,
} from '../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScaleVertical(16),
    height: moderateScale(50),
  },
  image: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(8),
    marginTop: moderateScaleVertical(3),
    alignItems: 'center',
  },
  outofstock: {
    ...CommonStyles.tpp_p4,
    color: color.RED
  },
  productLabel: {
    ...CommonStyles.tpp_s2,
    lineHeight: moderateScaleVertical(16),
    color: color.BLACK,
    width: moderateScale(285),
  },
  productsSize: {
    ...CommonStyles.tpp_p4,
    fontWeight: '400',
    lineHeight: moderateScaleVertical(14),
  },
  body: {
    marginLeft: moderateScale(8),
  },
  colorSizeSection: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(4),
    alignItems: 'center',
  },
  circularColor: {
    width: moderateScale(10),
    aspectRatio: 1,
    borderRadius: moderateScale(5),
    marginRight: moderateScale(4),
  },
  color:{
    width:moderateScale(8),
    height:moderateScaleVertical(8),
    backgroundColor:color.RED,
    borderRadius:100,
    marginRight:moderateScale(4)
  }
});

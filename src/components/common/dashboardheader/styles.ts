import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {font} from '../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';
export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: color.WHITE,
    height: moderateScaleVertical(55),
    // marginTop: 10,
  },
  outerview: {
    backgroundColor: color.TRANSPARNT,
    flex: 1,
  },
  space: {
    width: moderateScaleVertical(16),
  },
  innerview: {
    position: 'absolute',
    right: 0,
    top: moderateScale(70),
    backgroundColor: color.WHITE,
    borderRadius: moderateScaleVertical(12),
    marginHorizontal: moderateScale(10),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(10),
    ...CommonStyles.shadow,
  },
  staticCardLable: {
    ...CommonStyles.tpp_p2,
    color: color.INPUT_TEXT,
  },
  cardTOuch: {
    flexDirection: 'row',
    paddingVertical: moderateScale(8),
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  staticheightView: {
    height: moderateScale(12),
  },
  staticCadImage: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingRight: moderateScale(10),
  },
  drawerIcon: {
    marginVertical: moderateScaleVertical(18),
    marginHorizontal: moderateScale(17),
    width: 500,
  },
  backIcon: {
    marginVertical: moderateScaleVertical(18),
    marginHorizontal: moderateScale(17),
    width: 500,
  },
  dropIcon: {
    marginVertical: moderateScaleVertical(18),
    marginHorizontal: moderateScale(6),
    width: 500,
  },
  otherIcon: {
    marginVertical: moderateScaleVertical(18),
    marginHorizontal: moderateScale(7),
    width: 500,
  },
  lableStyle: {
    fontFamily: font.LatoBold,
    fontSize: textScale(18),
    color: color.BLACK,
    marginTop: 'auto',
    marginBottom: 'auto',
    flexDirection: 'row',
    lineHeight: moderateScaleVertical(24),
  },
  wheelPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  iconView: {
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: moderateScale(8),
  },
  bottomLine: {
    height: 0.7,
    backgroundColor: color.BLACK,
    opacity: 0.2,
  },
  logoArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScaleVertical(9),
  },
  labelIcon: {
    marginTop: moderateScaleVertical(10),
    marginLeft: moderateScale(6),
  },
});

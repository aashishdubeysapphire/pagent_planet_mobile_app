import {Dimensions, StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {font} from '../../../../../../assets/fonts/fontsConstant';
import {isIosDevice} from '../../../../../utils/helperFunction';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  tabContainer: {
    marginTop: moderateScaleVertical(5),
    flex: 1,
    height:
      Dimensions.get('window').height < 680
        ? moderateScaleVertical(358)
        : isIosDevice()
        ? moderateScaleVertical(338)
        : moderateScaleVertical(325 + 25),
    marginLeft: moderateScale(6),
    width: '100%',
  },
  smallTabContainer: {
    marginTop: moderateScaleVertical(5),
    flex: 1,
    height:
      Dimensions.get('window').height < 680
        ? moderateScaleVertical(315 + 25)
        : isIosDevice()
        ? moderateScaleVertical(292 + 25)
        : moderateScaleVertical(308 + 25),
    marginLeft: moderateScale(6),
    width: '100%',
  },
  viewTabContainer: {
    marginTop: moderateScaleVertical(5),
    flex: 1,
    width: '100%',
    marginLeft: moderateScale(6),
    height:
      Dimensions.get('window').height < 680
        ? moderateScaleVertical(338 + 25)
        : moderateScaleVertical(332 + 25),
  },
  bigTabContainer: {
    marginTop: moderateScaleVertical(5),
    flex: 1,
    height: moderateScaleVertical(378),
    width: '100%',
    marginLeft: moderateScale(6),
  },
  name: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
  },
  pageantDetailsArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    marginTop: moderateScaleVertical(25),
    width: '100%',
    alignItems: 'center',
  },
  labelStyle: {
    fontFamily: font.RobotoMedium,
    fontSize: isIosDevice() ? textScale(13) : textScale(14),
    color: color.BLACK,
    textTransform: 'none',
    marginHorizontal: moderateScale(2),
    width: '100%',
  },
  tabTopAreaStyles: {
    backgroundColor: color.WHITE,
    borderBottomColor: color.S_GRAY_2,
    borderBottomWidth: 1,
    shadowOffset: {height: 0, width: 0},
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  indicator: {
    backgroundColor: color.P_PINK,
    height: moderateScaleVertical(3),
    marginBottom: -moderateScaleVertical(2),
  },
  tabStyle: {
    width: 'auto',
    paddingHorizontal: moderateScale(8),
    height: moderateScaleVertical(50),
  },
  viewButton: {
    fontFamily: font.LatoMedium,
    fontSize: isIosDevice() ? textScale(11) : textScale(12),
    color: color.BLACK,
    fontWeight: '600',
  },
  containerTab: {
    backgroundColor: color.WHITE,
    flex: 1,
    paddingLeft: moderateScale(10),
  },
  viewStyles: {
    alignItems: 'flex-end',
    marginTop: moderateScaleVertical(13),
    width: '96%',
  },
  viewStylesForAll: {
    alignItems: 'flex-end',
    width: '100%',
  },
});

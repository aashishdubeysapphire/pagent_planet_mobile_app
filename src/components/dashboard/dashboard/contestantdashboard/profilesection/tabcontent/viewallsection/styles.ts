import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../assets/fonts/fontsConstant';
import {isIosDevice} from '../../../../../../utils/helperFunction';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
    paddingBottom: moderateScaleVertical(70),
  },
  backIcon: {
    marginVertical: moderateScaleVertical(10),
    marginHorizontal: moderateScale(16),
    width: 500,
  },
  lableStyle: {
    fontFamily: font.LatoBold,
    fontSize: textScale(18),
    color: color.BLACK,
    marginTop: moderateScaleVertical(9),
    marginBottom: 'auto',
    flexDirection: 'row',
    lineHeight: moderateScaleVertical(24),
  },
  selectedLabelStyle: {
    fontFamily: font.LatoBold,
    fontSize: textScale(18),
    color: color.P_PINK,
    marginTop: moderateScaleVertical(9),
    marginBottom: 'auto',
    flexDirection: 'row',
    lineHeight: moderateScaleVertical(24),
  },
  dropIcon: {
    marginVertical: isIosDevice()
      ? moderateScaleVertical(18)
      : moderateScaleVertical(16),
    marginHorizontal: moderateScale(8),
    width: 500,
  },

  outerview: {
    backgroundColor: color.TRANSPARNT,
    flex: 1,
  },
  innerview: {
    position: 'absolute',
    left: moderateScale(36),
    backgroundColor: color.WHITE,
    borderRadius: 12,
    marginHorizontal: moderateScale(10),
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScaleVertical(16),
    width: moderateScale(222),
    ...CommonStyles.shadow,
  },
  staticCardLable: {
    ...CommonStyles.tpp_p2,
    color: color.INPUT_TEXT,
    width: '88%',
  },
  staticSelectedCardLable: {
    ...CommonStyles.tpp_p2,
    color: color.P_PINK,
    width: '88%',
  },
  cardTouch: {
    flexDirection: 'row',
    paddingTop: moderateScaleVertical(16),
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: moderateScaleVertical(22),
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: color.WHITE,
    zIndex: -1000,
    height: moderateScaleVertical(50),
    borderBottomColor: color.LIGHT_GREY,
    borderBottomWidth: 1,
  },
});

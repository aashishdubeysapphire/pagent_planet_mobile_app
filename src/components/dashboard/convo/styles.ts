import { StyleSheet } from 'react-native';
import { color } from '../../../assets/colorConstant';
import { CommonStyles } from '../../../assets/commonStyles';
import { isIosDevice } from '../../utils/helperFunction';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';
export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.WHITE,
    flex: 1,
  },
  parent: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  outerview: {
    backgroundColor: color.TRANSPARNT,
    flex: 1,
  },
  fabStyle: {
    bottom: isIosDevice()
      ? moderateScaleVertical(25)
      : moderateScaleVertical(50),
    right: moderateScale(16),
    position: 'absolute',
    backgroundColor: color.P_PINK,
  },
  fabStyle1: {
    bottom: isIosDevice()
      ? moderateScaleVertical(38)
      : moderateScaleVertical(63),
    right: moderateScale(29),
    position: 'absolute',
  },
  fabStyle2: {
    bottom: isIosDevice()
      ? moderateScaleVertical(40)
      : moderateScaleVertical(65),
    right: moderateScale(136),
    position: 'absolute',
  },
  noConvo: {
    ...CommonStyles.tpp_h5,
    fontSize: textScale(13),
    marginTop: moderateScaleVertical(24),
  },
  innerView: {
    position: 'absolute',
    left: moderateScale(54),
    backgroundColor: color.WHITE,
    borderRadius: 12,
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScaleVertical(16),
    width: moderateScale(168),
    ...CommonStyles.shadow,
  },
  staticCardText: {
    ...CommonStyles.tpp_p2,
    fontSize: textScale(13),
    color: color.INPUT_TEXT,
    width: '85%',
  },
  staticSelectedCardLable: {
    ...CommonStyles.tpp_h5,
    fontSize: textScale(13),
    color: color.P_PINK,
    width: '85%',
  },
  aboveFlatlist: {
    height: moderateScaleVertical(16),
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
  freeHeight: {
    marginBottom: moderateScaleVertical(170),
    marginTop: moderateScaleVertical(20),
  },
});

import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {font} from '../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  outerview: {
    flex: 1,
  },
  filterText: {
    ...CommonStyles.tpp_p2,
    fontSize: textScale(13),
    color: color.INPUT_TEXT,
    marginEnd: moderateScaleVertical(8),
  },
  selectedFilterLable: {
    ...CommonStyles.tpp_h5,
    fontSize: textScale(13),
    color: color.P_PINK,
    marginEnd: moderateScaleVertical(8),
  },
  selectedText: {
    ...CommonStyles.tpp_s2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  touchableText: {
    ...CommonStyles.latoBoldPink14,
    fontFamily: font.LatoBold,
    lineHeight: moderateScaleVertical(20),
  },
  textView: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(16),
    marginHorizontal: moderateScale(16),
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: moderateScaleVertical(22),
    alignItems: 'center',
  },
  cardTouch: {
    flexDirection: 'row',
    paddingTop: moderateScaleVertical(16),
  },
  innerView: {
    position: 'absolute',
    left: moderateScale(54),
    backgroundColor: color.WHITE,
    borderRadius: 12,
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScaleVertical(16),
    ...CommonStyles.shadow,
  },
  space: {
    height: moderateScaleVertical(16),
  },
  container1: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: 'auto',
    lineHeight: moderateScaleVertical(24),
    marginTop: moderateScaleVertical(20),
  },
  noRecord: {
    ...CommonStyles.tpp_s2,
    alignSelf: 'center',
    lineHeight: moderateScaleVertical(16),
  },
  staticHeight: {
    height: moderateScaleVertical(100),
  },
  bottomFilterShadowContainer: {
    height: moderateScaleVertical(62),
    borderTopLeftRadius: moderateScaleVertical(20),
    borderTopRightRadius: moderateScaleVertical(20),
    backgroundColor: color.shadow,
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  bottomFilterContainer: {
    maxHeight: moderateScaleVertical(60),
    borderTopLeftRadius: moderateScaleVertical(20),
    borderTopRightRadius: moderateScaleVertical(20),
    backgroundColor: color.S_GRAY_1,
  },
  filterAppliedCircleContainer: {
    minHeight: moderateScaleVertical(6),
    minWidth: moderateScaleVertical(6),
    marginStart: moderateScaleVertical(8),
    borderRadius: moderateScaleVertical(6),
    backgroundColor: color.P_PINK,
  },
  filterButtonContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateScaleVertical(60),
  },
  filterTextContainer: {
    ...CommonStyles.latoBoldPink14,
    fontWeight: '700',
    color: color.INPUT_TEXT,
    marginStart: moderateScaleVertical(8),
    lineHeight: moderateScaleVertical(17),
  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginEnd: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(16),
  },
});

import { StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {font} from '../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  itemDivider: {
    backgroundColor: color.S_GRAY_1,
    height: moderateScaleVertical(12),
    marginBottom: moderateScaleVertical(24),
  },
  addItemContainer: {
    backgroundColor: color.WHITE,
    paddingBottom: moderateScaleVertical(8),
  },
  colorCircle: {
    borderRadius: moderateScaleVertical(24),
    width: moderateScaleVertical(24),
    height: moderateScaleVertical(24),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },

  colorTitle: {
    ...CommonStyles.tpp_size18,
    color: color.BLACK,
    fontFamily: font.LatoBold,
    marginStart: moderateScaleVertical(12),
    lineHeight: moderateScaleVertical(24),
    marginRight: 'auto',
  },
  error: {
    color: color.RED,
    fontSize: moderateScaleVertical(8),
    marginStart: moderateScaleVertical(8),
    alignSelf: 'center',
    fontFamily: font.RobotoMedium,
  },
  titleUploadVeriantImagee: {
    ...CommonStyles.robotoMedium14,
    color: color.P_PINK,
    marginStart: moderateScaleVertical(8),
    alignSelf: 'center',
    lineHeight: moderateScaleVertical(20),
    marginRight: 'auto',
  },
  rowTextContainer: {
    flexDirection: 'row',
    alignContent: 'flex-end',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingStart: moderateScaleVertical(16),
    paddingEnd: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(20),
  },
  uploadImageInnerVIew: {
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginEnd: moderateScaleVertical(8),
    marginStart: moderateScaleVertical(8),
  },
  circleImageContainer: {
    position: 'absolute',
    left: 0,
    marginTop: moderateScaleVertical(1),
    marginStart: moderateScaleVertical(-0.8),
  },
  clickable: {
    borderWidth: 1,
    borderColor: color.S_GRAY_E1,
    marginBottom: moderateScaleVertical(16),
    paddingVertical: moderateScaleVertical(8),
    borderRadius: 30,
    flexDirection: 'row',
    backgroundColor: color.S_GRAY_1,
    marginEnd: moderateScaleVertical(16),
    marginStart: moderateScaleVertical(16),
  },
  imageAvaialbeName: {
    ...CommonStyles.tpp_p3,
    flex: 1,
    marginStart: moderateScale(42),
  },
  awardName: {
    ...CommonStyles.tpp_p3,
  },
  inactiveCircleText: {
    ...CommonStyles.robotoMedium14,
    alignSelf: 'center',
    lineHeight: moderateScaleVertical(20),
    color: color.BLACK,
  },
  inactiveCircleTextSmall: {
    ...CommonStyles.robotoMedium14,
    alignSelf: 'center',
    fontSize: isIosDevice() ? textScale(9) : textScale(10),
    lineHeight: moderateScaleVertical(20),
    color: color.BLACK,
  },
  addMoreSizeText: {
    ...CommonStyles.robotoMedium14,
    alignSelf: 'center',
    lineHeight: moderateScaleVertical(20),
    color: color.INPUT_TEXT,
  },
  inactiveNoDataCircleText: {
    ...CommonStyles.robotoMedium14,
    alignSelf: 'center',
    lineHeight: moderateScaleVertical(20),
    color: color.S_GRAY_4,
  },
  inactiveNoDataCircleTextSmall: {
    ...CommonStyles.robotoMedium14,
    alignSelf: 'center',
    fontSize: isIosDevice() ? textScale(9) : textScale(10),
    lineHeight: moderateScaleVertical(20),
    color: color.S_GRAY_4,
  },
  activeCircleText: {
    ...CommonStyles.robotoMedium14,
    alignSelf: 'center',
    lineHeight: moderateScaleVertical(20),
    color: color.P_PINK,
  },
  activeCircleTextSmall: {
    ...CommonStyles.robotoMedium14,
    alignSelf: 'center',
    fontSize: isIosDevice() ? textScale(9) : textScale(10),
    lineHeight: moderateScaleVertical(20),
    color: color.P_PINK,
  },
  inactiveBorderCircle: {
    backgroundColor: color.WHITE,
    width: moderateScaleVertical(36),
    justifyContent: 'center',
    marginEnd: moderateScaleVertical(8),
    borderColor: color.S_GRAY_2,
    marginTop: moderateScaleVertical(1),
    borderWidth: moderateScaleVertical(1),
    height: moderateScaleVertical(36),
    borderRadius: moderateScaleVertical(36),
  },
  defaultBorderCircle: {
    backgroundColor: color.S_GRAY_1,
    width: moderateScaleVertical(36),
    justifyContent: 'center',
    marginEnd: moderateScaleVertical(8),
    borderColor: color.S_GRAY_2,
    marginTop: moderateScaleVertical(1),
    borderWidth: moderateScaleVertical(1),
    height: moderateScaleVertical(36),
    borderRadius: moderateScaleVertical(36),
  },
  tickContainer: {
    position: 'absolute',
    right: moderateScaleVertical(8),
  },

  activeBorderCircle: {
    backgroundColor: color.WHITE,
    width: moderateScaleVertical(36),
    justifyContent: 'center',
    marginEnd: moderateScaleVertical(8),
    borderColor: color.P_PINK,
    borderWidth: moderateScaleVertical(1),
    height: moderateScaleVertical(36),
    marginTop: moderateScaleVertical(1),
    borderRadius: moderateScaleVertical(36),
  },

  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    marginBottom: 'auto',
    lineHeight: moderateScaleVertical(24),
  },
  dividerContainer: {
    color: color.P_GRAY_BLACK_1,
    width: 100,
    height: 100,
    position: 'absolute',
  },
  gap: {
    flex: 1,
    backgroundColor: color.S_GRAY_2,
    height: moderateScaleVertical(1),
  },
  addMoreSizeButton: {
    ...CommonStyles.latoBoldBlack12,
    textAlign: 'right',
    color: color.P_PINK,
    // ...CommonStyles.latoBoldPink14,
    // fontWeight: '700',
    // fontSize: isIosDevice() ? textScale(11) : textScale(12),
    lineHeight: moderateScaleVertical(16),
  },

  rowInStock: {
    flex: 1,
    paddingStart: moderateScaleVertical(16),
    paddingEnd: moderateScaleVertical(16),
  },

  row: {
    flexDirection: 'row',
    flex: 1,
    paddingStart: moderateScaleVertical(16),
    paddingEnd: moderateScaleVertical(16),
  },
  rowSalePrice: {
    flexDirection: 'row',
    flex: 1,
    marginStart: moderateScaleVertical(16),
  },
  selected: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(16),
  },
  selectedText: {
    ...CommonStyles.tpp_p3,
    marginLeft: moderateScale(8),
    fontWeight: '400',
    color: color.INPUT_TEXT,
    lineHeight: moderateScaleVertical(18),
  },
  radioButtonImage: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  unselectedText: {
    ...CommonStyles.tpp_p3,
    marginLeft: moderateScale(8),
    color: color.S_GRAY_4,
    fontWeight: '400',
    lineHeight: moderateScaleVertical(18),
  },
  backIcon: {
    marginRight: moderateScale(2),
    width: moderateScaleVertical(20),
    alignSelf: 'center',
  },
  nextIcon: {
    marginStart: moderateScale(12),
    alignSelf: 'center',
    width: moderateScaleVertical(20),
    transform: [{rotate: '180deg'}],
  },
});

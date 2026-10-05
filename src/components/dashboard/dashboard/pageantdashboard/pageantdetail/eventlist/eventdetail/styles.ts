import { StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../assets/fonts/fontsConstant';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../../../utils/helperFunction';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  rowView: {
    flexDirection: 'row',
  },
  tabContainer: {
    marginTop: moderateScaleVertical(-15),
    height:
      isIosDevice()
        ? height * (moderateScaleVertical(85) / 100)
        : height * (moderateScaleVertical(90) / 100),
  },
  gap: {
    height: moderateScaleVertical(20),
  },

  inactiveMessageStyle: {
    width: '100%',
    marginBottom: moderateScaleVertical(16),
    backgroundColor: color.S_PINK,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScaleVertical(20),
    paddingVertical: moderateScaleVertical(10),
    paddingHorizontal: moderateScale(16),
  },
  inactiveMessageLabel: {
    ...CommonStyles.robotoMedium14,
    color: color.P_PINK,
    textAlign: 'center',
    lineHeight: moderateScaleVertical(20),
  },
  contentContainer: {
    flex: 1,
    backgroundColor: color.WHITE,
    paddingTop: moderateScaleVertical(16),
  },
  editIconView: {
    marginTop: moderateScaleVertical(16),
    flexDirection: 'row',
  },

  circleImageContainer: {
    position: 'absolute',
    marginTop: moderateScaleVertical(115),
    marginStart: moderateScaleVertical(16),
  },

  editIconTouch: {
    position: 'absolute',
    bottom: moderateScaleVertical(0),
    right: 0,
    borderRadius: 20,
    padding: moderateScaleVertical(1),
    backgroundColor: color.WHITE,
  },
  coverImage: {
    position: 'absolute',
    top: moderateScaleVertical(16),
    right: moderateScaleVertical(16),
    borderRadius: 20,
    padding: moderateScaleVertical(1),
    backgroundColor: color.WHITE,
  },

  heading: {
    ...CommonStyles.robotoMedium16,
    paddingStart: moderateScaleVertical(16),
  },

  pageamTitleLink: {
    ...CommonStyles.tpp_s2,
    color: color.P_PINK,
    paddingStart: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(10),
    fontWeight: '500',
    lineHeight: moderateScaleVertical(16),
  },
  pageamInactiveTitleLink: {
    ...CommonStyles.tpp_s2,
    color: color.INPUT_TEXT,
    paddingStart: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(10),
    fontWeight: '500',
    lineHeight: moderateScaleVertical(16),
  },

  editPageantDetailIcon: {
    marginLeft: 'auto',
    paddingEnd: moderateScaleVertical(16),
  },
  eyeIcon: {
    alignItems: 'flex-end',
    paddingEnd: moderateScaleVertical(16),
  },
  name: {
    fontFamily: font.LatoBold,
    fontSize: textScale(18),
    color: color.BLACK,
    marginTop: moderateScaleVertical(16),
  },

  otherdetailcontainer: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingStart: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(6),
  },

  lifetimeParticipantLabel: {
    ...CommonStyles.tpp_s2,
    marginLeft: moderateScale(8),
    lineHeight: moderateScale(16),
    fontWeight: '500',
  },
  clickableLink: {
    ...CommonStyles.tpp_s2,
    marginLeft: moderateScale(8),
    color: color.P_PINK,
    fontWeight: '500',
  },

  row: {
    flexDirection: 'row',
    bottom: moderateScale(9),
    marginStart: moderateScale(16),
  },
  error: {
    color: color.RED,
    fontSize: textScale(8),
    marginStart: moderateScaleVertical(2),
    fontFamily: font.RobotoMedium,
  },

  aboutValueText: {
    ...CommonStyles.tpp_p2,
    color: color.INPUT_TEXT,
    lineHeight: moderateScaleVertical(20),
  },
  pageantDetailsArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingStart: moderateScaleVertical(16),
    paddingEnd: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(16),
    width: '100%',
    alignItems: 'center',
  },
  aboutContainer: {
    borderColor: color.S_GRAY_2,
    backgroundColor: color.WHITE,
    paddingEnd: moderateScaleVertical(16),
    paddingStart: moderateScaleVertical(16),
    marginEnd: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(16),
    marginStart: moderateScaleVertical(16),
    borderRadius: moderateScaleVertical(24),
    paddingTop: isIosDevice() ? textScale(10) : textScale(-10),
    paddingBottom: isIosDevice() ? textScale(16) : textScale(0),
    borderWidth: 1,
  },
  aboutRootContainer: {
    marginBottom: moderateScaleVertical(100),
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    fontFamily: font.LatoBold,
    marginTop: moderateScaleVertical(20),
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
    marginBottom: 'auto',
  },
  note: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,
    ...CommonStyles.capitalizedCase,
    marginTop: moderateScaleVertical(16),
  },
  noteText: {
    ...CommonStyles.tpp_p3,
    color: color.S_GRAY_4,
    ...CommonStyles.capitalizedCase,
    marginTop: moderateScaleVertical(16),
    width: '90%',
  },
});

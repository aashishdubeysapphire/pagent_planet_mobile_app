import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {font} from '../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subSection: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(18),
  },
  profileBox: {
    borderWidth: 1,
    borderRadius: moderateScale(20),
    alignItems: 'center',
    width: '43%',
    aspectRatio: 1,
    marginLeft: moderateScaleVertical(18),
    overflow: 'hidden',
  },
  modalLabel: {
    fontFamily: font.RobotoMedium,
    fontSize: textScale(14),
    color: color.BLACK,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    marginBottom: 'auto',
  },
  profileIcon: {
    marginVertical: moderateScaleVertical(20),
    marginRight: moderateScale(24),
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  infoText: {
    ...CommonStyles.tpp_p3,
    color: color.INPUT_TEXT,
    width: '94%',
  },
  heading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    marginTop: moderateScaleVertical(16),
    lineHeight: moderateScaleVertical(24),
  },
  emptySpace: {
    marginTop: '42%',
  },
  activeProfileTitleView: {
    top: '-20%',
    alignItems: 'center',
  },
  inactiveProfileTitleView: {
    alignItems: 'center',
    top: '2.2%',
  },
  button: {
    paddingHorizontal: moderateScale(16),
    paddingBottom: moderateScaleVertical(50),
  },
  inactiveState: {
    height: moderateScaleVertical(24),
    backgroundColor: color.S_GRAY_2,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'flex-start',
  },
  inactiveLabelStyles: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,
  },
  borderButtonText: {
    color: color.P_PINK,
    fontWeight: 'bold',
    fontSize: textScale(18),
    fontFamily: font.LatoBold,
    lineHeight: moderateScaleVertical(24),
  },

  containerLogin: {
    width: '100%',
    height: moderateScaleVertical(60),
  },
});

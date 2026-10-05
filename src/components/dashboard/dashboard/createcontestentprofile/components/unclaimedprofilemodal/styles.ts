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
  crossIcon: {
    marginLeft: 'auto',
  },
  heading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    textAlign: 'center',
    marginHorizontal: moderateScale(36),
    marginTop: moderateScaleVertical(16),
    lineHeight: moderateScaleVertical(24),
  },
  tpp_claim_profile_illustartion: {
    height: moderateScaleVertical(202),
    width: moderateScale(311),
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: moderateScaleVertical(16),
    resizeMode: 'contain',
  },
  isThisYouText: {
    ...CommonStyles.tpp_h5,
    fontSize: textScale(14),
    color: color.BLACK,
    marginTop: moderateScaleVertical(24),
    marginBottom: moderateScaleVertical(16),
  },
  listView: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(8),
  },
  dpImage: {
    height: moderateScaleVertical(40),
    aspectRatio: 1,
    borderColor: color.S_GRAY_2,
    borderWidth: 1,
    borderRadius: 1000,
  },
  nameAddressView: {
    flexDirection: 'column',
    marginLeft: moderateScale(8),
    marginRight: 'auto',
    bottom: moderateScaleVertical(5),
  },
  nameText: {
    ...CommonStyles.tpp_h5,
    fontSize: textScale(14),
    color: color.BLACK,
    marginBottom: 'auto',
    width: moderateScale(190),
    marginTop: 'auto',
  },
  addressText: {
    ...CommonStyles.tpp_s1,
    color: color.S_GRAY_4,
    maxWidth: '90%',
    paddingRight: 5,
  },
  buttonView: {
    height: moderateScaleVertical(28),
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  claimText: {
    ...CommonStyles.tpp_h5,
    fontSize: textScale(9),
    textAlign: 'center',
    color: color.WHITE,
  },
  buttonStyles: {
    backgroundColor: color.P_PINK,
    paddingVertical: moderateScaleVertical(8),
    paddingHorizontal: moderateScale(16),
    borderRadius: 20,
  },
  borderButtonText: {
    color: color.P_PINK,
    fontWeight: 'bold',
    fontSize: textScale(14),
    fontFamily: font.LatoBold,
  },
  bottomButton: {
    height: moderateScaleVertical(40),
    width: moderateScale(230),
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: moderateScaleVertical(32),
  },
  itemSeperator: {
    height: moderateScaleVertical(8),
  },
  listStyle: {
    height: '36%',
  },
});

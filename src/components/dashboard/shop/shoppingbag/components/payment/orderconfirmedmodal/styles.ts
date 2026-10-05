import {Dimensions, StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  subContainer: {
    marginTop: 'auto',
    marginBottom: 'auto',
    alignItems: 'center',
  },
  congratulationText: {
    ...CommonStyles.tpp_h2,
    color: color.P_PINK,
    marginBottom: moderateScaleVertical(40),
  },
  orderIdText: {
    ...CommonStyles.tpp_h5,
    marginTop: moderateScaleVertical(40),
    textAlign: 'center',
  },
  pinkOrderId: {
    ...CommonStyles.tpp_p2,
    color: color.P_PINK,
  },
  contestantNameVote: {
    ...CommonStyles.tpp_p2,
    textTransform: 'capitalize',
    marginTop: moderateScaleVertical(16),
    textAlignVertical: 'center',
    textAlign: 'center',
    marginHorizontal: moderateScaleVertical(20),
    lineHeight: moderateScaleVertical(20),
    color: color.INPUT_TEXT,
  },
  priceText: {
    ...CommonStyles.tpp_p2,
    color: color.P_GRAY_BLACK_1,
    ...CommonStyles.capitalizedCase,
  },
  instalmentsText: {
    ...CommonStyles.tpp_p2,
    color: color.P_GRAY_BLACK_1,
    marginTop: moderateScaleVertical(8),
  },
  rowView: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(32),
  },
  note: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,
    marginTop: moderateScaleVertical(16),
    ...CommonStyles.capitalizedCase,

    //
  },
  noteText: {
    ...CommonStyles.tpp_p3,
    color: color.S_GRAY_4,
    ...CommonStyles.capitalizedCase,
  },
  pinkNote: {
    marginTop: moderateScaleVertical(16),
    lineHeight: 18,
  },
  containerLogin: {
    width: Dimensions.get('window').width - moderateScale(32),
    height: moderateScaleVertical(60),
    paddingBottom: 0,
  },
  borderButtonText: {
    color: color.P_PINK,
    fontWeight: 'bold',
    fontSize: textScale(18),
    fontFamily: font.LatoBold,
    lineHeight: moderateScaleVertical(24),
  },
  orderBtn: {
    width: Dimensions.get('window').width - moderateScale(32),
    marginTop: moderateScaleVertical(64),
  },
});

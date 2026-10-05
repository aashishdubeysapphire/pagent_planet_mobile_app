import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import { font } from '../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  scrollView: {
    padding: moderateScale(16),
  },
  topText: {
    ...CommonStyles.tpp_h5,
    fontSize: textScale(14),
    ...CommonStyles.capitalizedCase,
  },
  searchBarTextPlaceholder: {
    ...CommonStyles.tpp_p2,
    color: color.S_GRAY_3,
    width: '90%',
  },
  searchView: {
    paddingVertical: moderateScaleVertical(12),
    paddingHorizontal: moderateScale(24),
    backgroundColor: color.S_GRAY_1,
    borderColor: color.S_GRAY_2,
    borderWidth: 1,
    borderRadius: 100,
    marginTop: moderateScaleVertical(12),
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(16),
  },
  searchIcon: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
  },
  noretailserFoundText: {
    ...CommonStyles.robotoMedium14,
    textAlign: 'center',
    marginTop: moderateScaleVertical(24),
    marginHorizontal:moderateScale(18),
    lineHeight: moderateScaleVertical(20),
    ...CommonStyles.capitalizedCase,
  },
  weWillFindText: {
    ...CommonStyles.tpp_h5,
    color: color.P_GRAY_BLACK_1,
    textAlign: 'center',
    marginTop: moderateScaleVertical(12),
    fontFamily:font.RobotoRegular,
    ...CommonStyles.capitalizedCase,
  },
  tapHereText: {
    ...CommonStyles.tpp_h5,
    color: color.P_PINK,
  },
  noRecordFound: {
    marginTop: '20%',
  },
  whiteBg: {
    backgroundColor: color.WHITE,
  },
  addressText: {
    ...CommonStyles.tpp_p2,
    color: color.INPUT_TEXT,
  },
  CrossTouch: {
    width: '200%',
  },
  cardContainer: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(16),
    borderColor: color.S_GRAY_2,
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: moderateScaleVertical(16),
  },
  header: {
    flexDirection: 'row',
  },
  imageCustomStyle: {
    alignItems: 'flex-start',
  },
  soldByName: {
    ...CommonStyles.tpp_h5,
    lineHeight: moderateScaleVertical(20),
    width: moderateScale(220),
    ...CommonStyles.capitalizedCase,
  },
  nameAndRatingView: {
    flexDirection: 'column',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: moderateScale(8),
  },
  messageimg: {
    marginLeft: 'auto',
  },
  msgIcon: {
    marginTop: moderateScaleVertical(12),
  },
  callIcon: {
    marginTop: moderateScaleVertical(2),
  },
  addressTextCard: {
    ...CommonStyles.tpp_s5,
    fontSize: textScale(12),
    marginTop: moderateScaleVertical(12),
  },
  removeHorizontalpading: {marginHorizontal: moderateScale(-16)},
});

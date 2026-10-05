import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: moderateScale(16),
    backgroundColor: color.WHITE,
  },
  searchBox: {
    borderColor: color.S_GRAY_2,
    borderWidth: 1,
    borderRadius: moderateScaleVertical(22),
    flexDirection: 'row',
    marginVertical: moderateScaleVertical(25),
    maxHeight: moderateScaleVertical(44),
    minHeight: moderateScaleVertical(44),
  },
  roleItemContainer: {
    backgroundColor: color.S_GRAY_2,
    borderRadius: moderateScaleVertical(20),
    paddingEnd: moderateScaleVertical(16),
    paddingStart: moderateScaleVertical(16),
    paddingBottom: moderateScaleVertical(8),
    paddingTop: moderateScaleVertical(8),
  },
  roleMiddleItemContainer: {
    backgroundColor: color.S_GRAY_2,
    marginStart: moderateScaleVertical(8),
    borderRadius: moderateScaleVertical(20),
    paddingEnd: moderateScaleVertical(16),
    paddingStart: moderateScaleVertical(16),
    paddingBottom: moderateScaleVertical(8),
    paddingTop: moderateScaleVertical(8),
  },
  roleTextStyles: {
    ...CommonStyles.latoBoldBlack12,
    lineHeight: moderateScaleVertical(15),
  },
  searchTextinput: {
    flex: 1,
    ...CommonStyles.tpp_p2,
    color: color.INPUT_TEXT,
    paddingStart: moderateScale(11),
  },
  searchImage: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginStart: moderateScaleVertical(14),
    marginRight: moderateScale(18),
  },
  backIcon: {
    justifyContent: 'center',
    marginLeft: moderateScale(18),
  },
  recentSearchText: {
    ...CommonStyles.tpp_p2,
    color: color.S_GRAY_4,
    lineHeight: moderateScaleVertical(20),
    width: '90%',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: moderateScaleVertical(8),
  },
  noRecordFound: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.WHITE,
    marginBottom: 500,
  },
  alertcontiner: {
    ...CommonStyles.robotoMedium14,
    textTransform: 'capitalize',
    fontWeight: '500',
    marginHorizontal: moderateScale(12),
    lineHeight: moderateScaleVertical(20),
    color: color.BLACK,
    marginVertical: moderateScaleVertical(24),
  },
  sellerText: {
    ...CommonStyles.latoBoldBlack12,
    lineHeight: moderateScaleVertical(16),
    color: color.P_PINK,
    textAlign: 'right',
    marginLeft: 'auto',
  },
  sellerSection: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(8),
    alignItems: 'center',
  },
  line: {
    width: width - moderateScale(32),
    height: 1,
    backgroundColor: color.S_GRAY_2,
    marginVertical: moderateScaleVertical(8),
  },
  suggestionArea: {
    backgroundColor: color.WHITE,
    height: height,
    marginTop:moderateScaleVertical(16)
  },
  bottomEmptySpace: {
    height: moderateScaleVertical(200),
  },
});

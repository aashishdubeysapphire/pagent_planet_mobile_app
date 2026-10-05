import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {font} from '../../../../../assets/fonts/fontsConstant';
import {isIosDevice} from '../../../../utils/helperFunction';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  containerStyle: {
    paddingBottom: moderateScaleVertical(200),
    flex: 1,
  },
  awardSection: {
    width: '100%',
    paddingLeft: moderateScale(18),
    paddingVertical: moderateScaleVertical(24),
    backgroundColor: color.S_GRAY_1,
  },
  heading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    width: '83%',
  },
  viewStyles: {
    marginTop: moderateScaleVertical(2),
  },
  rowSection: {
    flexDirection: 'row',
  },
  inactiveContainer: {
    marginRight: moderateScale(48),
    borderRadius: moderateScale(16),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.P_PINK,
    flexDirection: 'row',
    backgroundColor: color.WHITE,
    padding: moderateScale(12),
    marginBottom: moderateScaleVertical(16),
  },
  inactiveLabel: {
    ...CommonStyles.tpp_s2,
    color: color.S_GRAY_4,
    width: '69%',
    paddingRight: moderateScale(12),
  },
  editButton: {
    backgroundColor: color.P_PINK,
    borderRadius: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(16),
  },
  viewButton: {
    fontFamily: font.LatoMedium,
    fontSize: isIosDevice() ? textScale(11) : textScale(12),
    color: color.BLACK,
    fontWeight: '600',
    marginRight: moderateScale(16),
  },
  editLabel: {
    color: color.WHITE,
    fontFamily: font.LatoBold,
    fontSize: textScale(10),
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScaleVertical(10),
  },
  shimmerList: {
    marginTop: moderateScaleVertical(20),
  },
  emptyContainer: {
    marginTop: moderateScaleVertical(32),
    alignItems: 'center',
  },
  emptyText: {
    ...CommonStyles.robotoMedium14,
    lineHeight: moderateScaleVertical(20),
    marginTop: moderateScaleVertical(16),
    textAlign: 'center',
  },
  customButtonStyles: {
    width: moderateScale(230),
    height: moderateScaleVertical(40),
    marginTop: moderateScaleVertical(32),
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    top: 0,
    width: '80%',
  },
  rowHeader: {
    left: moderateScaleVertical(16),
    top: 0,
    position: 'absolute',
    height: moderateScaleVertical(90),
  },
  demoImageContainer: {
    borderColor: color.S_GRAY_2,
    borderWidth: moderateScaleVertical(1),
    alignContent: 'center',
    maxHeight: moderateScaleVertical(84),
    maxWidth: moderateScaleVertical(84),
    borderRadius: moderateScaleVertical(84),
  },
  editIconContainer: {
    position: 'absolute',
    bottom: moderateScaleVertical(0),
    right: moderateScaleVertical(0),
    borderWidth: 1,
    borderRadius: 100,
    borderColor: color.WHITE,
  },
  contestantNameContainer: {
    ...CommonStyles.robotoMedium16,
    marginTop: moderateScaleVertical(6),
    lineHeight: moderateScaleVertical(22),
    paddingHorizontal: moderateScale(12),
    width: '70%',
  },
});

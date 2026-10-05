import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  addItemContainer: {
    backgroundColor: color.S_PINK,
    padding: moderateScaleVertical(16),
  },
  itemRootContainer: {
    marginStart: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(16),
    marginEnd: moderateScaleVertical(16),
  },
  limitCounter: {
    ...CommonStyles.tpp_p2,
    color: color.S_GRAY_4,
    textAlign: 'right',
    fontWeight: '500',
    lineHeight: moderateScaleVertical(20),
  },

  addButton: {
    ...CommonStyles.tpp_h4,
    color: color.P_PINK,
    textAlign: 'right',
    fontWeight: '700',
    lineHeight: moderateScaleVertical(22),
  },
  chooseExistingContestant: {
    ...CommonStyles.tpp_p3,
    color: color.P_PINK,
    marginTop: moderateScaleVertical(-12),
    fontWeight: '500',
    marginBottom: moderateScaleVertical(16),
    lineHeight: moderateScaleVertical(16),
  },
  addCompetitorTitle: {
    fontFamily: font.LatoBold,
    fontSize: textScale(18),
    color: color.BLACK,
  },

  topContainer: {
    flex: 1,
    backgroundColor: color.WHITE,
  },

  container: {
    paddingBottom: moderateScaleVertical(16),
  },

  titleAddContainer: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(24),
    justifyContent: 'space-between',
  },

  newTags: {
    ...CommonStyles.tpp_s2,
    color: color.S_GRAY_4,
    paddingHorizontal: moderateScale(16),
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    lineHeight: moderateScaleVertical(24),
    textTransform: 'capitalize',
    marginBottom: 'auto',
  },
  inactiveMessageStyle: {
    width: '100%',
    paddingEnd: moderateScaleVertical(16),
    paddingStart: moderateScaleVertical(16),
    paddingTop: moderateScaleVertical(10),
    paddingBottom: moderateScaleVertical(10),
    alignItems: 'center',
    backgroundColor: color.S_PINK,
    justifyContent: 'center',
  },
  inactiveMessageLabel: {
    ...CommonStyles.robotoMedium14,
    color: color.P_PINK,
    textAlign: 'center',
  },
});

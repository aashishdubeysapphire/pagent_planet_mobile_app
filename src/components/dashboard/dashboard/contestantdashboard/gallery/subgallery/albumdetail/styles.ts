import {StyleSheet} from 'react-native';
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
  clickHereLine: {
    ...CommonStyles.tpp_p3,
    lineHeight: moderateScaleVertical(18),
    marginEnd: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(16),
    marginStart: moderateScaleVertical(16),
    color: color.INPUT_TEXT,
    fontWeight: '400',
  },
  colorText: {
    ...CommonStyles.tpp_s2,
    color: color.P_PINK,
    fontWeight: '500',
    lineHeight: moderateScaleVertical(18),
  },

  emptyContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  makeFeatrueContainer: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingStart: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(16),
    top: 0,
    bottom: moderateScaleVertical(1),
  },
  featuredImageLogo: {
    position: 'absolute',
    marginStart: moderateScaleVertical(-5),
    marginTop: moderateScaleVertical(-1),
  },
  deleteImageLogo: {
    marginRight: moderateScaleVertical(16),
    position: 'absolute',
    right: 0,
    marginTop: moderateScaleVertical(16),
  },
  bottomContainer: {
    paddingEnd: moderateScaleVertical(16),
    paddingStart: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(18),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  borderButtonText: {
    color: color.P_PINK,
    fontSize: textScale(14),
    fontFamily: font.LatoBold,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginVertical: moderateScaleVertical(14),
    textAlign: 'center',
  },

  containerConfirm: {
    flex: 1,
    borderColor: color.P_PINK,
    borderWidth: 1,
    marginStart: moderateScaleVertical(16),
    borderRadius: 30,
  },

  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),

    textTransform: 'capitalize',
    textAlign: 'center',
    marginBottom: 'auto',
  },
  newTags: {
    ...CommonStyles.tpp_s2,
    marginTop: moderateScaleVertical(10),
    color: color.S_GRAY_4,
    paddingHorizontal: moderateScale(16),
  },
  managetagheaader: {
    ...CommonStyles.tpp_h2,
    lineHeight: moderateScaleVertical(24),
    color: color.BLACK,
  },
  countStyle: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    bottom: 0,
    right: 0,
    width: moderateScale(48),
    aspectRatio: 1,
  },
  indexCount: {
    ...CommonStyles.tpp_s3,
    color: color.WHITE,
    lineHeight: moderateScaleVertical(22),
  },
  totalCountStyle: {
    ...CommonStyles.tpp_s1,
    color: color.WHITE,
    lineHeight: moderateScaleVertical(12),
    marginTop: moderateScaleVertical(5),
  },
});

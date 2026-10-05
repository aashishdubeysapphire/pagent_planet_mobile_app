import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  tagContainer: {
    backgroundColor: color.WHITE,
    paddingStart: moderateScaleVertical(16),
    paddingEnd: moderateScaleVertical(16),
  },
  tagView: {
    width: '100%',
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScaleVertical(24),
    paddingBottom: moderateScaleVertical(16),
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
    marginHorizontal: moderateScaleVertical(70),
    marginTop: moderateScaleVertical(16),
  },
  gap: {
    minHeight: moderateScaleVertical(14),
    backgroundColor: color.S_GRAY_1,
  },
  tagButton: {
    ...CommonStyles.lotoBold16,
    color: color.P_PINK,
  },
  tagLabel: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    marginBottom: moderateScaleVertical(16),
  },
  newTags: {
    ...CommonStyles.tpp_s2,
    color: color.S_GRAY_4,
    paddingHorizontal: moderateScale(16),
    marginTop: -moderateScaleVertical(8),
  },
  tagArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagListing: {
    paddingHorizontal: moderateScale(16),
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    lineHeight: moderateScaleVertical(24),
    marginBottom: moderateScaleVertical(18),
  },
});

import {Dimensions, StyleSheet} from 'react-native';
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
  imageContainer: {
    alignItems: 'center',
  },
  loadMore: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 0,
    top: 0,
    backgroundColor: color.WHITE,
  },
  preButtonContainer: {
    marginStart: moderateScaleVertical(10),
  },
  nextButtonContainerRight: {
    position: 'absolute',
    top: '50%',
    right: '4%',
  },
  nextButtonContainerLeft: {
    position: 'absolute',
    top: '50%',
    left: '4%',
  },
  emptyContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    top: 0,
    bottom: 0,
  },
  buttonText: {
    color: color.WHITE,
    fontWeight: 'bold',
    fontSize: textScale(18),
    fontFamily: font.LatoBold,
    textTransform: 'uppercase',
    lineHeight: moderateScaleVertical(24),
  },
  makeFeatrueContainer: {
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingStart: moderateScaleVertical(70),
    paddingEnd: moderateScaleVertical(70),
    top: 0,
    bottom: moderateScaleVertical(1),
  },
  featuredImageLogo: {
    position: 'absolute',
    marginStart: moderateScaleVertical(-5),
    marginTop: moderateScaleVertical(-1),
  },
  deleteImageLogo: {
    position: 'absolute',
    right: 0,
    marginRight: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(16),
  },
  bottomContainer: {
    flexDirection: 'row',
    marginVertical: moderateScaleVertical(15),
    justifyContent: 'space-between',
    paddingEnd: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(25),
  },
  borderButtonText: {
    color: color.P_PINK,
    fontSize: textScale(14),
    fontWeight: 'bold',
    fontFamily: font.LatoBold,
    textTransform: 'uppercase',
    marginVertical: moderateScaleVertical(14),
    textAlign: 'center',
  },
  gap: {
    marginStart: moderateScaleVertical(16),
  },

  containerConfirm: {
    flex: 0.5,
    borderColor: color.P_PINK,
    borderWidth: 1,
    marginStart: moderateScaleVertical(16),
    borderRadius: 30,
  },
  clickable: {
    borderWidth: 1,
    borderColor: color.S_GRAY_E1,
    marginBottom: moderateScaleVertical(8),
    paddingVertical: moderateScaleVertical(8),
    paddingHorizontal: moderateScale(12),
    marginRight: moderateScaleVertical(8),
    borderRadius: 30,
    flexDirection: 'row',
    backgroundColor: color.S_GRAY_1,
  },
  awardName: {
    ...CommonStyles.tpp_p3,
    marginRight: moderateScale(8),
  },
  addMore: {
    color: color.P_PINK,
    fontFamily: font.LatoSemiBold,
    fontSize: textScale(12),
    marginLeft: 'auto',
  },
});

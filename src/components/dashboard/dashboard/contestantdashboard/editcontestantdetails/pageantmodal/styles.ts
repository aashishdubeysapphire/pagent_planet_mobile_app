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
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.WHITE,
    borderRadius: moderateScale(30),
  },
  crossIcon: {
    marginLeft: 'auto',
    paddingRight: moderateScale(16),
  },

  containerConfirm: {
    flex: 0.48,
    height: moderateScaleVertical(44),
    paddingBottom: 0,
  },
  containerDelete: {
    flex: 0.48,
    height: moderateScaleVertical(60.6),
    marginLeft: moderateScale(8),
    paddingBottom: 0,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScaleVertical(40),
    marginEnd: moderateScale(8),
    marginBottom: moderateScaleVertical(20),
    paddingHorizontal: moderateScale(8),
  },
  awardView: {
    maxHeight: moderateScaleVertical(170),
  },
  borderButtonText: {
    color: color.P_PINK,
    fontSize: textScale(14),
    fontWeight: 'bold',
    fontFamily: font.LatoBold,
    textTransform: 'uppercase',
  },
  listContainer: {
    flexDirection: 'row',
    borderBottomColor: color.S_GRAY_2,
    borderBottomWidth: 1,
    alignItems: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
    width: '100%',
    paddingBottom: moderateScaleVertical(16),
    borderRadius: moderateScale(20),
  },

  shimmer: {
    position: 'absolute',
  },
  circleContainer: {
    width: moderateScaleVertical(60),
    height: moderateScaleVertical(60),
    borderColor: color.S_GRAY_2,
    borderWidth: 1,
    borderRadius: moderateScaleVertical(60),
    marginEnd: moderateScaleVertical(12),
    marginStart: moderateScale(16),
  },

  title: {
    ...CommonStyles.robotoMedium14,
    textAlign: 'center',
    color: color.P_PINK,
    lineHeight: moderateScaleVertical(20),
    maxWidth: moderateScale(220),
  },
  subtitle: {
    ...CommonStyles.robotoMedium14,
    textAlign: 'left',
    alignSelf: 'flex-start',
    color: color.INPUT_TEXT,
    marginLeft: moderateScale(16),
    marginTop: moderateScaleVertical(24),
    lineHeight: moderateScaleVertical(20),
  },
  bullet: {
    marginVertical: moderateScaleVertical(4),
    marginRight: moderateScale(8),
    alignSelf: 'flex-start',
    marginLeft: moderateScale(16),
  },
  titlename: {
    ...CommonStyles.tpp_p2,
    textAlign: 'left',
    alignSelf: 'flex-start',
    color: color.INPUT_TEXT,
    maxWidth: moderateScale(300),
    lineHeight: moderateScaleVertical(20),
  },
  titlerow: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(8),
  },
  container: {
    width: '100%',
    height: 'auto',
    paddingTop: moderateScaleVertical(16),
  },
});

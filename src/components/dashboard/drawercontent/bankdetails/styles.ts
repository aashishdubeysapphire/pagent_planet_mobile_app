import {Dimensions, StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {CommonStyles} from '../../../../assets/commonStyles';
import {font} from '../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  linearGradientStyles:{
    paddingVertical : moderateScaleVertical(16),
    marginVertical:moderateScaleVertical(16),
    marginHorizontal:moderateScale(16),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(16),
  },
  outerview: {
    backgroundColor: color.TRANSPARNT,
    flex: 1,
  },
  todosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: moderateScale(16),
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(16),
  },
  staticCardLable: {
    ...CommonStyles.tpp_p2,
    color: color.INPUT_TEXT,
    fontSize: textScale(14),
    lineHeight: moderateScaleVertical(20),
    width: moderateScale(145),
  },
  loader: {
    height: moderateScaleVertical(100),
    justifyContent: 'center',
    bottom : moderateScaleVertical(50)
  },
  staticSelectedCardLable: {
    ...CommonStyles.tpp_h5,
    color: color.P_PINK,
    fontSize: textScale(14),
    lineHeight: moderateScaleVertical(20),
    width: moderateScale(145),
  },
  cardTouch: {
    flexDirection: 'row',
    paddingTop: moderateScaleVertical(16),
  },
  innerview: {
    position: 'absolute',
    top: moderateScaleVertical(219),
    right: moderateScale(16),
    backgroundColor: color.WHITE,
    borderRadius: 12,
    paddingLeft: moderateScale(16),
    paddingBottom: moderateScaleVertical(16),
    width: moderateScale(194),
    ...CommonStyles.shadow,
  },

  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  bagList: {
    marginHorizontal: moderateScale(16),
  },
  noRecordContainer: {
    backgroundColor: color.BLACK,
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    marginTop: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(8),
    marginHorizontal: moderateScale(16),

    flexDirection: 'row',
  },
  heading: {
    ...CommonStyles.tpp_h5,
    fontSize: textScale(13),
    lineHeight: moderateScaleVertical(20),
  },
  containerCancel: {
    flex: 1,
    height: moderateScaleVertical(65),
    paddingBottom: 0,
  },
  borderButtonText: {
    color: color.P_PINK,
    fontSize: textScale(13),
    fontWeight: 'bold',
    fontFamily: font.LatoBold,
    textTransform: 'uppercase',
    marginVertical: moderateScaleVertical(14),
    textAlign: 'center',
  },
  containerDelete: {
    flex: 0.5,
    borderColor: color.S_GRAY_3,
    borderWidth: 1,
    borderRadius: 30,
    marginRight: moderateScale(16),
  },
  containerConfirm: {
    flex: 0.5,
    borderColor: color.P_PINK,
    borderWidth: 1,
    borderRadius: 30,
  },
  subheading: {
    ...CommonStyles.tpp_p3,
    fontSize: textScale(11),
    lineHeight: moderateScaleVertical(16),
  },
  subheading1: {
    ...CommonStyles.tpp_s2,
    fontSize: textScale(11),
    lineHeight: moderateScaleVertical(16),
    maxWidth: moderateScale(150),
  },
  title: {
    ...CommonStyles.robotoMedium16,

    lineHeight: moderateScaleVertical(24),
    textAlign: 'left',
  },

  image: {
    width: Dimensions.get('window').width - moderateScale(32),
    height: moderateScaleVertical(138),
    paddingVertical: moderateScaleVertical(16),
    paddingHorizontal: moderateScale(16),
    alignSelf: 'center',
    marginVertical: moderateScaleVertical(16),
  },

  detailRow: {
    flexDirection: 'row',
    lineHeight: moderateScaleVertical(18),
    marginVertical: moderateScaleVertical(4),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

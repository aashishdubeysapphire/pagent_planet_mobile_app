import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {font} from '../../../assets/fonts/fontsConstant';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';

export const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: color.WHITE,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    flex: 1,
  },
  continaer: {
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  topContiner: {
    borderTopRightRadius: 30,
    backgroundColor: color.P_PINK,
    paddingHorizontal: moderateScale(16),
    borderBottomRightRadius: 30,
  },
  demoImage: {
    borderRadius: 200,
    width: moderateScale(84),
    aspectRatio: 1,
  },
  dpContiner: {
    marginTop: moderateScaleVertical(38),
    marginRight: 'auto',
    marginLeft: 'auto',
    flexDirection: 'row',
    alignContent: 'center',
  },
  dpContinerIos: {
    // marginTop: moderateScaleVertical(48),
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  editPen: {
    width: moderateScale(40),
    height: moderateScaleVertical(40),
    left: '60%',
    position: 'absolute',
  },
  userName: {
    ...CommonStyles.tpp_h2,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: moderateScaleVertical(12),
  },
  headerline: {
    ...CommonStyles.tpp_p2,
    marginRight: 'auto',
    marginLeft: 'auto',
    fontSize: moderateScaleVertical(14),
    fontFamily: font.RobotoRegular,
    // marginBottom: moderateScaleVertical(7),
    marginTop: moderateScaleVertical(12),
    lineHeight: moderateScaleVertical(20),
    textAlign: 'center',
  },
  countryStateTitle: {
    ...CommonStyles.tpp_p2,
    marginRight: 'auto',
    marginLeft: 'auto',
    fontSize: moderateScaleVertical(12),
    fontFamily: font.RobotoRegular,
    marginTop: moderateScaleVertical(2),
    lineHeight: moderateScaleVertical(20),
    textAlign: 'center',
  },
  topButton: {
    ...CommonStyles.latoBoldWhite14,
    paddingHorizontal: moderateScale(40),
    paddingVertical: moderateScaleVertical(10),
  },
  viewProfileButton: {
    marginRight: 'auto',
    marginLeft: 'auto',
    borderWidth: 1,
    borderColor: color.WHITE,
    borderRadius: moderateScale(20),
    marginTop: moderateScale(16),
    marginBottom: moderateScaleVertical(24),
  },
  dashboardIcon: {marginLeft: -5, marginRight: 2},
  staticCardLable: {
    ...CommonStyles.tpp_h4,
    ...CommonStyles.capitalizedCase
  },
  cardTOuch: {
    flexDirection: 'row',
    paddingVertical: moderateScale(12),
    alignItems:'center',
  },
  staticheightView: {
    flex: 1,
  },
  staticCadImage: {
    marginLeft: moderateScale(15),
    marginEnd: moderateScale(10),
  },
  socialLinks: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScaleVertical(18),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  logout: {
    marginTop: moderateScaleVertical(6),
    marginBottom: 'auto',
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    marginBottom: 'auto',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
  emptyHeight:{
    height:moderateScaleVertical(40)
  },
  loaderStyle:{
    marginHorizontal: moderateScale(16),
    marginTop: moderateScaleVertical(20),
  }, 
});

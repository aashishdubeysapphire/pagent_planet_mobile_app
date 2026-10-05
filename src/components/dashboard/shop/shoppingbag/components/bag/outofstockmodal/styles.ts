import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScaleVertical,
  moderateScale,
  textScale,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: color.WHITE,
    paddingHorizontal: moderateScale(16),
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    flex: 1,
  },

  modalHeading: {
    ...CommonStyles.tpp_h3,
    textTransform: 'capitalize',
    textAlignVertical: 'center',
    lineHeight: moderateScaleVertical(24),
    marginTop: moderateScaleVertical(19),
  },
  headingView: {
   
    flexDirection: 'row',
    justifyContent: 'space-between',
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

  bottomContainer: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(20),
    justifyContent: 'space-between',
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
  crossIcon: {
    alignSelf: 'flex-end',
    marginTop:moderateScaleVertical(16)
  },
  headingArea: {
    marginTop: moderateScaleVertical(32),
    alignItems: 'center',
    marginBottom: moderateScaleVertical(16),
  },
  headingStyles: {
    ...CommonStyles.tpp_h2,
    lineHeight: moderateScaleVertical(24),
    color: color.BLACK,
  },
  subHeading: {
    ...CommonStyles.tpp_p2,
    color: color.BLACK,
    marginTop: moderateScaleVertical(8),
    textAlign: 'center',
    lineHeight: moderateScaleVertical(20),
    fontSize: textScale(14),
  },
  flatListStyle: {
    // height : moderateScaleVertical(480),
    marginTop: moderateScaleVertical(8),
    flex: 0.96,
  },
  infoStyles: {
    ...CommonStyles.tpp_p2,
    color: color.BLACK,
    marginTop: moderateScaleVertical(8),
  },
  flatlistHeaderStyles: {
    alignItems: 'center',
    marginTop: moderateScaleVertical(28),
  },
  customButtonStyles: {
    width: moderateScale(230),
    alignSelf: 'center',
  },
  staticBottomSection: {
    marginBottom: moderateScaleVertical(100),
  },
});

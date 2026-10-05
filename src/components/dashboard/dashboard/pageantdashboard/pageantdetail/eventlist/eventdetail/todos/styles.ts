import {Dimensions, StyleSheet} from 'react-native';
import {color} from '../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: moderateScale(16),
  },
  eventHeadingArea: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: moderateScale(16),
    paddingStart: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(24),
  },
  headingArea: {
    marginTop: moderateScaleVertical(24),
  },
  modalLabel: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    fontSize: textScale(16),
    marginTop: moderateScaleVertical(16),
    textAlign: 'center',
    marginHorizontal: moderateScale(-10),
    paddingHorizontal: moderateScale(16),
  },
  headingLabel: {
    ...CommonStyles.robotoMedium14,
    width: '90%',
  },
  contestantSubmission: {
    marginVertical: moderateScaleVertical(16),
    marginHorizontal: moderateScale(12),
    fontSize: textScale(12),
    fontFamily: font.RobotoRegular,
    color: color.INPUT_TEXT,
  },
  staticHeight: {
    height: moderateScaleVertical(200),
  },
  tabContainer: {
    height:
      isIosDevice()
        ? Dimensions.get('window').height * (moderateScaleVertical(93.6) / 100)
        : Dimensions.get('window').height * (moderateScaleVertical(91.5) / 100),
    paddingBottom: moderateScaleVertical(100),
  },
  marHor16: {
    marginHorizontal: moderateScale(16),
  },
  emptyContainer: {
    marginTop: moderateScale(16),
  },
  headingContainer: {
    marginTop: moderateScaleVertical(24),
    flexDirection: 'row',
  },
  subHeading: {
    ...CommonStyles.tpp_h5,
    fontSize: textScale(14),
    marginRight: 'auto',
  },
  empltyRactangleMainView: {
    flex: 1,
    height: moderateScaleVertical(108),
    marginTop: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(76),
  },
  innerView: {
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  rectengleText: {
    ...CommonStyles.tpp_h5,
    fontSize: textScale(14),
    marginLeft: moderateScale(8),
  },
  alertBlack: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  topHeight: {
    height: moderateScaleVertical(24),
  },
  bottomHeight: {
    height: moderateScaleVertical(60),
  },
});

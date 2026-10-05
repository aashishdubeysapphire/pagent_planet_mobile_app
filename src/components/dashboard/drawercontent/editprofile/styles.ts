import {StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {CommonStyles} from '../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  placeHolderView: {
    backgroundColor: color.S_GRAY_4,
    borderRadius: 100,
  },
  demoImageContainer: {
    borderColor: color.P_PINK,
    borderWidth: 2.5,
    alignContent: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    height: moderateScaleVertical(145),
    borderRadius: 100,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: moderateScaleVertical(30),
  },
  demoImage: {
    aspectRatio: 1,
    height: moderateScaleVertical(135),
    borderRadius: 100,
  },
  editBtnContainer: {
    position: 'absolute',
    bottom: moderateScaleVertical(10),
    right: moderateScaleVertical(5),
  },
  userFullNameContainer: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    marginTop: moderateScaleVertical(16),
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingHorizontal: moderateScale(16),
  },
  emailText: {
    ...CommonStyles.tpp_p2,
    color: color.BLACK,
    marginRight: 'auto',
    marginTop: moderateScaleVertical(4),
    marginLeft: 'auto',
  },
  bottomLine: {
    height: 1,
    backgroundColor: color.P_PINK,
    marginVertical: moderateScaleVertical(32),
    marginHorizontal: moderateScale(16),
  },
  subHeading: {
    ...CommonStyles.robotoMedium16,
    color: color.INPUT_TEXT,
    marginRight: 'auto',
    paddingVertical: moderateScaleVertical(20),
    paddingLeft: moderateScale(24),
  },
  subHeadingContainer: {
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
    flexDirection: 'row',
    borderRadius: moderateScale(50),
    marginBottom: moderateScaleVertical(16),
  },
  arrowIcon: {
    transform: [{rotate: '270deg'}],
    marginVertical: moderateScaleVertical(20),
    marginRight: moderateScale(24),
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  pinkView: {
    backgroundColor: color.S_PINK,
    paddingTop: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(16),
    paddingHorizontal: moderateScale(16),
  },
  staticHeight: {
    height: moderateScaleVertical(60),
  },
  modalText: {
    ...CommonStyles.tpp_p2,
    textAlign: 'center',
    marginVertical: moderateScaleVertical(20),
    color: 'blue',
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: 'auto',
    marginBottom: 'auto',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
  headingView: {
    flexDirection: 'row',
  },
  crossIcon: {
    marginLeft: 'auto',
  },
  selectiontext: {
    ...CommonStyles.tpp_h4,
    marginRight: 'auto',
  },

  textView: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(16),
  },
  bottomContainer: {
    marginBottom: moderateScaleVertical(54),
  },
  staticHeightIOS: {
    height: moderateScaleVertical(250),
  },
});

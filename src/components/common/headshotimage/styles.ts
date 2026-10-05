import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {font} from '../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';

export const styles = StyleSheet.create({
  mainContiner: {
    flex: 1,
  },
  mainContinerBottom: {
    marginBottom: moderateScaleVertical(16),
  },
  headShotContainer: {
    alignContent: 'center',
    marginBottom: moderateScaleVertical(16),
  },
  headShotImageContainer: {
    width: moderateScaleVertical(125),
    height: moderateScaleVertical(72),
    marginLeft: moderateScaleVertical(-15),
    justifyContent: 'flex-start',
    left: 0,
  },

  row: {
    alignItems: 'center',
    marginTop: moderateScaleVertical(3),
    marginBottom: moderateScaleVertical(15),
    flexDirection: 'row',
  },

  row2: {
    alignItems: 'center',
    marginTop: moderateScaleVertical(10),
    marginBottom: moderateScaleVertical(15),
    flexDirection: 'row',
  },

  error: {
    color: color.RED,
    fontSize: textScale(8),
    marginStart: moderateScale(2),

    fontFamily: font.RobotoMedium,
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: 'auto',
    marginBottom: 'auto',
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
  noError: {
    height: 0,
  },
  headShotDeleteContainer: {
    position: 'absolute',
    right: moderateScaleVertical(22),
    top: moderateScaleVertical(10),
  },
  noNote: {
    marginBottom: moderateScaleVertical(16),
  },
  upladImageView: {
    height: moderateScaleVertical(132),
    width: '100%',
    borderColor: color.P_PINK,
    borderWidth: 1,
    backgroundColor: color.WHITE,
    borderStyle: 'dashed',
    borderRadius: 30,
  },
  note: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(12),
    fontSize: moderateScaleVertical(13),
    marginBottom: moderateScaleVertical(20),
    color: color.BLACK,
  },
  noteHeadImage: {
    ...CommonStyles.tpp_h3,
    fontSize: moderateScaleVertical(13),
    marginBottom: moderateScaleVertical(20),
    color: color.BLACK,
    marginTop: moderateScaleVertical(8),
  },
  noteMsg: {
    ...CommonStyles.tpp_p2,
    color: color.S_GRAY_4,
    marginLeft: 'auto',
    fontSize: moderateScaleVertical(13),
    marginRight: 'auto',
    marginTop: moderateScaleVertical(8),
  },
  headShotImageText: {
    ...CommonStyles.tpp_p2,
    color: color.INPUT_TEXT,
    marginTop: moderateScaleVertical(16),
  },
  headShotImageTitleText: {
    ...CommonStyles.tpp_s2,
    lineHeight: moderateScaleVertical(20),
    marginBottom: moderateScaleVertical(5),
    color: color.BLACK,
  },
  headShotImageBottomTitleText: {
    ...CommonStyles.tpp_s5,
    lineHeight: moderateScaleVertical(20),
    marginBottom: moderateScaleVertical(5),
    marginStart: moderateScaleVertical(10),
  },
  uploadImageInnerVIew: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cameraCenter: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

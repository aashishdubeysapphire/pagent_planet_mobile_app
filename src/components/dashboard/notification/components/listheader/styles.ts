import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  haaderBg: {
    paddingBottom: moderateScaleVertical(8),
    backgroundColor: color.S_GRAY_1,
  },
  row: {
    padding: moderateScaleVertical(16),
    flexDirection: 'row',
    backgroundColor: color.WHITE,
  },
  noticationManagerRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  link: {
    ...CommonStyles.tpp_h5,
    color: color.P_PINK,
    marginStart: moderateScaleVertical(3),
    lineHeight: moderateScaleVertical(18),
  },

  agreeText: {
    ...CommonStyles.tpp_p3,
    marginStart: moderateScaleVertical(8),
    lineHeight: moderateScaleVertical(18),
    color: color.INPUT_TEXT,
  },
  heading: {
    ...CommonStyles.tpp_s3,
    flex: 1,
    lineHeight: moderateScaleVertical(22),
    color: color.BLACK,
  },
  readCount: {
    ...CommonStyles.tpp_h5,
    alignSelf: 'center',

    lineHeight: moderateScaleVertical(16),
    color: color.P_PINK,
  },
  typeStyle: {
    ...CommonStyles.tpp_p3,
    lineHeight: moderateScaleVertical(18),
    color: color.INPUT_TEXT,
  },
  headerText: {
    flex: 1,
    alignSelf: 'center',
    marginEnd: moderateScaleVertical(16),
  },
  notifcationOffContainer: {
    padding: moderateScaleVertical(16),
    flexDirection: 'row',
    backgroundColor: color.WHITE,
  },
  imageView: {
    width: moderateScale(60),
    height: moderateScale(60),
    alignContent: 'center',
    justifyContent: 'center',
    marginStart: moderateScaleVertical(2),
    marginRight: moderateScale(6),
  },
});

export default styles;

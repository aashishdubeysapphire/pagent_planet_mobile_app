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
  container: {
    paddingHorizontal: moderateScaleVertical(16),
  },
  headerTitle: {
    ...CommonStyles.tpp_s2,
    color: color.P_PINK,
    fontWeight: '500',
    lineHeight: moderateScaleVertical(16),
    marginLeft: moderateScale(8),
  },
  imageContainer: {
    marginTop: moderateScaleVertical(8),
  },
  subHeaderTitle: {
    ...CommonStyles.tpp_p3,
    marginTop: moderateScaleVertical(8),
    lineHeight: moderateScaleVertical(18),
    marginBottom: moderateScaleVertical(8),
  },
  viewMore: {
    ...CommonStyles.tpp_s1,
    textAlign: 'right',
    color: color.P_PINK,
    lineHeight: moderateScaleVertical(12),
    fontSize: textScale(10),
    marginBottom: moderateScaleVertical(8),
  },
  like: {
    textAlign: 'right',
    color: color.P_GRAY_BLACK_1,
    lineHeight: moderateScaleVertical(16),
    fontSize: textScale(10),
    fontFamily: font.RobotoRegular,
    marginTop: moderateScaleVertical(8),
  },
  pageantTitleRow: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(8),
  },
  eventTitleRow: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(8),
  },
  errorText: {
    ...CommonStyles.tpp_h5,
    color: color.WHITE,
    marginLeft: moderateScale(12),
    fontSize: textScale(13),
  },

  errorView: {
    backgroundColor: color.S_GRAY_4,
    height: moderateScaleVertical(215),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: moderateScaleVertical(8),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  height: {
    height: moderateScaleVertical(16),
  },
  seperatorStyle: {
    height: moderateScaleVertical(8),
    backgroundColor: color.S_GRAY_1,
  },
});

export default styles;

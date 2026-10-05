import { StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {font} from '../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';
import { isIosDevice } from '../../utils/helperFunction';

export const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(25),
    borderColor: color.S_GRAY_2,
    borderWidth: 1,
    backgroundColor: color.S_GRAY_1,
    marginTop: -moderateScaleVertical(40),
  },
  title: {
    ...CommonStyles.tpp_s2,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: moderateScaleVertical(16),
    textAlignVertical: 'center',
    alignSelf: 'stretch',
  },
  buttonStyle: {
    fontFamily: font.LatoSemiBold,
    fontSize: isIosDevice() ? textScale(11) : textScale(12),
    color: color.S_GRAY_4,
    marginLeft: moderateScale(8),
  },
  bottomSection: {
    flexDirection: 'row',
    height: moderateScaleVertical(40),
    alignItems: 'center',
    backgroundColor: color.WHITE,
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
    justifyContent: 'center',
    borderColor: color.S_GRAY_2,
    alignSelf: 'center',
    borderWidth: 1,
    paddingTop: moderateScaleVertical(6),
  },
  imageSection: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSection: {
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScaleVertical(46),
    paddingHorizontal: moderateScale(8),
  },
});

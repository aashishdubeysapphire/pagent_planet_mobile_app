import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';
import { isIosDevice } from '../../utils/helperFunction';
export const styles = StyleSheet.create({
  outerview: {
    height: '100%',
    justifyContent: 'center',
    backgroundColor: color.LIGHT_GREY_OVERLAY,
  },
  innerview: {
    backgroundColor: color.WHITE,
    borderRadius: 20,
    height: moderateScaleVertical(380),
    alignSelf: 'center',
    width: '90%',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(10),
    ...CommonStyles.shadow,
  },

  wheelPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: moderateScale(55),
    justifyContent: 'space-around',
    marginTop:
      !isIosDevice()
        ? moderateScaleVertical(50)
        : moderateScaleVertical(20),
  },
  modalHeading: {
    ...CommonStyles.tpp_h5,
    marginTop: moderateScaleVertical(30),
    marginLeft: moderateScale(10),
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
    fontSize: textScale(15),
  },
  cancelHeading: {
    ...CommonStyles.tpp_h5,
    marginTop:
      !isIosDevice()
        ? moderateScaleVertical(30)
        : moderateScaleVertical(60),
    marginHorizontal: moderateScale(10),
    fontSize: textScale(15),
  },
  iconView: {
    flexDirection: 'row',
    marginTop: 'auto',
    marginLeft: 'auto',
    marginBottom: 'auto',
    marginRight: moderateScale(10),
  },
  bottomLine: {
    height: 1.5,
    backgroundColor: color.S_GRAY_1,
  },
});

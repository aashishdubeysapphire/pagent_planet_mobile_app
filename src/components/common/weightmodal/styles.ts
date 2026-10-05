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
  container: {
    flexDirection: 'row',
    backgroundColor: color.WHITE,
    zIndex: -1000,
    height: moderateScaleVertical(55),
  },

  innerview: {
    backgroundColor: color.WHITE,
    borderRadius: 20,
    width: '90%',
    height: moderateScaleVertical(380),
    alignSelf: 'center',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(10),
    ...CommonStyles.shadow,
  },
  outerview: {
    height: '100%',
    backgroundColor: color.LIGHT_GREY_OVERLAY,
    justifyContent: 'center',
  },
  staticCardLable: {
    ...CommonStyles.tpp_p2,
    color: color.INPUT_TEXT,
  },
  cardTOuch: {
    flexDirection: 'row',
    paddingVertical: moderateScale(8),
  },
  staticheightView: {
    height: moderateScale(12),
  },
  drawerIcon: {
    marginVertical: moderateScaleVertical(18),
    marginHorizontal: moderateScale(17),
    width: 500,
  },
  staticCadImage: {
    paddingRight: moderateScale(10),
    marginTop: moderateScaleVertical(4),
  },
  dropIcon: {
    marginVertical: moderateScaleVertical(18),
    marginHorizontal: moderateScale(6),
    width: 500,
  },
  otherIcon: {
    marginVertical: moderateScaleVertical(18),
    marginHorizontal: moderateScale(6),
    width: 500,
  },
  modalHeading: {
    ...CommonStyles.tpp_h5,
    marginTop: moderateScaleVertical(30),
    fontSize: textScale(15),
    marginLeft: moderateScale(10),
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
  wheelPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: moderateScale(55),
    marginTop:
      !isIosDevice()
        ? moderateScaleVertical(50)
        : moderateScaleVertical(20),
  },

  buttonHeading: {
    ...CommonStyles.tpp_h5,
    marginTop:
      !isIosDevice()
        ? moderateScaleVertical(30)
        : moderateScaleVertical(60),
    marginHorizontal: moderateScale(10),
    fontSize: textScale(15),
  },
  bottomLine: {
    height: 1.5,
    backgroundColor: color.S_GRAY_1,
  },
  iconView: {
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: moderateScale(10),
  },
});

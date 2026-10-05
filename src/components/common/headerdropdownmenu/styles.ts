import {Platform, StatusBar, StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../utils/responsiveSize';
import {isIosDevice} from '../../utils/helperFunction';

export const styles = StyleSheet.create({
  container: {
    marginTop: moderateScaleVertical(16),
    paddingBottom: moderateScaleVertical(16),
  },
  /** Full-screen modal root: manual insets via padding (no SafeAreaView). */
  modalSafeArea: {
    flex: 1,
    backgroundColor: color.WHITE,
    ...Platform.select({
      ios: {
        paddingTop: moderateScaleVertical(isIosDevice() ? 35 : 2),
        paddingBottom: moderateScaleVertical(32),
      },
      android: {
        paddingTop:
          (StatusBar.currentHeight ?? moderateScaleVertical(10)) +
          moderateScaleVertical(-50),
          marginTop: moderateScaleVertical(-15),
        paddingBottom: moderateScaleVertical(10),
      },
      default: {
        paddingTop: moderateScaleVertical(14),
        paddingBottom: moderateScaleVertical(16),
      },
    }),
  },
  chooseRole: {
    ...CommonStyles.tpp_s3,
    margin: moderateScale(16),
    marginTop: moderateScaleVertical(12),
    color: color.BLACK,
  },
  buttonView: {
    marginHorizontal: moderateScale(16),
    marginVertical: moderateScaleVertical(16),
  },
  scrollViewContainer: {
    paddingBottom: moderateScaleVertical(150),
  },
});

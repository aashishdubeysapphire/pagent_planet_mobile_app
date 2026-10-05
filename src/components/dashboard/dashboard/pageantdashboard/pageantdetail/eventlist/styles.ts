import {Dimensions, StyleSheet} from 'react-native';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../../utils/helperFunction';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:
      isIosDevice()
        ? Dimensions.get('window').height * (moderateScaleVertical(90.6) / 100)
        : Dimensions.get('window').height * (moderateScaleVertical(88) / 100),
  },
  staticHeight: {
    height: moderateScaleVertical(200),
  },
});

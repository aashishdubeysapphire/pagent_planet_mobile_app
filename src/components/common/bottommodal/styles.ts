import { StyleSheet } from "react-native";
import { color } from "../../../assets/colorConstant";
import { moderateScaleVertical } from "../../utils/responsiveSize";

export const styles = StyleSheet.create({
    modalContainer: {
      backgroundColor: color.WHITE,
      height: '100%',
      borderTopRightRadius: moderateScaleVertical(20),
      borderTopLeftRadius: moderateScaleVertical(20),
      paddingTop: moderateScaleVertical(20),
    },
  });
  
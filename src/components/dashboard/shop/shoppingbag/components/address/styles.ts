import { StyleSheet } from "react-native";
import { color } from "../../../../../../assets/colorConstant";
import { moderateScale } from "../../../../../utils/responsiveSize";

export const styles = StyleSheet.create({
  topContainer: {
    height: '93%',
  },
  container: {
    backgroundColor: color.WHITE,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: {
    marginBottom: moderateScale(50),
  },
  addressList: {
    margin: moderateScale(16),
  },
  shadowView: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: color.shadow,
  },
})
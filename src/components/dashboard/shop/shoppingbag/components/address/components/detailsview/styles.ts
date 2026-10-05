import { StyleSheet } from "react-native";
import { color } from "../../../../../../../../assets/colorConstant";
import { CommonStyles } from "../../../../../../../../assets/commonStyles";
import { moderateScaleVertical ,moderateScale} from "../../../../../../../utils/responsiveSize";

export const styles = StyleSheet.create({
  detailSection:{
    marginTop: moderateScaleVertical(8.2),
    flexDirection:'row',
  },
  imageSection:{
    marginTop: moderateScaleVertical(3),
  },
  textStyles:{
    ...CommonStyles.tpp_p3,
    color : color.INPUT_TEXT,
    lineHeight: moderateScaleVertical(18),
    marginLeft: moderateScale(8),
    marginRight: moderateScale(8),
  },
})
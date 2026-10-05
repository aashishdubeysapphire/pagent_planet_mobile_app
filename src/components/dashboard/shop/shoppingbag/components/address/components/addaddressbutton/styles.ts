import { StyleSheet } from "react-native";
import { color } from "../../../../../../../../assets/colorConstant";
import { CommonStyles } from "../../../../../../../../assets/commonStyles";
import { moderateScaleVertical ,moderateScale} from "../../../../../../../utils/responsiveSize";

export const styles = StyleSheet.create({

 container :{
    backgroundColor: color.WHITE,
    width: moderateScale(220),
    borderWidth:1,
    borderColor: color.P_PINK,
    borderRadius: moderateScale(20),
    paddingVertical: moderateScaleVertical(8),
    alignItems:'center',
    justifyContent:'center',
    alignSelf: 'center'
  },
  buttonStyles:{
    ...CommonStyles.latoBoldWhite14,
    color : color.P_PINK,
    lineHeight : moderateScaleVertical(24)
  }
})
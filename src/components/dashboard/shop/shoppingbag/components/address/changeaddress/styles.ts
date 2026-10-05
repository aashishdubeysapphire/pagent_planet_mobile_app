import { StyleSheet } from "react-native";
import { color } from "../../../../../../../assets/colorConstant";
import { CommonStyles } from "../../../../../../../assets/commonStyles";
import { moderateScaleVertical ,moderateScale} from "../../../../../../utils/responsiveSize";

export const styles = StyleSheet.create({

 container :{
    backgroundColor: color.WHITE,
    flex: 1,
    paddingBottom : moderateScaleVertical(16),
  },
  wrapper:{
    marginTop: moderateScaleVertical(16),
    paddingHorizontal: moderateScale(16),
  },
  heading:{
    ...CommonStyles.robotoMedium16,
    lineHeight: moderateScaleVertical(22)
  },
  divider:{
    height: moderateScaleVertical(12),
    backgroundColor: color.S_GRAY_1,
    width: '100%',
    marginTop: moderateScaleVertical(16),
  },
  footerStyles:{
     height : moderateScaleVertical(40)
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(8),
    textAlign: 'center',
    marginBottom: 'auto',
    lineHeight: moderateScaleVertical(24),
  },
})
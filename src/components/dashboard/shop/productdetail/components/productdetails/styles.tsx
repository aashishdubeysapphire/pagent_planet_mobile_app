import { StyleSheet } from "react-native";
import { color } from "../../../../../../assets/colorConstant";
import { CommonStyles } from "../../../../../../assets/commonStyles";
import { moderateScale, moderateScaleVertical } from "../../../../../utils/responsiveSize";

export const styles = StyleSheet.create({
    heading:{
        ...CommonStyles.tpp_h2,
        color:color.BLACK,
        marginHorizontal:moderateScale(16),
        ...CommonStyles.capitalizedCase
    },
    continer:{
        paddingVertical:moderateScaleVertical(24),
        backgroundColor:color.WHITE
    },
    bottomView:{
        height:moderateScaleVertical(8),
        backgroundColor:color.WHITE
    },
    listView: {
        marginLeft: moderateScale(16),
        marginTop:moderateScaleVertical(24)
      },
      cardStyle: {
        marginRight: moderateScale(12),
      },

})
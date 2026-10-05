import { StyleSheet } from "react-native";
import { color } from "../../../../../../assets/colorConstant";
import { CommonStyles } from "../../../../../../assets/commonStyles";
import { moderateScale, moderateScaleVertical } from "../../../../../utils/responsiveSize";

export const styles = StyleSheet.create({ 

    modalHeading: {
        ...CommonStyles.tpp_h3,
        marginTop: 'auto',
        marginBottom: 'auto',
        textTransform: 'capitalize',
        paddingBottom:moderateScaleVertical(16)
        
      },
      headingView: {
        flexDirection: 'row',
      },
      crossIcon: {
        marginLeft: 'auto',
      },
      countriesOvel: {
        borderColor: color.S_GRAY_2,
        borderWidth: 1,
        backgroundColor: color.WHITE,
        paddingVertical: moderateScaleVertical(6),
        paddingHorizontal: moderateScale(12),
        borderRadius: 100,
        marginRight: moderateScale(4),
        marginBottom: moderateScaleVertical(4),
      },
      wrapView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom:moderateScaleVertical(40)
      },
      countryName:{
        ...CommonStyles.tpp_p4,
        ...CommonStyles.capitalizedCase,
        marginTop: 'auto',
        marginBottom: 'auto',
        color:color.BLACK
    
      }
})
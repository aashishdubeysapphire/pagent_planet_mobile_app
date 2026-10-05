import { StyleSheet } from "react-native";
import { color } from "../../../../../../../../../assets/colorConstant";
import { CommonStyles } from "../../../../../../../../../assets/commonStyles";
import { moderateScale, moderateScaleVertical } from "../../../../../../../../utils/responsiveSize";

export const styles = StyleSheet.create({

    subHeading: {
        ...CommonStyles.tpp_s3,
        marginTop: moderateScaleVertical(24),
        textAlign: 'center',
        marginBottom: moderateScaleVertical(12),
      },
      customStylesTaj: {
        marginHorizontal: moderateScale(6),
      },
      customRatingStyles: {
        paddingHorizontal: moderateScale(43),
        paddingVertical: moderateScaleVertical(16),
        backgroundColor: color.S_PINK,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 100,
      },
})
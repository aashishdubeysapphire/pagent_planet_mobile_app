import { StyleSheet } from "react-native";
import { color } from "../../../../../../../assets/colorConstant";
import { CommonStyles } from "../../../../../../../assets/commonStyles";
import { moderateScaleVertical ,moderateScale} from "../../../../../../utils/responsiveSize";

export const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: color.WHITE,
    paddingHorizontal: moderateScale(16),
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    flex:1,
  },
  crossIcon: {
    marginTop: moderateScaleVertical(16),
    alignSelf:'flex-end',
  },
  headingArea:{
    marginTop: moderateScaleVertical(32),
    alignItems: 'center',
    marginBottom : moderateScaleVertical(16),
  },
  headingStyles:{
    ...CommonStyles.tpp_h2,
    lineHeight: moderateScaleVertical(24),
    color : color.BLACK
  },
  subHeading:{
    ...CommonStyles.tpp_p2,
    color: color.BLACK,
    marginTop: moderateScaleVertical(8),
    textAlign:'center'
  },
  flatListStyle:{
    // height : moderateScaleVertical(480),
    marginTop : moderateScaleVertical(16),
    flex: .96
  },
  infoStyles:{
    ...CommonStyles.tpp_p2,
    color: color.BLACK,
    marginTop: moderateScaleVertical(8),
  },
  flatlistHeaderStyles:{
    alignItems:"center",
    marginTop: moderateScaleVertical(28),
  },
  customButtonStyles:{
    width : moderateScale(230),
    alignSelf:'center',
  },
  staticBottomSection:{
    marginBottom : moderateScaleVertical(100),
  }
})
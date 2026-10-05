import { StyleSheet} from 'react-native';
import { color } from '../../../../../assets/colorConstant';
import { CommonStyles } from '../../../../../assets/commonStyles';
import {moderateScale, moderateScaleVertical, } from '../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    paddingVertical: moderateScaleVertical(16),
    paddingLeft: moderateScale(8),
    marginTop: moderateScaleVertical(8)
  },
  nameSection:{
    flexDirection: 'row', 
    alignItems: 'center',
  },
  nameStyles:{
    ...CommonStyles.robotoMedium14,
    lineHeight: moderateScaleVertical(20),
    textTransform : 'capitalize',
  },
  profileNameStyle:{
     ...CommonStyles.tpp_s1,
    lineHeight: moderateScaleVertical(12),
    color : color.S_GRAY_4,
    marginLeft: moderateScale(8),
    fontWeight: '500',
  },
  dateTimeStyle:{
    ...CommonStyles.tpp_s1,
    lineHeight: moderateScaleVertical(12),
    marginLeft: moderateScale(5),
    fontWeight: '500',
  },
  middleSection:{
    marginLeft: moderateScale(8),
    height: moderateScaleVertical(60),
  },
  unreadMessagesCircle:{
    width: moderateScale(8),
    aspectRatio:1,
    backgroundColor: color.P_PINK,
    borderRadius: moderateScale(8),
    alignSelf:"center",
   },
   imageView:{
     marginLeft: moderateScale(8),
     marginTop: isIosDevice() ? moderateScaleVertical(1.5) : 0,
   },
   infoSection:{
     flexDirection:'row',
     alignItems:"center",
   },
   textMsg:{
     ...CommonStyles.tpp_p3,
     marginTop: moderateScaleVertical(4),
     lineHeight: moderateScaleVertical(18),
     paddingRight: moderateScale(16)
   },
   importIconStyle:{
    transform: [{ rotate: '180deg'}]
   }, 
   emptyCircle:{
     width: moderateScale(20),
     borderRadius: moderateScale(10),
     aspectRatio:1,
     borderWidth: moderateScale(2),
     borderColor: color.S_GRAY_3,
     alignSelf:'center', 
     marginHorizontal : moderateScale(8),
  },
  selectedIcon:{
     marginHorizontal: moderateScale(8),
     alignSelf:'center'
  },
  incomingSection:{
    flexDirection:'row',
    alignItems:'center',
    marginTop: moderateScaleVertical(4),
  }
});

import { StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  width
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  dropdownContainer: {
    position: 'absolute',
    backgroundColor: color.WHITE,
    top: moderateScaleVertical(108),
    width: width - moderateScale(72),
    marginHorizontal : moderateScale(16),
    borderWidth: 1,
    borderColor: color.WHITE,
    height : moderateScaleVertical(160),
    zIndex : 1000,
    alignSelf:'center',
    borderRadius: moderateScale(20),
    shadowColor:  color.BLACK ,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginLeft: moderateScale(8),
    marginTop: moderateScale(8),
  },
  itemView:{
    marginTop : moderateScaleVertical(16),
    marginHorizontal : moderateScale(16),
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  selectedText:{
    ...CommonStyles.tpp_p2,
    lineHeight: moderateScaleVertical(20),
    color : color.INPUT_TEXT
  }
});

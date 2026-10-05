import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  topHeight: {
    height: moderateScaleVertical(16),
  },
  heading: {
    ...CommonStyles.tpp_s3,
    marginBottom: moderateScaleVertical(16),
  },
  rowView: {
    flexDirection: 'row',
  },
  subView: {
    marginHorizontal: moderateScale(16),
  },
  negativeSubView:{
    marginHorizontal: moderateScale(-16),

  },
  filterStyles: {
    marginLeft: 'auto',
    flexDirection:"row",
    // alignItems:"center"
  },
  continer: {
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
    padding: moderateScale(16),
    borderRadius: 20,
    marginBottom: moderateScaleVertical(16),
  },
  name: {
    ...CommonStyles.tpp_h5,
    fontSize: textScale(14),
    width:"70%"
  },
  viewDetails: {
    ...CommonStyles.latoBoldBlack12,
    color: color.P_PINK,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
  },
  height:{
    height:moderateScaleVertical(100)
  },
  topEmpty:{
    marginTop:moderateScaleVertical(64),
    marginRight: 'auto',
    marginLeft: 'auto',
  },filterAppliedCircleContainer: {
    height: moderateScaleVertical(6),
    aspectRatio:1,
    marginTop:moderateScaleVertical(8),
    borderRadius:100,
    marginRight:2,
    backgroundColor: color.P_PINK,
  },
});

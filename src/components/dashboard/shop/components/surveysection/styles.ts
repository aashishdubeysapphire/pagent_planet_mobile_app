import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  wrapper:{
    height: width/2 - moderateScale(24) + moderateScaleVertical(34),
  },
  container: {
    borderRadius: moderateScale(25),
    borderColor: color.S_GRAY_2,
    borderWidth: 1,
    paddingBottom: 0,
    backgroundColor: color.S_GRAY_1,
    width : width/2 - moderateScale(24),
    marginRight : moderateScale(16),
    marginTop: -moderateScaleVertical(40),
  },
  imageSection: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeStyles: {
    ...CommonStyles.latoSemiBold12,
    lineHeight: moderateScaleVertical(16),
    marginLeft : moderateScale(8),
  },
  bottomSection: {
    flexDirection: 'row',
    height: moderateScaleVertical(40),
    width: width/2 - moderateScale(44),
    alignItems: 'center',
    backgroundColor: color.WHITE,
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
    justifyContent: 'center',
    borderColor: color.S_GRAY_2,
    borderWidth: 1,
    paddingTop: moderateScaleVertical(6),
    marginLeft : moderateScale(11),
    top: width/2 - moderateScale(32),
  },
});

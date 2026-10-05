import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale
} from '../../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: color.WHITE,
    borderRadius: moderateScale(30),
    padding: moderateScaleVertical(16),
  },
  container: {
    width: '100%',
    height: 'auto',
    maxHeight: moderateScaleVertical(580),
    marginBottom: moderateScaleVertical(8),
    marginTop: moderateScaleVertical(12),
  },
  headerArea: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  detailsSection: {
    flexDirection: 'row',
  },
  imageSection: {
    width: moderateScaleVertical(50),
    height: moderateScaleVertical(50),
    justifyContent: 'center',
  },
  nameAndReview: {
    flexDirection: 'column',
    marginLeft: moderateScale(8),
    justifyContent: 'center',
  },
  reviewerNameStyles: {
    ...CommonStyles.robotoMedium14,
    marginBottom: moderateScaleVertical(5),
  },
  bodyLabelStyles: {
    ...CommonStyles.tpp_h5,
    lineHeight: moderateScaleVertical(18),
    fontWeight: '400',
  },
  headingStyles:{
    ...CommonStyles.tpp_h5,
    marginVertical: moderateScaleVertical(8),
    fontSize: textScale(14),
    lineHeight: moderateScaleVertical(20),
  }
});

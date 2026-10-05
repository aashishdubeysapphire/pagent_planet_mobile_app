import {StyleSheet} from 'react-native';
import {CommonStyles} from '../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: moderateScale(16),
  },
  tabContainer: {
    flex: 1,
    paddingBottom: moderateScaleVertical(100),
  },

  headingContainer: {
    marginTop: moderateScaleVertical(24),
    flexDirection: 'row',
  },
  subHeading: {
    ...CommonStyles.tpp_h5,
    marginRight: 'auto',
    fontSize: textScale(14),
  },

  topHeight: {
    height: moderateScaleVertical(24),
  },
  bottomHeight: {
    height: moderateScaleVertical(60),
  },
  noDataImg:{
    width:width,
    resizeMode:"contain",
    marginTop: "30%",
  }
});

import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../assets/commonStyles';
import { font } from '../../../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  refershLoaderContainer: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  eventHeadingArea: {
    flexDirection: 'row',
    paddingLeft: moderateScale(16),
    marginTop: moderateScaleVertical(24),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: moderateScale(16),
  },
  staticHeight: {
    height: moderateScaleVertical(200),
  },
  flatlistContainer: {
    height: '100%',
    marginStart: moderateScaleVertical(-16),
    marginEnd: moderateScaleVertical(16),
  },
  headingLabel: {
    ...CommonStyles.robotoMedium14,
  },
  flatlistView: {
    marginTop: moderateScaleVertical(20),
  },
  simmerContainer: {
    marginStart: moderateScaleVertical(16),
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    marginBottom: 'auto',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
  showTapButton: {
    marginTop: moderateScaleVertical(16),
    alignItems: 'center',
    flexDirection: 'row',
    height: moderateScaleVertical(16),
  },
  tapButton: {
    ...CommonStyles.tpp_s2,
    lineHeight: moderateScaleVertical(18),
    color: color.P_PINK,
  },
  contestantLabel:{
    ...CommonStyles.tpp_s2,
    lineHeight: moderateScaleVertical(18),
    color: color.BLACK,
    fontFamily: font.RobotoRegular
  }
});

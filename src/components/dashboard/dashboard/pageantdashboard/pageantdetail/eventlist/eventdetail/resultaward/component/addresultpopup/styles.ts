import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  crossButtonContainer: {
    marginLeft: 'auto',
    marginBottom: moderateScaleVertical(24),
  },
  imageSection: {
    alignItems: 'center',
  },
  mainimage: {
    width: moderateScale(331),
    height: moderateScaleVertical(279),
    marginHorizontal: moderateScaleVertical(16),
  },
  heading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    marginTop: moderateScaleVertical(37),
    marginBottom: moderateScaleVertical(16),
  },
  filledRatingStyle: {
    width: moderateScale(10),
    height: moderateScaleVertical(7),
    marginRight: moderateScale(8),
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  rowView: {
    marginBottom: moderateScaleVertical(8),
    flexDirection: 'row',
  },
  pointersText: {
    ...CommonStyles.tpp_p2,
    color: color.BLACK,
    lineHeight: moderateScaleVertical(20),
  },
  buttonView: {
    marginTop: 'auto',
    marginBottom: 'auto',
    width: moderateScale(236),
    height: moderateScaleVertical(42),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.P_PINK,
    borderRadius: 30,
    alignSelf: 'center',
  },
  addResultLabel: {
    ...CommonStyles.latoBoldWhite14,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});

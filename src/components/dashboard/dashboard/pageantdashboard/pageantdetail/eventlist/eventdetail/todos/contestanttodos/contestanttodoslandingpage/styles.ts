import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  crossView: {
    marginLeft: 'auto',
    marginBottom: moderateScaleVertical(22),
  },
  imageSection: {
    alignItems: 'center',
  },
  mainimage: {
    width: moderateScale(321),
    height: moderateScaleVertical(239),
  },
  heading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    marginTop: moderateScaleVertical(32),
    marginBottom: moderateScaleVertical(16),
  },
  filledRatingIcon: {
    width: moderateScale(10),
    height: moderateScaleVertical(7),
    marginRight: moderateScale(8),
    marginTop: moderateScaleVertical(6),
  },
  rowView: {
    flexDirection: 'row',
  },
  pointersText: {
    ...CommonStyles.tpp_p2,
    marginBottom: moderateScaleVertical(8),
    lineHeight: moderateScaleVertical(20),
    color: color.BLACK,
    maxWidth: '90%',
  },
  buttonView: {
    marginTop: moderateScaleVertical(32),
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

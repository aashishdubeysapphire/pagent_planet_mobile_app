import {StyleSheet} from 'react-native';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {color} from '../../../../../../../assets/colorConstant';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  clickableText: {
    ...CommonStyles.latoBoldBlack12,
    color: color.P_PINK,
    marginTop: moderateScaleVertical(12),
    marginLeft: 'auto',
  },
  crossIcon: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  noteText: {
    ...CommonStyles.tpp_s2,
    marginTop: moderateScaleVertical(8),
    marginRight: moderateScale(4),
  },
  requestText: {
    ...CommonStyles.tpp_p3,
    color: color.S_GRAY_4,
    ...CommonStyles.capitalizedCase,
  },
  requestSharedToAdmin: {
    ...CommonStyles.tpp_p2,
    color: color.P_GRAY_BLACK_1,
    textAlign: 'center',
    marginTop: moderateScaleVertical(60),
    marginHorizontal: moderateScale(30),
    ...CommonStyles.capitalizedCase,
  },
});

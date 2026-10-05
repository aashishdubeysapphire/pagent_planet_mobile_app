import { StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {CommonStyles} from '../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../utils/responsiveSize';
import { isIosDevice } from '../../../utils/helperFunction';

export const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  headerImg: {
    width: '100%',
    height: moderateScaleVertical(38),
  },

  modalHeading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    marginBottom: 'auto',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
  TIckView: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(16),
  },
  addresText: {
    ...CommonStyles.latoSemiBold16,
    ...CommonStyles.capitalizedCase,
    fontSize: isIosDevice() ? textScale(13) : textScale(14),
    marginLeft: moderateScale(8),
    color: color.P_GRAY_BLACK_1,
  },
  unselectedTickText: {
    color: color.S_GRAY_4,
  },
  tickIcon: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

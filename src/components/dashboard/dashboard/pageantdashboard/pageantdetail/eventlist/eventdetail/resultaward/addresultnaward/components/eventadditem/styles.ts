import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../../../assets/commonStyles';
import {moderateScaleVertical} from '../../../../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  addItemContainer: {
    backgroundColor: color.S_PINK,
    paddingStart: moderateScaleVertical(16),
    paddingEnd: moderateScaleVertical(16),
    paddingTop: moderateScaleVertical(16),
  },
  closeButtonContainer: {
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: moderateScaleVertical(16),
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    marginBottom: 'auto',
    lineHeight: moderateScaleVertical(24),
  },
  dividerContainer: {
    color: color.P_GRAY_BLACK_1,
    width: 100,
    height: 100,
    position: 'absolute',
  },
  gap: {
    flex: 1,
    backgroundColor: color.S_GRAY_2,
    height: moderateScaleVertical(1),
  },
  addMoreWinners: {
    ...CommonStyles.latoBoldWhite14,
    color: color.P_PINK,
    textAlign: 'right',
    lineHeight: moderateScaleVertical(20),
  },
});

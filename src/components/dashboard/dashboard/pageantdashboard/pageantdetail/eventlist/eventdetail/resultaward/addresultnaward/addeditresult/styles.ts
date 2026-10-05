import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../../assets/commonStyles';
import {moderateScaleVertical} from '../../../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  addItemContainer: {
    backgroundColor: color.S_PINK,
    padding: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(16),
  },
  itemRootContainer: {
    marginStart: moderateScaleVertical(16),
    marginEnd: moderateScaleVertical(16),
  },
  addMoreWinners: {
    ...CommonStyles.latoBoldPink14,
    color: color.P_PINK,
    textAlign: 'right',
    fontWeight: '600',
    lineHeight: moderateScaleVertical(20),
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
    marginBottom: 'auto',
  },
  topContainer: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  container: {
    paddingTop: moderateScaleVertical(16),
    paddingBottom: moderateScaleVertical(16),
  },
  oldPasswordText: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    textAlign: 'center',
  },
  inputFieldView: {
    marginTop: moderateScaleVertical(32),
  },
  buttonView: {
    marginTop: 'auto',
    marginBottom: moderateScaleVertical(20),
  },
});

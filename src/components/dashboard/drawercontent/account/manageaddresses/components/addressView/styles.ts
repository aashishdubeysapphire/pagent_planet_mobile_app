import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {font} from '../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  topContainer: {
    margin: moderateScale(16),
    marginBottom: 0,
  },
  squareContainer: {
    width: '100%',
    padding: moderateScale(16),
    borderRadius: moderateScale(20),
    borderColor: color.S_GRAY_2,
    borderWidth: 1,
  },
  wrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  checkBoxArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScaleVertical(12),
  },
  nameSection: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
  },
  nameStyles: {
    ...CommonStyles.robotoMedium14,
    lineHeight: moderateScaleVertical(20),
  },
  defaultStyles: {
    ...CommonStyles.tpp_p3,
    color: color.S_GRAY_4,
    lineHeight: moderateScaleVertical(18),
    marginLeft: moderateScale(4),
    marginRight: moderateScale(8),
  },
  checkboxText: {
    ...CommonStyles.latoBoldWhite14,
    marginLeft: moderateScale(8),
    fontFamily: font.LatoMedium,
    lineHeight: moderateScaleVertical(22),
  },
  editSection: {
    flexDirection: 'row',
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(8),
    textAlign: 'center',
    marginBottom: 'auto',
    lineHeight: moderateScaleVertical(24),
  },
});

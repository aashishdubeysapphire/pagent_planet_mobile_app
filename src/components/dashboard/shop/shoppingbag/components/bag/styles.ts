import { StyleSheet } from 'react-native';
import { color } from '../../../../../../assets/colorConstant';
import { CommonStyles } from '../../../../../../assets/commonStyles';
import { font } from '../../../../../../assets/fonts/fontsConstant';
import {
  moderateScaleVertical,
  moderateScale,
  textScale,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(16),
    backgroundColor: color.WHITE,
  },
  container1: {
    flexGrow: 1,
    height: '90%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bulletUnselected: {
    width: moderateScale(20),
    height: moderateScaleVertical(20),
    marginRight: moderateScale(8),
    borderWidth: 1,
    borderColor: color.S_GRAY_4,
    borderRadius: 3,
    alignSelf: 'center',
  },
  bulletSelected: {
    width: moderateScale(20),
    height: moderateScaleVertical(20),
    marginRight: moderateScale(8),
    backgroundColor: color.WHITE,
    borderRadius: 3,
    alignSelf: 'center',
  },
  button: {
    marginTop: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(64),
    marginHorizontal: moderateScale(16),
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconView: {
    marginRight: moderateScale(12),
  },
  priceView: {
    marginTop: moderateScaleVertical(16),
  },
  price: {
    ...CommonStyles.tpp_s2,
    color: color.P_PINK,
    marginLeft: moderateScale(8)
  },
  greyView: {
    flexDirection: 'row',
    backgroundColor: color.S_GRAY_1,
    height: moderateScaleVertical(38),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: moderateScale(16),
  },
  bagList: {
    marginHorizontal: moderateScale(16),
  },
  selectedCount: {
    color: color.S_GRAY_4,
    fontFamily: font.LatoRegular,
    textAlignVertical: 'center',
    fontSize: textScale(13),
  },
  modalHeading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    textAlign: 'center',
    marginBottom: 'auto',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
});

import {StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  continer: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(16),
    backgroundColor: color.WHITE,
    flex: 1,
  },
  custusInputStyle:{
    paddingHorizontal: moderateScale(16),
  },
  mainContiner: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  ContactDetilsText: {
    ...CommonStyles.tpp_s3,
    color: color.BLACK,
    marginBottom: moderateScaleVertical(16),
  },
  dynamicWidth: {
    width: '48%',
    marginRight: 'auto',
  },
  dynamicWidth2: {
    width: '48%',
    marginLeft: 'auto',
  },
  note: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,
    ...CommonStyles.capitalizedCase,
    marginTop: moderateScaleVertical(-8),
    marginBottom: moderateScaleVertical(16),
  },
  noteText: {
    ...CommonStyles.tpp_p3,
    color: color.S_GRAY_4,
    ...CommonStyles.capitalizedCase,
  },
  seperator: {
    height: moderateScaleVertical(12),
    backgroundColor: color.S_GRAY_1,
    marginBottom:moderateScaleVertical(16)
  },
  rowView: {
    flexDirection: 'row',
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
  buttonView: {
    marginTop: moderateScaleVertical(16),
    marginHorizontal: moderateScale(16),
  },
  headerImg: {
    width: '100%',
    height: moderateScaleVertical(38),
  },
  mar16:{
    marginTop:moderateScaleVertical(16),
    marginBottom:moderateScaleVertical(40)
  }
});

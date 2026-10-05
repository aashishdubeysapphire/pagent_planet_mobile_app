import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {isIosDevice} from '../../../../../utils/helperFunction';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    bottom: 0,
    width: '100%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: color.S_GRAY_1,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(12),
    borderColor: color.shadow,
    borderWidth: 1,
  },
  writeCommentView: {
    flexDirection: 'row',
    width: '100%',
  },
  isEditing: {
    marginBottom: moderateScaleVertical(12),
    flexDirection: 'row',
  },
  crossIcon: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  editReplyText: {
    ...CommonStyles.tpp_s5,
    fontSize: textScale(12),
    color: color.S_GRAY_3,
    marginRight: 'auto',
  },
  dpView: {
    width: moderateScale(48),
    height: moderateScale(48),
    marginTop: 'auto',
    marginBottom: 'auto',
    top: 2.5,
  },
  textInputStyle: {
    flexDirection: 'row',
    maxWidth: '85%',
    minWidth: '85%',
    minHeight: moderateScale(44),
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginHorizontal: moderateScale(8),
    borderRadius: 30,
    paddingVertical: isIosDevice() ? moderateScaleVertical(10) : 0,
    backgroundColor: 'red',
  },
  textinput: {
    ...CommonStyles.tpp_p2,
    maxWidth: '89%',
    minWidth: '89%',
    color: color.BLACK,
    paddingHorizontal: moderateScale(16),
    maxHeight: moderateScaleVertical(80),
    borderRadius: 50,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  hitapiButton: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

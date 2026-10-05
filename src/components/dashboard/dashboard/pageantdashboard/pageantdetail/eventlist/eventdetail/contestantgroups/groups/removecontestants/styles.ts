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
    backgroundColor: color.WHITE,
  },
  selectedList: {
    backgroundColor: color.S_PINK,
    height: moderateScaleVertical(71),
    paddingLeft: moderateScale(18),
    alignItems: 'flex-start',
  },
  pinkRoundImage: {
    marginRight: moderateScale(8),
    marginTop: moderateScaleVertical(9),
  },
  selectedText: {
    ...CommonStyles.tpp_s5,
    textAlign: 'center',
    marginTop: moderateScaleVertical(4),
    width: moderateScale(44),
  },
  crossView: {
    position: 'absolute',
    zIndex: 1000,
    right: 0,
    top: -3,
  },
  touchableText: {
    ...CommonStyles.latoBoldWhite14,
    color: color.P_PINK,
  },
  textView: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(12),
    paddingHorizontal: moderateScale(16),
  },
  textcenter: {
    ...CommonStyles.tpp_s2,
  },
  searchTextInput: {
    ...CommonStyles.tpp_size18,
    marginTop: 'auto',
    marginBottom: 'auto',
    padding: 0,
    width: '100%',
    marginHorizontal: moderateScale(16),
    height: moderateScaleVertical(22),
  },
  searchingView: {
    borderBottomWidth: 1,
    borderBottomColor: color.LIGHT_GREY,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(16),
  },
  subView: {
    marginHorizontal: moderateScale(16),
    marginTop: moderateScaleVertical(16),
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: 'auto',
    lineHeight: moderateScaleVertical(24),
    marginTop: moderateScaleVertical(20),
  },
});

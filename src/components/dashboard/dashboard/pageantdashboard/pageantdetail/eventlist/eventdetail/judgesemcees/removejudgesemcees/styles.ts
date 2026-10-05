import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../utils/responsiveSize';

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
  pinkCircleImage: {
    marginRight: moderateScale(8),
    marginTop: moderateScaleVertical(9),
  },
  selectedTitel: {
    ...CommonStyles.tpp_s5,
    width: moderateScale(44),
    textAlign: 'center',
    marginTop: moderateScaleVertical(4),
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
    paddingHorizontal: moderateScale(16),
    flexDirection: 'row',
    marginTop: moderateScaleVertical(12),
  },
  selectTextCenter: {
    ...CommonStyles.tpp_s2,
  },
  searchTextInput: {
    ...CommonStyles.tpp_size18,
    height: moderateScaleVertical(22),
    marginTop: 'auto',
    marginBottom: 'auto',
    padding: 0,
    width: '100%',
    marginHorizontal: moderateScale(16),
  },
  searchingViewContainer: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(16),
    borderBottomWidth: 1,
    borderBottomColor: color.LIGHT_GREY,
    flexDirection: 'row',
  },
  subView: {
    marginHorizontal: moderateScale(16),
    marginTop: moderateScaleVertical(16),
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
    marginBottom: 'auto',
  },
});

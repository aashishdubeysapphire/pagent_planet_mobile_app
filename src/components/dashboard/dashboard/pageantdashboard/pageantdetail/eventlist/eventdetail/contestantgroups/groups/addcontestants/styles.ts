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
  submainView: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
    marginTop: moderateScaleVertical(16),
  },
  selectedList: {
    height: moderateScaleVertical(71),
    backgroundColor: color.S_PINK,
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
    width: moderateScale(44),
    marginTop: moderateScaleVertical(4),
  },
  closeImageView: {
    position: 'absolute',
    zIndex: 1000,
    right: 0,
    top: -3,
  },
  touchableTextcontainer: {
    ...CommonStyles.latoBoldWhite14,
    color: color.P_PINK,
  },
  textView: {
    paddingHorizontal: moderateScale(16),
    flexDirection: 'row',
    marginTop: moderateScaleVertical(12),
  },
  textCentercontainer: {
    ...CommonStyles.tpp_s2,
  },

  searchingView: {
    paddingVertical: moderateScaleVertical(16),
    borderBottomWidth: 1,
    paddingHorizontal: moderateScale(16),
    borderBottomColor: color.LIGHT_GREY,
    flexDirection: 'row',
  },
  searchTextInput: {
    ...CommonStyles.tpp_size18,
    marginTop: 'auto',
    marginBottom: 'auto',
    height: moderateScaleVertical(22),
    padding: 0,
    width: '100%',
    marginHorizontal: moderateScale(16),
  },

  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    marginBottom: 'auto',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
});

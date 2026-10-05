import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  pinkUserRoundImage: {
    marginRight: moderateScale(8),
    marginTop: moderateScaleVertical(9),
  },
  selectedText: {
    ...CommonStyles.tpp_s5,
    width: moderateScale(44),
    marginTop: moderateScaleVertical(4),
    textAlign: 'center',
  },
  crossView: {
    position: 'absolute',
    zIndex: 1000,
    right: 0,
    top: -3,
  },
  mainView: {
    flex: 1,
    backgroundColor: color.WHITE,
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
  textcenter: {
    ...CommonStyles.tpp_s2,
  },

  searchingView: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(16),
    borderBottomColor: color.LIGHT_GREY,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  searchTextInput: {
    ...CommonStyles.tpp_size18,
    marginTop: 'auto',
    marginBottom: 'auto',
    padding: 0,
    width: '100%',
    height: moderateScaleVertical(22),
    marginHorizontal: moderateScale(16),
  },
  addNewJudgeView: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(16),
    marginLeft: moderateScale(16),
  },
  addJudge: {
    ...CommonStyles.tpp_h5,
    color: color.P_PINK,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: moderateScale(8),
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
    marginBottom: 'auto',
  },
  submainView: {
    flex: 1,
    marginTop: moderateScaleVertical(16),
  },
  selectedList: {
    backgroundColor: color.S_PINK,
    height: moderateScaleVertical(71),
    paddingLeft: moderateScale(18),
    alignItems: 'flex-start',
  },
});

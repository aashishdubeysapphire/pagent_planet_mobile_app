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
  submainView: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
    marginTop: moderateScaleVertical(16),
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
  textSelectedView: {
    paddingHorizontal: moderateScale(16),
    flexDirection: 'row',
    marginTop: moderateScaleVertical(12),
  },
  textcenter: {
    ...CommonStyles.tpp_s2,
  },
  freeHeight: {
    marginBottom: moderateScaleVertical(570),
  },
  searchingView: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(16),
    borderBottomWidth: 1,
    borderBottomColor: color.LIGHT_GREY,
    flexDirection: 'row',
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
  addNewJudgeView: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(16),
    marginLeft: moderateScale(16),
  },
  addJudgeText: {
    ...CommonStyles.tpp_h5,
    color: color.P_PINK,
    marginLeft: moderateScale(8),
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(20),
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: 'auto',
    lineHeight: moderateScaleVertical(24),
  },
});

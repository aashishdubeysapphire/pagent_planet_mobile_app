import {StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {CommonStyles} from '../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  filterButtonContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateScaleVertical(60),
  },
  loader: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    minHeight: moderateScaleVertical(100),
    maxHeight: moderateScaleVertical(100),
  },

  searchBOx: {
    backgroundColor: color.WHITE,
    flexDirection: 'row',
    marginEnd: moderateScaleVertical(16),
    marginStart: moderateScaleVertical(16),
    maxHeight: moderateScaleVertical(44),
    minHeight: moderateScaleVertical(44),
    marginBottom: moderateScaleVertical(11),
  },

  searchTextinput: {
    flex: 1,
    paddingStart: moderateScale(18),
    paddingVertical: moderateScaleVertical(12),
    marginBottom: moderateScaleVertical(-16),
    ...CommonStyles.tpp_p2,
    color: color.BLACK,
  },
  searchImage: {
    marginTop: 'auto',
    marginLeft: 'auto',
    marginBottom: moderateScaleVertical(1),
  },

  filterTextContainer: {
    ...CommonStyles.latoBoldPink14,
    fontWeight: '700',
    color: color.INPUT_TEXT,
    marginStart: moderateScaleVertical(8),
    lineHeight: moderateScaleVertical(17),
  },

  bottomFilterContainer: {
    flexDirection: 'row',
    maxHeight: moderateScaleVertical(60),
    borderTopLeftRadius: moderateScaleVertical(20),
    borderTopRightRadius: moderateScaleVertical(20),
    backgroundColor: color.S_GRAY_1,
  },
  bottomFilterShadowContainer: {
    height: moderateScaleVertical(62),
    borderTopLeftRadius: moderateScaleVertical(20),
    borderTopRightRadius: moderateScaleVertical(20),
    backgroundColor: color.shadow,
    justifyContent: 'flex-end',
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  filterAppliedCircle: {
    minHeight: moderateScaleVertical(6),
    minWidth: moderateScaleVertical(6),
    marginStart: moderateScaleVertical(8),
    borderRadius: moderateScaleVertical(6),
    backgroundColor: color.P_PINK,
  },

  bottomLine: {
    height: 0.7,
    backgroundColor: color.BLACK,
    opacity: 0.2,
  },
  listContainer: {
    flex: 1,
    paddingTop: moderateScaleVertical(16),
    backgroundColor: color.WHITE,
  },
  filterButtonDividerContainer: {
    height: moderateScaleVertical(30),
    borderTopRightRadius: moderateScaleVertical(20),
    backgroundColor: color.S_GRAY_3,
    alignSelf: 'center',
    width: moderateScaleVertical(1),
  },
});

import { StyleSheet} from 'react-native';
import {color} from '../../../../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../../../../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: color.WHITE,
    flex: 1,
  },
  circleImageContainer: {
    left: 0,
    marginTop: moderateScaleVertical(1),
    marginStart: moderateScaleVertical(-0.8),
  },
  noRecordContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: -moderateScaleVertical(16),
  },
  tick: {
    alignSelf: 'center',
  },
  crossIcon: {
    marginLeft: 'auto',
  },
  selectiontext: {
    ...CommonStyles.tpp_h4,
    marginStart: moderateScaleVertical(16),
    marginEnd: moderateScaleVertical(16),
    color: color.BLACK,
    flex: 1,
  },
  selectionName: {
    ...CommonStyles.robotoMedium16,
    marginStart: moderateScaleVertical(16),
    marginEnd: moderateScaleVertical(16),
    color: color.P_PINK,
    alignSelf: 'center',
    flex: 1,
  },

  textView: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(20),
  },
  bottomContainer2: {
    marginBottom:
      isIosDevice()
        ? moderateScaleVertical(54)
        : moderateScaleVertical(10),
  },

  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: 'auto',
    marginBottom: 'auto',
    textTransform: 'capitalize',
    lineHeight: moderateScaleVertical(24),
  },
  headingView: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(5),
  },

  searchBOx: {
    height: moderateScaleVertical(44),
    borderColor: color.S_GRAY_2,
    backgroundColor: color.S_GRAY_1,
    borderWidth: moderateScaleVertical(1),
    borderRadius: moderateScaleVertical(30),
    flexDirection: 'row',
    marginTop: moderateScaleVertical(20),
    marginBottom: moderateScaleVertical(10),
  },
  searchTextinput: {
    flex: 0.9,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScaleVertical(12),
    ...CommonStyles.tpp_p2,
    color: color.BLACK,
  },
  searchImage: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: moderateScaleVertical(-5),
  },
  selectedText: {
    marginLeft: 'auto',
    ...CommonStyles.tpp_s2,
    marginTop: moderateScaleVertical(12),
  },
  bottomContainer: {
    flexDirection: 'row',
    marginEnd: moderateScale(8),
    justifyContent: 'space-between',
    marginTop: moderateScaleVertical(8),
  },

  row: {
    flexDirection: 'row',
    paddingBottom: moderateScaleVertical(8),
    paddingTop: moderateScaleVertical(8),
  },
});

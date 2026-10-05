import { StyleSheet} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  searchBox: {
    borderColor: color.S_GRAY_2,
    backgroundColor: color.S_GRAY_1,
    borderWidth: 1,
    borderRadius: moderateScaleVertical(22),
    flexDirection: 'row',
    marginHorizontal: moderateScaleVertical(16),
    marginVertical: moderateScale(16),
    maxHeight: moderateScaleVertical(44),
    minHeight: moderateScaleVertical(44),
    alignItems: 'center',
  },
  searchTextinput: {
    ...CommonStyles.tpp_p2,
    color: color.S_GRAY_3,
    paddingLeft: moderateScale(24),
  },
  freeHeight: {
    marginBottom: moderateScaleVertical(10),
  },
  searchTextOption: {
    ...CommonStyles.tpp_p2,
    color: color.P_PINK,
    marginTop:
      isIosDevice()
        ? moderateScaleVertical(12)
        : moderateScaleVertical(10),
    marginBottom: moderateScaleVertical(5),
    paddingLeft: moderateScale(2),
  },
  searchImage: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginStart: moderateScaleVertical(14),
    marginRight: moderateScale(18),
  },
});

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
  subView: {
    marginTop: moderateScale(16),
    marginBottom: moderateScaleVertical(48),
    paddingHorizontal: moderateScaleVertical(16),
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
  outerview: {
    backgroundColor: color.TRANSPARNT,
    flex: 1,
  },
  innerview: {
    position: 'absolute',
    right: 0,
    top: moderateScale(70),
    backgroundColor: color.WHITE,
    borderRadius: 20,
    marginHorizontal: moderateScale(10),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(10),
    ...CommonStyles.shadow,
  },
  staticCardLable: {
    ...CommonStyles.tpp_p2,
    color: color.INPUT_TEXT,
  },
  cardTouch: {
    flexDirection: 'row',
    paddingVertical: moderateScale(8),
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  staticheightView: {
    height: moderateScale(12),
  },
  staticCadImage: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingRight: moderateScale(10),
  },
});

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
  subViewContainer: {
    marginTop: moderateScale(16),
    marginBottom: moderateScaleVertical(48),
    marginHorizontal: moderateScaleVertical(16),
  },
  searchingViewcontainer: {
    borderBottomWidth: 1,
    borderBottomColor: color.LIGHT_GREY,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(16),
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
  outerview: {
    backgroundColor: color.TRANSPARNT,
    flex: 1,
  },
  innerview: {
    position: 'absolute',
    right: 0,
    backgroundColor: color.WHITE,
    borderRadius: 20,
    paddingHorizontal: moderateScale(16),
    top: moderateScale(70),
    marginHorizontal: moderateScale(10),
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

  staticCardImage: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingRight: moderateScale(10),
  },
});

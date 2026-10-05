import {StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {CommonStyles} from '../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  imageView: {
    width: moderateScale(48),
    aspectRatio: 1,
  },
  listView: {
    flexDirection: 'row',
    marginHorizontal: moderateScaleVertical(16),
    marginTop: 1,
  },
  nameText: {
    ...CommonStyles.tpp_h4,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: moderateScale(12),
    width: moderateScale(280),
  },
  itemSeperator: {
    height: moderateScaleVertical(16),
  },
  height: {
    height: moderateScaleVertical(16),
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
  horizontalCenter: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
});

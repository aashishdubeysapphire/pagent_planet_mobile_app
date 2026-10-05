import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';
import {font} from '../../../../../../assets/fonts/fontsConstant';
export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.WHITE,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  lineStyles: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  item: {
    marginTop: moderateScaleVertical(12),
    marginLeft: moderateScale(16),
    flexDirection: 'row',
  },
  name: {
    ...CommonStyles.tpp_h4,
  },
  selectedName: {
    ...CommonStyles.tpp_s3,
    color: color.P_PINK,
    marginRight: 'auto',
  },
  header: {
    marginTop: moderateScaleVertical(12),
    marginLeft: moderateScale(16),
    flexDirection: 'row',
  },
  heading: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
  },

  sectionIndex: {
    margin: moderateScale(5),
    alignItems: 'center',
    width: moderateScale(16),
  },
  indexItem: {
    ...CommonStyles.tpp_s1,
  },
  indexContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableText: {
    ...CommonStyles.latoBoldPink14,
    fontFamily: font.LatoBold,
    lineHeight: moderateScaleVertical(20),
  },
  textView: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(16),
    marginHorizontal: moderateScale(16),
  },
  selectedText: {
    ...CommonStyles.tpp_s2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  alpabetTouch: {
    width: moderateScale(35),
    alignItems: 'center',
    height: moderateScale(12),
  },
});

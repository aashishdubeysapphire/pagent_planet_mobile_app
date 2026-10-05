import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
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
    alignItems: 'center',
  },
  circleView: {
    borderRadius: 100,
    borderWidth: 1,
    width: moderateScale(14),
    height: moderateScaleVertical(14),
    borderColor: color.S_GRAY_4,
  },
  name: {
    ...CommonStyles.tpp_h4,
    marginLeft: moderateScale(12),
    fontSize: textScale(14),
    lineHeight: moderateScaleVertical(20),
  },
  selectedName: {
    ...CommonStyles.tpp_s3,
    color: color.P_PINK,
    fontSize: textScale(14),
    marginRight: 'auto',
    marginLeft: moderateScale(12),
    lineHeight: moderateScaleVertical(20),
  },
  header: {
    marginTop: moderateScaleVertical(12),
    marginHorizontal: moderateScale(16),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    ...CommonStyles.tpp_s3,
    color: color.BLACK,
    fontSize: textScale(16),
    lineHeight: moderateScaleVertical(22),
    marginRight: moderateScale(4),
  },
  noteHeader: {
    ...CommonStyles.tpp_s2,
    color:color.BLACK,
    backgroundColor: color.S_GRAY_1,
    paddingVertical: moderateScaleVertical(12),
    paddingHorizontal:moderateScale(16)
  },
  noteText: {...CommonStyles.tpp_p3,color:color.S_GRAY_4},
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonImageAll: {
    marginEnd: moderateScale(4),
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(16),
    marginTop: moderateScaleVertical(16),
  },
  statesContainer: {
    backgroundColor: color.S_GRAY_1,
    paddingBottom: moderateScaleVertical(12),
    marginTop: moderateScaleVertical(8),
  },
  unselectedTextAll: {
    fontFamily: font.LatoRegular,
    color: color.BLACK,
    marginLeft: moderateScale(4),
    fontWeight: '500',
    lineHeight: moderateScaleVertical(22),
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
});

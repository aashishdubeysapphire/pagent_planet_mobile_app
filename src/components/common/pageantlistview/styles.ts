import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';

const useStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      marginStart: moderateScaleVertical(16),
      marginBottom: moderateScaleVertical(16),
      height: moderateScaleVertical(116),
    },
    big_container: {
      flex: 1,
      marginStart: moderateScaleVertical(16),
      marginBottom: moderateScaleVertical(16),
      height: moderateScaleVertical(110),
      marginTop: moderateScaleVertical(2),
      paddingEnd: moderateScaleVertical(16),
    },
    prize_container: {
      flex: 1,
      marginStart: moderateScaleVertical(16),
      marginBottom: moderateScaleVertical(16),
      marginTop: moderateScaleVertical(2),
      paddingEnd: moderateScaleVertical(16),
    },
    awardsShow: {
      alignSelf: 'center',
    },
    imageSection: {
      marginEnd: moderateScaleVertical(12),
      width: moderateScaleVertical(60),
      height: moderateScaleVertical(60),
    },
    listContainer: {
      width: '100%',
      flex: 1,
      padding: moderateScaleVertical(16),
      borderRadius: moderateScale(20),
      borderColor: color.S_GRAY_2,
      borderWidth: 1,
    },
    showData: {
      flexDirection: 'row',
    },
    editIcon: {
      alignItems: 'center',
      width: moderateScale(24),
      aspectRatio: 1,
    },
    deleteIcon: {
      alignItems: 'center',
      marginTop: moderateScaleVertical(5),
      width: moderateScale(24),
      aspectRatio: 1,
    },
    titleView: {
      width: '71%',
      justifyContent: 'center',
      paddingRight: moderateScale(8),
    },
    title: {
      ...CommonStyles.robotoMedium14,
      lineHeight: moderateScaleVertical(20),
    },
    subTitle: {
      ...CommonStyles.tpp_p3,
      color: color.INPUT_TEXT,
      marginTop: moderateScaleVertical(4),
      lineHeight: moderateScaleVertical(17),
    },
    infoLabel: {
      ...CommonStyles.tpp_s1,
      marginLeft: moderateScale(4),
      width: moderateScale(75),
    },
    awardsTitle: {
      ...CommonStyles.tpp_s1,
      color: color.WHITE,
      alignSelf: 'center',
      position: 'absolute',
      width: '60%',
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    awardsTitleForEvent: {
      ...CommonStyles.tpp_s2,
      color: color.WHITE,
      alignSelf: 'center',
      position: 'absolute',
      width: '45%',
      textAlign: 'center',
      textAlignVertical: 'center',
    },
    showEventInfo: {
      marginTop: moderateScaleVertical(8),
      marginLeft: moderateScale(70),
      flexDirection: 'row',
    },
    addressLabel: {
      ...CommonStyles.tpp_s1,
      marginLeft: moderateScale(4),
    },
    editablesection: {
      marginTop: -moderateScaleVertical(14),
      right: moderateScale(0),
      position: 'absolute',
    },
  });
};

export default useStyle;

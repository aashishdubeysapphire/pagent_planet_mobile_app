import {Dimensions, StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';

const itemSize = Dimensions.get('window').width / 2 - moderateScale(24);

const useStyle = () => {
  return StyleSheet.create({
    gridContainer: {
      alignItems: 'center',
      borderRadius: moderateScaleVertical(24),
      borderColor: color.S_GRAY_2,
      borderWidth: 1,
      overflow: 'hidden',
      marginTop: -moderateScaleVertical(40),
    },

    imageSection: {
      width: '100%',
      alignItems: 'center',
      borderRadius: moderateScale(24),
      backgroundColor: color.WHITE,
      overflow: 'hidden',
    },
    titleSection: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    listContainer: {
      flexDirection: 'row',
      width: '100%',
      flex: 1,
      padding: moderateScaleVertical(16),
      borderRadius: moderateScale(20),
      borderColor: color.S_GRAY_2,
      borderWidth: 1,
      alignItems: 'center',
      overflow: 'hidden',
    },
    circleContainer: {
      width: moderateScaleVertical(60),
      height: moderateScaleVertical(60),
      borderRadius: moderateScaleVertical(60),
      marginEnd: moderateScaleVertical(12),
    },
    container: {
      flex: 1 / 2,
      marginStart: moderateScaleVertical(16),
      marginBottom: moderateScaleVertical(16),
      width: itemSize,
      height: itemSize + moderateScaleVertical(81),
    },
    bigContainer: {
      marginStart: moderateScaleVertical(16),
      marginBottom: moderateScaleVertical(16),
      width: itemSize,
      height: itemSize + moderateScaleVertical(94),
    },
    eventContainer: {
      marginStart: moderateScaleVertical(16),
      marginBottom: moderateScaleVertical(16),
      width: itemSize,
      height: itemSize + moderateScaleVertical(92),
    },
    title: {
      ...CommonStyles.tpp_s2,
      fontWeight: '500',
      textAlign: 'center',
      lineHeight: moderateScaleVertical(18),
      paddingHorizontal: moderateScale(8),
      alignSelf: 'stretch',
    },
    options: {
      ...CommonStyles.latoSemiBold12,
      fontWeight: '600',
      marginLeft: moderateScale(8),
      color: color.S_GRAY_4,
    },
    bottomSection: {
      flexDirection: 'row',
      height: moderateScaleVertical(40),
      width: moderateScale(150),
      alignItems: 'center',
      backgroundColor: color.WHITE,
      borderBottomLeftRadius: moderateScale(20),
      borderBottomRightRadius: moderateScale(20),
      justifyContent: 'center',
      borderColor: color.S_GRAY_2,
      borderWidth: 1,
      alignSelf: 'center',
      paddingTop: moderateScaleVertical(5),
    },
    ratingArea: {
      flexDirection: 'row',
      marginTop: moderateScaleVertical(3),
    },
    ratingStyle: {
      ...CommonStyles.tpp_s2,
      fontSize: textScale(9),
      alignSelf: 'center',
    },
    subHeadingLabel: {
      ...CommonStyles.tpp_s1,
      color: color.INPUT_TEXT,
      fontWeight: '400',
      marginTop: moderateScaleVertical(4),
      paddingHorizontal: moderateScale(8),
      textAlign: 'center',
      marginBottom: moderateScaleVertical(4),
      alignSelf: 'stretch',
    },
    editIcon: {
      position: 'absolute',
      right: moderateScaleVertical(11),
      top: moderateScaleVertical(13),
    },
  });
};

export default useStyle;

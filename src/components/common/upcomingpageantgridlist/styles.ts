import { StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {font} from '../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';
import { isIosDevice } from '../../utils/helperFunction';

const useStyle = () => {
  return StyleSheet.create({
    gridStyle: {
      justifyContent: 'flex-start',
      flexDirection: 'row',
      marginStart: moderateScaleVertical(16),
      marginBottom: moderateScaleVertical(16),
      marginTop: 1,
    },
    claimSection: {
      backgroundColor: color.SHADOW_COLOR,
      position: 'absolute',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      height: moderateScaleVertical(31),
      borderBottomEndRadius: moderateScale(20),
      borderBottomStartRadius: moderateScale(20),
    },
    gridTitleSection: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      paddingHorizontal: moderateScale(8),
    },
    inactiveEventLogo: {
      position: 'absolute',
      marginStart: moderateScaleVertical(-5),
      marginTop: moderateScaleVertical(-1),
    },
    eventYear: {
      position: 'absolute',
      right: 0,
    },
    eventYearTitle: {
      position: 'absolute',
      right: moderateScaleVertical(6),
      marginTop: moderateScaleVertical(10),
      transform: [{rotate: '42deg'}],
    },

    gridContainer: {
      backgroundColor: color.S_GRAY_1,
      borderColor: color.S_GRAY_2,
      borderWidth: 1,
      borderRadius: moderateScaleVertical(20),
    },
    listContainer: {
      flexDirection: 'row',
      width: '100%',
      flex: 1,
      padding: moderateScaleVertical(16),
      marginEnd: moderateScaleVertical(16),
      borderRadius: moderateScale(20),
      borderColor: color.S_GRAY_2,
      borderWidth: 1,
      overflow: 'hidden',
      height: moderateScaleVertical(106),
    },
    circleContainer: {
      width: moderateScaleVertical(60),
      height: moderateScaleVertical(60),
      borderColor: color.S_GRAY_2,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: moderateScaleVertical(60),
      marginEnd: moderateScale(14),
    },
    title: {
      ...CommonStyles.tpp_s2,
      alignSelf: 'stretch',
      textAlign: 'center',
      lineHeight: moderateScaleVertical(16),
    },
    titleYear: {
      ...CommonStyles.latoBoldBlack12,
      color: color.WHITE,
      lineHeight: moderateScaleVertical(16),
    },
    listTitle: {
      ...CommonStyles.robotoMedium14,
    },
    ratingArea: {
      flexDirection: 'row',
      marginTop: moderateScaleVertical(8),
      alignItems: 'center',
    },
    lifetimeParticipantLabel: {
      ...CommonStyles.tpp_s1,
      marginLeft: moderateScale(4),
    },
    bottomSection: {
      width: '76%',
      justifyContent: 'center',
    },
    listTitleSection: {
      justifyContent: 'center',
      height: moderateScaleVertical(36),
    },

    claimLabel: {
      fontFamily: font.LatoMedium,
      fontSize: isIosDevice() ? textScale(11) : textScale(12),
      color: color.WHITE,
      fontWeight: '600',
      marginLeft: moderateScale(8),
    },
    noProfileSection: {
      position: 'absolute',
      top: -1,
      left: -moderateScale(5),
    },
  });
};

export default useStyle;

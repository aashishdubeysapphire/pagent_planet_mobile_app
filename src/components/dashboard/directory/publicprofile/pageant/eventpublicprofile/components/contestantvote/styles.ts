import { StyleSheet} from 'react-native';
import {color} from '../../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  gridContainer: {
    marginEnd: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(2),
  },
  nameTitlContainer: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    bottom: moderateScaleVertical(52),
    backgroundColor: color.S_GRAY_1,
    alignItems: 'center',
  },
  subTitlContainer: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateScaleVertical(72),
    paddingHorizontal : moderateScaleVertical(7),
    marginTop : -moderateScaleVertical(2)
  },

  voteRecivedTitlContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: moderateScaleVertical(8),
    alignItems:'center',
    justifyContent:'center'
  },

  bottomTitlContainer: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: moderateScaleVertical(40),
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: color.WHITE,
    borderColor: color.S_GRAY_2,
    borderWidth: 1,
    alignItems: 'center',
  },
  titleContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: color.S_GRAY_1,
    borderColor: color.S_GRAY_2,
    borderWidth: 1,
  },
  title: {
    ...CommonStyles.tpp_s2,
    alignSelf: 'center',
    color : color.BLACK
  },
  voteReceived: {
    ...CommonStyles.tpp_s1,
    alignSelf: 'center',
    color: color.S_GRAY_4,
    marginLeft : moderateScale(5)
  },
  voteNow: {
    ...CommonStyles.latoBoldBlack12,
    alignSelf: 'center',
    marginStart: moderateScaleVertical(8),
    color: color.S_GRAY_4,
  },
  titleName: {
    ...CommonStyles.tpp_p4,
    alignSelf: 'center',
    color: color.INPUT_TEXT,
    marginTop : moderateScaleVertical(5),
    fontWeight: '400',
  },
  buttonStyle: {
    ...CommonStyles.latoBoldBlack12,
    alignSelf: 'center',
    color: color.S_GRAY_4,
  },
  claimSection: {
    backgroundColor: color.SHADOW_COLOR,
    position: 'absolute',
    width: '100%',
    height: moderateScaleVertical(31),
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomEndRadius: moderateScale(20),
    borderBottomStartRadius: moderateScale(20),
    flexDirection: 'row',
  },
  claimLabel: {
    ...CommonStyles.latoBoldBlack12,
    color: color.WHITE,
    marginLeft: moderateScale(8),
  },
  noProfileSection: {
    position: 'absolute',
    top: -0.5,
    left: -moderateScale(4),
  },
});

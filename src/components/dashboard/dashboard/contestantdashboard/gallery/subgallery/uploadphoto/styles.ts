import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  activeEventContainer: {
    marginRight: moderateScaleVertical(16),
    marginStart: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(20),
  },
  clickHereLine: {
    ...CommonStyles.tpp_s2,
    marginBottom: moderateScaleVertical(16),
    marginTop: moderateScaleVertical(-8),
  },
  listContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  tapHereColorText: {
    ...CommonStyles.tpp_s2,
    color: color.P_PINK,
    fontWeight: '500',
    lineHeight: moderateScaleVertical(18),
  },
  tapHereText: {
    ...CommonStyles.tpp_p3,
    color: color.INPUT_TEXT,
  },
  inactiveMessageStyle: {
    width: '100%',
    paddingEnd: moderateScaleVertical(16),
    paddingStart: moderateScaleVertical(16),
    paddingTop: moderateScaleVertical(10),
    paddingBottom: moderateScaleVertical(10),
    backgroundColor: color.S_PINK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveMessageLabel: {
    ...CommonStyles.robotoMedium14,
    color: color.P_PINK,
    textAlign: 'center',
  },
  counterTapHereContainer: {
    flexDirection: 'row',
    marginTop: moderateScaleVertical(-10),
  },
  counterContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  counterText: {
    flexDirection: 'row',
    ...CommonStyles.robotoMedium14,
    marginTop: moderateScaleVertical(8),
    marginBottom: moderateScaleVertical(45),
  },
  gridListContainer: {
    marginTop: moderateScaleVertical(16),
  },
  pageantGalleryGridListContainer: {
    marginTop: moderateScaleVertical(-32),
  },
  gridItemContainer: {
    marginTop: moderateScaleVertical(16),
    marginLeft: moderateScale(12),
    height: moderateScaleVertical(92),
  },
  addMoreContiner: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  headShotDeleteContainer: {
    position: 'absolute',
    right: moderateScaleVertical(0),
    top: moderateScaleVertical(0),
    padding: moderateScaleVertical(6),
  },

  cropContainer: {
    position: 'absolute',
    right: moderateScaleVertical(28),
    top: moderateScaleVertical(12),
  },
});

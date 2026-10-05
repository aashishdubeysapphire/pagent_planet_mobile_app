import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonBottom: {
    marginBottom: moderateScaleVertical(40),
  },
  imageSection: {
    width: '100%',
    alignItems: 'center',
    borderRadius: moderateScale(24),
  },

  shimmer: {
    position: 'absolute',
  },
  listContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(16),
    borderRadius: moderateScale(20),
    borderBottomColor: color.S_GRAY_2,
    borderBottomWidth: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  circleContainer: {
    width: moderateScaleVertical(60),
    height: moderateScaleVertical(60),
    borderColor: color.S_GRAY_2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScaleVertical(60),
    marginEnd: moderateScaleVertical(12),
  },

  lastContainer: {
    marginStart: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(16),
  },
  outerview: {
    backgroundColor: color.TRANSPARNT,
    flex: 1,
  },
  staticCardLable: {
    ...CommonStyles.tpp_p2,
    color: color.INPUT_TEXT,
    fontSize: textScale(14),
    lineHeight: moderateScaleVertical(20),
    width: moderateScale(145),
  },
  staticSelectedCardLable: {
    ...CommonStyles.tpp_h5,
    color: color.P_PINK,
    fontSize: textScale(14),
    lineHeight: moderateScaleVertical(20),
    width: moderateScale(145),
  },
  cardTouch: {
    flexDirection: 'row',
    paddingTop: moderateScaleVertical(16),
  },
  containerLogin: {
    width: moderateScale(163.5),
    alignSelf: 'center',
    position: 'absolute',
    bottom: moderateScaleVertical(20),
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerview: {
    position: 'absolute',
    top: moderateScaleVertical(219),
    right: moderateScale(16),
    backgroundColor: color.WHITE,
    borderRadius: 12,
    paddingLeft: moderateScale(16),
    paddingBottom: moderateScaleVertical(16),
    width: moderateScale(194),
    ...CommonStyles.shadow,
  },
  modalLabel: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
    fontSize: textScale(16),
    marginTop: moderateScaleVertical(16),
    textAlign: 'center',
    lineHeight: moderateScaleVertical(24),
    marginHorizontal: moderateScale(-10),
    paddingHorizontal: moderateScale(16),
  },
  title: {
    ...CommonStyles.robotoMedium16,
    fontSize: textScale(18),
    lineHeight: moderateScaleVertical(24),
    textAlign: 'left',
  },
  staticHeight: {
    height: moderateScaleVertical(65),
  },
  noRecordContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: moderateScaleVertical(127),
  },
  editTitle: {
    ...CommonStyles.robotoMedium14,
    lineHeight: moderateScaleVertical(20),
    marginEnd: moderateScaleVertical(12),
  },
  todosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: moderateScale(16),
    marginVertical: moderateScaleVertical(16),
  },
  infoText: {
    ...CommonStyles.robotoMedium14,
    marginHorizontal: moderateScale(4),
    fontSize: textScale(12),
    lineHeight: moderateScaleVertical(16),

    color: color.P_PINK,
  },
  heading: {
    ...CommonStyles.tpp_h5,
    marginTop: moderateScaleVertical(16),
    color: color.BLACK,
  },
  mainView: {
    marginTop: moderateScaleVertical(18),
  },
  clickHereLine: {
    ...CommonStyles.tpp_s2,
    marginBottom: moderateScaleVertical(16),
  },
  colorText: {
    ...CommonStyles.tpp_s2,
    color: color.P_PINK,
    fontWeight: '500',
    lineHeight: moderateScaleVertical(18),
  },

  placementText: {
    ...CommonStyles.tpp_h4,
  },
  height24: {
    height: moderateScaleVertical(24),
  },
  infoView: {
    flexDirection: 'row',
    marginVertical: moderateScaleVertical(4),
  },
  upladImageView: {
    height: moderateScaleVertical(132),
    width: '100%',
    borderColor: color.P_PINK,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 30,
  },
  note: {
    ...CommonStyles.tpp_h3,
    marginTop: moderateScaleVertical(12),
    fontSize: moderateScaleVertical(13),
    marginBottom: moderateScaleVertical(20),
    color: color.BLACK,
  },
  noteMsg: {
    ...CommonStyles.tpp_p2,
    color: color.S_GRAY_4,
    marginLeft: 'auto',
    fontSize: moderateScaleVertical(13),
    marginRight: 'auto',
    marginTop: moderateScaleVertical(8),
  },
  headShotImageText: {
    ...CommonStyles.tpp_p2,
    color: color.INPUT_TEXT,
    marginTop: moderateScaleVertical(16),
  },
  uploadImageInnerVIew: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cameraCenter: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

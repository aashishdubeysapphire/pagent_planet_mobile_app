import {StyleSheet} from 'react-native';
import {color} from '../../../../assets/colorConstant';
import {CommonStyles} from '../../../../assets/commonStyles';
import {font} from '../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  mainContiner: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  mainContinerCOntestant: {
    flexGrow: 1,
  },
  modalContainer: {
    backgroundColor: color.WHITE,
    flex: 1,
    paddingTop: moderateScaleVertical(16),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  crossIcon: {
    marginLeft: 'auto',
  },

  modalHeading: {
    ...CommonStyles.tpp_h3,
    marginTop: 'auto',
    textTransform: 'capitalize',
    marginBottom: 'auto',
    lineHeight: moderateScaleVertical(24),
  },
  bottomLine: {
    height: 0.6,
    backgroundColor: color.S_GRAY_2,
  },
  headingView: {
    flexDirection: 'row',
    paddingEnd: moderateScaleVertical(16),
    paddingStart: moderateScaleVertical(16),
    marginBottom: moderateScaleVertical(16),
  },

  searchGoogleContainer: {
    height: moderateScaleVertical(350),
  },

  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: color.WHITE,
    padding: moderateScaleVertical(16),
  },

  containerDelete: {
    flex: 0.5,
    borderColor: color.S_GRAY_3,
    borderWidth: 1,
    borderRadius: 30,
    marginRight: moderateScale(16),
  },

  borderButtonText: {
    color: color.P_PINK,
    fontSize: textScale(14),
    fontWeight: 'bold',
    fontFamily: font.LatoBold,
    textTransform: 'uppercase',
    marginVertical: moderateScaleVertical(14),
    textAlign: 'center',
  },
  containerConfirm: {
    flex: 0.5,
    borderColor: color.P_PINK,
    borderWidth: 1,
    borderRadius: 30,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingEnd: moderateScaleVertical(16),
    lineHeight: moderateScaleVertical(20),
    backgroundColor: color.S_PINK,
  },
  unselectedItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  filterOptionContainer: {
    flex: 0.7,
    flexDirection: 'row',
    backgroundColor: color.S_GRAY_1,
  },
  filterOptionActiveTextStripContainer: {
    backgroundColor: color.P_PINK,
    minWidth: moderateScaleVertical(2),
    minHeight: moderateScaleVertical(36),
    marginEnd: moderateScaleVertical(14),
  },
  filterOptionActiveTextContainer: {
    ...CommonStyles.tpp_s2,
    lineHeight: moderateScaleVertical(16),
    paddingTop: moderateScaleVertical(8),
    fontWeight: '500',
    paddingBottom: moderateScaleVertical(8),
    paddingEnd: moderateScaleVertical(10),
    color: color.P_PINK,
  },
  filterOptionTextContainer: {
    ...CommonStyles.tpp_p3,
    paddingStart: moderateScaleVertical(16),
    paddingEnd: moderateScaleVertical(10),
    paddingTop: moderateScaleVertical(8),
    fontWeight: '400',
    paddingBottom: moderateScaleVertical(8),
    lineHeight: moderateScaleVertical(16),
    color: color.INPUT_TEXT,
  },
  filterOptionValueContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: color.WHITE,
    padding: moderateScaleVertical(16),
  },

  filterContainer: {
    flexDirection: 'row',
    flex: 1,
    borderTopLeftRadius: moderateScaleVertical(20),
    borderTopRightRadius: moderateScaleVertical(20),
    backgroundColor: color.S_GRAY_1,
  },
  filterRootContainer: {
    flex: 1,
  },

  selectedLocation: {
    flexDirection: 'row',
    position: 'absolute',
    marginTop: moderateScaleVertical(91),
  },
  radioButtonImage: {
    marginTop: moderateScaleVertical(3),
    marginBottom: 'auto',
  },
  selectedLocationText: {
    ...CommonStyles.tpp_p3,
    marginLeft: moderateScale(16),
    marginEnd: moderateScaleVertical(16),
    alignSelf: 'center',
    fontWeight: '400',
    color: color.INPUT_TEXT,
    lineHeight: moderateScaleVertical(18),
  },
  locationSearchHeader: {
    ...CommonStyles.tpp_s2,
    marginLeft: moderateScale(0),
    color: color.BLACK,
    marginEnd: moderateScaleVertical(16),
    lineHeight: moderateScaleVertical(16),
  },
  filterAppliedCircleContainer: {
    minHeight: moderateScaleVertical(5),
    maxHeight: moderateScaleVertical(5),
    minWidth: moderateScaleVertical(5),
    borderRadius: moderateScaleVertical(5),
    backgroundColor: color.P_PINK,
  },
});

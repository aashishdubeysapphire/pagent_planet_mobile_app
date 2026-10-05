import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {font} from '../../../../../../assets/fonts/fontsConstant';
import {isIosDevice} from '../../../../../utils/helperFunction';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  wrapperAwards: {
    flex: 1,
    marginTop: moderateScaleVertical(20),
    height: moderateScale(154) + moderateScaleVertical(50 + 30), // calculated as per height of each small component
  },
  wrapperPageant: {
    flex: 1,
    marginTop: moderateScaleVertical(13),
    marginRight: moderateScale(6),
  },
  container: {
    width: moderateScale(154),
    borderRadius: moderateScale(25),
    borderColor: color.S_GRAY_2,
    borderWidth: 1,
    paddingBottom: 0,
    marginBottom: 0,
  },
  title: {
    ...CommonStyles.tpp_s2,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: moderateScaleVertical(17),
    paddingHorizontal: moderateScale(8),
    textAlignVertical: 'center',
    padding: 0,
  },
  options: {
    fontFamily: font.LatoSemiBold,
    fontSize: isIosDevice() ? textScale(11) : textScale(12),
    color: color.S_GRAY_4,
    marginLeft: moderateScale(8),
  },
  bottomSection: {
    flexDirection: 'row',
    height: moderateScaleVertical(40),
    width: moderateScale(140),
    alignItems: 'center',
    backgroundColor: color.WHITE,
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
    justifyContent: 'center',
    borderColor: color.S_GRAY_2,
    alignSelf: 'center',
    borderWidth: 1,
    paddingTop: moderateScaleVertical(10),
  },
  imageSection: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(25),
    backgroundColor: color.WHITE,
    width: moderateScale(154),
    height: moderateScale(154),
    marginLeft: -moderateScale(0.8),
    marginTop: -moderateScaleVertical(0.4),
  },
  titleSection: {
    alignItems: 'center',
    paddingHorizontal: moderateScale(8),
    justifyContent: 'center',
    padingVertical: moderateScaleVertical(8),
  },
  bottomArea: {
    width: moderateScale(154),
    marginRight: moderateScale(12),
  },
  editCircleIcon: {
    position: 'absolute',
    right: moderateScale(10),
    top: moderateScaleVertical(10),
  },
});

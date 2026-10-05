import {StyleSheet} from 'react-native';
import {color} from '../../../../../../../assets/colorConstant';
import {font} from '../../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingEnd: moderateScaleVertical(16),
    backgroundColor: color.WHITE,
    paddingBottom: moderateScaleVertical(50),
  },
  backIcon: {
    marginVertical: moderateScaleVertical(10),
    marginHorizontal: moderateScale(16),
    width: 500,
  },
  lableStyle: {
    fontFamily: font.LatoBold,
    fontSize: textScale(18),
    color: color.BLACK,
    marginTop: moderateScaleVertical(9),
    marginBottom: 'auto',
    flexDirection: 'row',
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: color.WHITE,
    zIndex: -1000,
    height: moderateScaleVertical(50),
    borderBottomColor: color.LIGHT_GREY,
    borderBottomWidth: 1,
  },
  imageSection: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.WHITE,
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
  },
  wrapper: {
    marginLeft: moderateScale(12),
    marginBottom: moderateScaleVertical(16),
  },
});

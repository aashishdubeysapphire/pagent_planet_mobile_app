import {Dimensions, StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
import {CommonStyles} from '../../../assets/commonStyles';
import {font} from '../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../utils/responsiveSize';
import { isIosDevice } from '../../utils/helperFunction';

export const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 2 - moderateScale(24),
    borderWidth: 1,
    borderColor: color.S_GRAY_2,
    borderRadius: 20,
    backgroundColor: color.S_GRAY_1,
  },

  lableText: {
    width: '100%',
    textAlign: 'center',
    ...CommonStyles.tpp_s2,
    marginVertical: moderateScaleVertical(8),
  },
  lableView: {
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingHorizontal: moderateScale(16),
  },
  selectUnselectView: {
    position: 'absolute',
    right: 0,
    zIndex: 1000,
    margin: 12,
  },
  centerView: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: moderateScaleVertical(8),
  },
  claimSection: {
    backgroundColor: color.SHADOW_COLOR,
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScaleVertical(31),
    borderBottomEndRadius: moderateScale(20),
    borderBottomStartRadius: moderateScale(20),
    flexDirection: 'row',
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

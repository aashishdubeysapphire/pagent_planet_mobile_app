import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {font} from '../../../../../../assets/fonts/fontsConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  rowView: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(16),
    minHeight: moderateScaleVertical(50),
  },
  heading: {
    ...CommonStyles.tpp_h5,
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: textScale(14),
  },
  lockView: {
    marginTop: 'auto',
    marginBottom: 'auto',
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  lockText: {
    ...CommonStyles.latoBoldBlack12,
    color: color.S_GRAY_4,
  },
  data: {
    ...CommonStyles.tpp_h5,
    textAlign: 'right',
    fontFamily: font.RobotoRegular,
    fontSize: textScale(14),
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    width: '60%',
    paddingVertical: moderateScale(16),
    lineHeight:moderateScaleVertical(20)
  },
  height:{
    height:moderateScaleVertical(16)
  },
  bottomHeight:{
    height:moderateScaleVertical(100)
  }
});

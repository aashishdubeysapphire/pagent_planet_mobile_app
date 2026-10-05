import {StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';

export const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  listContainer: {
    flex: 1,
    paddingTop: moderateScaleVertical(16),
    backgroundColor: color.WHITE,
  },
  loader: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    minHeight: moderateScaleVertical(100),
    maxHeight: moderateScaleVertical(100),
  },
  noRecordFound: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.WHITE,
    flex: 0.85,
  },
  alertcontainer: {
    ...CommonStyles.robotoMedium14,
    textTransform: 'capitalize',
    fontWeight: '500',
    marginHorizontal: moderateScale(12),
    lineHeight: moderateScaleVertical(20),
    color: color.BLACK,
    marginVertical: moderateScaleVertical(24),
  },
});

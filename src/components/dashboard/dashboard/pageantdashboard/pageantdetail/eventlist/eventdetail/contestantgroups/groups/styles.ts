import {Dimensions, StyleSheet} from 'react-native';
import {CommonStyles} from '../../../../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../../utils/responsiveSize';
import { isIosDevice } from '../../../../../../../../utils/helperFunction';

export const styles = StyleSheet.create({
  eventHeadingArea: {
    flexDirection: 'row',
    paddingLeft: moderateScale(16),
    marginTop: moderateScaleVertical(24),
    marginBottom: moderateScaleVertical(16),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: moderateScale(16),
  },
  container: {
    marginTop: moderateScaleVertical(5),
    flex: 1,
    height:
      isIosDevice()
        ? Dimensions.get('window').height * (moderateScaleVertical(75.6) / 100)
        : Dimensions.get('window').height * (moderateScaleVertical(78) / 100),

    width: '100%',
  },

  headingLabel: {
    ...CommonStyles.robotoMedium14,
  },

  groupList: {
    marginBottom: moderateScaleVertical(70),
  },

  noRecordView: {
    marginBottom: moderateScaleVertical(50),
  },
});

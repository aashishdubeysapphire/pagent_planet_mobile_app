import {Dimensions, StyleSheet} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';

const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  detailsArea: {
    width: '100%',

    height: moderateScaleVertical(190),
    backgroundColor: color.S_PINK,
  },
  basicHeader: {
    flexDirection: 'row',
    paddingLeft: moderateScale(15),
        marginVertical: moderateScaleVertical(26),

  },
  detailsTopSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: moderateScale(16),
    alignItems: 'center',
    paddingTop: moderateScaleVertical(24),
  },
  name: {
    ...CommonStyles.tpp_h2,
    color: color.BLACK,
  },
  basicSection: {
    flexDirection: 'row',
    width: width / 3.22,
    height: '78%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScaleVertical(16),
  },
  infoSection: {
    marginLeft: moderateScale(7),
    justifyContent: 'center',
    width: width / 5,
  },
  infoStyles: {
    ...CommonStyles.tpp_h5,
    marginTop: moderateScaleVertical(4),
  },
  title: {
    ...CommonStyles.tpp_s1,
  },
  editIcon: {
    paddingHorizontal: moderateScaleVertical(16),
    paddingVertical: moderateScaleVertical(16),
    width: moderateScaleVertical(50),
  },
});

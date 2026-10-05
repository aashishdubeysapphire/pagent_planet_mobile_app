import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';
export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.RED,
    flex: 1,
    height: 200,
  },
  topContainer: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: color.RED,
  },
});

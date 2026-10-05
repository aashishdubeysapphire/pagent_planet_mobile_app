import {StyleSheet} from 'react-native';
import {color} from '../../../assets/colorConstant';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.WHITE,
  },

  container: {
    backgroundColor: 'red',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  staticText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: color.PINK,
  },
  dynamicText: {
    marginTop: 10,
  },
  item: {
    fontSize: 16,
    marginBottom: 5,
    color: color.PINK,
  },
});

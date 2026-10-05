import React from 'react';
import {View, Text} from 'react-native';
import useStyle from './styles';

interface Props {
  rightIcon: React.ReactNode;
  text?: string;
}

/**
 * NoRecord is a function that takes a rightIcon prop and returns a view with a style of continer and
 * the rightIcon prop.
 * @param {Props}  - Props = {
 */
const NoRecord = ({rightIcon, text}: Props) => {
  const styles = useStyle();
  return (
    <View style={styles.continer}>
      {rightIcon}
      {text !== undefined && text?.length > 0 ? (
        <Text style={styles.alertcontiner}>{text}</Text>
      ) : null}
    </View>
  );
};

export default NoRecord;

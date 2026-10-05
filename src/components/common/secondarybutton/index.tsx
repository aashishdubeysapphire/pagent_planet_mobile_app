import React from 'react';
import {TouchableOpacity, Text, GestureResponderEvent} from 'react-native';
import useStyle from './styles';

interface Props {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
}

/**
 * This function takes in a label, border, active, and onPress props, and returns a TouchableOpacity
 * component with a Text component inside of it.
 * @param {Props}  - Props
 * @returns A function that returns a component.
 */
const SecondaryButton = ({label,  onPress}: Props) => {
  const styles = useStyle();

  return (
    <TouchableOpacity style={styles?.buttonBg} onPress={onPress}>
      <Text style={styles?.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;

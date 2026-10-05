import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {styles} from './styles';

interface Props {
  leftLabel?: string;
  rightLabel?: string;
  isLeftButtonActive: boolean;
  onLeftTabClicked: any;
  onRightTabClicked: any;
}

/* A function that returns a view with two touchableopacity components. */
const SwitchButton = ({
  leftLabel,
  rightLabel,
  isLeftButtonActive,
  onLeftTabClicked,
  onRightTabClicked,
}: Props) => {
  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity
        style={
          isLeftButtonActive
            ? styles.activeButtonView
            : styles.inActiveButtonView
        }
        onPress={() => onLeftTabClicked()}>
        <Text
          style={
            isLeftButtonActive
              ? styles.activeLabelStyles
              : styles.inActiveLabelStyles
          }>
          {leftLabel}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          isLeftButtonActive
            ? styles.inActiveButtonView
            : styles.activeButtonView
        }
        onPress={() => onRightTabClicked()}>
        <Text
          style={
            isLeftButtonActive
              ? styles.inActiveLabelStyles
              : styles.activeLabelStyles
          }>
          {rightLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SwitchButton;

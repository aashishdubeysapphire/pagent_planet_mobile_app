import React from 'react';
import {TouchableOpacity} from 'react-native';
import useStyle from './styles';
import {useNavigation} from '@react-navigation/core';
import images from '../../../assets/images/AppImages';

/**
 * BackButton is a function that returns a TouchableOpacity component that contains an image component.
 * @returns A function that returns a component.
 */
const BackButton = () => {
  /* Calling the useStyle function and assigning the returned value to the styles variable. */
  const styles = useStyle();

  /* Destructuring the goBack function from the useNavigation hook. */
  const {goBack} = useNavigation();

  /**
   * When the user presses the back button, the app will go back to the previous screen.
   */
  const onPress = () => {
    goBack();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <images.Common.Back_ICON />
    </TouchableOpacity>
  );
};

export default BackButton;

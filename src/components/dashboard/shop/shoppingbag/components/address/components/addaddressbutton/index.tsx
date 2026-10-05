import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import translations from '../../../../../../../../assets/translations';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../../root/screenname';

interface Props {
  formType: string;
  addressType: string;
  setStep: Function;
  refeshScreenList: Function;
}

const AddAddressButton = ({
  formType,
  addressType,
  setStep,
  refeshScreenList,
}: Props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate(SCREEN.ADD_EDIT_ADDRESS, {
          formType: formType,
          addressType: addressType,
          addressId: '',
          setStep: setStep,
          refeshScreenList: refeshScreenList,
        })
      }>
      <Text style={styles.buttonStyles}>{translations.ADD_NEW_ADDRESS}</Text>
    </TouchableOpacity>
  );
};

export default AddAddressButton;

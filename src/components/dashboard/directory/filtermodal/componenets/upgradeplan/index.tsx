import {View, TouchableOpacity, Text} from 'react-native';
import {styles} from './styles';
import React from 'react';
import translations from '../../../../../../assets/translations';

interface Props {
  setIsPreviewModalVisible?: any;
  setModelVisible?: any;
  upgradePlan: () => void;
}

const UpgradePlan = ({upgradePlan}: Props) => {
  const onUpgradePlanClick = () => {
    upgradePlan();
  };

  return (
    <View>
      <Text style={styles.selectedText}>
        {translations.TO_ACCESS_THE_LOCKED_FILTERS_YOU_CAN_UPGRADE_YUOR_PLAIN}
      </Text>
      <TouchableOpacity
        style={{
          ...styles.containerConfirm,
        }}
        onPress={onUpgradePlanClick}>
        <Text style={styles.borderButtonText}>{translations.UPGARDE_NOW}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpgradePlan;

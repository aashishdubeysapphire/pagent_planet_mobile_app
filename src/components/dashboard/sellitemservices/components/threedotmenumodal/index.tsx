import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import AppImages from '../../../../../assets/images/AppImages';
import translations from '../../../../../assets/translations';

interface Props {
  modalVisible: boolean;
  setModalVisible: Function;
}

interface menuProps {
  label: string;
  image: any;
}

const ThreeDotMenuModal = ({modalVisible, setModalVisible}: Props) => {
  const ShowList = ({image, label}: menuProps) => {
    return (
      <TouchableOpacity
        style={styles.cardTouch}
        onPress={() => setModalVisible(false)}>
        <View style={styles.cardRow}>
          {image}
          <Text style={styles.menuLable}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      statusBarTranslucent={true}
      animationType="fade"
      transparent={true}
      visible={modalVisible}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setModalVisible(false)}
        style={styles.outerview}>
        <TouchableOpacity activeOpacity={1} style={styles.innerview}>
          <ShowList
            image={<AppImages.SELL_ITEMS.ExportIcon />}
            label={translations.EXPORT}
          />
          <ShowList
            image={
              <AppImages.SELL_ITEMS.ExportIcon style={styles.importIconStyle} />
            }
            label={translations.IMPORT}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ThreeDotMenuModal;

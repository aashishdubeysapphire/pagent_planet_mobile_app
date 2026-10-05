import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import AppImages from '../../../assets/images/AppImages';
import useStyle from './styles';
import Modal from 'react-native-modal';
import SearchAdressView from './component';
// import {GooglePlaceDetail} from 'react-native-google-places-autocomplete';
import CustomToast from '../toast';
import translations from '../../../assets/translations';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: any;
  onItemSelect: (
    address: string,
    lat: string,
    longitude: string,
    // details: GooglePlaceDetail | undefined,
  ) => void;
  autoClose: boolean;
}

const SearchAdress = ({
  isModalVisible,
  setIsModalVisible,
  onItemSelect,
  autoClose = true,
}: Props) => {
  const styles = useStyle();
  const onCloseModel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      backdropOpacity={0.2}
      useNativeDriver={true}
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      onBackButtonPress={onCloseModel}
      style={{marginHorizontal: 0, marginVertical: 0, marginTop: 70}}>
      <View style={styles.modalContainer}>
        <CustomToast />
        <View style={styles.headingView}>
          <Text style={styles.modalHeading}>{translations.SEARCH_ADDRESS}</Text>
          <TouchableOpacity
            style={styles.crossIcon}
            onPress={() => {
              setIsModalVisible(false);
            }}>
            <AppImages.ProfileImage.Tpp_cross_icon />
          </TouchableOpacity>
        </View>
        <View style={styles.headingView}>
          <SearchAdressView
            setIsModalVisible={setIsModalVisible}
            onItemSelect={onItemSelect}
            autoClose={autoClose}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SearchAdress;

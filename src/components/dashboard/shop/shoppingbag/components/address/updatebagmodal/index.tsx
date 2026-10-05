import {View, Text, FlatList} from 'react-native';
import React from 'react';
import CustomButton from '../../../../../../common/button';
import translations from '../../../../../../../assets/translations';
import {styles} from './styles';
import Modal from 'react-native-modal';
import AppImages from '../../../../../../../assets/images/AppImages';
import {moderateScaleVertical} from '../../../../../../utils/responsiveSize';
import CommonBagLayout from '../components/commonbaglayout';
import {SHOPPING_BAG} from '../../../localEnum';
import {UnavailableProducts} from '../../../../../../../services/models/shop/unavailableProductsList';

interface Props {
  isModalVisible: boolean;
  setModalVisible: Function;
  setSteps: Function;
  unavailableAddList?: UnavailableProducts[];
}

const UpdateBagModal = ({
  isModalVisible,
  setModalVisible,
  setSteps,
  unavailableAddList,
}: Props) => {
  const closeOpenModal = () => {
    setModalVisible(false);
  };

  const headerComponent = () => {
    return (
      <>
        <View style={styles.flatlistHeaderStyles}>
          <AppImages.SHOPING_BAG.UpdateBagIcon />
        </View>
        <View style={styles.headingArea}>
          <Text style={styles.headingStyles}>{translations.OH_SNAP}</Text>
          <Text style={styles.subHeading}>
            {unavailableAddList?.length}
            {unavailableAddList?.length > 1
              ? translations.PRODUCTS_ARE
              : translations.PRODUCTS_IS}
            {translations.THESE_PRODUCTS_ARE_NOT_AVAIL_IN_YOUR_COUNTRY}
          </Text>
        </View>
      </>
    );
  };

  const footerComponent = () => {
    return <View style={{height: moderateScaleVertical(50)}} />;
  };

  const onUpdateBagClicked = () => {
    closeOpenModal();
    setSteps(SHOPPING_BAG.BAG);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      backdropOpacity={0.45}
      useNativeDriver={true}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={1000}
      animationOutTiming={1000}
      coverScreen={true}
      hasBackdrop={true}
      // onBackdropPress={() =>  closeOpenModal()}
      // onBackButtonPress={() =>  closeOpenModal()}
      style={{margin: 0, marginTop: moderateScaleVertical(140)}}>
      <View style={styles.topContainer}>
        <View style={styles.flatListStyle}>
          <FlatList
            data={unavailableAddList}
            // keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={headerComponent}
            ListFooterComponent={footerComponent}
            renderItem={({item, index}) => (
              <CommonBagLayout
                imageUrl={item?.image}
                productName={item?.name}
                colorCode={item?.attributes?.resultSet[0]?.hex_code}
                colorName={item?.attributes?.resultSet[0]?.name}
                size={
                  item?.attributes?.resultSet[0]?.productVariantSizeList[0]
                    ?.size?.name
                }
                noOfLines={2}
              />
            )}
          />
        </View>
        <Text
          style={{
            ...styles.subHeading,
            marginBottom: moderateScaleVertical(32),
          }}>
          {
            translations.PLEASE_UPDATE_YOUR_SHIPPING_ADDRESS_OR_EDIT_ITEMS_IN_YOUR_BAG
          }
        </Text>
        <View style={styles.customButtonStyles}>
          <CustomButton
            label={translations.UPDATE_BAG}
            smallHeight
            onPress={onUpdateBagClicked}
            inactive={true}
          />
        </View>
      </View>
    </Modal>
  );
};

export default UpdateBagModal;

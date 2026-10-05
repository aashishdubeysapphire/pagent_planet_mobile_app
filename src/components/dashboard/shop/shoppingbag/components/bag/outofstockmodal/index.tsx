import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import translations from '../../../../../../../assets/translations';
import {styles} from './styles';
import Modal from 'react-native-modal';
import AppImages from '../../../../../../../assets/images/AppImages';
import {moderateScaleVertical} from '../../../../../../utils/responsiveSize';
import CommonBagLayout from '../../address/components/commonbaglayout';
import {UnavailableProducts} from '../../../../../../../services/models/shop/unavailableProductsList';
import {color} from '../../../../../../../assets/colorConstant';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../root/screenname';

interface Props {
  isModalVisible: boolean;
  setModalVisible: Function;
  setSteps: Function;
  unavailableAddList?: UnavailableProducts[];
  onConfirm: Function;
  onPressWishList: Function;
}

const OutOfStockModal = ({
  isModalVisible,
  setModalVisible,
  setSteps,
  unavailableAddList,
  onConfirm,
  onPressWishList,
}: Props) => {
  const footerComponent = () => {
    return <View style={{height: moderateScaleVertical(50)}} />;
  };

  const navigation = useNavigation();
  const onPressAddToFav = () => {
    setModalVisible(false);
    onPressWishList();
  };
  return (
    <Modal
      isVisible={isModalVisible}
      backdropOpacity={0.45}
      useNativeDriver={true}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={500}
      animationOutTiming={500}
      coverScreen={true}
      hasBackdrop={true}
      style={{margin: 0, marginTop: moderateScaleVertical(140)}}>
      <View style={styles.topContainer}>
        <View style={styles.headingView}>
          <Text style={styles.modalHeading}>
            {' '}
            {unavailableAddList?.length}{' '}
            {unavailableAddList?.length === 1
              ? 'Item Is Out Of Stock'
              : 'Items Are Out Of Stock'}
          </Text>
          <TouchableOpacity
            style={styles.crossIcon}
            onPress={() => {
              setModalVisible(false);
            }}>
            <AppImages.ProfileImage.Tpp_cross_icon />
          </TouchableOpacity>
        </View>

        <View style={styles.flatListStyle}>
          <FlatList
            data={unavailableAddList}
            keyExtractor={item => item?.id?.toString()}
            showsVerticalScrollIndicator={false}
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
                noOfLines={1}
                outofstock={true}
              />
            )}
          />
        </View>
        <Text
          style={{
            ...styles.subHeading,
            marginBottom: moderateScaleVertical(32),
          }}>
          {translations.UNSELECT}
        </Text>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.containerDelete}
            onPress={() => {
              setModalVisible(false);
              navigation.navigate(SCREEN.SHOPPING_BAG);
            }}>
            <Text style={{...styles.borderButtonText, color: color.BLACK}}>
              {translations.GO_TO_CART}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.containerConfirm}
            onPress={onPressAddToFav}>
            <Text style={styles.borderButtonText}>
              {translations.ADD_TO_FAVOURITES}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default OutOfStockModal;

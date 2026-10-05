import {View, Text, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import useStyle from './styles';
import AppImages from '../../../../../../assets/images/AppImages';
import translations from '../../../../../../assets/translations';
import React, {useEffect, useState} from 'react';
import {color} from '../../../../../../assets/colorConstant';
import Modal from 'react-native-modal';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';
import {GalleryItem} from '../../../../../../services/models/gallery/galleryItem';
import ItemRearrange from './item';
import {PARAM_VALUE} from '../../../../../utils/enum';

export enum ITEM_KEY {
  COUNTRY = 1,
  STATE = 2,
}

interface Props {
  reArrangeRef: any;
  isModalVisible: boolean;
  setIsModalVisible: any;
  setListRearragne: any;
  setIndexRearrange: any;
  selectedIndex: number;
  onConfirmClick: () => void;
  galleryList: GalleryItem[];
}

/* A function that returns a modal. */
const GalleryRearrage = ({
  reArrangeRef,
  isModalVisible,
  setIsModalVisible,
  setIndexRearrange,
  galleryList,
  selectedIndex,
  onConfirmClick,
}: Props) => {
  const styles = useStyle();
  const [itemSize, setItemSize] = useState(Number);

  useEffect(() => {
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
  }, []);

  /**
   * OnCloseModel() is a function that sets the state of isModalVisible to false
   */
  const onCloseModel = () => {
    setIsModalVisible(false);
  };

  /**
   * We're swapping the clicked item with the selected item
   * @param {number} index - The index of the item that was clicked.
   */
  const onItemClick = (index: number) => {
    [galleryList[index], galleryList[selectedIndex]] = [
      galleryList[selectedIndex],
      galleryList[index],
    ];
    setIndexRearrange(index);
  };

  /**
   * OnPressAdd() is a function that calls onCloseModel() and onConfirmClick() when the user presses the
   * "Add" button
   */
  const onPressAdd = () => {
    onCloseModel();
    onConfirmClick();
  };

  return (
    <Modal
      isVisible={isModalVisible}
      backdropOpacity={0.2}
      useNativeDriver={true}
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      onBackButtonPress={onCloseModel}
      style={styles.modalStyles}>
      <View style={styles.modalContainer}>
        <View style={styles.headingView}>
          <View>
            <Text style={styles.modalHeading}>
              {translations.SELECT_YOUR_POSITION}
            </Text>
            <Text style={styles.msgLabel}>
              {translations.SELECT_ALBUM_POSITION}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.crossIcon}
            onPress={() => {
              setIsModalVisible(false);
            }}>
            <AppImages.ProfileImage.Tpp_cross_icon />
          </TouchableOpacity>
        </View>

        <FlatList
          ref={reArrangeRef}
          data={galleryList}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          key={'_'}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <ItemRearrange
              position={index}
              imageUrl={
                item.original_image !== undefined
                  ? item.original_image
                  : item?.selectedImage
              }
              selectedIndex={selectedIndex}
              onItemClickListener={onItemClick}
              size={itemSize}
              title={
                item.album_name === PARAM_VALUE.GENERAL
                  ? translations.EXTRA
                  : item.album_name
              }
            />
          )}
        />
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.containerDelete}
            onPress={onCloseModel}>
            <Text style={{...styles.borderButtonText, color: color.BLACK}}>
              {translations.CANCLE}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.containerConfirm}
            onPress={onPressAdd}>
            <Text style={styles.borderButtonText}>{translations.CONFIRM}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default GalleryRearrage;

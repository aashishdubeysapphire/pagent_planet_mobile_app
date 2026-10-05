import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import BottomModal from '../bottommodal';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';
import translations from '../../../assets/translations';
import AppImages from '../../../assets/images/AppImages';
import {FlatList} from 'react-native-gesture-handler';
import {useState} from 'react';
import {color} from '../../../assets/colorConstant';
import CustomButton from '../button';
import {styles} from './styles';
import {hapticFeedBack} from '../../utils/helperFunction';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: any;
  customStyles?: any;
  colorList: [];
  selectedColorItem: number;
  setSelectedColorItem: any;
  setSelectedSizeItem: any;
  setCurrentSlide: any;
  selectedSizeItem: any;
  onProceedClick: any;
  selectedSizeCallback: any;
  title: string;
}
/* The code is defining a functional component called `ColorSizeModal` that takes in several props:
`isModalVisible`, `setIsModalVisible`, `colorList`, `selectedColorItem`, `selectedSizeItem`,
`onProceedClick`, `selectedSizeCallback`, and `title`. These props are used to control the
visibility of the modal, manage the selected color and size items, handle user interactions, and
display the title of the modal. */
const ColorSizeModal = ({
  isModalVisible,
  setIsModalVisible,
  colorList,
  selectedColorItem,
  selectedSizeItem,
  onProceedClick,
  selectedSizeCallback,
  title,
}: Props) => {
  const [selectedSizeDetails, setSelectedSizeDetails] =
    useState(selectedSizeItem);
  const [selectedColorDetails, setSelectedColorDetails] =
    useState(selectedColorItem);
  const getSizeLabel = (label: any | undefined) => {
    return label?.toString()?.split(' ')[0];
  };
  useEffect(() => {
    setSelectedColorDetails(selectedColorItem);
    setSelectedSizeDetails(selectedSizeItem);
  }, [isModalVisible]);
  const onPressAddToBag = () => {
    hapticFeedBack();
    if (selectedSizeDetails) {
      onProceedClick();
      setIsModalVisible(false);
    }
  };

  const onPressItem = item => {
    setSelectedSizeDetails(null);
    setSelectedColorDetails(item);
  };

  const onPressSelectItem = item => {
    setSelectedSizeDetails(item);
    selectedSizeCallback(item);
  };

  return (
    <BottomModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      customStyles={{
        height: 'auto',
        paddingHorizontal: moderateScaleVertical(16),
      }}>
      <View style={styles.headingView}>
        {title && (
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        )}
        <TouchableOpacity
          style={styles.crossIcon}
          onPress={() => {
            setIsModalVisible(false);
          }}>
          <AppImages.ProfileImage.Tpp_cross_icon />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.color}>
          {selectedColorDetails
            ? translations.SELECTED_COLOR
            : translations.SELECT_COLOR}
          <Text style={styles.color1}>{selectedColorDetails?.name}</Text>
        </Text>
        <FlatList
          data={colorList}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={{
                ...styles.colorRound,
                backgroundColor: item?.hex_code,
                borderColor:
                  selectedColorDetails?.id === item?.id
                    ? color.P_PINK
                    : color.S_GRAY_2,
                borderWidth: moderateScale(2),
              }}
              onPress={() => onPressItem(item)}
            />
          )}
        />
        {selectedColorDetails?.id ? (
          <>
            <Text style={styles.size}>
              {selectedSizeDetails
                ? translations.SELECTED_SIZE
                : translations.SELECT_SIZE}
              <Text style={styles.color1}>
                {selectedSizeDetails?.size?.name}
              </Text>
            </Text>
            <FlatList
              data={selectedColorDetails?.productVariantSizeList}
              keyExtractor={item => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={{
                    ...styles.sizeRound,
                    borderColor:
                      selectedSizeDetails?.size?.id === item?.size?.id
                        ? color.P_PINK
                        : color.S_GRAY_2,
                    borderWidth: moderateScale(1),
                  }}
                  onPress={() => onPressSelectItem(item)}>
                  <Text style={styles.sizeName}>
                    {getSizeLabel(item?.size?.name)}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </>
        ) : null}
        {selectedSizeDetails && (
          <Text style={styles.instock}>
            {selectedSizeDetails?.inventory} {translations.IN_STOCK_VALUE}
          </Text>
        )}
        <Text style={styles.note}>
          { translations.NOTE }
          <Text style={styles.vary}> {translations.VARY}</Text>
        </Text>

        <View style={styles.bottomFilterShadowContainer}>
          <View style={styles.bottomFilterContainer}>
            <View style={styles.amountContainer}>
              <Text style={styles.totalAmountHeading}>
                {translations.TOTAL_AMOUNT}
              </Text>
              {selectedSizeDetails && (
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={{marginRight: 'auto'}}>
                  <Text
                    style={
                      selectedSizeDetails?.selling_price !== undefined &&
                      selectedSizeDetails?.selling_price !== null &&
                      selectedSizeDetails?.selling_price.toString().length >
                        0 &&
                      selectedSizeDetails?.price !== undefined &&
                      selectedSizeDetails?.price.toString().length > 0 &&
                      selectedSizeDetails?.price !==
                        selectedSizeDetails?.selling_price
                        ? styles.maxPriceLabel
                        : styles.actualPriceLabel
                    }>
                    {`$${selectedSizeDetails?.price}`}
                  </Text>
                  {selectedSizeDetails?.selling_price !== undefined &&
                    selectedSizeDetails?.selling_price !== null &&
                    selectedSizeDetails?.selling_price.toString() !== '' &&
                    selectedSizeDetails?.price !== undefined &&
                    selectedSizeDetails?.price.toString().length > 0 &&
                    selectedSizeDetails?.price !==
                      selectedSizeDetails?.selling_price && (
                      <>
                        <View style={{width: moderateScale(8)}}></View>
                        <Text style={styles.actualPriceLabel}>
                          {`$${selectedSizeDetails?.selling_price}`}
                        </Text>
                      </>
                    )}
                </Text>
              )}
            </View>
            <View
              style={{
                ...styles.amountContainer,
                opacity: selectedSizeDetails ? 1 : 0.5,
              }}>
              <CustomButton
                label={translations.ADD_TO_BAG}
                upload
                inActiveBorder
                inactive
                onPress={() => {
                  onPressAddToBag();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </BottomModal>
  );
};

export default ColorSizeModal;

import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import AppImages from '../../../../../../assets/images/AppImages';
import FloatingDropdown from '../../../../../common/floatingdropown';
import VariantDetail from './variantdetail';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';
import ImagePickerModal from '../../../../../common/imagepickermodal';
import {LocalImage} from '../../../../../../services/models/localimage';
import FastImageView from '../../../../../common/fastimageview';
import {
  SELL_COLOR,
  SELL_PRODUCT,
  SELL_PRODUCT_ATTRIBUTES,
} from '../../../../../utils/enum';
import CustomBottomModal from '../../../../../common/custombottommodal';
import {MasterRecordsItem} from '../../../../../../services/models/masterData';
import translations from '../../../../../../assets/translations';
import ImagePreviewModal from './variantdetail/imagepreviewmodal';
import {
  ProductVariantSizeList,
  VariableField,
} from '../../../../../../services/models/sellitems/stepOne/catgoryFields';
import {ProductsData} from '../../../../../../services/models/sellitems/myProducts';
import {Category} from '../../../../../../services/models/sellitems/sellCategory';
import {
  hapticFeedBack,
  removeMiddleSpaces,
} from '../../../../../utils/helperFunction';

interface Props {
  index: number | undefined;
  productVariantColor: VariableField;
  onDeleteClick: (index: number | undefined) => void;
  category: Category | undefined;
  sizes: VariableField[] | undefined;

  addEditRequest: ProductsData;
  selectSwimsuitSizeType: number;
  isVariantLisRefresh: boolean;
  layoutY?: Function;
}
export enum SIZE_ENUM {
  INCHES = 'Inches',
  STUDS = 'Studs',
}
const SellVariant = ({
  onDeleteClick,
  index,
  selectSwimsuitSizeType,
  addEditRequest,
  productVariantColor,
  category,
  sizes,
  isVariantLisRefresh,
  layoutY,
}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [swimsuitSize, setSwimsuitSize] = useState<MasterRecordsItem[]>([]);
  const [refershVariantDetail, setRefershVariantDetail] = useState(true);
  const [refershVariantInputDetail, setRefershVariantInputDetail] =
    useState(true);
  const [isImageSelect, setImageSelected] = useState(false);
  const [imageEror, setImageError] = useState('');
  const [isSizeModalVisible, setSizeModalVisible] = useState(false);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [isSizeReset, setSizeReset] = useState(true);
  const [isVariantLisReady, setVariantListReady] = useState(true);
  const [productSizeError, setProductSizeError] = useState('');

  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);

  useEffect(() => {
    if (
      productVariantColor.image !== undefined &&
      productVariantColor.image.length > 0
    ) {
      setImageSelected(true);
    }
    resetSizeActiveState();
  }, []);

  const resetSizeActiveState = () => {
    if (
      productVariantColor?.productVariantSizeList !== undefined &&
      productVariantColor?.productVariantSizeList.length > 0
    ) {
      var isActiveFound = 0;
      for (
        let position = 0;
        position < productVariantColor.productVariantSizeList.length;
        position++
      ) {
        if (productVariantColor.productVariantSizeList[position].isActive) {
          isActiveFound = isActiveFound + 1;
          setSelectedSizeIndex(position);

          setRefershVariantInputDetail(false);
          setTimeout(() => {
            setRefershVariantInputDetail(true);
          }, 10);
        }
      }

      if (
        isActiveFound === 0 &&
        productVariantColor !== undefined &&
        productVariantColor?.productVariantSizeList !== undefined &&
        productVariantColor?.productVariantSizeList?.length > 0 &&
        productVariantColor?.productVariantSizeList[selectedSizeIndex]
          ?.isActive !== undefined
      ) {
        productVariantColor.productVariantSizeList[selectedSizeIndex].isActive =
          true;
      } else if (
        isActiveFound === 0 &&
        productVariantColor !== undefined &&
        productVariantColor?.productVariantSizeList !== undefined &&
        productVariantColor?.productVariantSizeList?.length > 0
      ) {
        productVariantColor.productVariantSizeList[0].isActive = true;
        setSelectedSizeIndex(0);
      }
    }
  };
  useEffect(() => {
    if (productVariantColor.imageUrlError !== undefined) {
      setImageError(productVariantColor.imageUrlError);
    }
  }, [productVariantColor.imageUrlError]);

  useEffect(() => {
    if (productVariantColor.productSizeError !== undefined) {
      setProductSizeError(productVariantColor.productSizeError);
    }
  }, [productVariantColor.productSizeError]);

  useEffect(() => {
    if (swimsuitSize.length > 0) {
      setSwimsuitSize([]);
      getSize(sizes);
    }
  }, [selectSwimsuitSizeType]);

  useEffect(() => {
    if (isVariantLisRefresh) {
      refresh();
    }
  }, [isVariantLisRefresh]);

  const refresh = () => {
    setRefershVariantDetail(false);
    setTimeout(() => {
      setRefershVariantDetail(true);
    }, 10);
    if (
      productVariantColor.image !== undefined &&
      productVariantColor.image.length > 0
    ) {
      setImageSelected(true);
    }
  };
  const onImagePickerClick = () => {
    setIsModalVisible(true);
  };
  const imagePickerResult = (data: LocalImage) => {
    setIsModalVisible(false);
    productVariantColor.image = data.uri;
    productVariantColor.imageName = data.name;
    productVariantColor.localImage = data;
    setImageSelected(true);
    setImageError('');
  };
  const resetInStockError = (
    productVariantColorSize: ProductVariantSizeList,
    error: string,
  ) => {
    if (productVariantColorSize !== undefined) {
      productVariantColorSize.inStockError = error;
    }
    refresh();
  };
  const resetPriceError = (
    productVariantColorSize: ProductVariantSizeList,
    error: string,
  ) => {
    if (productVariantColorSize !== undefined) {
      productVariantColorSize.priceError = error;
    }

    refresh();
  };

  const isAllFieldCompleted = () => {
    if (
      (productVariantColor?.productVariantSizeList !== undefined &&
        productVariantColor?.productVariantSizeList[selectedSizeIndex]
          ?.inventory === undefined) ||
      (productVariantColor?.productVariantSizeList !== undefined &&
        productVariantColor?.productVariantSizeList[selectedSizeIndex]
          ?.inventory !== undefined &&
        productVariantColor?.productVariantSizeList[selectedSizeIndex]
          ?.inventory?.length === 0)
    ) {
      resetInStockError(
        productVariantColor?.productVariantSizeList[selectedSizeIndex],
        translations.THIS_FIELD_REQUIRED,
      );

      return false;
    } else if (
      productVariantColor?.productVariantSizeList !== undefined &&
      productVariantColor?.productVariantSizeList[selectedSizeIndex]
        ?.inventory !== undefined &&
      productVariantColor?.productVariantSizeList[selectedSizeIndex]?.inventory
        ?.length!! > 0 &&
      Number(
        productVariantColor?.productVariantSizeList[selectedSizeIndex]
          ?.inventory,
      ) < 1
    ) {
      resetInStockError(
        productVariantColor?.productVariantSizeList[selectedSizeIndex],
        translations.MUST_INC_ONE_VALUE,
      );

      return false;
    } else if (
      (productVariantColor?.productVariantSizeList !== undefined &&
        productVariantColor?.productVariantSizeList[selectedSizeIndex]
          ?.isDiffPrice !== undefined &&
        productVariantColor?.productVariantSizeList[selectedSizeIndex]
          ?.isDiffPrice &&
        productVariantColor?.productVariantSizeList[selectedSizeIndex].price ===
          undefined) ||
      (productVariantColor?.productVariantSizeList !== undefined &&
        productVariantColor?.productVariantSizeList[selectedSizeIndex]
          ?.isDiffPrice !== undefined &&
        productVariantColor?.productVariantSizeList[selectedSizeIndex]
          ?.isDiffPrice &&
        productVariantColor?.productVariantSizeList[selectedSizeIndex].price
          ?.length === 0)
    ) {
      resetPriceError(
        productVariantColor?.productVariantSizeList[selectedSizeIndex],
        translations.THIS_FIELD_REQUIRED,
      );
      return false;
    } else if (
      productVariantColor?.productVariantSizeList !== undefined &&
      productVariantColor?.productVariantSizeList[selectedSizeIndex]
        ?.isDiffPrice !== undefined &&
      productVariantColor?.productVariantSizeList[selectedSizeIndex]
        ?.isDiffPrice &&
      productVariantColor?.productVariantSizeList[selectedSizeIndex].price ===
        '0'
    ) {
      resetPriceError(
        productVariantColor?.productVariantSizeList[selectedSizeIndex],
        translations.MUST_INC_ONE_VALUE,
      );
      return false;
    }
    resetInStockError(
      productVariantColor?.productVariantSizeList!![selectedSizeIndex],
      '',
    );
    resetPriceError(
      productVariantColor?.productVariantSizeList!![selectedSizeIndex],
      '',
    );
    return true;
  };

  const onSelectSizes = async (masterRecordsItem: MasterRecordsItem[]) => {
    if (productVariantColor.productVariantSizeList === undefined) {
      productVariantColor.productVariantSizeList = [];
    }

    masterRecordsItem.forEach(element => {
      if (
        productVariantColor.productVariantSizeList !== undefined &&
        isSizeNotAdded(element)
      ) {
        productVariantColor.productVariantSizeList.push({
          size: {
            id: element.id,
            name: element.name + '',
          },
          id: element.id,
          isCompleted: false,
          isActive: productVariantColor.productVariantSizeList.length === 0,
        });
      }
    });

    for (let indexRefresh = 0; indexRefresh < 5; indexRefresh++) {
      await makeSame(masterRecordsItem);
    }
  };

  const makeSame = async (
    masterRecordsItem: MasterRecordsItem[] | undefined,
  ) => {
    setTimeout(() => {
      if (productVariantColor.productVariantSizeList !== undefined) {
        for (
          let position = 0;
          position < productVariantColor.productVariantSizeList.length;
          position++
        ) {
          setTimeout(() => {
            if (
              !isExist(
                productVariantColor.productVariantSizeList!![position],
                masterRecordsItem,
              )
            ) {
              if (
                productVariantColor.productVariantSizeList!![position]?.isActive
              ) {
                setTimeout(() => {
                  resetSizeActiveState();
                  setVariantListReady(false);
                  setTimeout(() => {
                    setVariantListReady(true);
                  }, 2);
                }, 200);
              }
              createDeletedProductSizeVariantArray(position);
              productVariantColor.productVariantSizeList?.splice(position, 1);
              setVariantListReady(false);
              setTimeout(() => {
                setVariantListReady(true);
              }, 10);
            }
          }, 100);
        }
      }
    }, 100);
  };
  const createDeletedProductSizeVariantArray = (
    position: number | undefined,
  ) => {
    if (
      position !== undefined &&
      productVariantColor.productVariantSizeList !== undefined &&
      productVariantColor.productVariantSizeList[position] !== undefined &&
      productVariantColor.productVariantSizeList?.length > 0 &&
      productVariantColor.productVariantSizeList[position].product_id !==
        undefined
    ) {
      if (addEditRequest.delete_product_size === undefined) {
        addEditRequest.delete_product_size = [];
      }

      addEditRequest.delete_product_size?.push(
        productVariantColor.productVariantSizeList[position].product_id + '',
      );
    }
  };
  const isExist = (
    variableField: VariableField,
    variant: MasterRecordsItem[] | undefined,
  ) => {
    var found = 0;
    variant?.forEach(newElement => {
      if (variableField?.id === newElement.id && found < 1) {
        found = 1;
      }
    });
    return found === 1;
  };

  const isSizeNotAdded = (variant: MasterRecordsItem) => {
    var found = 0;
    if (productVariantColor.productVariantSizeList !== undefined) {
      productVariantColor.productVariantSizeList.forEach(element => {
        if (element.id === variant.id && found < 1) {
          found = 1;
        }
      });
    }
    return found !== 1;
  };

  const getSize = (attributes?: VariableField[] | undefined) => {
    if (attributes !== undefined) {
      for (let position = 0; position < attributes?.length; position++) {
        if (
          attributes[position].id === SELL_PRODUCT_ATTRIBUTES.SELL_SIZE ||
          attributes[position].id ===
            SELL_PRODUCT_ATTRIBUTES.SELL_PAGEANT_SWAG_SIZE ||
          attributes[position].id === SELL_PRODUCT_ATTRIBUTES.SELL_SHOES_SIZE ||
          attributes[position].id ===
            SELL_PRODUCT_ATTRIBUTES.SELL_JEWELRY_SIZE ||
          attributes[position].id ===
            SELL_PRODUCT_ATTRIBUTES.SELL_CROWNS_SASHES_MORE_SIZE ||
          (category?.id === SELL_PRODUCT.SWIMSUITS &&
            attributes[position].id ===
              SELL_PRODUCT_ATTRIBUTES.SELL_SWIMSUITS_TOP_SIZE) ||
          (category?.id === SELL_PRODUCT.SWIMSUITS &&
            attributes[position].id ===
              SELL_PRODUCT_ATTRIBUTES.SELL_SWIMSUITS_BOTTOM_SIZE)
        ) {
          return attributes[position].values;
        }
      }
    }
    return [];
  };

  const getSizeLabel = (label: any | undefined) => {
    return label?.toString()?.split(' ')[0];
  };

  const getSizeLabelStyle = (item: ProductVariantSizeList | undefined) => {
    if (item?.isActive) {
      return item?.size?.name === SIZE_ENUM.STUDS
        ? styles.activeCircleTextSmall
        : styles.activeCircleText;
    } else if (!item?.isActive && !item?.isCompleted) {
      return item?.size?.name === SIZE_ENUM.STUDS
        ? styles.inactiveNoDataCircleTextSmall
        : styles.inactiveNoDataCircleText;
    } else {
      return item?.size?.name === SIZE_ENUM.STUDS
        ? styles.inactiveCircleTextSmall
        : styles.inactiveCircleText;
    }
  };

  const getImageName = (name: string | undefined, url: string | undefined) => {
    if (name === undefined && url !== undefined) {
      var urlArray = url.split('/');
      return urlArray !== undefined && urlArray[urlArray.length - 1];
    }
    return name;
  };

  return (
    <View
      style={styles.addItemContainer}
      onLayout={event => {
        const layout = event.nativeEvent.layout;
        !!layoutY &&
          layoutY(layout.y, removeMiddleSpaces(productVariantColor.name));
      }}>
      <View style={styles.itemDivider} />
      <View style={styles.rowTextContainer}>
        {productVariantColor.name === SELL_COLOR.MULTI_COLOR ? (
          <View style={[styles.colorCircle]}>
            <AppImages.Dashboard.MultiColorIcon width={24} height={24} />
          </View>
        ) : (
          <View
            style={[
              styles.colorCircle,
              {backgroundColor: productVariantColor.hex_code},
            ]}
          />
        )}
        <Text style={styles.colorTitle} numberOfLines={1} ellipsizeMode="tail">
          {productVariantColor.name}
        </Text>
        <TouchableOpacity
          onPress={() => {
            onDeleteClick(index);
          }}>
          <AppImages.Common.CloseIcon />
        </TouchableOpacity>
      </View>

      {productVariantColor.productVariantSizeList !== undefined &&
      productVariantColor.productVariantSizeList.length > 0 ? (
        <>
          <View style={styles.rowTextContainer}>
            <Text
              style={styles.addMoreSizeText}
              numberOfLines={1}
              ellipsizeMode="tail">
              {translations.ADD_IN_STOCK_OF_ALL_THE_SIZES}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSizeModalVisible(true);
              }}>
              <Text
                style={styles.addMoreSizeButton}
                numberOfLines={1}
                ellipsizeMode="tail">
                {translations.EDIT_SIZE}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.backIcon}
              onPress={() => {
                hapticFeedBack();
                if (
                  selectedSizeIndex > 0 &&
                  productVariantColor?.productVariantSizeList !== undefined
                ) {
                  if (isAllFieldCompleted()) {
                    productVariantColor.productVariantSizeList[
                      selectedSizeIndex
                    ].isCompleted = true;
                  }

                  productVariantColor.productVariantSizeList.forEach(
                    element => {
                      element.isActive = false;
                    },
                  );
                  if (
                    productVariantColor?.productVariantSizeList[
                      selectedSizeIndex - 1
                    ]?.isActive !== undefined
                  ) {
                    productVariantColor.productVariantSizeList[
                      selectedSizeIndex - 1
                    ].isActive = true;
                  }

                  setSelectedSizeIndex(selectedSizeIndex - 1);
                  setTimeout(() => {
                    setSizeReset(!isSizeReset);
                  }, 200);
                }
              }}>
              <AppImages.Common.Back_ICON width={12} height={18} />
            </TouchableOpacity>
            {isVariantLisReady && (
              <FlatList
                data={productVariantColor.productVariantSizeList}
                horizontal
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <>
                    <View
                      style={
                        item.isActive
                          ? styles.activeBorderCircle
                          : item.isCompleted
                          ? styles.inactiveBorderCircle
                          : styles.defaultBorderCircle
                      }>
                      <Text style={[getSizeLabelStyle(item)]}>
                        {getSizeLabel(item?.size?.name)}
                      </Text>
                    </View>
                    {item.isCompleted !== undefined && item.isCompleted && (
                      <View style={styles.tickContainer}>
                        <AppImages.Common.PinkTickIcon
                          width={moderateScaleVertical(12)}
                          height={moderateScaleVertical(12)}
                        />
                      </View>
                    )}
                  </>
                )}
              />
            )}

            <TouchableOpacity
              style={styles.nextIcon}
              onPress={() => {
                hapticFeedBack();
                if (
                  productVariantColor?.productVariantSizeList !== undefined &&
                  isAllFieldCompleted() &&
                  selectedSizeIndex <
                    productVariantColor?.productVariantSizeList?.length - 1
                ) {
                  productVariantColor?.productVariantSizeList.forEach(
                    element => {
                      element.isActive = false;
                    },
                  );
                  productVariantColor.productVariantSizeList[
                    selectedSizeIndex
                  ].isCompleted = true;
                  productVariantColor.productVariantSizeList[
                    selectedSizeIndex + 1
                  ].isActive = true;

                  setSelectedSizeIndex(selectedSizeIndex + 1);
                  resetInStockError(
                    productVariantColor?.productVariantSizeList[
                      selectedSizeIndex + 1
                    ],
                    '',
                  );
                  setTimeout(() => {
                    setSizeReset(!isSizeReset);
                  }, 200);
                }
              }}>
              <AppImages.Common.Back_ICON width={12} height={18} />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.rowInStock}>
          <FloatingDropdown
            floatingText={translations.SELECT_AVAILABLE_SIZE}
            value={''}
            errorMsg={productSizeError}
            onFieldFocus={() => {
              setSizeModalVisible(true);
            }}
          />
        </View>
      )}

      {refershVariantInputDetail &&
        isVariantLisReady &&
        productVariantColor?.productVariantSizeList !== undefined &&
        productVariantColor?.productVariantSizeList.length > 0 && (
          <VariantDetail
            productVariantColorSize={
              productVariantColor?.productVariantSizeList[selectedSizeIndex]
            }
            category={category}
            sizes={sizes}
            addEditRequest={addEditRequest}
            productVariantColor={productVariantColor}
            isRefresh={refershVariantDetail}
            resetFields={isSizeReset}
          />
        )}
      {isImageSelect &&
      productVariantColor.image !== undefined &&
      productVariantColor.image.length > 0 ? (
        <TouchableOpacity
          style={styles.clickable}
          onPress={() => {
            setIsPreviewModalVisible(true);
          }}>
          <View style={styles.circleImageContainer}>
            <FastImageView
              width={moderateScaleVertical(34)}
              height={moderateScaleVertical(34)}
              borderRadius={moderateScaleVertical(34)}
              imageUrl={productVariantColor.image}
              isCircle
            />
          </View>

          <Text numberOfLines={1} style={styles.imageAvaialbeName}>
            {getImageName(
              productVariantColor.imageName,
              productVariantColor.image,
            )}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsPreviewModalVisible(true);
            }}>
            <View style={styles.uploadImageInnerVIew}>
              <AppImages.Common.EyePriviewIcon width={16} height={16} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              productVariantColor.imageName = undefined;
              productVariantColor.image = undefined;
              setImageSelected(false);
            }}>
            <View style={styles.uploadImageInnerVIew}>
              <AppImages.CreateContestentProfile.tpp_cross_small_icon
                width={16}
                height={16}
              />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            style={styles.rowTextContainer}
            onPress={() => {
              onImagePickerClick();
            }}>
            <AppImages.Common.CameraAttachIcon />
            <View style={styles.titleUploadVeriantImagee}>
              <Text
                style={styles.titleUploadVeriantImagee}
                numberOfLines={1}
                ellipsizeMode="tail">
                {translations.UPLOAD_PRODUCT_IMAGE}
              </Text>
              {imageEror.length > 0 && (
                <View
                  style={[
                    styles.row,
                    {
                      marginTop: moderateScaleVertical(5),
                      marginStart: moderateScaleVertical(-6),
                    },
                  ]}>
                  <AppImages.Common.Alert_ICON width={10} height={10} />
                  <Text style={styles.error}>{imageEror}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </>
      )}

      <ImagePickerModal
        isModalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        onImageFound={imagePickerResult}
      />

      {sizes !== undefined && (
        <CustomBottomModal
          isModalVisible={isSizeModalVisible}
          setIsModalVisible={setSizeModalVisible}
          data={swimsuitSize.length > 0 ? swimsuitSize : getSize(sizes)}
          parentCallback={selectedSizeList => {
            onSelectSizes(selectedSizeList);
          }}
          heading={translations.AVAILABLE_SIZES}
          preSelectedValue={productVariantColor?.productVariantSizeList}
          enableMultiselect={true}
        />
      )}

      <ImagePreviewModal
        imagePath={productVariantColor?.image}
        isPreviewModalVisible={isPreviewModalVisible}
        setIsPreviewModalVisible={setIsPreviewModalVisible}
      />
    </View>
  );
};

export default SellVariant;

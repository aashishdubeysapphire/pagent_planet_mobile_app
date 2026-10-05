import React, {useEffect, useRef, useState} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import translations from '../../../../../../assets/translations';
import FloatingDropdown from '../../../../../common/floatingdropown';
import {styles} from './styles';
import SellVariant from '../../components/selladdeditvariantitem';
import {MasterRecordsItem} from '../../../../../../services/models/masterData';
import AppImages from '../../../../../../assets/images/AppImages';
import CustomBottomModal from '../../../../../common/custombottommodal';
import {
  SELL_COLOR,
  SELL_PRODUCT,
  SELL_PRODUCT_ATTRIBUTES,
} from '../../../../../utils/enum';
import {ProductsData} from '../../../../../../services/models/sellitems/myProducts';
import {Category} from '../../../../../../services/models/sellitems/sellCategory';
import {
  SellAttributes,
  VariableField,
} from '../../../../../../services/models/sellitems/stepOne/catgoryFields';
import {SELL_TABS} from '../stepview';
import {toast, toastType} from '../../../../../common/commonalert';
import SwimsuitType, {SIZE_TYPE} from '../swimsuittype';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';

interface Props {
  addEditRequest: ProductsData;
  category?: Category;
  isNextClick?: boolean;
  completedStep?: number;
  onStepComplete?: () => void;
  setCompletedStep?: (tabId: number) => void;
  sellAttributeData: SellAttributes | undefined;
  setProductDetail?: any;
  isEditProduct: boolean;
  scrollRef: any;
}

export const StepTwo = ({
  addEditRequest,
  category,
  isNextClick,
  onStepComplete,
  completedStep,
  setCompletedStep,
  sellAttributeData,
  setProductDetail,
  isEditProduct,
  scrollRef,
}: Props) => {
  const [colorError, setColorError] = useState('');
  const [swimsuitTypeError, setSwimsuitTypeError] = useState('');
  const [swimsuitTypesize, setSwimsuitSizeType] = useState(SIZE_TYPE.BOTH);
  const [isColorModalVisible, setColorModalVisible] = useState(false);
  const [isVariantLisReady, setVariantListReady] = useState(false);
  const [isColorList, setColorList] = useState(false);
  const [dataSourceCords, setDataSourceCords] = useState({});
  const [topViewHeight, setTopViewHeight] = useState(0);
  const [topErrorColorName, setTopErrorColorName] = useState('');
  const flatList = useRef();
  const [colorVariantTempList, setColorVariantTempList] = useState<
    VariableField[] | undefined
  >(
    addEditRequest?.result?.variable_fields !== undefined
      ? addEditRequest?.result?.variable_fields
      : [],
  );

  useEffect(() => {
    if (
      sellAttributeData?.variable_fields !== undefined &&
      addEditRequest?.result?.variable_fields !== undefined &&
      sellAttributeData?.variable_fields?.length > 0
    ) {
      onSelectColor(addEditRequest?.result?.variable_fields);
    }
  }, []);

  const isAllFieldCompleted = () => {
    var errorImageCounter = 0;
    var errorSizeCounter = 0;
    var errorCounter = 0;
    var errorSwimsuitCounter = 0;
    var errorInStockCounter = 0;
    var errorInStockZeroCounter = 0;
    var errorVariantDiffPrice = 0;
    let localErrorColorName = '';

    if (
      addEditRequest.category_id === SELL_PRODUCT.SWIMSUITS &&
      addEditRequest.subcategory === undefined
    ) {
      toast(translations.PLEASE_SELECT_TYPE, toastType.ERROR_TOAST);
      setSwimsuitTypeError(translations.THIS_FIELD_REQUIRED);
      errorSwimsuitCounter = errorSwimsuitCounter + 1;
    } else {
      setSwimsuitTypeError('');
    }
    if (
      addEditRequest?.result?.variable_fields === undefined ||
      addEditRequest?.result?.variable_fields?.length === 0
    ) {
      toast(
        translations.SELECT_COLOR_OF + category?.name,
        toastType.ERROR_TOAST,
      );

      setColorError(translations.THIS_FIELD_REQUIRED);
      errorCounter = errorCounter + 1;
    } else {
      addEditRequest?.result?.variable_fields?.forEach(element => {
        if (element?.image === undefined || element?.image?.length === 0) {
          errorImageCounter = errorImageCounter + 1;
          element.imageUrlError = translations.THIS_FIELD_REQUIRED;
          localErrorColorName = !!localErrorColorName
            ? localErrorColorName
            : element.name;
          //varient image error
        } else {
          element.imageUrlError = '';
        }

        if (
          element?.productVariantSizeList !== undefined &&
          element?.productVariantSizeList?.length > 0
        ) {
          element.productSizeError = '';
          element?.productVariantSizeList?.forEach(elementSize => {
            if (
              elementSize?.inventory === undefined ||
              elementSize?.inventory.length === 0
            ) {
              errorInStockCounter = errorInStockCounter + 1;
              elementSize.inStockError = translations.THIS_FIELD_REQUIRED;
              localErrorColorName = !!localErrorColorName
                ? localErrorColorName
                : element.name;
            } else if (
              elementSize?.inventory !== undefined &&
              elementSize?.inventory.length > 0 &&
              Number(elementSize?.inventory) < 1
            ) {
              errorInStockZeroCounter = errorInStockZeroCounter + 1;
              elementSize.inStockError = translations.MUST_INC_ONE_VALUE;
              localErrorColorName = !!localErrorColorName
                ? localErrorColorName
                : element.name;
            } else {
              elementSize.inStockError = '';
            }
            if (
              (elementSize?.isDiffPrice !== undefined &&
                elementSize?.isDiffPrice &&
                elementSize.price === undefined) ||
              (elementSize?.isDiffPrice !== undefined &&
                elementSize?.isDiffPrice &&
                elementSize.price?.length === 0)
            ) {
              errorVariantDiffPrice = errorVariantDiffPrice + 1;
              elementSize.priceError = translations.THIS_FIELD_REQUIRED;
              localErrorColorName = !!localErrorColorName
                ? localErrorColorName
                : element.name;
            } else {
              elementSize.priceError = '';
            }
          });
        } else {
          errorSizeCounter = errorSizeCounter + 1;
          element.productSizeError = translations.THIS_FIELD_REQUIRED;
          localErrorColorName = !!localErrorColorName
            ? localErrorColorName
            : element.name;
          toast(
            translations.PLEASE_SELECT_PRODUCT_VARIANT_SIZE,
            toastType.ERROR_TOAST,
          );
        }
      });
    }

    if (errorImageCounter > 0) {
      toast(
        translations.PLEASE_SELECT_PRODUCT_VARIANT_IMAGE,
        toastType.ERROR_TOAST,
      );
    } else if (errorInStockCounter > 0) {
      toast(translations.PLEASE_ENTER_IN_STOCK, toastType.ERROR_TOAST);
    } else if (errorInStockZeroCounter > 0) {
      toast(translations.MUST_INC_ONE_VALUE, toastType.ERROR_TOAST);
    } else if (errorVariantDiffPrice > 0) {
      toast(translations.PLEASE_ENTER_PRICE, toastType.ERROR_TOAST);
    }
    if (
      errorCounter > 0 ||
      errorImageCounter > 0 ||
      errorInStockCounter > 0 ||
      errorSizeCounter > 0 ||
      errorVariantDiffPrice > 0 ||
      errorInStockZeroCounter > 0 ||
      errorSwimsuitCounter > 0
    ) {
      setVariantListReady(false);
      setTimeout(() => {
        setVariantListReady(true);
      }, 1);
    }
    setTopErrorColorName(localErrorColorName);

    return (
      errorCounter === 0 &&
      errorImageCounter === 0 &&
      errorInStockCounter === 0 &&
      errorSizeCounter === 0 &&
      errorVariantDiffPrice === 0 &&
      errorInStockZeroCounter === 0 &&
      errorSwimsuitCounter === 0
    );
  };

  const moveToError = () => {
    if (scrollRef?.current && topErrorColorName !== '') {
      let localY = dataSourceCords[topErrorColorName];
      scrollRef?.current?.scrollTo({
        x: 0,
        y: localY + topViewHeight,
        animated: true,
      });
    }
  };
  useEffect(() => {
    moveToError();
    if (
      onStepComplete !== undefined &&
      completedStep === SELL_TABS.STEP_TWO &&
      isAllFieldCompleted()
    ) {
      onStepComplete();
    } else if (setCompletedStep !== undefined) {
      setCompletedStep(SELL_TABS.STEP_TWO);
    }
  }, [isNextClick]);

  const onSelectColor = async (
    masterRecordsItem: MasterRecordsItem[] | undefined,
  ) => {
    if (addEditRequest?.result?.variable_fields === undefined) {
      setProductDetail({
        ...addEditRequest,
        result: {variable_fields: []},
      });
    }

    masterRecordsItem?.forEach(element => {
      if (colorVariantTempList !== undefined && isVariantNotAdded(element)) {
        colorVariantTempList?.push({
          hex_code: element.hex_code,
          id: element.id,
          name: element.name + '',
        });
      }
    });
    if (
      addEditRequest?.result?.variable_fields !== undefined &&
      addEditRequest?.result?.variable_fields.length > 0
    ) {
      setColorError('');
      for (let index = 0; index < 5; index++) {
        await makeSame(masterRecordsItem);
        setVariantListReady(false);
        setTimeout(() => {
          setVariantListReady(true);
        }, 100);
      }

      setVariantListReady(false);
      setTimeout(() => {
        setVariantListReady(true);
      }, 10);
    }
    setVariantListReady(true);
    mapDataCordsWithColorList();
  };
  const mapDataCordsWithColorList = () => {
    let varFeilds = addEditRequest?.result?.variable_fields;
    const varFeilds_names = varFeilds.map(item => item.name);
    const dataSourceCords_filtered = Object.fromEntries(
      Object.entries(dataSourceCords).filter(([key]) =>
        varFeilds_names.includes(key),
      ),
    );
    setDataSourceCords(dataSourceCords_filtered);
  };
  const makeSame = async (
    masterRecordsItem: MasterRecordsItem[] | undefined,
  ) => {
    if (masterRecordsItem !== undefined && masterRecordsItem?.length > 0) {
      setColorList(true);
    }
    setTimeout(() => {
      if (addEditRequest?.result?.variable_fields !== undefined) {
        for (
          let index = 0;
          index < addEditRequest?.result.variable_fields.length;
          index++
        ) {
          setTimeout(() => {
            if (
              !isExist(
                addEditRequest?.result?.variable_fields!![index],
                masterRecordsItem,
              )
            ) {
              createDeletedProductVariantArray(index);
              addEditRequest?.result?.variable_fields?.splice(index, 1);
              setVariantListReady(false);
              setTimeout(() => {
                setVariantListReady(true);
                setColorVariantTempList(
                  addEditRequest?.result?.variable_fields,
                );
                if (
                  addEditRequest?.result?.variable_fields !== undefined &&
                  addEditRequest?.result?.variable_fields.length > 5
                ) {
                  flatList?.current?.scrollToIndex({
                    index: 0,
                    animated: true,
                    viewPosition: 0.3,
                  });
                }
              }, 100);
            }
          }, 100);
        }
        setVariantListReady(false);
        setTimeout(() => {
          setVariantListReady(true);
        }, 100);
      }
    }, 100);
  };

  const isExist = (
    variableField: VariableField | undefined,
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
  const isVariantNotAdded = (variant: MasterRecordsItem) => {
    var found = 0;
    if (addEditRequest?.result?.variable_fields !== undefined) {
      addEditRequest?.result?.variable_fields.forEach(element => {
        if (element.id === variant.id && found < 1) {
          found = 1;
        }
      });
    }
    return found !== 1;
  };

  const resetProductVariantArray = (index: number | undefined) => {
    if (index !== undefined) {
      createDeletedProductVariantArray(index);
      addEditRequest?.result?.variable_fields?.splice(index, 1);
    }
    if (addEditRequest?.result?.variable_fields?.length === 0) {
      setColorList(false);
    }

    setVariantListReady(false);
    setTimeout(() => {
      setVariantListReady(true);
    }, 10);
    mapDataCordsWithColorList();
  };

  const createDeletedProductVariantArray = (index: number | undefined) => {
    if (
      index !== undefined &&
      addEditRequest?.result?.variable_fields !== undefined &&
      addEditRequest?.result?.variable_fields[index] !== undefined &&
      addEditRequest?.result?.variable_fields[index].productVariantSizeList !==
        undefined &&
      addEditRequest?.result?.variable_fields[index]?.productVariantSizeList!!
        .length > 0 &&
      addEditRequest?.result?.variable_fields[index]
        ?.productVariantSizeList!![0].product_id !== undefined
    ) {
      if (addEditRequest.delete_product === undefined) {
        addEditRequest.delete_product = [];
      }
      addEditRequest.delete_product?.push(
        addEditRequest?.result?.variable_fields[index].id + '',
      );
    }
  };

  const getColor = (attributes?: VariableField[] | undefined) => {
    if (attributes !== undefined) {
      for (let index = 0; index < attributes?.length; index++) {
        if (
          attributes[index].id === SELL_PRODUCT_ATTRIBUTES.SELL_PRODUCT_COLOR ||
          attributes[index].id === SELL_PRODUCT_ATTRIBUTES.SELL_JEWELRY_COLOR
        ) {
          return attributes[index].values;
        }
      }
    }
    return [];
  };
  const setColourVarientLayout = (val: any, index: string) => {
    let obj = dataSourceCords;
    obj[index] = val;
    setDataSourceCords(obj);
  };
  return (
    <View
      style={styles.sellStepTwoContainer}
      onLayout={event => {
        const layout = event.nativeEvent.layout;
        setTopViewHeight(layout.y);
      }}>
      {category?.id === SELL_PRODUCT.SWIMSUITS && (
        <SwimsuitType
          addEditRequest={addEditRequest}
          setSwimsuitSizeType={setSwimsuitSizeType}
          selectSizeType={swimsuitTypesize}
          swimsuitTypeError={swimsuitTypeError}
          sellAttributeData={sellAttributeData}
          setProductDetail={setProductDetail}
          isEditProduct={isEditProduct}
        />
      )}

      <View style={styles.sellStepTwoColorContainer}>
        {isColorList ? (
          <>
            <View style={styles.row}>
              <Text
                style={styles.colorTitle}
                numberOfLines={1}
                ellipsizeMode="tail">
                {translations.COLORS}
                <Text style={styles.titleMandetoryStyles}>{'*'}</Text>
              </Text>
              <TouchableOpacity
                style={styles.colorEditContainer}
                onPress={() => {
                  setColorModalVisible(true);
                }}>
                <View>
                  <AppImages.Dashboard.edit_ICON width={18} height={18} />
                </View>
              </TouchableOpacity>
            </View>
            {isColorList && (
              <FlatList
                data={colorVariantTempList}
                horizontal
                ref={flatList}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <View>
                    {item.name === SELL_COLOR.MULTI_COLOR ? (
                      <View style={[styles.colorCircle]}>
                        <AppImages.Dashboard.MultiColorIcon
                          width={36}
                          height={36}
                        />
                      </View>
                    ) : (
                      <View
                        style={[
                          styles.colorCircle,
                          {backgroundColor: item.hex_code},
                        ]}
                      />
                    )}
                    <TouchableOpacity
                      style={styles.colorDeleteContainer}
                      onPress={() => {
                        resetProductVariantArray(index);
                        if (index > 4) {
                          flatList?.current?.scrollToIndex({
                            index: 0,
                            animated: true,
                            viewPosition: 0.3,
                          });
                        }
                      }}>
                      <View>
                        <AppImages.CreateContestentProfile.tpp_cross_small_icon
                          width={moderateScaleVertical(16)}
                          height={moderateScaleVertical(16)}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
          </>
        ) : (
          <FloatingDropdown
            floatingText={translations.SELECT_COLOR}
            isMandatory={true}
            onFieldFocus={() => {
              setColorModalVisible(true);
            }}
            errorMsg={colorError}
          />
        )}
      </View>

      <>
        {colorVariantTempList !== undefined &&
          colorVariantTempList.map((i, index) => {
            return (
              <SellVariant
                index={index}
                sizes={sellAttributeData?.variable_fields}
                selectSwimsuitSizeType={swimsuitTypesize}
                addEditRequest={addEditRequest}
                productVariantColor={i}
                category={category}
                isVariantLisRefresh={isVariantLisReady}
                onDeleteClick={(position: number | undefined) => {
                  resetProductVariantArray(position);
                }}
                layoutY={setColourVarientLayout}
              />
            );
          })}
      </>

      {isVariantLisReady &&
        sellAttributeData?.variable_fields !== undefined &&
        sellAttributeData?.variable_fields?.length > 0 && (
          <CustomBottomModal
            isModalVisible={isColorModalVisible}
            setIsModalVisible={setColorModalVisible}
            data={getColor(sellAttributeData?.variable_fields)}
            parentCallback={selectedColorList => {
              onSelectColor(selectedColorList);
            }}
            heading={translations.COLOR}
            preSelectedValue={addEditRequest?.result?.variable_fields}
            enableSearch={true}
            isColor
            enableMultiselect={true}
          />
        )}
    </View>
  );
};

export default StepTwo;

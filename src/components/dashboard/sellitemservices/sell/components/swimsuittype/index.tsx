import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import translations from '../../../../../../assets/translations';
import FloatingDropdown from '../../../../../common/floatingdropown';
import {styles} from './styles';
import AppImages from '../../../../../../assets/images/AppImages';
import CustomBottomModal from '../../../../../common/custombottommodal';
import {ProductsData} from '../../../../../../services/models/sellitems/myProducts';
import {
  SellAttributes,
  VariableField,
} from '../../../../../../services/models/sellitems/stepOne/catgoryFields';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';

interface Props {
  addEditRequest: ProductsData;
  sellAttributeData: SellAttributes | undefined;
  setSwimsuitSizeType: any;
  selectSizeType: number;
  setProductDetail: any;
  swimsuitTypeError: string;
  isEditProduct: boolean;
}

export enum SIZE_TYPE {
  TOP = 37,
  BOTTOM = 38,
  BOTH = 39,
}

export const SwimsuitType = ({
  addEditRequest,
  sellAttributeData,
  setSwimsuitSizeType,
  selectSizeType,
  setProductDetail,
  swimsuitTypeError,
  isEditProduct,
}: Props) => {
  const [isSwimsuitTypeModalVisible, setSwimsuitTypeModalVisible] =
    useState(false);
  const [isRefeshModalList, setRefeshModalList] = useState(true);

  const onSwimsuitSizeChange = val => {
    setSwimsuitSizeType(val);
    addEditRequest.swimsuit_item_type = val;
    addEditRequest.subcategory = undefined;
    setRefeshModalList(false);
    setTimeout(() => {
      setRefeshModalList(true);
    }, 100);
  };

  const getTypeName = (typeID: number, id: number) => {
    let typeArray = getCategoryTypeList(typeID);
    if (typeArray !== undefined) {
      for (const element of typeArray) {
        if (id === element.id) {
          return element.name;
        }
      }
    }
  };

  const getSwimeTopType = (typeID: number) => {
    if (typeID === SIZE_TYPE.TOP) {
      return translations.SWIMSUIT_TOP;
    } else if (typeID === SIZE_TYPE.BOTTOM) {
      return translations.SWIMSUIT_BOTTOMS;
    } else if (typeID === SIZE_TYPE.BOTH) {
      return translations.SWIMSUIT_BOTH;
    }
  };

  const getCategoryTypeList = (typeID: number) => {
    if (sellAttributeData?.subcategory !== undefined) {
      for (
        let index = 0;
        index < sellAttributeData?.subcategory.length;
        index++
      ) {
        if (typeID === sellAttributeData?.subcategory[index].id) {
          return sellAttributeData?.subcategory[index].values;
        }
      }
    }
  };
  const getCategoryItem = (): VariableField | undefined => {
    if (sellAttributeData?.subcategory !== undefined) {
      for (
        let index = 0;
        index < sellAttributeData?.subcategory.length;
        index++
      ) {
        if (selectSizeType === sellAttributeData?.subcategory[index].id) {
          return sellAttributeData?.subcategory[index];
        }
      }
    }
  };

  useEffect(() => {
    if (
      addEditRequest?.swimsuit_item_type === undefined ||
      addEditRequest?.swimsuit_item_type === null
    ) {
      addEditRequest.swimsuit_item_type = SIZE_TYPE.BOTH;
    } else {
      setSwimsuitSizeType(addEditRequest.swimsuit_item_type);
    }
  }, []);

  return (
    <View>
      {isEditProduct ? (
        <View
          style={[
            styles.sellStepTwoColorContainer,
            {marginBottom: moderateScaleVertical(20)},
          ]}>
          <View style={styles.typeRow}>
            <AppImages.SELL_ITEMS.CategoryIcon />
            <Text style={styles.selectItem}>{' Item: '}</Text>
            <Text style={styles.selectType}>
              {getSwimeTopType(selectSizeType)}
            </Text>
          </View>
          <View style={styles.typeRow}>
            <AppImages.SELL_ITEMS.TypeIcon />
            <Text style={styles.selectItem}>{'Type: '}</Text>
            <Text style={styles.selectType}>
              {getTypeName(
                selectSizeType,
                addEditRequest?.subcategory?.values?.id
              )}
            </Text>
          </View>
        </View>
      ) : (
        <>
          <Text style={styles.selectItemNew}>{translations.SELECT_ITEM}</Text>
          <View style={styles.sellStepTwoColorContainer}>
            <TouchableOpacity
              style={styles.radioButtonContainer}
              onPress={() => onSwimsuitSizeChange(SIZE_TYPE.TOP)}>
              <View style={styles.row}>
                {selectSizeType === SIZE_TYPE.TOP ? (
                  <AppImages.Common.RadioButton
                    width={moderateScaleVertical(18)}
                    height={moderateScaleVertical(18)}
                  />
                ) : (
                  <AppImages.Common.Ellipse
                    width={moderateScaleVertical(18)}
                    height={moderateScaleVertical(18)}
                  />
                )}
                <Text
                  style={
                    selectSizeType === SIZE_TYPE.TOP
                      ? styles.activeRadioButton
                      : styles.inActiveRadioButton
                  }>
                  {translations.ADD_SWIMSUIT_TOP}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioButtonContainer}
              onPress={() => onSwimsuitSizeChange(SIZE_TYPE.BOTTOM)}>
              <View style={styles.row}>
                {selectSizeType === SIZE_TYPE.BOTTOM ? (
                  <AppImages.Common.RadioButton
                    width={moderateScaleVertical(18)}
                    height={moderateScaleVertical(18)}
                  />
                ) : (
                  <AppImages.Common.Ellipse
                    width={moderateScaleVertical(18)}
                    height={moderateScaleVertical(18)}
                  />
                )}
                <Text
                  style={
                    selectSizeType === SIZE_TYPE.BOTTOM
                      ? styles.activeRadioButton
                      : styles.inActiveRadioButton
                  }>
                  {translations.ADD_SWIMSUIT_BOTTOMS}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.radioButtonContainer,
                {marginBottom: moderateScaleVertical(16)},
              ]}
              onPress={() => onSwimsuitSizeChange(SIZE_TYPE.BOTH)}>
              <View style={styles.row}>
                {selectSizeType === SIZE_TYPE.BOTH ? (
                  <AppImages.Common.RadioButton
                    width={moderateScaleVertical(18)}
                    height={moderateScaleVertical(18)}
                  />
                ) : (
                  <AppImages.Common.Ellipse
                    width={moderateScaleVertical(18)}
                    height={moderateScaleVertical(18)}
                  />
                )}
                <Text
                  style={
                    selectSizeType === SIZE_TYPE.BOTH
                      ? styles.activeRadioButton
                      : styles.inActiveRadioButton
                  }>
                  {translations.ADD_A_COMBO}
                </Text>
              </View>
            </TouchableOpacity>
            <FloatingDropdown
              floatingText={translations.SELECT_TYPE}
              isMandatory={true}
              value={addEditRequest?.subcategory?.values?.name}
              onFieldFocus={() => {
                setSwimsuitTypeModalVisible(true);
              }}
              errorMsg={swimsuitTypeError}
            />
          </View>
        </>
      )}

      {sellAttributeData?.subcategory !== undefined &&
        sellAttributeData?.subcategory.length > 0 &&
        isRefeshModalList && (
          <CustomBottomModal
            isModalVisible={isSwimsuitTypeModalVisible}
            setIsModalVisible={setSwimsuitTypeModalVisible}
            data={getCategoryTypeList(selectSizeType)}
            parentCallback={selectedSwimsuitType => {
              setProductDetail({
                ...addEditRequest,
                subcategory: {
                  id: selectSizeType,
                  name: getCategoryItem()?.name,
                  label: getCategoryItem()?.label,
                  values: {
                    id: selectedSwimsuitType.id,
                    name: selectedSwimsuitType.name,
                  },
                },
              });
            }}
            heading={translations.SELECT_TYPE}
            preSelectedValue={addEditRequest?.subcategory?.values?.id}
          />
        )}
    </View>
  );
};

export default SwimsuitType;

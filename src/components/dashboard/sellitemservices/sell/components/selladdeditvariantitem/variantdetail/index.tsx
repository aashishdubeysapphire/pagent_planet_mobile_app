import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import AppImages from '../../../../../../../assets/images/AppImages';
import FloatingInput from '../../../../../../common/floatinginput';
import {
  ProductVariantSizeList,
  VariableField,
} from '../../../../../../../services/models/sellitems/stepOne/catgoryFields';
import translations from '../../../../../../../assets/translations';
import {Category} from '../../../../../../../services/models/sellitems/sellCategory';
import {
  SELL_PRODUCT,
  SELL_PRODUCT_ATTRIBUTES,
} from '../../../../../../utils/enum';
import {moderateScaleVertical} from '../../../../../../utils/responsiveSize';
import {ProductsData} from '../../../../../../../services/models/sellitems/myProducts';
import {ConTwoDecDigit, hapticFeedBack} from '../../../../../../utils/helperFunction';

interface Props {
  productVariantColorSize: ProductVariantSizeList;
  isRefresh: boolean;
  resetFields: boolean;
  category?: Category;
  sizes?: VariableField[];
  productVariantColor: VariableField;
  addEditRequest: ProductsData;
}

export enum JEWELRY_ENUM {
  JEWELRY_AB_YES = '274',
  JEWELRY_AB_NO = '275',
}
const VariantDetail = ({
  productVariantColorSize,
  isRefresh,
  resetFields,
  category,
  sizes,
  productVariantColor,
  addEditRequest,
}: Props) => {
  const [isDiffPriceActive, setDiffPriceActive] = useState(
    productVariantColorSize?.isDiffPrice !== undefined
      ? productVariantColorSize?.isDiffPrice
      : false
  );

  const [isAbActive, setAbActive] = useState(translations.NO_SMALL);
  const [inStockError, setInStockError] = useState(String);
  const [priceError, setPriceError] = useState(String);

  const [inStock, setInStock] = useState(
    productVariantColorSize?.inventory !== undefined
      ? productVariantColorSize?.inventory + ''
      : ''
  );
  const [price, setPrice] = useState(productVariantColorSize?.price);

  const [salePrice, setSalePrice] = useState(
    productVariantColorSize?.selling_price
  );

  useEffect(() => {
    if (
      productVariantColorSize !== undefined &&
      isDiffPriceActive !== undefined
    ) {
      productVariantColorSize.isDiffPrice = isDiffPriceActive;
    }

    if (
      isDiffPriceActive !== undefined &&
      !isDiffPriceActive &&
      productVariantColorSize !== undefined &&
      productVariantColorSize?.price !== undefined &&
      productVariantColorSize?.selling_price !== undefined
    ) {
      productVariantColorSize.price = '';
      productVariantColorSize.selling_price = '';
      setPrice('');
      setSalePrice('');
    }
  }, [isDiffPriceActive]);

  useEffect(() => {
    if (
      productVariantColorSize !== undefined &&
      productVariantColorSize?.inStockError !== undefined
    ) {
      setInStockError(productVariantColorSize.inStockError);
    }
    if (
      productVariantColorSize !== undefined &&
      productVariantColorSize.priceError !== undefined
    ) {
      setPriceError(productVariantColorSize.priceError);
    }
  }, [isRefresh]);

  useEffect(() => {
    if (
      category?.id === SELL_PRODUCT.JEWELRY &&
      isABAvailable(sizes) &&
      productVariantColor.ab === undefined
    ) {
      productVariantColor.ab = JEWELRY_ENUM.JEWELRY_AB_NO;
    }
  }, []);

  const onAuroraBorealisChange = () => {
    if (isAbActive === translations.YES) {
      setAbActive(translations.NO_SMALL);
      setTimeout(() => {
        productVariantColor.ab = JEWELRY_ENUM.JEWELRY_AB_NO;
      }, 100);
    } else if (isAbActive === translations.NO_SMALL) {
      setAbActive(translations.YES);
      productVariantColor.ab = JEWELRY_ENUM.JEWELRY_AB_YES;
    }
  };
  useEffect(() => {
    if (productVariantColorSize !== undefined) {
      setInStock(
        productVariantColorSize?.inventory !== undefined
          ? productVariantColorSize?.inventory + ''
          : ''
      );

      if (
        productVariantColorSize?.isDiffPrice === undefined ||
        !productVariantColorSize?.isDiffPrice
      ) {
        setDiffPriceActive(false);
        setPrice('');
        setSalePrice('');
      } else {
        setDiffPriceActive(productVariantColorSize?.isDiffPrice);
        setPrice(
          productVariantColorSize?.price !== undefined
            ? productVariantColorSize?.price + ''
            : ''
        );
        setSalePrice(
          productVariantColorSize?.selling_price !== undefined
            ? productVariantColorSize?.selling_price + ''
            : ''
        );
      }
    }
  }, [resetFields]);

  useEffect(() => {
    if (productVariantColorSize !== undefined && inStock !== undefined) {
      productVariantColorSize.inventory = inStock;
    }
    if (
      productVariantColorSize !== undefined &&
      (inStock !== undefined && inStock.length) === 0
    ) {
      productVariantColorSize.isCompleted = false;
    }
  }, [inStock]);
  useEffect(() => {
    if (productVariantColorSize !== undefined && price !== undefined) {
      productVariantColorSize.price = price;
    }
  }, [price]);

  useEffect(() => {
    if (
      productVariantColor !== undefined &&
      productVariantColor?.ab !== undefined &&
      productVariantColor?.ab + '' === JEWELRY_ENUM.JEWELRY_AB_YES
    ) {
      setAbActive(translations.YES);
    }
  }, [productVariantColor.ab]);

  useEffect(() => {
    if (productVariantColorSize !== undefined && salePrice !== undefined) {
      productVariantColorSize.selling_price = salePrice;
    }
  }, [salePrice]);

  const isABAvailable = (attributes?: VariableField[] | undefined) => {
    if (attributes !== undefined) {
      for (let index = 0; index < attributes?.length; index++) {
        if (
          attributes[index].id === SELL_PRODUCT_ATTRIBUTES.SELL_JEWELRY_AB_SIZE
        ) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <View style={styles.addItemContainer}>
      <FloatingInput
        floatingText={translations.IN_STOCK}
        value={inStock}
        isMandatory={true}
        maxLength={100}
        errorMsg={inStockError}
        returnKeyType={'done'}
        keyboardType="numeric"
        autoCapitalize={'none'}
        setText={val => setInStock(val.replace(/[^\d]/g, ''))}
      />
      {category?.id === SELL_PRODUCT.JEWELRY && isABAvailable(sizes) && (
        <View>
          <Text style={styles.inputLabel}>
            {translations.AB_AURORA_BOREALS}
          </Text>
          <View style={styles.radioContainer}>
            <TouchableOpacity
              style={styles.label}
              onPress={() => onAuroraBorealisChange()}>
              <View style={styles.row}>
                {isAbActive === translations.YES ? (
                  <View style={styles.radio}>
                    <AppImages.Common.RadioButton
                      width={moderateScaleVertical(18)}
                      height={moderateScaleVertical(18)}
                    />
                  </View>
                ) : (
                  <View style={styles.radio}>
                    <AppImages.Common.Ellipse
                      width={moderateScaleVertical(18)}
                      height={moderateScaleVertical(18)}
                    />
                  </View>
                )}
                <Text
                  style={
                    isAbActive === translations.YES
                      ? styles.activeRadioButton
                      : styles.inActiveRadioButton
                  }>
                  {translations.YES}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onAuroraBorealisChange()}>
              <View style={styles.row}>
                {isAbActive === translations.NO_SMALL ? (
                  <View style={styles.radio}>
                    <AppImages.Common.RadioButton
                      width={moderateScaleVertical(18)}
                      height={moderateScaleVertical(18)}
                    />
                  </View>
                ) : (
                  <View style={styles.radio}>
                    <AppImages.Common.Ellipse
                      width={moderateScaleVertical(18)}
                      height={moderateScaleVertical(18)}
                    />
                  </View>
                )}
                <Text
                  style={
                    isAbActive === translations.YES
                      ? styles.inActiveRadioButton
                      : styles.activeRadioButton
                  }>
                  {translations.NO_SMALL}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={[styles.selected]}
        onPress={() => {
          if (isDiffPriceActive !== undefined) {
            setDiffPriceActive(!isDiffPriceActive);
          } else {
            setDiffPriceActive(true);
          } 
          !isDiffPriceActive && hapticFeedBack()
        }}>
        <View style={[styles.rowVariantPrice]}>
          <View style={styles.radioButtonImage}>
            {isDiffPriceActive ? (
              <AppImages.PCA.checkBoxselected width={20} height={20} />
            ) : (
              <AppImages.PCA.checkBoxunselected width={20} height={20} />
            )}
          </View>
          <Text
            style={
              isDiffPriceActive ? styles.selectedText : styles.unselectedText
            }>
            {translations.SET_DIFFERENT_PRICE_FOR_THIS_SIZE}
          </Text>
        </View>
      </TouchableOpacity>

      {isDiffPriceActive && (
        <View style={styles.row}>
          <View style={styles.row}>
            <FloatingInput
              floatingText={translations.PRICE}
              value={price}
              isMandatory={true}
              maxLength={100}
              returnKeyType={'done'}
              errorMsg={priceError}
              keyboardType="numeric"
              autoCapitalize={'none'}
              //
              setText={val => setPrice(ConTwoDecDigit(val?.trim()))}
            />
          </View>
          <View style={styles.rowSalePrice}>
            <FloatingInput
              floatingText={translations.SALE_PRICE}
              value={salePrice}
              keyboardType="numeric"
              maxLength={100}
              returnKeyType={'done'}
              autoCapitalize={'none'}
              setText={val => setSalePrice(ConTwoDecDigit(val?.trim()))}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default VariantDetail;

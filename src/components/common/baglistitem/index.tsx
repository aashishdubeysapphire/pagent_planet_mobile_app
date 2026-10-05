import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {color} from '../../../assets/colorConstant';
import AppImages from '../../../assets/images/AppImages';
import translations from '../../../assets/translations';
import {SCREEN} from '../../../root/screenname';
import ProductSelectedType from '../../dashboard/sellitemservices/components/productselectedtype';
import {moderateScaleVertical, moderateScale} from '../../utils/responsiveSize';
import {toast, toastType} from '../commonalert';
import FastImageView from '../fastimageview';
import {styles} from './styles';
import { IS_MINOR_VALUES } from '../../utils/enum';

interface Props {
  selectedCallback: any;
  setError: any;
  item: any;
  onPressDelete: any;
}
/* The code is defining a functional component called `BagListItem` that takes in four props: `item`,
`selectedCallback`, `setError`, and `onPressDelete`. These props are of type `Props`, which is an
interface defined earlier in the code. The component will render some JSX elements based on the
values of these props. */
const BagListItem = ({
  item,
  selectedCallback,
  setError,
  onPressDelete,
}: Props) => {
  const [quantity, setQuantity] = useState(item?.quantity);
  const [selected, setSelected] = useState(
    item?.marked_for_checkout === 1 ? true : false,
  );
  const navigation = useNavigation();

  const [inStock] = useState(
    item?.product?.attributes?.resultSet[0]?.productVariantSizeList?.length > 0
      ? item?.product?.attributes?.resultSet[0]?.productVariantSizeList[0]
          ?.inventory
      : item?.product?.inventory,
  );

  /**
   * The function `onMinusClick` decreases the quantity of a product item by 1 and updates the selected
   * callback with the new quantity.
   */
  const onMinusClick = productItem => {
    if (quantity > 1) {
      setQuantity(quantity - 1);

      selectedCallback({
        id: productItem?.id,
        marked: productItem?.marked_for_checkout === 1 ? IS_MINOR_VALUES.SMALL_YES : IS_MINOR_VALUES.SMALL_NO,
        quantity: quantity - 1,
      });
    }
  };
  useEffect(() => {
    setSelected(item?.marked_for_checkout === 1 ? true : false);
    if (item?.quantity > inStock && item?.marked_for_checkout === 1) {
      setError(true);
    } else {
      setError(false);
    }
  }, [item?.marked_for_checkout]);
  useEffect(() => {
    setQuantity(item?.quantity);
    if (item?.quantity > inStock && selected) {
      setError(true);
    } else {
      setError(false);
    }
  }, [item?.quantity]);

  /* The `getCategory` function takes in a `productCategoryitem` parameter and returns the name of the
  product's category. It checks if the `productCategoryitem` is defined and if it has a `product`
  property with a `subcategory` property. If it does, it iterates over the `subcategory` array and
  checks if each subcategory has a `values` property with a `name` property. If it finds a
  subcategory with a valid name, it returns that name. If no valid subcategory name is found, it
  returns an empty string. */
  const getCategory = productCategoryitem => {
    if (
      productCategoryitem !== undefined &&
      productCategoryitem?.product?.subcategory !== undefined
    ) {
      for (
        let index = 0;
        index < productCategoryitem?.product?.subcategory?.length;
        index++
      ) {
        if (
          productCategoryitem?.product?.subcategory[index].values !==
            undefined &&
          productCategoryitem?.product?.subcategory[index]?.values?.name !==
            undefined
        ) {
          return productCategoryitem?.product?.subcategory[index]?.values?.name;
        }
      }
    }
    return '';
  };

  /* The `onBulletClick` function is a callback function that is triggered when the user clicks on the
  bullet icon in the component. */
  const onBulletClick = () => {
    if (selected) {
      setSelected(false);
      selectedCallback({id: item?.id, marked: IS_MINOR_VALUES.SMALL_NO , quantity: quantity});
    } else if (!selected && inStock > 0 && item?.mark_as_sold === IS_MINOR_VALUES.NO) {
      setSelected(true);

      selectedCallback({id: item?.id, marked: IS_MINOR_VALUES.SMALL_YES , quantity: quantity});
    }
  };
  /* The `onPlusClick` function is a callback function that is triggered when the user clicks on the
  plus button in the component. It increases the quantity of the product item by 1 and updates the
  selected callback with the new quantity. */
  const onPlusClick = () => {
    if (quantity < inStock) {
      setQuantity(quantity + 1);

      selectedCallback({
        id: item?.id,
        marked: item?.marked_for_checkout === 1 ? IS_MINOR_VALUES.SMALL_YES : IS_MINOR_VALUES.SMALL_NO,
        quantity: quantity + 1,
      });
    } else {
      toast(
        translations.PRODUCT_NOT_AVAILABLE_IN_SELECTED_QUANTITY,
        toastType.ERROR_TOAST,
      );
    }
  };
  const ifNoProductSelectedType = () => {
    return !(
      item?.product?.attributes?.resultSet?.length > 0 ||
      item?.product?.attributes?.resultSet[0]?.productVariantSizeList?.length >
        0 ||
      item?.product?.subcategory?.length > 0 ||
      item?.product?.attributes?.resultSet[0]?.ab
    );
  };
  return (
    <View>
      <View style={styles.closedContainer}>
        <View style={styles.bulletView}>
          <TouchableOpacity
            style={selected ? styles.bulletSelected : styles.bulletUnselected}
            onPress={() => onBulletClick(item)}>
            {selected && <AppImages.Common.CheckBox />}
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.topSection}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(SCREEN.PRODUCT_DETAIL, {
                  productId: item?.product?.parent_id,
                })
              }>
              <FastImageView
                width={moderateScaleVertical(78)}
                height={moderateScaleVertical(78)}
                imageUrl={item?.product?.product_img_url}
                borderRadius={moderateScale(12)}
                borderColor={color.S_GRAY_2}
              />
            </TouchableOpacity>
            <View style={styles.productSection}>
              <Text style={styles.productLabel} numberOfLines={2}>
                {item?.product?.unique_style_number}
              </Text>
              <View style={styles.infoSection}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={{marginRight: 'auto'}}>
                  <Text
                    style={
                      item?.product?.selling_price !== undefined &&
                      item?.product?.selling_price !== null &&
                      item?.product?.selling_price.toString().length > 0 &&
                      item?.product?.price !== undefined &&
                      item?.product?.price.toString().length > 0 &&
                      item?.product?.price !== item?.product?.selling_price
                        ? styles.maxPriceLabel
                        : styles.actualPriceLabel
                    }>
                    {`$${item?.product?.price}`}
                  </Text>
                  {item?.product?.selling_price !== undefined &&
                    item?.product?.selling_price !== null &&
                    item?.product?.selling_price.toString() !== '' &&
                    item?.product?.price !== undefined &&
                    item?.product?.price.toString().length > 0 &&
                    item?.product?.price !== item?.product?.selling_price && (
                      <>
                        <View style={{width: moderateScale(8)}}></View>
                        <Text style={styles.actualPriceLabel}>
                          ${item?.product?.selling_price}
                        </Text>
                      </>
                    )}
                </Text>
                {inStock > 0 && item?.mark_as_sold === IS_MINOR_VALUES.NO ? (
                  <View style={styles.quantityView}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => onMinusClick(item)}>
                      <AppImages.Common.Minus />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{quantity}</Text>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => onPlusClick(item)}>
                      <AppImages.Common.Plus />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.colorSizeSection}>
                    <View style={styles.color} />
                    <Text style={styles.outofstock}>
                      {translations.OUT_OF_STOCK}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View style={styles.row}>
            {item?.product?.attributes?.resultSet?.length > 0 ? (
              <ProductSelectedType
                label={translations.COLOR}
                image={<AppImages.SELL_ITEMS.ColorIcon />}
                colorsList={item?.product?.attributes?.resultSet}
              />
            ) : null}
            {item?.product?.attributes?.resultSet[0]?.productVariantSizeList
              ?.length > 0 && (
              <ProductSelectedType
                label={translations.SIZE_SELECTED}
                image={<AppImages.SELL_ITEMS.SizeIcon />}
                productVariantSizeList={
                  item?.product?.attributes?.resultSet[0]
                    ?.productVariantSizeList
                }
              />
            )}
            {item?.product?.subcategory?.length > 0 ? (
              <ProductSelectedType
                label={translations.TYPE}
                image={<AppImages.SELL_ITEMS.CategoryIcon />}
                info={getCategory(item)}
              />
            ) : null}
            {item?.product?.attributes?.resultSet[0]?.ab && (
              <ProductSelectedType
                label={translations.AB_AURORA_BOREALIS}
                image={<AppImages.SELL_ITEMS.AuroraShine />}
              />
            )}
            {ifNoProductSelectedType() && <View style={styles.emptyView} />}
          </View>
          <TouchableOpacity
            style={styles.deleteIcon}
            onPress={() => onPressDelete()}>
            <AppImages.CONVO.tpp_delete_pink
              width={moderateScale(16)}
              height={moderateScaleVertical(16)}
            />
          </TouchableOpacity>
        </View>
      </View>
      {quantity > inStock && inStock > 0 ? (
        <View style={styles.row1}>
          <View style={{flexDirection: 'row'}}>
            <AppImages.Common.Alert_ICON />
            <Text style={styles.error}> {translations.UNAVAILABLE} </Text>
          </View>
          <Text style={styles.available}>
            {inStock} {translations.AVAILABLE}{' '}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default BagListItem;

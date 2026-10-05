import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, memo } from 'react';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../../utils/responsiveSize';
import { styles } from './styles';
import AppImages from '../../../../../../../../assets/images/AppImages';
import FastImageView from '../../../../../../../common/fastimageview';
import { color } from '../../../../../../../../assets/colorConstant';
import translations from '../../../../../../../../assets/translations';
import useCgMutation from '../../../../../../../../services/api/useCgMutation';
import {
  ADD_PRODUCT,
  DELETE_PRODUCTS,
  EDIT_PRODUCTS,
} from '../../../../../../../../services/endpoints';
import {
  ApiStatusType,
  MethodTypes,
} from '../../../../../../../../services/constants';
import { Base } from '../../../../../../../../services/models/base';
import { ProductsData } from '../../../../../../../../services/models/sellitems/myProducts';
import { ActivityIndicator } from 'react-native-paper';
import { ADD_TO_WISHLIST, IS_MINOR_VALUES } from '../../../../../../../utils/enum';
import { hapticFeedBack } from '../../../../../../../utils/helperFunction';
import { useNavigation } from '@react-navigation/core';
import { SCREEN } from '../../../../../../../../root/screenname';
const TicketListItem = ({
  totalCount,
  setTotalCount,
  info,
  getHitTicketDetails,
  setIsModalVisible,
}) => {
  const [count, setCount] = useState(info?.cart_quantity);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setCount(info?.cart_quantity);
  }, [info?.cart_quantity]);

  useEffect(() => {
    if (count >= info?.inventory) {
      setShowError(true);
    }
  }, [info?.inventory])
  const navigation = useNavigation();

  // ADD PRODUCT--------------------------------------------------START
  const { mutateAsync: addProductAPI } = useCgMutation<Base<ProductsData>>({
    key: ADD_PRODUCT,
    url: ADD_PRODUCT,
    method: MethodTypes.Post,
    disableLoader: true,
    body: {
      product_id: info?.id,
      quoted_from: 'banner',
    },
    offSuccessToast: true,
  });
  // ADD PRODUCT-----------------------------------------------------END

  // EDIT PRODUCT API--------------------------------------------------START
  const { mutateAsync: editProductAPI } = useCgMutation<undefined>({
    key: EDIT_PRODUCTS,
    url: EDIT_PRODUCTS,
    method: MethodTypes.Post,
    disableLoader: true,
    body: {
      quote_item_id: info?.quote_item_id,
      marked_for_checkout: IS_MINOR_VALUES.SMALL_YES,
      quantity: count,
    },
    offSuccessToast: true,
  });
  // EDIT PRODUCT API--------------------------------------------------END

  // DELETE PRODUCT API--------------------------------------------------START
  const { mutateAsync: deleteProductAPI } = useCgMutation<undefined>({
    key: DELETE_PRODUCTS,
    url: DELETE_PRODUCTS,
    method: MethodTypes.Post,
    disableLoader: true,
    body: {
      cart_item_id: info?.quote_item_id,
      add_to_wishlist: ADD_TO_WISHLIST.FALSE,
    },
    offErrorToast: true,
    offSuccessToast: true,
  });
  // DELETE PRODUCT API--------------------------------------------------END

  const deleteProducts = async () => {
    setIsLoading(true);
    try {
      const deleteItem = await deleteProductAPI();
      if (deleteItem.status_code === ApiStatusType.Success) {
        await getHitTicketDetails(false);
        setTotalCount(totalCount - 1);
        setShowError(false);
      }
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  // Function to increment the product count
  const increment = async () => {
    hapticFeedBack();
    hitEditProductAPi(+1);
  };

  // Function to decrement the product count
  // When product count is 0 , we will call delete product API 
  const decrement = () => {
    hapticFeedBack();
    if (count == 0) {
      return;
    } else if (count == 1) {
      deleteProducts();
    } else {
      hitEditProductAPi(-1);
    }
  };

  const hitEditProductAPi = async i => {
    setIsLoading(true);
    try {
      if (count >= info?.inventory && i > 0) {
        setShowError(true);
      } else {
        await setCount(count + i);
        let editProductResponse = await editProductAPI();
        if (editProductResponse?.success) {
          setTotalCount(totalCount + i);
          if (count - 1 < info?.inventory) {
            setShowError(false);
          }
        } else {
          setCount(count - i);
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  // Function to add a product to the cart
  const hitAddProductAPi = async () => {
    setIsLoading(true);
    try {
      let productApi = await addProductAPI();

      if (productApi.status_code == ApiStatusType.Success) {
        setTotalCount(totalCount + 1);
        await getHitTicketDetails(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onPressAdd = () => {
    hapticFeedBack();
    hitAddProductAPi();
  };

  return (
    <View style={{ marginBottom: moderateScaleVertical(16) }}>
      <View style={styles.ticketContainer}>
        <View style={styles.ticketRow}>
          <TouchableOpacity
            style={styles.ticketImage}
            onPress={() => {
              setIsModalVisible(false);
              navigation.navigate(SCREEN.PRODUCT_DETAIL, {
                productId: info?.id,
              });
            }}>
            <FastImageView
              width={moderateScale(78)}
              height={moderateScale(78)}
              imageUrl={info.featured_image_path}
            />
          </TouchableOpacity>

          <View style={styles.textContainer}>
            <Text style={styles.textStyle}>{info.unique_style_number}</Text>

            <View style={styles.textRow}>
              <Text style={styles.feeText}>{translations.DOLLAR}{info.price}</Text>
              {isLoading ? (
                <View
                  style={{
                    alignSelf: 'center',
                    width: moderateScale(78),
                    height: moderateScaleVertical(26),
                  }}>
                  <ActivityIndicator size={15} color={color.P_PINK} />
                </View>
              ) : count == 0 ? (
                <TouchableOpacity style={styles.addButton} onPress={onPressAdd}>
                  <Text style={styles.addText}>{translations.ADD}</Text>
                </TouchableOpacity>
              ) : (
                <View style={[styles.addButton, styles.cartButton]}>
                  <TouchableOpacity onPress={decrement}>
                    <AppImages.Common.Minus />
                  </TouchableOpacity>
                  <Text style={styles.textStyle}>{count}</Text>
                  <TouchableOpacity onPress={increment}>
                    <AppImages.Common.Plus />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      {showError ? (
        <View style={styles.errorMsgRow}>
          <View style={styles.errorMsg}>
            <AppImages.Common.Alert_ICON />
            <Text style={styles.unavailableTxt}> {translations.UNAVAILABLE} </Text>
          </View>
          <Text style={styles.inventoryTxt}>
            {info?.inventory} {translations.AVAILABLE}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default memo(TicketListItem);



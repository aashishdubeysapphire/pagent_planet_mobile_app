import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import CustomButton from '../../../../../common/button';
import translations from '../../../../../../assets/translations';
import { SHOPPING_BAG } from '../../localEnum';
import { FlatList } from 'react-native-gesture-handler';
import BagListItem from '../../../../../common/baglistitem';
import { styles } from './styles';
import AppImages from '../../../../../../assets/images/AppImages';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';
import PriceComponent from '../../pricecomponent';
import { color } from '../../../../../../assets/colorConstant';
import {
  DELETE_PRODUCTS,
  EDIT_PRODUCTS,
  GET_OUT_OF_STOCK,
  VIEW_PRODUCTS,
} from '../../../../../../services/endpoints';
import { MethodTypes } from '../../../../../../services/constants';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import { checkIsConnected, createFirebaseLog, trackScreenView } from '../../../../../utils/helperFunction';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import { SCREEN } from '../../../../../../root/screenname';
import { ADDRESS_TYPE, FORM_TYPE, IS_MINOR_VALUES } from '../../../../../utils/enum';
import WarningModel from '../../../../../common/warningmodel';
import BagListShimmer from '../../../../../common/shimmer/baglistItemshimmer';
import { useSetLoader } from '../../../../../../store/useAppStore';
import { toast, toastType } from '../../../../../common/commonalert';
import OutOfStockModal from './outofstockmodal';
import BagEmpty from './bagempty';
import { ANALYTICS_SCREEN } from '../../../../../../assets/translations/analyticsscreenname';

const Bag = ({ setStep, bagItems, setBagItems, getCartCountApi }) => {
  const [selectedItems, setSelectedItems] = useState(null);
  const [body, setBody] = useState(null);
  const [favBody, setFavBody] = useState(null);
  const [editBody, setEditBody] = useState(null);
  const [favModal, setFavModal] = useState(false);
  const [selected, setSelected] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const isFocussed = useIsFocused();
  const setLoader = useSetLoader();
  const [deleteModal, setDeleteModal] = useState(false);
  const [itemDelete, setItemDelete] = useState(false);
  const [outOfStockModalVisible, setOutOfStockModalVisible] = useState(false);
  const [outOfStockList, setOutOfStockList] = useState([]);
  const [error, setError] = useState(false);
  const navigation = useNavigation();

  const onBulletClick = () => {
    createFirebaseLog(onBulletClick.name, Bag.name, false);
    setSelected(!selected);
    let selectedIds = '';
    for (
      let index = 0;
      index < bagItems?.cartData?.quote_item?.length;
      index++
    ) {
      selectedIds =
        selectedIds + bagItems?.cartData?.quote_item[index]?.id + ',';
    }

    let edit = {
      quote_item_id: selectedIds,
      marked_for_checkout: selected ? IS_MINOR_VALUES.SMALL_NO : IS_MINOR_VALUES.SMALL_YES,
    };

    setEditBody(edit);
  };
  const selectedCallbackFunction = quoteItem => {
    createFirebaseLog(selectedCallbackFunction.name, Bag.name, false);
    let edit = {
      quote_item_id: quoteItem?.id,
      marked_for_checkout: quoteItem?.marked,
      quantity: quoteItem?.quantity,
    };

    setEditBody(edit);
  };
  useEffect(() => {
    if (editBody !== null) {
      editProducts();
    }
  }, [editBody]);

  useEffect(() => {
    isFocussed && getProducts();
  }, [isFocussed]);
  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.SHOPPING_BAG)
  }, [])

  const onPressDelete = item => {
    createFirebaseLog(onPressDelete.name, Bag.name, false);
    setDeleteModal(true);
    setItemDelete(true);
    let deleteBody = {
      cart_item_id: item?.id,
      add_to_wishlist: 0,
    };

    setBody(deleteBody);
    setFavBody({
      cart_item_id: item?.id,
      add_to_wishlist: 1,
    });
  };

  const onPressWishlist = () => {
    createFirebaseLog(onPressWishlist.name, Bag.name, false);
    favProducts();
  };
  const onRemoveClick = () => {
    createFirebaseLog(onRemoveClick?.name, Bag?.name, false);
    deleteProducts();
  };
  const goToAddressForm = () => {
    createFirebaseLog(goToAddressForm?.name, Bag?.name, false);
    navigation.navigate(SCREEN.ADD_EDIT_ADDRESS, {
      formType: FORM_TYPE.ADD,
      addressType: ADDRESS_TYPE.BILLING,
      firstTimeForm: true,
      setStep: setStep,
    });
  };

  const { mutateAsync: editProductAPI } = useCgMutation<undefined>({
    key: EDIT_PRODUCTS,
    url: EDIT_PRODUCTS,
    method: MethodTypes.Post,
    disableLoader: true,
    body: editBody,
    offSuccessToast: true,
    offErrorToast: true,
  });
  const { mutateAsync: deleteProductAPI } = useCgMutation<undefined>({
    key: DELETE_PRODUCTS,
    url: DELETE_PRODUCTS,
    method: MethodTypes.Post,
    disableLoader: true,
    body: body,
    offErrorToast: true,
  });
  const { mutateAsync: favProductAPI } = useCgMutation<undefined>({
    key: DELETE_PRODUCTS,
    url: DELETE_PRODUCTS,
    method: MethodTypes.Post,
    disableLoader: true,
    body: favBody,
    offErrorToast: true,
  });
  const { mutateAsync: viewProducts, isLoading } = useCgMutation<undefined>({
    key: VIEW_PRODUCTS,
    method: MethodTypes.GET,
    url: VIEW_PRODUCTS,
    disableLoader: true,
    offSuccessToast: true,
  });
  const { mutateAsync: getOutOfStockList } = useCgMutation<undefined>({
    key: GET_OUT_OF_STOCK,
    method: MethodTypes.GET,
    url: GET_OUT_OF_STOCK,
    disableLoader: true,
    offSuccessToast: true,
  });

  useEffect(() => {
    getCartCountApi();
  }, [bagItems?.cartData?.quote_item?.length, isFocussed]);

  const getProducts = async () => {
    createFirebaseLog(getProducts.name, Bag.name, false);
    if (checkIsConnected()) {
      const productAllDetail = await viewProducts();
      //getting complete detail now
      if (productAllDetail.success) {
        setBagItems(productAllDetail?.data);
        setSelected(
          productAllDetail?.data?.cartData?.marked_for_checkout_item_count ===
            productAllDetail?.data?.cartData?.quote_item?.length
            ? true
            : false,
        );
        let selectedIds = '';
        for (
          let index = 0;
          index < productAllDetail?.data?.cartData?.quote_item?.length;
          index++
        ) {
          if (
            productAllDetail?.data?.cartData?.quote_item[index]
              ?.marked_for_checkout === 1
          ) {
            selectedIds =
              selectedIds +
              productAllDetail?.data?.cartData?.quote_item[index]?.id +
              ',';
          }
        }
        setSelectedItems(selectedIds);

        setFavBody({
          cart_item_id: selectedIds,
          add_to_wishlist: 1,
        });
        setBody({
          cart_item_id: selectedIds,
          add_to_wishlist: 0,
        });
        setIsEditing(false);
        setLoader(false);
      }
    }

    // }
  };
  const getOutOfStockProducts = async () => {
    createFirebaseLog(getOutOfStockProducts.name, Bag.name, false);
    if (checkIsConnected()) {
      const productAllDetail = await getOutOfStockList();

      //getting complete detail now
      if (productAllDetail.success) {
        if (
          bagItems?.cartData?.have_billing_address === 0 &&
          bagItems?.cartData?.have_shipping_address === 0 &&
          selectedItems?.length > 0 &&
          productAllDetail?.data?.length === 0 &&
          !error
        ) {
          goToAddressForm();
        } else if (
          selectedItems?.length > 0 &&
          productAllDetail?.data?.length === 0 &&
          !error
        ) {
          setStep(SHOPPING_BAG.ADDRESS);
        } else if (selectedItems?.length === 0) {
          toast(translations.SELECT_ONE, toastType.ERROR_TOAST);
        } else if (productAllDetail?.data?.length > 0) {
          setOutOfStockModalVisible(true);
        }
        setOutOfStockList(productAllDetail?.data);
        let selectedIds = '';
        for (let index = 0; index < productAllDetail?.data?.length; index++) {
          selectedIds =
            selectedIds + productAllDetail?.data[index]?.quote_item_id + ',';
        }
        let body1 = {
          cart_item_id: selectedIds,
          add_to_wishlist: 1,
        };

        setFavBody(body1);
      }
    }
  };
  const editProducts = async () => {
    createFirebaseLog(editProducts.name, Bag.name, false);
    if (checkIsConnected()) {
      setLoader(true);
      setIsEditing(true);

      const productAllDetail = await editProductAPI();

      //getting complete detail now
      if (productAllDetail.success) {
        getProducts();
      } else {
        setLoader(false);
      }
    }
  };
  const favProducts = async () => {
    createFirebaseLog(favProducts.name, Bag.name, false);
    if (checkIsConnected()) {
      const productAllDetail = await favProductAPI();

      //getting complete detail now
      if (productAllDetail.success) {
        getProducts();
      }
    }
  };
  const deleteProducts = async () => {
    createFirebaseLog(deleteProducts.name, Bag.name, false);
    if (checkIsConnected()) {
      const productAllDetail = await deleteProductAPI();

      //getting complete detail now
      if (productAllDetail.success) {
        getProducts();
      }
    }
  };
  return (
    <View style={styles.container1}>
      {(bagItems?.cartData?.quote_item?.length > 0 && !isLoading) ||
        (bagItems?.cartData?.quote_item?.length > 0 && isEditing && isLoading) ? (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          <View style={styles.greyView}>
            <View style={styles.row}>
              <TouchableOpacity
                style={
                  selected ? styles.bulletSelected : styles.bulletUnselected
                }
                onPress={() => onBulletClick()}>
                {selected && <AppImages.Common.CheckBox1 />}
              </TouchableOpacity>
              <Text
                style={{
                  ...styles.selectedCount,
                  color: selected ? color.P_GRAY_BLACK_1 : color.S_GRAY_4,
                }}>
                {bagItems?.cartData?.marked_for_checkout_item_count}/
                {bagItems?.cartData?.quote_item?.length} Items Selected
              </Text>
              <Text style={styles.price}>{`(${bagItems?.subtotal})`}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={styles.iconView}
                onPress={() => {
                  if (bagItems?.cartData?.marked_for_checkout_item_count > 0) {
                    setFavBody({
                      cart_item_id: selectedItems,
                      add_to_wishlist: 1,
                    });
                    setFavModal(true);
                  } else {
                    toast(translations.SELECT_ONE, toastType.ERROR_TOAST);
                  }
                }}>
                <AppImages.CONVO.tpp_favourite_icon_empty
                  width={moderateScale(14.9)}
                  height={moderateScaleVertical(16)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconView}
                onPress={() => {
                  if (bagItems?.cartData?.marked_for_checkout_item_count > 0) {
                    setItemDelete(false);
                    setDeleteModal(true);
                  } else {
                    toast(translations.SELECT_ONE, toastType.ERROR_TOAST);
                  }
                }}>
                <AppImages.CONVO.tpp_delete_pink
                  width={moderateScale(16)}
                  height={moderateScaleVertical(16)}
                />
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={bagItems?.cartData?.quote_item}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            style={styles.bagList}
            renderItem={item => {
              return (
                <BagListItem
                  item={item?.item}
                  selectedCallback={quoteItem =>
                    selectedCallbackFunction(quoteItem)
                  }
                  setError={setError}
                  onPressDelete={() => onPressDelete(item?.item)}
                />
              );
            }}
          />
          <View style={styles.priceView}>
            <PriceComponent
              bgColor={color.S_GRAY_1}
              totalItems={bagItems?.cartData?.marked_for_checkout_item_count}
              price={bagItems?.subtotal}
              shipping={translations.FREE}
              discount={bagItems?.discount}
              finalPrice={bagItems?.finalprice}
            />
          </View>
          <View />
        </ScrollView>
      ) : !isEditing && isLoading ? (
        <BagListShimmer />
      ) : (
        <BagEmpty
          recentlyViewed={bagItems?.recentlyViewed}
          topSellers={bagItems?.topSellers}
        />
      )}
      {(bagItems?.cartData?.quote_item?.length > 0 && !isLoading) ||
        (bagItems?.cartData?.quote_item?.length > 0 && isEditing && isLoading) ? (
        <View style={styles.button}>
          <CustomButton
            label={translations.PLACE_ORDER}
            inactive={true}
            onPress={() => {
              getOutOfStockProducts();
            }}
          />
        </View>
      ) : null}

      <WarningModel
        msg={
          translations.ARE_YOU_SURE_YOU_WANT_TO_REMOVE +
          ' ' +
          `${itemDelete ? 1 : bagItems?.cartData?.marked_for_checkout_item_count
          }` +
          ' ' +
          `${bagItems?.cartData?.marked_for_checkout_item_count > 1 &&
            !itemDelete
            ? translations.BAG_ITEMS
            : translations.BAG_ITEM
          }`
        }
        isModalVisible={deleteModal}
        setConfirm={() => {
          onRemoveClick();
        }}
        setCancel={() => {
          onPressWishlist();
        }}
        setIsModalVisible={setDeleteModal}
        cancleButtonText={translations.ADD_TO_FAVOURITES}
        yesButtonText={translations.REMOVE}
        headingStyle={styles.modalHeading}
      />
      <WarningModel
        msg={
          translations.ARE_YOU_SURE_YOU_WANT_TO_MOVE +
          ' ' +
          bagItems?.cartData?.marked_for_checkout_item_count +
          ' ' +
          `${bagItems?.cartData?.marked_for_checkout_item_count > 1
            ? translations.ITEMS_FROM_BAG_TO_FAV
            : translations.ITEM_FROM_BAG_TO_FAV
          }`
        }
        isModalVisible={favModal}
        setConfirm={() => {
          onPressWishlist();
        }}
        setIsModalVisible={setFavModal}
        yesButtonText={translations.ADD_TO_FAVOURITES}
        headingStyle={styles.modalHeading}
      />
      <OutOfStockModal
        isModalVisible={outOfStockModalVisible}
        setModalVisible={setOutOfStockModalVisible}
        setSteps={setStep}
        unavailableAddList={outOfStockList}
        onPressWishList={() => {
          onPressWishlist();
        }}
      />
    </View>
  );
};

export default memo(Bag);

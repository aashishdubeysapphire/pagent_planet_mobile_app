import React, {useContext, useEffect, useRef, useState} from 'react';
import {Text, View, TouchableOpacity, Animated} from 'react-native';
import AppImages from '../../../../../assets/images/AppImages';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';
import {styles} from './styles';
import FastImageView from '../../../../../components/common/fastimageview';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../root/screenname';
import useCgMutation from '../../../../../services/api/useCgMutation';
import {
  ADD_PRODUCT,
  ADD_PRODUCT_AS_FAVORITE,
  GET_CART_COUNT,
} from '../../../../../services/endpoints';
import {MethodTypes} from '../../../../../services/constants';
import {Base} from '../../../../../services/models/base';
import translations from '../../../../../assets/translations';
import ColorSizeModal from '../../../../common/colorsizemodal';
import {
  checkIsConnected,
  hapticFeedBack,
} from '../../../../utils/helperFunction';
import {ProductsData} from '../../../../../services/models/shop/shopLandingDetails';
import {toast, toastType} from '../../../../common/commonalert';
import GuestUserLoginSignModel from '../../../../common/guestuserloginsignupmodal';
import {UserContext} from '../../../../../store/userStore';
import {User} from '../../../../../services/models/user/user';
import {RootContext} from '../../../../../store/rootStore';
var Product = 'Product';

interface Props {
  title: string;
  sellingPrice: number;
  imageUrl: string;
  width: number;
  marginBottomValue: number;
  marginRightValue: number;
  showFavIcon: boolean;
  showMRP: boolean;
  maxPrice: number;
  id: number;
  isFav: boolean;
  closeModal: any;
  isFavScreen: boolean;
  onfavPress: any;
  item: any;
}

const ProductsView = ({
  title,
  sellingPrice,
  imageUrl,
  width,
  marginBottomValue,
  marginRightValue,
  showFavIcon,
  showMRP,
  maxPrice,
  id,
  isFavScreen = false,
  closeModal = () => {},
  isFav,
  onfavPress,
  item,
}: Props) => {
  console.log('image url', imageUrl);
  const navigation = useNavigation();
  const {storeData} = useContext(UserContext);
  const [favourite, setFavourite] = useState(isFav);
  const [favouriteAnim, setFavouriteAnim] = useState(false);
  const [inventory, setInventory] = useState(0);
  const [body, setBody] = useState({product_id: id});
  const [isGuestUserLoginModalVisinle, setGuestUserLoginModalVisinle] =
    useState(false);
  const [colorSizeModal, setColorSizeModal] = useState(false);
  const selectedAnim = useRef(new Animated.Value(1)).current;
  const [, setSelected] = useState(false);
  const {setCounter} = useContext(RootContext);
  // ADD FAVOURITE PRODUCT--------------------------------------------------START
  const {mutateAsync: addFavourite} = useCgMutation<Base<string>>({
    key: ADD_PRODUCT_AS_FAVORITE,
    url: ADD_PRODUCT_AS_FAVORITE,
    method: MethodTypes.Post,
    disableLoader: true,
    body: {id: id, record_type: Product},
    offSuccessToast: true,
    offErrorToast: true,
  });
  const {mutateAsync: viewProducts} = useCgMutation<Base<User>>({
    key: GET_CART_COUNT,
    method: MethodTypes.GET,
    url: GET_CART_COUNT,
    disableLoader: true,
    offSuccessToast: true,
  });

  const getCartCountApi = async () => {
    if (checkIsConnected()) {
      const productAllDetail = await viewProducts();
      if (productAllDetail.success) {
        setCounter(productAllDetail?.data);
      }
    }
  };

  const favIconPressed = async (Id: number) => {
    hapticFeedBack();
    animationScaling();
    if (storeData?.data?.user === null || storeData?.data?.user === undefined) {
      setGuestUserLoginModalVisinle(true);
    } else {
      setFavourite(!favourite);
      setFavouriteAnim(!favourite);
      const response = await addFavourite();
      if (!response.success) {
        setFavourite(!favourite);
      } else if (response.success) {
        getCartCountApi();
        if (isFavScreen && onfavPress !== undefined) {
          onfavPress();
        }
      }
    }
  };

  const selectedSizeCallback = selected_item => {
    let body1 = {
      product_id: selected_item?.product_id ? selected_item?.product_id : id,
    };
    setInventory(selected_item?.inventory);
    setBody(body1);
  };

  const {mutateAsync: addProductAPI} = useCgMutation<Base<ProductsData>>({
    key: ADD_PRODUCT,
    url: ADD_PRODUCT,
    method: MethodTypes.Post,
    disableLoader: true,
    body: body,
  });

  const onAddBagClick = async () => {
    if (inventory > 0 || item?.resultset?.variable_fields?.length === 0) {
      const response = await addProductAPI();
      if (response.success && !onfavPress) {
        onfavPress();
      }
    } else if (
      inventory === 0 &&
      item?.resultset?.variable_fields?.length > 0
    ) {
      toast(translations.ITEM_OUT_OF_STOCK, toastType.ERROR_TOAST);
    }
  };
  const onFavUpdate = (favState: boolean) => {
    if (onfavPress !== undefined) {
      onfavPress();
    }
    setFavourite(favState);
  };

  const onProductClicked = () => {
    closeModal();
    navigation.navigate(SCREEN.PRODUCT_DETAIL, {
      productId: id,
      onFavUpdate: onFavUpdate,
    });
  };

  useEffect(() => {
    setFavourite(isFav);
  }, [isFav]);
  useEffect(() => {
    if (favouriteAnim) {
      setTimeout(() => {
        setFavouriteAnim(false);
      }, 1000);
    }
  }, [favouriteAnim]);
  const animationScaling = () => {
    Animated.sequence([
      Animated.timing(selectedAnim, {
        toValue: 1.5,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(selectedAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setSelected(prev => !prev));
  };
  return (
    <View>
      <TouchableOpacity
        style={{
          ...styles.container,
          width: width,
          marginBottom: isFavScreen ? 0 : marginBottomValue,
          marginRight: marginRightValue,
        }}
        onPress={() => onProductClicked()}>
        <View style={{...styles.imageSection, width: width, height: width}}>
          <FastImageView
            width={width}
            height={width}
            borderRadius={moderateScale(24)}
            imageUrl={imageUrl}
          />

          {showFavIcon && (
            <TouchableOpacity
              style={styles.favCircleIcon}
              activeOpacity={1}
              onPress={() => favIconPressed(id)}>
              <Animated.View style={[{transform: [{scale: selectedAnim}]}]}>
                {favourite && (
                  <AppImages.SHOP.ActiveFavIcon
                    width={moderateScaleVertical(24)}
                    height={moderateScaleVertical(24)}
                  />
                )}
              </Animated.View>
              {!favourite && (
                <AppImages.SHOP.FavIcon
                  width={moderateScaleVertical(24)}
                  height={moderateScaleVertical(24)}
                />
              )}
            </TouchableOpacity>
          )}
          {/* {favouriteAnim && (
            <View style={styles.animcontainer}>
              <Lottie
                source={require('../../../../../assets/anim/heart11.json')}
                autoPlay
                loop={false}
              />
            </View>
          )} */}
        </View>
        <View style={styles.titleSection}>
          <Text numberOfLines={2} style={styles.title}>
            {title}
          </Text>
          <View style={styles.priceSection}>
            <Text numberOfLines={1} ellipsizeMode="tail">
              {showMRP && sellingPrice !== maxPrice && (
                <Text style={styles.MRPStyle}>${maxPrice}</Text>
              )}
              <View style={{width: moderateScale(4)}}></View>
              <Text style={styles.priceStyle}>${sellingPrice}</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {isFavScreen && (
        <TouchableOpacity
          style={{
            ...styles.bottomSection,
            marginBottom: marginBottomValue,
          }}
          onPress={() => {
            {
              hapticFeedBack();
              item?.resultset?.variable_fields?.length > 0
                ? setColorSizeModal(true)
                : onAddBagClick();
            }
          }}>
          <AppImages.SHOP.tpp_add_to_bag_icon />

          <Text style={styles.options}>{translations.MOVE_TO_BAG}</Text>
        </TouchableOpacity>
      )}
      <ColorSizeModal
        isModalVisible={colorSizeModal}
        colorList={item?.resultset?.variable_fields}
        setIsModalVisible={setColorSizeModal}
        selectedColorItem={null}
        selectedSizeItem={null}
        title={title}
        onProceedClick={onAddBagClick}
        selectedSizeCallback={items => selectedSizeCallback(items)}
      />
      <GuestUserLoginSignModel
        isModalVisible={isGuestUserLoginModalVisinle}
        setIsModalVisible={setGuestUserLoginModalVisinle}
      />
    </View>
  );
};

export default ProductsView;

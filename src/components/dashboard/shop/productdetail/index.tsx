import React, {useRef, useEffect, useState, useContext} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import translations from '../../../../assets/translations';
import {styles} from './styles';
import Carousel from 'react-native-reanimated-carousel';
import AppImages from '../../../../assets/images/AppImages';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';
import {
  GET_PRODUCT_DETAIL,
  GET_RECENTLY_VIEWED,
  LIKE_PRODUCT,
  ADD_PRODUCT,
} from '../../../../services/endpoints';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {DIRECTORY_ID, ROLES, SELL_PRODUCT} from '../../../utils/enum';
import {SCREEN} from '../../../../root/screenname';
import {useSetLoader} from '../../../../store/useAppStore';
import {MethodTypes} from '../../../../services/constants';
import FastImageView from '../../../common/fastimageview';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../../common/header';
import useCgMutation from '../../../../services/api/useCgMutation';
import {Base} from '../../../../services/models/base';
import {
  ProductsData,
  ProductsResponse,
} from '../../../../services/models/sellitems/myProducts';
import {color} from '../../../../assets/colorConstant';
import FavoriteShareAddToBag from './components/favoriteshareaddtobag';
import SoldAndShippedBy from './components/soldandshippedby';
import ProductDetails from './components/productdetails';
import ColorModal from '../../../common/colormodal';
import ProductDescription from './components/productdescription';
import BrandWornBy from './components/brandwornby';
import OvelButton from './components/ovelbutton';
import AdditionalImage from './components/additionlimage';
import RecentlyViewedProduct from './components/recentlyviewedproduct';
import {checkIsNull} from '../../../utils/validations';
import SimilarProductsModal from '../../../common/similarproductsmodal';
import ProductsDetailShimmer from '../../../common/shimmer/productdetail';
import PageantPayModal from '../components/pageantpaymodal';
import {
  checkIsConnected,
  createFirebaseLog,
  emptyFunction,
  trackScreenView,
} from '../../../utils/helperFunction';
import {SellAttributes} from '../../../../services/models/sellitems/stepOne/catgoryFields';
import ColorSizeModal from '../../../common/colorsizemodal';
import {toast, toastType} from '../../../common/commonalert';
import {UserContext} from '../../../../store/userStore';
import DressWornAt from './components/dresswornat';
import {ANALYTICS_SCREEN} from '../../../../assets/translations/analyticsscreenname';
import ImagePreview from '../components/imagepreview';
const width = Dimensions.get('window').width;

const ProductDetail = props => {
  const {getCartCountApi} = props?.route?.params;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [inventory, setInventory] = useState(0);
  const navigation = useNavigation();
  const [addToBag, setAddToBag] = useState(false);
  const {storeData} = useContext(UserContext);
  const setLoader = useSetLoader();
  const isCarousel = useRef(null);
  const scrollRef = useRef();
  const [expand, setExpand] = useState(false);
  const [productDetail, setProductDetail] = useState<ProductsData>([]);
  const [selectedColorDetails, setSelectedColorDetails] = useState(null);
  const [selectedSizeDetails, setSelectedSizeDetails] = useState(null);
  const [colorModal, setColorModal] = useState(false);
  const [body, setBody] = useState({
    product_id: props?.route?.params?.productId,
  });
  const [colorSizeModal, setColorSizeModal] = useState(false);
  const [isLiked, setIsLiked] = useState(productDetail?.is_liked);
  const [likesCount, setLikesCount] = useState(productDetail?.like_count);
  const [similarProductsModal, setSimilarProductsModal] = useState(false);
  const [isImagePreviewModalVisible, setIsImagePreviewModalVisible] =
    useState(false);
  const [isModalShow, setModalShow] = useState(false);
  const [images, setImages] = useState([]);
  const [recentlyAndSortByList, setRecentlyAndSortByList] = useState([]);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [isGuestUserLoginModalVisinle, setGuestUserLoginModalVisinle] =
    useState(false);
  //API PAGEANT LIST ----------------------------------------- START
  const {mutateAsync: getProductDetail} = useCgMutation<Base<ProductsResponse>>(
    {
      key: GET_PRODUCT_DETAIL + props?.route?.params?.productId,
      method: MethodTypes.Post,
      body: {
        product_id: props?.route?.params?.productId,
        savesearch: props?.route?.params?.savesearch === true ? 1 : 0,
        fromDetailScreen: true,
      },
      url: GET_PRODUCT_DETAIL,
      disableLoader: true,
      offSuccessToast: true,
    },
  );
  //API PAGEANT LIST ----------------------------------------- END

  // LIKE PRODUCT--------------------------------------------------START
  const {mutateAsync: likeProductAPI} = useCgMutation<Base<ProductsData>>({
    key: LIKE_PRODUCT,
    url: LIKE_PRODUCT,
    method: MethodTypes.Post,
    disableLoader: true,
    body: {product_id: props?.route?.params?.productId},
    offSuccessToast: true,
    offErrorToast: true,
  });
  const {mutateAsync: addProductAPI} = useCgMutation<Base<ProductsData>>({
    key: ADD_PRODUCT,
    url: ADD_PRODUCT,
    method: MethodTypes.Post,
    disableLoader: true,
    body: body,
  });
  // LIKE PRODUCT--------------------------------------------------END

  const scrollToTop = async () => {
    createFirebaseLog(scrollToTop.name, SCREEN.PRODUCT_DETAIL);
    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const {mutateAsync: getRecentlyView} = useCgMutation<Base<ProductsResponse>>({
    key: GET_RECENTLY_VIEWED + props?.route?.params?.productId,
    method: MethodTypes.Post,
    body: {
      product_id: props?.route?.params?.productId,
    },
    url: GET_RECENTLY_VIEWED,
    disableLoader: true,
    offSuccessToast: true,
  });

  const onLikeButtonPressed = async () => {
    createFirebaseLog(onLikeButtonPressed.name, SCREEN.PRODUCT_DETAIL);
    const response = await likeProductAPI();
    if (response.success) {
      setIsLiked(!isLiked);
      {
        !isLiked
          ? setLikesCount(likesCount + 1)
          : setLikesCount(likesCount - 1);
      }
    }
  };
  const selectedSizeCallback = item => {
    createFirebaseLog(selectedSizeCallback.name, SCREEN.PRODUCT_DETAIL);
    let body1 = {
      product_id: item?.product_id
        ? item?.product_id
        : props?.route?.params?.productId,
    };
    setInventory(item?.inventory);
    setBody(body1);
  };

  const onProceedClick = async () => {
    createFirebaseLog(onProceedClick.name, SCREEN.PRODUCT_DETAIL);
    if (
      (productDetail?.result?.variable_fields?.length > 0 &&
        selectedSizeDetails !== null &&
        selectedSizeDetails?.inventory > 0 &&
        !addToBag) ||
      (productDetail?.result?.variable_fields?.length === 0 && !addToBag)
    ) {
      const response = await addProductAPI();
      if (response.success) {
        setAddToBag(true);
        getCartCountApi();
      }
    } else if (selectedSizeDetails?.inventory === 0 && !addToBag) {
      toast(translations.ITEM_OUT_OF_STOCK, toastType.ERROR_TOAST);
    } else if (addToBag) {
      navigation.navigate(SCREEN.SHOPPING_BAG);
    }
  };
  const onAddBagClick = async () => {
    createFirebaseLog(onAddBagClick.name, SCREEN.PRODUCT_DETAIL);
    if (inventory > 0) {
      const response = await addProductAPI();
      if (response.success) {
        setAddToBag(true);
        getCartCountApi();
      }
    } else if (inventory === 0) {
      toast(translations.ITEM_OUT_OF_STOCK, toastType.ERROR_TOAST);
    }
  };
  useEffect(() => {
    setLoader(false);
    setAddToBag(false);
    trackScreenView(ANALYTICS_SCREEN.PRODUCT_DETAIL);
  }, []);

  useEffect(() => {
    if (isFocused) {
      getProductAttributeDetail();
      scrollToTop();
      setSelectedSizeDetails(null);
      setSelectedColorDetails(null);
      setAddToBag(false);
      let body1 = {
        product_id: props?.route?.params?.productId,
      };
      setBody(body1);
    }
  }, [isFocused, props?.route?.params?.productId]);

  useEffect(() => {
    if (productDetail?.featured_full_path_image !== undefined) {
      let localImageVar = [];
      localImageVar.push(productDetail?.featured_full_path_image);
      productDetail?.result?.variable_fields?.forEach(element => {
        localImageVar.push(element?.image);
      });
      setImages(localImageVar);
    }
  }, [productDetail]);
  const hitGetRecentlyView = async () => {
    createFirebaseLog(hitGetRecentlyView.name, SCREEN.PRODUCT_DETAIL);
    if (storeData?.data?.user !== null && storeData?.data?.user !== undefined) {
      const res = await getRecentlyView();
      if (res.success) {
        setRecentlyAndSortByList(res.data);
      }
    }

    setLoader(false);
  };
  const onSelectSize = item => {
    createFirebaseLog(onSelectSize.name, SCREEN.PRODUCT_DETAIL);
    setSelectedSizeDetails(item);
    let body1 = {
      product_id: item?.product_id
        ? item?.product_id
        : props?.route?.params?.productId,
    };
    setBody(body1);
  };
  const getSizeLabel = (label: any | undefined) => {
    createFirebaseLog(getSizeLabel.name, SCREEN.PRODUCT_DETAIL);
    return label?.toString()?.split(' ')[0];
  };
  const getProductAttributeDetail = async () => {
    createFirebaseLog(getProductAttributeDetail.name, SCREEN.PRODUCT_DETAIL);
    if (checkIsConnected()) {
      setIsLoading(true);
      const productAllDetail = await getProductDetail();
      //getting complete detail now
      if (productAllDetail.success) {
        setProductDetail(productAllDetail?.data?.productDetail);

        setLikesCount(productAllDetail?.data?.productDetail?.like_count);
        productAllDetail?.data?.productDetail?.is_liked === 1
          ? setIsLiked(true)
          : setIsLiked(false);
        hitGetRecentlyView();
      } else {
        navigation.navigate(SCREEN.SHOP);
      }
      setIsLoading(false);
    }
  };
  const getCategory = (sellAttributes: SellAttributes | undefined) => {
    createFirebaseLog(getCategory.name, SCREEN.PRODUCT_DETAIL);
    if (
      sellAttributes !== undefined &&
      sellAttributes?.subcategory !== undefined
    ) {
      for (let index = 0; index < sellAttributes?.subcategory.length; index++) {
        if (
          sellAttributes?.subcategory[index].values !== undefined &&
          sellAttributes?.subcategory[index]?.values?.name !== undefined
        ) {
          return sellAttributes?.subcategory[index]?.values?.name;
        }
      }
    }
    return '';
  };
  const _renderItem = ({item}) => {
    createFirebaseLog(_renderItem.name, SCREEN.PRODUCT_DETAIL);
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.eventImageArea}
        onPress={() => {
          setIsImagePreviewModalVisible(true);
        }}>
        <FastImageView
          height={moderateScaleVertical(400)}
          width={width}
          imageUrl={item}
        />
      </TouchableOpacity>
    );
  };
  const getBrandId = (type = 'id') => {
    createFirebaseLog(getBrandId.name, SCREEN.PRODUCT_DETAIL);
    let nonVarFeilds = checkIsNull(productDetail?.result?.non_variable_fields)
      ? productDetail?.result?.non_variable_fields
      : [];

    let brandItem = nonVarFeilds.filter(data => data?.label == 'Brand');

    let brandId = brandItem[0]?.values?.id;
    if (type === 'id') {
      return brandId;
    } else {
      return brandItem;
    }
  };
  const onItemClick = (index, item) => {
    createFirebaseLog(onItemClick.name, SCREEN.PRODUCT_DETAIL);
    setCurrentSlide(index + 1);
    setSelectedSizeDetails(null);
    setSelectedColorDetails(item);
    setAddToBag(false);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Header
        lable={productDetail?.unique_style_number}
        isUnderLineRequired
        rightIcon1={AppImages.Dashboard.ShopingBagIcon}
        showCart
        fallbackToDashboardOnBack
      />
      {isImagePreviewModalVisible && (
        <ImagePreview
          isModalVisible={isImagePreviewModalVisible}
          setIsModalVisible={setIsImagePreviewModalVisible}
          data={images}
          currentSlide={currentSlide}
        />
      )}

      <ScrollView ref={scrollRef} overScrollMode="never">
        {isLoading || productDetail?.price === undefined ? (
          <ProductsDetailShimmer />
        ) : (
          <>
            <View style={styles.upcomingEventSection}>
              <React.Fragment>
                <Carousel
                  width={width}
                  height={moderateScaleVertical(400)}
                  data={images}
                  loop={false}
                  defaultIndex={currentSlide}
                  onSnapToItem={index => setCurrentSlide(index)}
                  renderItem={_renderItem}
                />

                {/* Pagination */}
                <View style={styles.paginationContainer}>
                  {images.map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.paginationDot,
                        i === currentSlide && styles.paginationDotActive,
                      ]}
                    />
                  ))}
                </View>

                {/* Like */}
                <TouchableOpacity
                  style={styles.likeRow}
                  onPress={onLikeButtonPressed}>
                  {isLiked ? (
                    <AppImages.Common.LikeIcon />
                  ) : (
                    <AppImages.Common.UnfilledLike />
                  )}
                  <Text style={styles.likeCount}>{likesCount}</Text>
                </TouchableOpacity>

                {/* Similar */}
                <TouchableOpacity
                  style={styles.viewSimilar}
                  onPress={() => setSimilarProductsModal(true)}>
                  <AppImages.Common.SimilarProducts />
                </TouchableOpacity>
              </React.Fragment>
            </View>

            <View style={styles.titleRow}>
              <Text style={styles.productTitle}>
                {productDetail?.unique_style_number}
              </Text>
              {productDetail?.category_detail?.id !==
                SELL_PRODUCT.TICKETS_ENTRY &&
              productDetail?.category_detail?.id !== SELL_PRODUCT.BEAUTY &&
              productDetail?.category_detail?.id !== SELL_PRODUCT.HIRE &&
              productDetail?.category_detail?.id !==
                SELL_PRODUCT.DIGITAL_PAINT &&
              productDetail?.result?.variable_fields?.length > 0 ? (
                <View style={styles.colorColumn}>
                  <View style={styles.colorRow}>
                    {productDetail?.result?.variable_fields !== undefined &&
                      productDetail?.result?.variable_fields.map((i, index) => {
                        return (
                          <View>
                            {index < 6 ? (
                              <TouchableOpacity
                                style={{
                                  ...styles.smallcolorRound,
                                  backgroundColor: i?.hex_code,
                                }}
                                onPress={() => setColorModal(true)}
                              />
                            ) : null}
                          </View>
                        );
                      })}
                  </View>
                  <Text style={styles.colorText}>
                    {productDetail?.result?.variable_fields?.length > 1
                      ? productDetail?.result?.variable_fields?.length +
                        ' ' +
                        translations.COLORS
                      : productDetail?.result?.variable_fields?.length +
                        ' ' +
                        translations.COLOR}
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={styles.priceRow}>
              <Text
                style={
                  (selectedSizeDetails?.size &&
                    selectedSizeDetails?.price ===
                      selectedSizeDetails?.selling_price) ||
                  (!selectedSizeDetails?.size && productDetail?.price_range) ||
                  (!selectedSizeDetails?.size &&
                    productDetail?.selling_price === productDetail?.price)
                    ? styles.price1
                    : styles.price
                }>
                {selectedSizeDetails?.size
                  ? `$${selectedSizeDetails?.price}`
                  : productDetail?.price_range
                  ? productDetail?.price_range
                  : `$${productDetail?.price}`}
              </Text>
              {
                <Text style={styles.sellingPrice}>
                  {selectedSizeDetails?.size
                    ? selectedSizeDetails?.price ===
                      selectedSizeDetails?.selling_price
                      ? ''
                      : `$${selectedSizeDetails?.selling_price}`
                    : productDetail?.price_range
                    ? ''
                    : productDetail?.selling_price === productDetail?.price
                    ? ''
                    : `$${productDetail?.selling_price}`}
                </Text>
              }
            </View>
            {productDetail?.brand_name ? (
              <View style={styles.brandrow}>
                <AppImages.SELL_ITEMS.BrandIcon />
                <Text
                  style={styles.brandTitle}
                  onPress={() => {
                    if (productDetail?.brand_status === translations.ACTIVE) {
                      navigation.navigate(
                        SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE,
                        {
                          roleId: productDetail?.brand_owner_id, //owner id
                          profileId: productDetail?.designer_id,
                          name: productDetail.brand_name,
                          category: DIRECTORY_ID.DESIGNER,
                          selectedTab: ROLES.DESIGNER,
                          key: new Date().getMilliseconds(),
                          owner_id: productDetail?.brand_owner_id,
                        },
                      );
                    } else {
                      emptyFunction();
                    }
                  }}>
                  {translations.BRAND}:{' '}
                  <Text style={{...styles.brandTitle1, color: color.P_PINK}}>
                    {productDetail?.brand_name}
                  </Text>
                </Text>
              </View>
            ) : null}
            {productDetail?.category_detail?.id ===
              SELL_PRODUCT.TICKETS_ENTRY ||
            productDetail?.category_detail?.id === SELL_PRODUCT.BEAUTY ||
            productDetail?.category_detail?.id === SELL_PRODUCT.HIRE ||
            productDetail?.category_detail?.id === SELL_PRODUCT.DIGITAL_PAINT ||
            productDetail?.category_detail?.id === SELL_PRODUCT.SWIMSUITS ? (
              <View style={styles.brandrow}>
                <AppImages.SELL_ITEMS.TypeIcon />
                <Text style={styles.brandTitle}>
                  {translations.TYPE}:{' '}
                  <Text style={styles.brandTitle1}>
                    {getCategory(productDetail?.result)}
                  </Text>
                </Text>
              </View>
            ) : null}
            {productDetail?.category_detail?.id === SELL_PRODUCT.JEWELRY &&
            productDetail?.result?.variable_fields[currentSlide - 1]?.ab ===
              274 ? (
              <View style={styles.brandrow}>
                <AppImages.SELL_ITEMS.AuroraShine />
                <Text style={styles.brandTitle}>
                  {translations.AB_AURORA_BOREALIS}
                </Text>
              </View>
            ) : null}
            {productDetail?.category_detail?.id !==
              SELL_PRODUCT.TICKETS_ENTRY &&
            productDetail?.category_detail?.id !== SELL_PRODUCT.BEAUTY &&
            productDetail?.category_detail?.id !== SELL_PRODUCT.HIRE &&
            productDetail?.category_detail?.id !==
              SELL_PRODUCT.DIGITAL_PAINT ? (
              <View style={styles.row}>
                <View style={styles.row1}>
                  <AppImages.SELL_ITEMS.ProductCondition />
                  <Text style={styles.brandTitle}>
                    {translations.PRODUCT_CONDITION}:{' '}
                    <Text style={styles.brandTitle1}>
                      {productDetail?.worn_status?.title}
                    </Text>
                  </Text>
                </View>
                {productDetail?.worn_status?.title === 'Minor Flaws' && (
                  <TouchableOpacity onPress={() => setExpand(!expand)}>
                    {expand ? (
                      <AppImages.Dashboard.upArrow_ICON />
                    ) : (
                      <AppImages.Common.DownArrow />
                    )}
                  </TouchableOpacity>
                )}
              </View>
            ) : null}
            {expand && (
              <View>
                <Text style={styles.minorflaws}>
                  {productDetail?.flaw_detail}
                </Text>
              </View>
            )}
            {/* <TouchableOpacity onPress={() => setModalShow(true)}>
              <Image
                source={AppImages.SELL_ITEMS.PageantPayBanner}
                style={styles.imageStyle}
              />
            </TouchableOpacity> */}
            {productDetail?.category_detail?.id !==
              SELL_PRODUCT.TICKETS_ENTRY &&
            productDetail?.category_detail?.id !== SELL_PRODUCT.BEAUTY &&
            productDetail?.category_detail?.id !== SELL_PRODUCT.HIRE &&
            productDetail?.category_detail?.id !==
              SELL_PRODUCT.DIGITAL_PAINT ? (
              <View style={styles.colorsBackground}>
                <Text style={styles.color}>
                  {selectedColorDetails
                    ? translations.SELECTED_COLOR + selectedColorDetails?.name
                    : translations.SELECT_COLOR}
                </Text>
                <FlatList
                  data={productDetail?.result?.variable_fields}
                  keyExtractor={item => item.id.toString()}
                  showsHorizontalScrollIndicator={false}
                  style={styles.colorList}
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
                      onPress={() => onItemClick(index, item)}
                    />
                  )}
                />
                {selectedColorDetails?.id ? (
                  <>
                    <Text style={styles.size}>
                      {selectedSizeDetails
                        ? translations.SELECTED_SIZE +
                          selectedSizeDetails?.size?.name
                        : translations.SELECT_SIZE}
                    </Text>
                    <FlatList
                      data={selectedColorDetails?.productVariantSizeList}
                      keyExtractor={item => item.id.toString()}
                      showsHorizontalScrollIndicator={false}
                      style={styles.colorList}
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
                          onPress={() => {
                            onSelectSize(item);
                            setAddToBag(false);
                          }}>
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
                    {selectedSizeDetails?.inventory}{' '}
                    {translations.IN_STOCK_VALUE}
                  </Text>
                )}
                <Text style={styles.note}>
                  {translations.NOTE}
                  <Text style={styles.vary}> {translations.VARY}</Text>
                </Text>
              </View>
            ) : null}

            <SoldAndShippedBy
              countryList={productDetail?.country_id}
              brandId={getBrandId()}
              name={productDetail?.profile_name}
              id={productDetail?.profile_id}
              roleId={productDetail?.role_id}
              userId={productDetail?.user_id}
              seller_image={productDetail?.seller_image}
              showFindProductNearMe={productDetail?.designer_id != 0}
              review_average={productDetail?.review_average}
              review_count={productDetail?.review_count}
              productSlug={productDetail?.slug}
            />
            <ProductDetails
              non_variable_fields={productDetail?.result?.non_variable_fields}
            />
            <ProductDescription description={productDetail?.description} />
            <BrandWornBy brandsWornBy={recentlyAndSortByList?.brandsWornBy} />
            {productDetail?.worn_at_pageant_name && (
              <DressWornAt
                eventName={productDetail?.worn_at_pageant_name}
                productDetail={productDetail}
              />
            )}
            <AdditionalImage
              additional_images={productDetail?.additional_images}
              videoId={productDetail?.video_id}
              video_link={productDetail?.video_link}
            />
            <OvelButton
              category={productDetail?.category_detail}
              brandItem={getBrandId('obj')}
            />
            <RecentlyViewedProduct
              recentlyViewed={recentlyAndSortByList?.recentlyViewed}
            />
          </>
        )}
      </ScrollView>

      <ColorModal
        isModalVisible={colorModal}
        colorList={productDetail?.result?.variable_fields}
        setIsModalVisible={setColorModal}
        selectedColorItem={selectedColorDetails}
        setSelectedColorItem={setSelectedColorDetails}
        setSelectedSizeItem={setSelectedSizeDetails}
        setAddToBag={setAddToBag}
        setCurrentSlide={setCurrentSlide}
      />
      <ColorSizeModal
        isModalVisible={colorSizeModal}
        colorList={productDetail?.result?.variable_fields}
        setIsModalVisible={setColorSizeModal}
        selectedColorItem={selectedColorDetails}
        selectedSizeItem={selectedSizeDetails}
        onProceedClick={onAddBagClick}
        selectedSizeCallback={item => selectedSizeCallback(item)}
      />
      {!isLoading && !!productDetail && (
        <FavoriteShareAddToBag
          productId={props?.route?.params?.productId}
          is_favorite={productDetail?.is_favorite}
          public_url={productDetail?.public_url}
          params={props?.route?.params}
          setColorSizeModal={setColorSizeModal}
          onProceedClick={onProceedClick}
          addToBag={addToBag}
          modal={
            productDetail?.result?.variable_fields?.length > 0 &&
            selectedSizeDetails === null &&
            !addToBag
              ? true
              : false
          }
          getCartCountApi={getCartCountApi}
          setGuestUserLoginModalVisinle={setGuestUserLoginModalVisinle}
          isGuestUserLoginModalVisinle={isGuestUserLoginModalVisinle}
        />
      )}
      <SimilarProductsModal
        isModalVisible={similarProductsModal}
        setIsModalVisible={setSimilarProductsModal}
        productId={props?.route?.params?.productId}
      />
      <PageantPayModal
        isModalVisible={isModalShow}
        setModalVisible={setModalShow}
      />
    </SafeAreaView>
  );
};

export default ProductDetail;

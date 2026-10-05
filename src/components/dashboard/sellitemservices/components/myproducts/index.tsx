import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import AppImages from '../../../../../assets/images/AppImages';
import FastImageView from '../../../../common/fastimageview';
import {moderateScale} from '../../../../utils/responsiveSize';
import {color} from '../../../../../assets/colorConstant';
import translations from '../../../../../assets/translations';
import useInfiniteHtQuery from '../../../../../services/api/useHtInfiniteQuery';
import {
  DELETE_MY_PRODUCT,
  GET_MY_PRODUCTS_LIST,
  GET_PRODUCT_DETAIL,
} from '../../../../../services/endpoints';
import {MethodTypes, Param} from '../../../../../services/constants';
import {
  MyProductsList,
  ProductsData,
  ProductsResponse,
} from '../../../../../services/models/sellitems/myProducts';
import ProductsShimmer from '../../../../common/shimmer/productshimmer';
import CustomToggleButton from '../togglebutton';
import ProductSelectedType from '../productselectedtype';
import useCgMutation from '../../../../../services/api/useCgMutation';
import WarningModel from '../../../../common/warningmodel';
import {checkIsConnected} from '../../../../utils/helperFunction';
import {checkIsNull} from '../../../../utils/validations';
import {SCREEN} from '../../../../../root/screenname';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {
  useSetLoader,
  useSetScreenRefresh,
} from '../../../../../store/useAppStore';
import {ActivityIndicator} from 'react-native-paper';
import {Base} from '../../../../../services/models/base';
import {useNetInfo} from '@react-native-community/netinfo';
import {internetState} from '../../../../common/commonalert';
import {REFESH_SCREEN, SELL_PRODUCT} from '../../../../utils/enum';
import {SellAttributes} from '../../../../../services/models/sellitems/stepOne/catgoryFields';

interface ProductsProps {
  data: string | number;
  image: any;
}

interface Props {
  refetchCategoryAPI: any;
}

const MyProducts = ({refetchCategoryAPI}: Props) => {
  const [productId, setProductId] = useState(0);
  const [productDetail, setProductIdAttribute] = useState<ProductsData>();
  const [showModal, setShowModal] = useState(false);
  const setLoader = useSetLoader();
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const isFocused = useIsFocused();
  const setScreenRefresh = useSetScreenRefresh();

  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    refetch,
    isFetchingNextPage,
  } = useInfiniteHtQuery<MyProductsList>({
    key: GET_MY_PRODUCTS_LIST,
    url: GET_MY_PRODUCTS_LIST,
    page: Param.PAGE,
    getDataArray: page => page.data?.products?.data?.length,
    offSuccessToast: true,
    disableLoader: true,
  });
  const productsList =
    paginatedData?.pages
      ?.map(page => {
        if (
          page?.data?.products?.data != null &&
          page?.data?.products?.data != undefined
        ) {
          return page?.data?.products?.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  // DELETE MY PRODUCT--------------------------------------------------START
  const {mutateAsync: deleteProduct} = useCgMutation<Base<string>>({
    key: DELETE_MY_PRODUCT,
    method: MethodTypes.Post,
    url: DELETE_MY_PRODUCT,
    disableLoader: true,
    body: {product_id: productId},
  });
  // DELETE MY PRODUCT--------------------------------------------------END

  const {mutateAsync: getProductDetail} = useCgMutation<Base<ProductsResponse>>(
    {
      key: GET_PRODUCT_DETAIL,
      method: MethodTypes.Post,
      body: {
        product_id: productDetail?.id,
      },
      url: GET_PRODUCT_DETAIL,
      disableLoader: true,
      offSuccessToast: true,
    },
  );

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const ProductStats = ({image, data}: ProductsProps) => {
    return (
      <View
        style={{
          ...styles.statsContainer,
          width: checkIsNull(image) ? moderateScale(60) : moderateScale(80),
        }}>
        {checkIsNull(image) ? (
          image
        ) : (
          <View
            style={{
              ...styles.stockIcon,
              backgroundColor:
                data === translations.OUT_OF_STOCK ? color.RED : color.UPCOMING,
            }}></View>
        )}
        <Text
          style={{
            ...styles.statsLabel,
            color:
              data === translations.IN_STOCK
                ? color.UPCOMING
                : data === translations.OUT_OF_STOCK
                ? color.RED
                : color.S_GRAY_4,
          }}
          numberOfLines={1}>
          {data}
        </Text>
      </View>
    );
  };

  const SellingDetails = (label: string, state: boolean, id: number) => {
    return (
      <View style={styles.categoryContainer}>
        <Text style={{...styles.categoryLabel, marginLeft: 0}}>{label}</Text>
        <CustomToggleButton
          buttonState={state}
          type={label}
          productId={id}
          refetchAPI={refetch}
        />
      </View>
    );
  };

  const getStockState = (type: string) => {
    if (type === translations.NO_SMALL) {
      return translations.IN_STOCK;
    } else {
      return translations.OUT_OF_STOCK;
    }
  };

  const onDeleteButtonClicked = (id: number) => {
    setProductId(id);
    setShowModal(true);
  };

  const checkInterNet = () => {
    return checkIsConnected();
  };

  const onConfirmDelete = async () => {
    if (checkInterNet()) {
      setLoader(true);
      const res = await deleteProduct();
      if (res?.success) {
        const resp = await refetch();
        let productLength = resp?.data?.pages[0]?.data?.products?.data?.length;
        if (
          productLength === 0 ||
          productLength === null ||
          productLength === undefined
        ) {
          refetchCategoryAPI();
          setScreenRefresh(REFESH_SCREEN.JUDDGE_AND_EMCEES);
        }
      }
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    }
  };

  const onItemClick = async (index: number) => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      setProductIdAttribute(productsList[index]);
      setTimeout(() => {
        getProductAttributeDetail(index);
      }, 500);
    }
  };

  const getCategory = (sellAttributes: SellAttributes | undefined) => {
    if (
      sellAttributes !== undefined &&
      sellAttributes?.subcategory !== undefined
    ) {
      for (let index = 0; index < sellAttributes?.subcategory.length; index++) {
        if (
          sellAttributes?.subcategory[index].values !== undefined &&
          sellAttributes?.subcategory[index]?.values?.name !== undefined
        ) {
          return sellAttributes?.subcategory[index];
        }
      }
    }
    return {};
  };

  const getProductAttributeDetail = async (index: number) => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      setLoader(true);
      const productAllDetail = await getProductDetail();
      //getting complete detail now
      if (productAllDetail.success) {
        let newDetailsWithCategory = {
          ...productAllDetail?.data?.productDetail,
          product_id: productAllDetail?.data?.productDetail.id,
          subcategory: getCategory(
            productAllDetail?.data?.productDetail.result,
          ),
        };
        if (
          productsList[index]?.category_name?.id === SELL_PRODUCT.BEAUTY ||
          productsList[index]?.category_name?.id === SELL_PRODUCT.HIRE ||
          productsList[index]?.category_name?.id ===
            SELL_PRODUCT.DIGITAL_PAINT ||
          productsList[index]?.category_name?.id === SELL_PRODUCT.TICKETS_ENTRY
        ) {
          navigation.navigate(SCREEN.SELL_TWO_STEP, {
            isEditProductDetail: true,
            product: newDetailsWithCategory,
          });
        } else {
          navigation.navigate(SCREEN.SELL, {
            isEditProductDetail: true,
            product: newDetailsWithCategory,
          });
        }
      }
      setLoader(false);
    }
  };

  const onEndReached = async () => {
    if (productsList?.length > 9) {
      fetchNextPage();
    }
  };

  const listFooterComponent = () => {
    return (
      <View style={styles.bottomHeight}>
        {isFetchingNextPage ? (
          <ActivityIndicator size={'small'} color={color.P_PINK} />
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      {isLoading ? (
        <ProductsShimmer />
      ) : (
        <FlatList
          data={productsList}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          onEndReached={() => onEndReached()}
          initialNumToRender={100}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => listFooterComponent()}
          renderItem={({item, index}) => (
            <View style={styles.container}>
              <View style={styles.topSection}>
                <View style={styles.imageSection}>
                  <FastImageView
                    width={moderateScale(84)}
                    height={moderateScale(84)}
                    imageUrl={item?.featured_full_path_image}
                    borderRadius={moderateScale(12)}
                    borderColor={color.S_GRAY_2}
                  />
                </View>
                <View style={styles.productSection}>
                  <Text style={styles.productLabel} numberOfLines={3}>
                    {item?.unique_style_number}
                  </Text>
                  <View style={styles.statsSection}>
                    <ProductStats
                      image={<AppImages.SELL_ITEMS.LineEyeIcon />}
                      data={item?.view_count}
                    />
                    <ProductStats
                      image={<AppImages.SELL_ITEMS.StatsIcon />}
                      data={item?.search_count}
                    />
                    <ProductStats
                      image={''}
                      data={getStockState(item?.mark_as_sold)}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.bottomSection}>
                <View style={styles.topLayer}>
                  <ProductSelectedType
                    label={translations.TYPE}
                    info={item?.category_name?.name}
                    lastElementIndex={0}
                    index={0}
                  />
                  <View style={styles.editSection}>
                    <TouchableOpacity
                      onPress={() => onDeleteButtonClicked(item?.id)}>
                      <AppImages.Common.MyUploadsDelete
                        marginRight={moderateScale(8)}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onItemClick(index)}>
                      <AppImages.SELL_ITEMS.EditIcon20px />
                    </TouchableOpacity>
                  </View>
                </View>
                {SellingDetails(
                  translations.MARK_AS_SOLD,
                  item?.mark_as_sold !== translations.NO_SMALL,
                  item?.id,
                )}
                {SellingDetails(
                  translations.PUBLISH_PRODUCT,
                  item?.discontinued_dress === translations.NO_SMALL,
                  item?.id,
                )}
              </View>
            </View>
          )}
        />
      )}
      <WarningModel
        isModalVisible={showModal}
        setIsModalVisible={setShowModal}
        msg={translations.ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_PRODUCT}
        setConfirm={onConfirmDelete}
        headingStyle={styles.modalHeading}
      />
    </View>
  );
};

export default MyProducts;

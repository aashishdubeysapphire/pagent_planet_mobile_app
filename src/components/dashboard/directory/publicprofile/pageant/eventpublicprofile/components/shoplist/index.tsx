import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { moderateScale, moderateScaleVertical, width } from '../../../../../../../utils/responsiveSize'
import ProductsView from '../../../../../../shop/components/productview'
import Shimmer from '../../../../../../../common/shimmer'
import { styles } from './style'
import translations from '../../../../../../../../assets/translations'
import useCgMutation from '../../../../../../../../services/api/useCgMutation'
import { MethodTypes, Param } from '../../../../../../../../services/constants'
import { GET_PAGEANT_SHOP_PRODUCTS } from '../../../../../../../../services/endpoints'
import { TICKET_DATA } from '../../../../../../../utils/enum'
import { useNavigation } from '@react-navigation/core';
import { SCREEN } from '../../../../../../../../root/screenname'

// Define the component's Props interface
interface Props {
  isHorizontal: boolean,
  eventID?: number;
  profileId?: number,
  name: string,
  isPageant?: boolean,
}

const ShopList = ({
  eventID,
  isHorizontal,
  name,
  isPageant,
  profileId
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState('');
  const [productCount, setProductCount] = useState(0);
  const navigation = useNavigation();

  const getUrl = () => {
    let localUrl = '';
    if (isPageant) {
      localUrl =
        GET_PAGEANT_SHOP_PRODUCTS +
        Param.TICKET_PROFILE_ID + `${profileId}` +
        Param.TICKET_ROLE_ID + TICKET_DATA.TICKET_ROLE_ID +
        Param.VIEW_ALL + TICKET_DATA.VIEW_ALL +
        Param.ORDER_BY_TICKETS + TICKET_DATA.ORDER_BY_TICKETS;
    }
    else {
      localUrl =
        GET_PAGEANT_SHOP_PRODUCTS +
        Param.TICKET_PAGEANT_ID + `${eventID}` +
        Param.TICKET_ROLE_ID + TICKET_DATA.TICKET_ROLE_ID +
        Param.VIEW_ALL + TICKET_DATA.VIEW_ALL +
        Param.ORDER_BY_TICKETS + TICKET_DATA.ORDER_BY_TICKETS;
    }
    return localUrl;
  };

  // Use the useCgMutation hook to fetch shop products data
  const { mutateAsync: getPageantShopProducts } = useCgMutation({
    key: getUrl(),
    method: MethodTypes.GET,
    url: getUrl(),
    offSuccessToast: true,
  });

  // Fetch shop products data and update the component state
  const getPageantShopProductsDetails = async () => {
    setIsLoading(true);
    try {
      let getdata = await getPageantShopProducts();
      setProductDetails(getdata?.data);
      setProductCount(getdata?.view_all_product_count);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  // Define a function to navigate to the seller's product screen
  const moveToSellerProductScreen = async () => {
    navigation.navigate(SCREEN.SELLER_PRODUCTS, {
      name: name,
      param: Param.PAGAENT_ID + `${eventID}` + Param.ROLE_ID + TICKET_DATA.TICKET_ROLE_ID + Param.ORDER_BY_TICKETS + TICKET_DATA.ORDER_BY_TICKETS + Param.SORT + TICKET_DATA.TICKET_CATEGORY,
      uniqueKey: new Date().getMilliseconds(),
      backToSearch: false,
      cart: false,
    });
  }

  // Define a function to navigate to the pageant seller's product screen
  const moveToPageantSellerProductScreen = async () => {
    navigation.navigate(SCREEN.SELLER_PRODUCTS, {
      name: name,
      param: Param.TICKET_PROFILE_ID + `${profileId}` + Param.ROLE_ID + TICKET_DATA.TICKET_ROLE_ID + Param.ORDER_BY_TICKETS + TICKET_DATA.ORDER_BY_TICKETS + Param.SORT + TICKET_DATA.TICKET_CATEGORY,
      uniqueKey: new Date().getMilliseconds(),
      backToSearch: false,
      cart: false,
    });
  }

  // Fetch shop products data when the component mounts
  useEffect(() => {
    getPageantShopProductsDetails();
  }, []);

  return (
    <>
      {productCount > 0 ? (
        <View style={styles.shopSection}>
          <View style={styles.shopTextRow}>
            <Text style={styles.shopHeading}>{translations.SHOP}</Text>
            {productCount > 4 ? (
              <TouchableOpacity onPress={isPageant ? moveToPageantSellerProductScreen : moveToSellerProductScreen}>
                <Text style={styles.viewAllText}>{translations.VIEW_ALL}</Text>
              </TouchableOpacity>

            ) :
              (
                null
              )
            }

          </View>
          <FlatList
            horizontal={isHorizontal}
            data={productDetails}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}

            scrollEnabled={true}

            renderItem={({ item }) => {
              return (
                isLoading ? (
                  <Shimmer
                    width={width / 2 - moderateScale(24)}
                    borderRadius={moderateScale(24)}
                    height={width / 2 + moderateScaleVertical(2)}
                    leftBottomSpace={moderateScale(8)}
                    numColumns={1}
                  />
                ) :
                  (
                    <ProductsView
                      title={item?.unique_style_number}
                      sellingPrice={item?.selling_price}
                      imageUrl={item?.featured_image_path}
                      width={
                        isHorizontal
                          ? moderateScale(154)
                          : width / 2 - moderateScale(24)
                      }
                      marginBottomValue={isHorizontal ? 0 : moderateScaleVertical(16)}
                      marginRightValue={
                        isHorizontal ? moderateScale(12) : moderateScale(16)
                      }
                      showMRP={true}
                      maxPrice={item?.price}
                      id={item?.id}
                    />
                  )
              )
            }}
          />

        </View>
      ) : null
      }
    </>


  )
}

export default ShopList
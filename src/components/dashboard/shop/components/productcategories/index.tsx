import React, {useContext, useState} from 'react';
import {styles} from './styles';
import CommonProductContainer from './../../components/featuredcloset';
import translations from '../../../../../assets/translations';
import SingleBanner from '../../../../common/singlebanner';
import AppImages from '../../../../../assets/images/AppImages';
import {color} from '../../../../../assets/colorConstant';
import {FlatList, View, Text} from 'react-native';
import CategoriesList from '../../../sellitemservices/components/categorieslist';
import {ShopLandingDetails} from '../../../../../services/models/shop/shopLandingDetails';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../root/screenname';
import PageantPayModal from '../pageantpaymodal';
import {useNetInfo} from '@react-native-community/netinfo';
import {internetState} from '../../../../common/commonalert';
import GuestUserLoginSignModel from '../../../../common/guestuserloginsignupmodal';
import {UserContext} from '../../../../../store/userStore';
import {checkIsNull} from '../../../../utils/validations';

interface Props {
  shopData?: ShopLandingDetails;
}

export const ProductCategories = ({shopData}: Props) => {
  const navigation = useNavigation();
  const [isModalShow, setModalShow] = useState(false);
  const netInfo = useNetInfo();
  const {storeData} = useContext(UserContext);
  const [isGuestUserLoginModalVisinle, setGuestUserLoginModalVisinle] =
    useState(false);
  const pageantPayClicked = () => {
    setModalShow(true);
  };

  const sellItemsClicked = () => {
    navigation.navigate(SCREEN.SELL_ITEM_SERVICES);
  };

  const onPressCategory = (item: any) => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      navigation.navigate(SCREEN.FILTER_PRODUCT, {
        category: {
          id: item?.param_value,
          name: item?.name,
          param: item?.param,
        },
        displayKey: item.id + new Date().getMilliseconds() + '',
      });
    }
  };

  return (
    <View style={styles.wrapper}>
      {storeData?.data?.user !== null &&
        storeData?.data?.user !== undefined && (
          <SingleBanner
            heading={translations.SELL_ITEMS_SERVICES}
            subHeading={
              translations.SELL_ANY_PAGEANT_PRODUCT_OR_SERVICE_FOR_FREE
            }
            image={AppImages.SHOP.SellItems}
            onPress={() => sellItemsClicked()}
          />
        )}

      {checkIsNull(shopData?.featuredProducts) ? (
        <CommonProductContainer
          list={shopData?.featuredProducts}
          heading={translations.FEATURED}
          isHorizontal={true}
          bgColor={color.S_GRAY_1}
          isMarginTop={
            storeData?.data?.user !== null &&
            storeData?.data?.user !== undefined
          }
        />
      ) : null}
      {/* <SingleBanner
        heading={''}
        subHeading={
          translations.BUY_NOW_PAY_OVERTIME + '\n' + translations.ZERO_INTEREST
        }
        image={AppImages.SHOP.PageantPay}
        subImage={<AppImages.SHOP.PageantPayLogo />}
        onPress={() => pageantPayClicked()}
      /> */}
      <CommonProductContainer
        list={shopData?.slashedPrices}
        // heading={translations.ON_SALE}
        heading={translations.SHOP_SELL_SLAY}
        isHorizontal={false}
        bgColor={color.S_GRAY_1}
      />
      {/* <CommonProductContainer
        list={shopData?.mostLiked}
        heading={translations.MOST_LIKED}
        isHorizontal={true}
        bgColor={color.WHITE}
        isMarginTop={false}
        isSurvey={false}
      /> */}
      {/* <CommonProductContainer
        list={shopData?.compareProducts}
        heading={translations.WHICH_DRESS_DO_YOU_LIKE_MORE}
        isHorizontal={true}
        bgColor={color.S_GRAY_1}
        isSurvey={true}
        isMarginTop={false}
      /> */}
      {/* <View style={styles.squareContainer}>
        <Text style={styles.headingStyles}>
          {translations.TOP_SELLING_STYLES}
        </Text>

        <FlatList
          data={shopData?.popularCatgeories}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          key={'#'}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <CategoriesList
              image={item?.image_path}
              onItemClickListener={() => onPressCategory(item)}
              label={item?.name}
              id={item?.id}
            />
          )}
        />
      </View>

      <CommonProductContainer
        list={shopData?.mostViewed}
        heading={translations.MOST_VIEWED}
        isHorizontal={false}
        bgColor={color.S_GRAY_1}
        isMarginTop={false}
        isSurvey={false}
      /> */}

      <PageantPayModal
        isModalVisible={isModalShow}
        setModalVisible={setModalShow}
      />
      <GuestUserLoginSignModel
        isModalVisible={isGuestUserLoginModalVisinle}
        setIsModalVisible={setGuestUserLoginModalVisinle}
      />
    </View>
  );
};

export default ProductCategories;

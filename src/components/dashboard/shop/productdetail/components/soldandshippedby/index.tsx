import {Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {styles} from './styles';
import FastImageView from '../../../../../common/fastimageview';
import {moderateScale} from '../../../../../utils/responsiveSize';
import translations from '../../../../../../assets/translations';
import CustomRatings from '../../../../../common/customratings';
import AppImages from '../../../../../../assets/images/AppImages';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../root/screenname';
import {
  getSlugByRoleId,
  getTagTypeLable,
} from '../../../../../utils/helperFunction';
import ViewAllCountriesModal from '../viewallcountriesmodal';
import GuestUserLoginSignModel from '../../../../../common/guestuserloginsignupmodal';
import {UserContext} from '../../../../../../store/userStore';
import {color} from '../../../../../../assets/colorConstant';

export default function SoldAndShippedBy({
  countryList,
  brandId,
  name,
  id,
  roleId,
  userId,
  seller_image,
  showFindProductNearMe = true,
  review_count,
  review_average,
  productSlug,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {storeData} = useContext(UserContext);
  const navigation = useNavigation();
  const [isGuestUserLoginModalVisinle, setGuestUserLoginModalVisinle] =
    useState(false);
  const navigateToProfile = () => {
    if (!!roleId) {
      if (roleId == 3) {
        navigation.navigate(SCREEN.PAGEANT_PUBLIC_PROFILE, {
          //redirect to pageant public screen
          roleId: id,
          profileId: id,
          name: name,
        });
      } else {
        navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
          roleId: userId, //owner id
          profileId: id,
          name: name,
          key: new Date().getMilliseconds(),
          category: roleId,
          selectedTab: getTagTypeLable(roleId),
        });
      }
    }
  };
  const onSellerMessageClick = () => {
    if (storeData?.data?.user === null || storeData?.data?.user === undefined) {
      setGuestUserLoginModalVisinle(true);
    } else if (!!roleId) {
      navigation.navigate(SCREEN.COMPOSE, {
        isCommingFormProductDetails: true,
        name: {
          id: id,
          text: name,
        },
        type: {
          id: roleId,
          name: getTagTypeLable(roleId),
          slug: getSlugByRoleId(roleId),
        },
      });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{translations.SOLD_AND_SHIPPED_BY}</Text>
      <View style={styles.soldCard}>
      
        <TouchableOpacity onPress={navigateToProfile}>
          <FastImageView
            width={moderateScale(58)}
            height={moderateScale(58)}
            imageUrl={seller_image}
            borderRadius={30}
            isCircle
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToProfile}
          style={[styles.nameAndRatingView]}>
          <Text
            style={[
              styles.soldByName,
              {color: !!roleId ? color.P_PINK : color.BLACK},
            ]}
            numberOfLines={2}>
            {name}
          </Text>
          {review_count != 0 && (
            <View>
              <CustomRatings
                size={14}
                ratingsValue={review_average}
                showRatingsReviewsCount={false}
                // review_count={review_count}
              />
            </View>
          )}
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.messageimg}
          onPress={onSellerMessageClick}>
          <AppImages.SHOP.tpp_new_message_icon />
        </TouchableOpacity> */}
     
      </View>
      <TouchableOpacity 
      style={styles.contactBtn}
      onPress={onSellerMessageClick}>
        <Text style={styles.contactText}> {translations.CONTACT_SELLER} </Text>
      </TouchableOpacity>
      
      <Text style={styles.shipperGuaranteeText}>
        {translations.SHIPPER_GUARANTEE}
      </Text>

      <Text style={styles.productAvailableInText}>
        {translations.PRODUCT_AVAILABLE_IN}
      </Text>
      <View style={styles.wrapView}>
        {!!countryList &&
          countryList.map((i: {name: string}, index: number) => {
            if (index < 6) {
              return (
                <View style={styles.countriesOvel}>
                  <Text style={styles.countryName}>{i.name}</Text>
                </View>
              );
            }
          })}
      </View>
      {countryList?.length > 6 && (
        <Text style={styles.viewMore} onPress={() => setIsModalVisible(true)}>
          {translations.VIEW_MORE}
        </Text>
      )}
      {showFindProductNearMe && (
        <TouchableOpacity
          style={styles.searchView}
          onPress={() => {
            navigation.navigate(SCREEN.SOLD_AND_SHIPPED_BY, {
              brandId: brandId,
              productSlug: productSlug,
            });
          }}>
          <AppImages.SHOP.tpp_search_circle_icon />
          <Text style={styles.findProductText}>
            {translations.FIND_PRODUCT_NEAR_YOU}
          </Text>
        </TouchableOpacity>
      )}

      <ViewAllCountriesModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        countryList={countryList}
      />
      <GuestUserLoginSignModel
        isModalVisible={isGuestUserLoginModalVisinle}
        setIsModalVisible={setGuestUserLoginModalVisinle}
        toastMessage={translations.SIGN_IN_INTO_THE_APPS_TO_MESSGE_SELLER}
      />
    </View>
  );
}

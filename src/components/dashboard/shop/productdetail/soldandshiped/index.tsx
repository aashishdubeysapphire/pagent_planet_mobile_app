import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../../../../common/header';
import translations from '../../../../../assets/translations';
import {styles} from './styles';
import AppImages from '../../../../../assets/images/AppImages';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';
import SearchAdress from '../../../../common/searchaddress';
import useCgMutation from '../../../../../services/api/useCgMutation';
import {Base} from '../../../../../services/models/base';
import {PRODUCT_NEAR_YOU} from '../../../../../services/endpoints';
import {MethodTypes} from '../../../../../services/constants';
import FastImageView from '../../../../common/fastimageview';
import CustomRatings from '../../../../common/customratings';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../root/screenname';
import {openDialScreen} from '../../../../utils/helperFunction';
import {DIRECTORY_ID, PROFILE_STATUS, ROLES} from '../../../../utils/enum';
import {checkIsNull} from '../../../../utils/validations';
import ShimmerList from '../../../../common/shimmer/listshimmer';
import {UserContext} from '../../../../../store/userStore';
import GuestUserLoginSignModel from '../../../../common/guestuserloginsignupmodal';

const SoldAndExportBy = (props: {
  route: {params: {brandId: number | string}};
}) => {
  const {brandId, productSlug} = props?.route?.params;
  const navigation = useNavigation();
  const [isAddressModalVisible, setAddressModalVisible] = useState(false);
  const [address, setAddress] = useState('');
  const {storeData} = useContext(UserContext);
  const [isGuestUserLoginModalVisinle, setGuestUserLoginModalVisinle] =
    useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [retailerList, setRetailerList] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setAddressModalVisible(true);
  }, []);

  const getFinalURL = () => {
    return (
      PRODUCT_NEAR_YOU +
      '?address=' +
      address +
      '&latitude=' +
      latitude +
      '&longitude=' +
      longitude +
      '&brand_id=' +
      brandId
    );
  };
  const {mutateAsync: getProductNearYou} = useCgMutation<Base>({
    key: getFinalURL(),
    url: getFinalURL(),
    method: MethodTypes.GET,
    offSuccessToast: true,
    disableLoader: true,
  });

  const hitGetProductNearYou = async () => {
    setIsLoading(true);
    const res = await getProductNearYou();

    if (res.success) {
      setRetailerList(res.data);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    !isAddressModalVisible && !!address && hitGetProductNearYou();
  }, [isAddressModalVisible]);

  const onAddresss = (addres: string, lat: string, long: string) => {
    setAddress(addres);
    setLatitude(lat);
    setLongitude(long);
  };

  const onPressExpertDetail = item => {
    if (item?.status == PROFILE_STATUS.ACTIVE) {
      if (
        storeData?.data?.user === null ||
        storeData?.data?.user === undefined
      ) {
        setGuestUserLoginModalVisinle(true);
      } else {
        navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
          roleId: item?.owner_id, //owner id
          profileId: item?.id,
          key: new Date().getMilliseconds(),
          name: item?.business_title,
          category: DIRECTORY_ID.RETAILER,
          selectedTab: ROLES.RETAILER,
        });
      }
    }
  };
  const onPressInQuery = item => {
    if (storeData?.data?.user === null || storeData?.data?.user === undefined) {
      setGuestUserLoginModalVisinle(true);
    } else {
      navigation.navigate(SCREEN.INQUIRY_FORM, {
        profileSlug: item.slug,
        productSlug: productSlug,
      });
    }
  };
  const onPressTapHere = () => {
    if (storeData?.data?.user === null || storeData?.data?.user === undefined) {
      setGuestUserLoginModalVisinle(true);
    } else {
      navigation.navigate(SCREEN.INQUIRY_FORM, {
        profileSlug: '',
        productSlug: '',
      });
    }
  };
  const _renderItem = item => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              onPressExpertDetail(item);
            }}>
            <FastImageView
              width={moderateScale(60)}
              height={moderateScale(60)}
              imageUrl={item?.image_full_url}
              borderRadius={100}
              isCircle
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nameAndRatingView}
            onPress={() => {
              onPressExpertDetail(item);
            }}>
            <Text style={styles.soldByName} numberOfLines={2}>
              {item?.business_title}
            </Text>
            <View>
              <CustomRatings
                size={14}
                ratingsValue={item?.rating_average}
                showRatingsReviewsCount={false}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.messageimg}>
            {checkIsNull(item?.phone) && (
              <TouchableOpacity
                style={styles.callIcon}
                onPress={() => {
                  openDialScreen(String(item?.phone).replace(/\D/g, ''));
                }}>
                <AppImages.SHOP.tpp_call_icon />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.msgIcon} onPress={onPressInQuery}>
              <AppImages.SHOP.tpp_message_icon />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.addressTextCard} numberOfLines={1}>
          {item?.address}
        </Text>
      </View>
    );
  };

  const emptyList = () => {
    return (
      <View style={styles.noRecordFound}>
        <AppImages.Common.NO_FILTER_RESULT_FOUND_ICON width={'100%'} />
        <Text style={styles.noretailserFoundText}>
          {translations.NO_RETAILER_FOUND}
        </Text>
        <Text style={styles.weWillFindText}>
          <Text style={styles.tapHereText} onPress={onPressTapHere}>
            {translations.TAP_HERE}
          </Text>
          {translations.AND_FIND_NEAR_YOU}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header lable={translations.SOLD_AND_SHIPPED_BY} isUnderLineRequired />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.topText}>
          {translations.FIND_THE_PRODUCT_NEAR_YOU}
        </Text>
        <TouchableOpacity
          style={
            !!address ? [styles.searchView, styles.whiteBg] : styles.searchView
          }
          activeOpacity={0.8}
          onPress={() => {
            setAddressModalVisible(true);
          }}>
          <Text
            style={
              !!address
                ? [styles.searchBarTextPlaceholder, styles.addressText]
                : styles.searchBarTextPlaceholder
            }
            numberOfLines={1}>
            {!!address ? address : translations.SEARCH_YOUR_LOCATION}
          </Text>
          <View style={styles.searchIcon}>
            {!!address ? (
              <TouchableOpacity
                style={styles.CrossTouch}
                onPress={() => {
                  setAddress('');
                  setLatitude('');
                }}>
                <AppImages.Common.crossIcon
                  height={moderateScale(16)}
                  width={moderateScale(16)}
                />
              </TouchableOpacity>
            ) : (
              <AppImages.Common.tpp_search_small_icon
                height={moderateScale(16)}
                width={moderateScale(16)}
              />
            )}
          </View>
        </TouchableOpacity>
        <SearchAdress
          isModalVisible={isAddressModalVisible}
          setIsModalVisible={setAddressModalVisible}
          onItemSelect={onAddresss}
        />
        {!!address &&
          (isLoading ? (
            <View style={styles.removeHorizontalpading}>
              <ShimmerList
                width={Dimensions.get('window').width - moderateScale(32)}
                height={moderateScaleVertical(140)}
                padding={16}
                numColumns={1}
              />
            </View>
          ) : (
            <FlatList
              ListEmptyComponent={emptyList}
              data={retailerList}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => {
                return <View style={{height: 50}} />;
              }}
              renderItem={item => _renderItem(item.item)}
            />
          ))}
        <GuestUserLoginSignModel
          isModalVisible={isGuestUserLoginModalVisinle}
          setIsModalVisible={setGuestUserLoginModalVisinle}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SoldAndExportBy;

import {useNetInfo} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/core';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import {color} from '../../../../../assets/colorConstant';
import AppImages from '../../../../../assets/images/AppImages';
import translations from '../../../../../assets/translations';
import {SCREEN} from '../../../../../root/screenname';
import useCgMutation from '../../../../../services/api/useCgMutation';
import {MethodTypes} from '../../../../../services/constants';
import {GET_SEARCHED_SUGGESTIONS} from '../../../../../services/endpoints';
import {
  Product,
  Seller,
  Suggestionresponse,
  SuggestionResult,
} from '../../../../../services/models/shop/suggestionResult';
import {internetState} from '../../../../common/commonalert';
import FastImageView from '../../../../common/fastimageview';
import ShimmerList from '../../../../common/shimmer/listshimmer';
import {
  checkIsConnected,
  getTagTypeLable,
} from '../../../../utils/helperFunction';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../utils/responsiveSize';
import {checkIsNull} from '../../../../utils/validations';
import {styles} from './styles';
import {UserContext} from '../../../../../store/userStore';
import GuestUserLoginSignModel from '../../../../common/guestuserloginsignupmodal';
import {SafeAreaView} from 'react-native-safe-area-context';

let timeoutId;

const debounce = (func: Function, delay: number) => {
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

interface Props {
  inputBoxSearchText: string;
  setInputBoxSearchText: Function;
  refetchAPI: any;
  suggestedData: Suggestionresponse;
  setSuggestedData: Function;
}
const SearchTextInput = ({
  inputBoxSearchText,
  setInputBoxSearchText,
  refetchAPI,
  suggestedData,
  setSuggestedData,
}: Props) => {
  const navigation = useNavigation();
  const [itemSize, setItemSize] = useState(Number);
  const [role, setRole] = useState('Products');
  const netInfo = useNetInfo();
  const [isGuestUserLoginModalVisinle, setGuestUserLoginModalVisinle] =
    useState(false);
  const {storeData} = useContext(UserContext);
  // GET_SEARCHED_SUGGESTIONS--------------------------------------------------END

  const {mutateAsync: getSuggestions, isLoading} =
    useCgMutation<SuggestionResult>({
      key: GET_SEARCHED_SUGGESTIONS + encodeURIComponent(inputBoxSearchText),
      url: GET_SEARCHED_SUGGESTIONS + encodeURIComponent(inputBoxSearchText),
      method: MethodTypes.GET,
      disableLoader: true,
      offSuccessToast: true,
      offErrorToast: true,
    });
  // GET_SEARCHED_SUGGESTIONS--------------------------------------------------END

  useEffect(() => {
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
  }, []);

  const onPressProduct = (id: number) => {
    navigation.navigate(SCREEN.PRODUCT_DETAIL, {
      productId: id,
      savesearch: true,
    });
  };

  const onPressSeller = (sellerInfo: Seller) => {
    if (storeData?.data?.user === null || storeData?.data?.user === undefined) {
      setGuestUserLoginModalVisinle(true);
    } else {
      navigation.navigate(SCREEN.EXPERT_CONTESTANT_PUBLIC_PROFILE, {
        roleId: sellerInfo?.user_id, //owner id
        profileId: sellerInfo?.id,
        name: sellerInfo?.name,
        key: new Date().getMilliseconds(),
        category: sellerInfo?.business_role_id,
        selectedTab: getTagTypeLable(sellerInfo?.business_role_id),
      });
    }
  };

  const recentSearchSection = (item: Product) => {
    return (
      <TouchableOpacity
        style={styles.searchSection}
        onPress={() => onPressProduct(item?.id)}>
        <Text style={styles.recentSearchText} numberOfLines={1}>
          {item?.unique_style_number}
        </Text>
        <AppImages.SHOP.ArrowNE />
      </TouchableOpacity>
    );
  };

  const recentSearchSeller = (searchItem: Seller) => {
    return (
      <TouchableOpacity
        style={styles.sellerSection}
        onPress={() => onPressSeller(searchItem)}>
        <View>
          <FastImageView
            imageUrl={searchItem?.image}
            width={moderateScale(32)}
            height={moderateScale(32)}
            isCircle
            borderRadius={moderateScale(16)}
          />
        </View>
        <Text
          style={{
            ...styles.recentSearchText,
            marginLeft: moderateScale(8),
            width: '75%',
          }}
          numberOfLines={1}>
          {searchItem?.name}
        </Text>
        <Text style={styles.sellerText}>{translations.SELLER}</Text>
      </TouchableOpacity>
    );
  };

  const onPressBackIcon = () => {
    if (inputBoxSearchText?.trim()?.length === 0) {
      navigation.goBack();
    } else {
      setInputBoxSearchText('');
      setSuggestedData();
      refetchAPI();
    }
  };

  const hitSearchApi = async () => {
    if (checkIsConnected()) {
      const res = await getSuggestions();
      if (res?.success) {
        setSuggestedData(res?.data);
      }
    }
  };

  const onSearchClicked = () => {
    if (inputBoxSearchText?.trim()?.length !== 0) {
      if (!netInfo.isConnected && !netInfo.isInternetReachable) {
        internetState(netInfo.isConnected!!);
        return false;
      } else {
        navigation.navigate(SCREEN.SELLER_PRODUCTS, {
          name: inputBoxSearchText?.trim(),
          param: '?str=' + inputBoxSearchText?.trim() + '&savesearch=1',
          uniqueKey: new Date().getMilliseconds(),
          backToSearch:
            suggestedData?.products?.length === 0 &&
            suggestedData?.sellers?.length === 0,
        });
      }
    }
  };

  const OnChangeTextInput = (text: string) => {
    setInputBoxSearchText(text);
    if (text?.trim()?.length === 0) {
      setSuggestedData();
    } else {
      debounceSearch();
    }
  };

  const debounceSearch = debounce(hitSearchApi, 600);

  const onCrossIconClick = () => {
    setInputBoxSearchText('');
    setSuggestedData();
    refetchAPI();
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View
        style={{
          ...styles.searchBox,
          backgroundColor:
            inputBoxSearchText?.trim()?.length > 0
              ? color.WHITE
              : color.S_GRAY_1,
        }}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => onPressBackIcon()}>
          {inputBoxSearchText?.trim()?.length > 0 ? (
            <AppImages.Common.Back_ICON width={moderateScale(9)} />
          ) : (
            <AppImages.SHOP.GreyBackIcon />
          )}
        </TouchableOpacity>
        <TextInput
          placeholder={translations.SEARCH_BY_CATEGORY_PRODUCTS_AND_MORE}
          selectionColor={color.P_PINK}
          style={styles.searchTextinput}
          value={inputBoxSearchText}
          returnKeyType="search"
          onChangeText={val => {
            OnChangeTextInput(
              val.replace(
                /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
                '',
              ),
            );
          }}
          onSubmitEditing={onSearchClicked}
          autoFocus={true}
        />
        <View style={styles.searchImage}>
          {inputBoxSearchText?.trim()?.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                onCrossIconClick();
              }}>
              <AppImages.Common.crossIcon width={moderateScale(15)} />
            </TouchableOpacity>
          ) : (
            <AppImages.Common.tpp_search_small_icon />
          )}
        </View>
      </View>
      {inputBoxSearchText !== '' && suggestedData?.products?.length !== 0 ? (
        <FlatList
          data={['Products', 'Seller']}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          key={'#'}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={[
                index === 0
                  ? styles.roleItemContainer
                  : styles.roleMiddleItemContainer,
                {
                  backgroundColor:
                    role === item ? color.P_PINK : color.S_GRAY_2,
                },
              ]}
              onPress={() => {
                setRole(item);
              }}>
              <Text
                style={{
                  ...styles.roleTextStyles,
                  color: role === item ? color.WHITE : color.S_GRAY_4,
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : null}
      {suggestedData?.products?.length === 0 &&
      suggestedData?.sellers?.length === 0 ? (
        <View style={styles.noRecordFound}>
          <Text style={styles.alertcontiner}>
            {translations.NO_RESULT_FOUND +
              ' Named "' +
              inputBoxSearchText.trim() +
              '"'}
          </Text>
          <AppImages.Common.NO_FILTER_RESULT_FOUND_ICON
            width={itemSize * 2 + 12}
          />
        </View>
      ) : checkIsNull(suggestedData) &&
        inputBoxSearchText?.trim()?.length !== 0 ? (
        <ScrollView
          style={styles.suggestionArea}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          {role === 'Products' && (
            <FlatList
              data={suggestedData?.products}
              keyExtractor={(x, i) => i.toString()}
              horizontal={false}
              scrollEnabled={false}
              renderItem={({item}) => recentSearchSection(item)}
            />
          )}
          {checkIsNull(suggestedData?.sellers) && role === 'Seller' ? (
            <>
              {checkIsNull(suggestedData?.products) &&
                inputBoxSearchText?.trim()?.length !== 0 && <View></View>}
              <FlatList
                data={suggestedData?.sellers}
                keyExtractor={(x, i) => i.toString()}
                horizontal={false}
                scrollEnabled={false}
                renderItem={({item}) => recentSearchSeller(item)}
              />
            </>
          ) : null}
        </ScrollView>
      ) : isLoading ? (
        <View style={{marginLeft: moderateScale(-20)}}>
          <ShimmerList
            width={width - moderateScale(32)}
            height={moderateScaleVertical(40)}
            borderRadius={moderateScale(20)}
            padding={moderateScale(16)}
          />
        </View>
      ) : null}
      <GuestUserLoginSignModel
        isModalVisible={isGuestUserLoginModalVisinle}
        setIsModalVisible={setGuestUserLoginModalVisinle}
      />
    </SafeAreaView>
  );
};

export default SearchTextInput;

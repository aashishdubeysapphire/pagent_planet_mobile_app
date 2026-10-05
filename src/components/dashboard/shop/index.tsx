import React, {useEffect, useState} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {internetState} from '../../common/commonalert';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import DashboardHeader from '../../common/dashboardheader';
import {SCREEN} from '../../../root/screenname';
import {styles} from './styles';
import useHtQuery from '../../../services/api/useHtQuery';
import {GET_SHOP_LANDING_DETAILS} from '../../../services/endpoints';
import {ScrollView} from 'react-native-gesture-handler';
import {checkIsNull} from '../../utils/validations';
import CategoriesListing from './components/categorieslisting';
import ProductCategories from './components/productcategories';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ShopLandingDetails} from '../../../services/models/shop/shopLandingDetails';
import {moderateScaleVertical} from '../../utils/responsiveSize';
import {color} from '../../../assets/colorConstant';
import ShopShimmer from '../../common/shimmer/shopshimmer';
import useAppStore, {useSetScreenRefresh} from '../../../store/useAppStore';
import {REFESH_SCREEN, USER_DESHBOARD_TAB} from '../../utils/enum';
import {createFirebaseLog, trackScreenView} from '../../utils/helperFunction';
import {ANALYTICS_SCREEN} from '../../../assets/translations/analyticsscreenname';
import SearchBarAnimation from './components/searchbaranimation';
import {UserContext} from '../../../store/userStore';

export const Shop = () => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [shopScreenData, setShopScreenData] = useState<ShopLandingDetails>();
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const setScreenRefresh = useSetScreenRefresh();
  const {storeData} = React.useContext(UserContext);
  const {
    storeData: {refresh},
  } = useAppStore();
  const isFocused = useIsFocused();

  //API CATEGORY LIST ----------------------------------------- START
  const {data, isLoading, refetch, isRefetching} =
    useHtQuery<ShopLandingDetails>({
      key: GET_SHOP_LANDING_DETAILS,
      url: `${GET_SHOP_LANDING_DETAILS}?sort=mostRecent`,
      offSuccessToast: true,
    });
    console.log(data,'this is data for shop')
  //API CATEGORY LIST ----------------------------------------- END

  const refeshScreenList = async () => {
    createFirebaseLog(refeshScreenList.name, USER_DESHBOARD_TAB.SHOP);
    if (REFESH_SCREEN.SHOP_DASHBOARD === refresh) {
      await refetch();
      setScreenRefresh(REFESH_SCREEN.NONE);
    }
  };

  useEffect(() => {
    if (
      (!isLoading && data !== undefined) ||
      (!isRefetching && data !== undefined)
    ) {
      setShopScreenData(data.data);
    }
  }, [isLoading, isRefetching]);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);
  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.SHOP);
    if (storeData?.data?.user === null || storeData?.data?.user === undefined) {
      createFirebaseLog('IsGuestUser', 'IsGuestUser', true, 'true');
    } else {
      createFirebaseLog('IsGuestUser', 'IsGuestUser', true, 'false');
    }
  }, []);
  useEffect(() => {
    refeshScreenList();
  }, [refresh]);

  const moveToDirectoryScreen = () => {
    createFirebaseLog(moveToDirectoryScreen.name, USER_DESHBOARD_TAB.SHOP);
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      navigation.navigate(SCREEN.DIRECTORY);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <DashboardHeader
        label={null}
        onPressLeftText={() => {
          setFilterModalVisible(true);
        }}
        showMessageIcon
        onPressSearchIcon={moveToDirectoryScreen}
        isUnderLineRequired={true}
        isLeftTextClicked={filterModalVisible}
      />
      {shopScreenData === undefined && isLoading ? (
        <ShopShimmer />
      ) : (
        <>
          {isFocused && <SearchBarAnimation data={data?.data} />}
          <ScrollView>
            {checkIsNull(shopScreenData?.categories) && (
              <CategoriesListing
                categoryList={shopScreenData?.categories}
                columns={Math.ceil(shopScreenData?.categories?.length / 2)}
                verticalPadding={moderateScaleVertical(24)}
                bgColor={color.S_PINK}
              />
            )}
            <ProductCategories shopData={data?.data || []} />
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default Shop;

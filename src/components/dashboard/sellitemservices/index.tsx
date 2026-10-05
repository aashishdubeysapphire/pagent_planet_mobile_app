import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import translations from '../../../assets/translations';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import Header from '../../common/header';
import CategoriesList from './components/categorieslist';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../utils/responsiveSize';
import SwitchButton from '../../common/switchbutton';
import MyProducts from './components/myproducts';
import { SCREEN } from '../../../root/screenname';
import ShimmerList from '../../common/shimmer/listshimmer';
import ThreeDotMenuModal from './components/threedotmenumodal';
import { MethodTypes } from '../../../services/constants';
import { GET_SELL_ITEMS_CATEGORIES } from '../../../services/endpoints';
import useHtQuery from '../../../services/api/useHtQuery';
import { SellItemsCategory } from '../../../services/models/sellitems/sellCategory';
import { checkIsConnected, createFirebaseLog, trackScreenView } from '../../utils/helperFunction';
import { SELL_PRODUCT } from '../../utils/enum';
import { checkIsNull } from '../../utils/validations';
import { ANALYTICS_SCREEN } from '../../../assets/translations/analyticsscreenname';

/* This component takes in a `props` object as its parameter. */
export const SellItemServices = props => {
  const [leftTabActive, setLeftTabActive] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showTabs, setShowTabs] = useState(false);
  const navigation = useNavigation();
  const scrollRef = useRef();

  //API CATEGORY LIST ----------------------------------------- START
  const { data, isLoading, refetch, isRefetching } =
    useHtQuery<SellItemsCategory>({
      key: GET_SELL_ITEMS_CATEGORIES,
      url: GET_SELL_ITEMS_CATEGORIES,
      offSuccessToast: true,
      disableLoader: true,
      method: MethodTypes.GET,
    });
  //API CATEGORY LIST ----------------------------------------- END

  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.SELLER_PRODUCTS);
    if (props?.route?.params?.selectedTab === translations.MY_PRODUCTS) {
      setShowTabs(true);
      setLeftTabActive(false);
    } else {
      setLeftTabActive(true);
    }
  }, [props]);

  useEffect(() => {
    if (
      data?.data?.product_count > 0 &&
      checkIsNull(data?.data?.product_count)
    ) {
      setShowTabs(true);
    } else {
      setShowTabs(false);
    }
  }, [data]);


  const listFooterComponent = () => {
    createFirebaseLog(listFooterComponent.name, SCREEN.SELL_ITEM_SERVICES);
    return <View style={{ height: moderateScaleVertical(100) }}></View>;
  };

  const checkInterNet = () => {
    createFirebaseLog(checkInterNet.name, SCREEN.SELL_ITEM_SERVICES);
    return checkIsConnected();
  };

  /**
   * The function `onLeftButtonClicked` scrolls to the top of a scrollable element, sets the left tab as
   * active, and refetches data if there is an internet connection.
   */
  const onLeftButtonClicked = () => {
    createFirebaseLog(onLeftButtonClicked.name, SCREEN.SELL_ITEM_SERVICES);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
    if (!leftTabActive) {
      setLeftTabActive(!leftTabActive);
      if (checkInterNet()) {
        refetch();
      }
    }
  };

  /**
   * The function `onRightButtonClicked` scrolls to the top of a scrollable element and toggles the
   * active state of a left tab.
   */
  const onRightButtonClicked = async () => {
    createFirebaseLog(onRightButtonClicked.name, SCREEN.SELL_ITEM_SERVICES);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
    if (leftTabActive) {
      setLeftTabActive(!leftTabActive);
    }
  };

  /**
   * The `onItemClick` function navigates to different screens based on the category selected, passing
   * the selected category as a parameter.
   * @param {number} index - The `index` parameter is a number that represents the index of an item in
   * an array. It is used to determine which item was clicked or selected.
   */
  const onItemClick = (index: number) => {
    createFirebaseLog(onItemClick.name, SCREEN.SELL_ITEM_SERVICES);
    if (
      data?.data?.categories[index]?.id === SELL_PRODUCT.TICKETS_ENTRY ||
      data?.data?.categories[index]?.id === SELL_PRODUCT.BEAUTY ||
      data?.data?.categories[index]?.id === SELL_PRODUCT.DIGITAL_PAINT ||
      data?.data?.categories[index]?.id === SELL_PRODUCT.HIRE
    ) {
      navigation.navigate(SCREEN.SELL_TWO_STEP, {
        categery: data?.data?.categories[index],
      });
    } else {
      navigation.navigate(SCREEN.SELL, {
        categery: data?.data?.categories[index],
      });
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Header lable={translations.SELL_ITEMS_SERVICES} isUnderLineRequired />

      {showTabs && (
        <View style={styles.tabContainer}>
          <SwitchButton
            leftLabel={translations.SELL_ITEMS}
            rightLabel={translations.MY_PRODUCTS}
            isLeftButtonActive={leftTabActive}
            onLeftTabClicked={onLeftButtonClicked}
            onRightTabClicked={onRightButtonClicked}
          />
        </View>
      )}
      <View
        style={{
          ...styles.squareContainer,
          marginRight: leftTabActive ? 0 : moderateScale(16),
        }}>
        {leftTabActive && data?.data?.categories !== undefined ? (
          <FlatList
            data={data?.data?.categories}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            key={'#'}
            ListFooterComponent={listFooterComponent}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <CategoriesList
                image={item?.image_path}
                onItemClickListener={() => onItemClick(index)}
                label={item?.name}
                id={item?.id}
              />
            )}
          />
        ) : isLoading || isRefetching ? (
          <ShimmerList
            padding={moderateScale(10)}
            width={width / 3 - moderateScale(18)}
            height={moderateScaleVertical(120)}
            borderRadius={moderateScale(12)}
            numColumns={3}
          />
        ) : !leftTabActive ? (
          <MyProducts refetchCategoryAPI={onLeftButtonClicked} />
        ) : null}
      </View>
      <ThreeDotMenuModal
        modalVisible={showModal}
        setModalVisible={setShowModal}
      />
    </SafeAreaView>
  );
};

export default SellItemServices;

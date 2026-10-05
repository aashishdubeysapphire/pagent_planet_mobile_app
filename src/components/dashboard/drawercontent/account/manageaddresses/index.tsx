import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useRef, useState} from 'react';
import {View, FlatList, SafeAreaView, Text} from 'react-native';
import AppImages from '../../../../../assets/images/AppImages';
import translations from '../../../../../assets/translations';
import {SCREEN} from '../../../../../root/screenname';
import useHtQuery from '../../../../../services/api/useHtQuery';
import {GET_ADDRESS_LIST} from '../../../../../services/endpoints';
import {AddressInfo} from '../../../../../services/models/shop/addressList';
import FloatingButton from '../../../../common/floatingbutton';
import Header from '../../../../common/header';
import AddressShimmer from '../../../../common/shimmer/addressshimmer';
import SwitchButton from '../../../../common/switchbutton';
import {ADDRESS_TYPE, FLOATING_ICON, FORM_TYPE} from '../../../../utils/enum';
import {
  checkIsConnected,
  trackScreenView,
} from '../../../../utils/helperFunction';
import EmptyOrdersView from '../../components/emptyordersview';
import AddressView from './components/addressView';
import {styles} from './styles';
import {ANALYTICS_SCREEN} from '../../../../../assets/translations/analyticsscreenname';

const ManageAddresses = () => {
  const [leftTabActive, setLeftTabActive] = useState(true);
  const [checkBoxIndex, setCheckBoxState] = useState(null);
  const [otherShippingAddressIndex, setOtherShippingAddressIndex] = useState(0);
  const [otherBillingAddressIndex, setOtherBillingAddressIndex] = useState(0);
  const [selectedTab, setTabName] = useState(translations.BILLING_ADDRESS);
  const scrollRef = useRef();
  const navigation = useNavigation();

  //API GET ADDRESS LIST --------------------------------------- START
  const {data, isLoading, refetch, isRefetching} = useHtQuery<AddressInfo>({
    key: GET_ADDRESS_LIST,
    url: GET_ADDRESS_LIST,
    offSuccessToast: true,
    disableLoader: true,
  });
  //API GET ADDRESS LIST  ----------------------------------------- END
  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.MANAGE_ADDRESSES);
  }, []);

  useEffect(() => {
    if (leftTabActive) {
      if (data?.data?.billingAdrreses[0]?.is_default_address === 1) {
        setOtherBillingAddressIndex(1);
      } else {
        setOtherBillingAddressIndex(0);
      }
    } else {
      if (data?.data?.shippingAdrreses[0]?.is_default_address === 1) {
        setOtherShippingAddressIndex(1);
      } else {
        setOtherShippingAddressIndex(0);
      }
    }
  }, [data, isRefetching]);

  const checkInterNet = () => {
    return checkIsConnected();
  };

  const onLeftButtonClicked = () => {
    scrollRef.current?.scrollTo({y: 0, animated: true});
    if (!leftTabActive) {
      setLeftTabActive(!leftTabActive);
      setTabName(translations.BILLING_ADDRESS);
      if (checkInterNet()) {
        refetch();
      }
    }
  };

  const onRightButtonClicked = async () => {
    scrollRef.current?.scrollTo({y: 0, animated: true});
    if (leftTabActive) {
      setLeftTabActive(!leftTabActive);
      setTabName(translations.SHIPPING_ADDRESS);
      if (checkInterNet()) {
        refetch();
      }
    }
  };

  const onAddAddress = () => {
    navigation.navigate(SCREEN.ADD_EDIT_ADDRESS, {
      formType: FORM_TYPE.ADD,
      addressType: leftTabActive ? ADDRESS_TYPE.BILLING : ADDRESS_TYPE.SHIPPING,
      addressId: '',
      refectAPI: refetch,
    });
  };

  const listFooterComponent = () => {
    return <View style={styles.staticHeight} />;
  };

  const showSeparatorLine = (isDefault: number) => {
    if (isDefault !== 0) {
      if (leftTabActive && data?.data?.billingAdrreses?.length > 1) {
        return true;
      } else if (!leftTabActive && data?.data?.shippingAdrreses?.length > 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Header lable={translations.MANAGE_ADDRESSES} isUnderLineRequired />
      <View style={styles.tabContainer}>
        <SwitchButton
          leftLabel={translations.BILLING_ADDRESS}
          rightLabel={translations.SHIPPING_ADDRESS}
          isLeftButtonActive={leftTabActive}
          onLeftTabClicked={onLeftButtonClicked}
          onRightTabClicked={onRightButtonClicked}
        />
      </View>
      {data?.data?.shippingAdrreses?.length === 0 && !leftTabActive ? (
        <EmptyOrdersView
          showButton={false}
          mainText={translations.NO_ADDRESS_FOUND}
          subText={''}
          imageIcon={AppImages.Drawer.NoAddressFound}
          flexCount={0.9}
          isPng={true}
        />
      ) : data?.data?.billingAdrreses?.length === 0 && leftTabActive ? (
        <EmptyOrdersView
          showButton={false}
          mainText={translations.NO_ADDRESS_FOUND}
          subText={''}
          imageIcon={AppImages.Drawer.NoAddressFound}
          flexCount={0.9}
          isPng={true}
        />
      ) : data?.data !== undefined ? (
        <FlatList
          data={
            leftTabActive
              ? data?.data?.billingAdrreses
              : data?.data?.shippingAdrreses
          }
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          key={'#'}
          initialNumToRender={100}
          ListFooterComponent={listFooterComponent}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <>
              {item?.is_default_address === 1 ? (
                <Text style={styles.heading}>
                  {translations.DEFAULT + ' ' + selectedTab}
                </Text>
              ) : item?.is_default_address === 0 &&
                index ===
                  (leftTabActive
                    ? otherBillingAddressIndex
                    : otherShippingAddressIndex) ? (
                <Text style={styles.heading}>
                  {translations.OTHER + selectedTab + 'es'}
                </Text>
              ) : null}
              <AddressView
                info={item}
                activeCheckBox={checkBoxIndex === index}
                showDefault={item?.is_default_address === 0 ? false : true}
                refetchAPI={refetch}
                addressType={selectedTab}
                setCheckbox={setCheckBoxState}
                index={index}
              />
              {showSeparatorLine(item?.is_default_address) ? (
                <View style={styles.separator}></View>
              ) : null}
            </>
          )}
        />
      ) : isLoading || isRefetching ? (
        <AddressShimmer changePassword={true} />
      ) : null}
      <FloatingButton
        iconId={FLOATING_ICON.PLUS}
        onPress={() => onAddAddress()}
        localMsg={''}
        type={''}
      />
    </SafeAreaView>
  );
};

export default ManageAddresses;

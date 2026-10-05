import {View, ScrollView, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../../common/header';
import translations from '../../../../../assets/translations';
import OrderProductDetails from './components/productdetails';
import {styles} from './styles';
import Details from './components/details';
import {formatPhoneNumber} from '../../../../utils/helperFunction';
import Amount from './components/amount';
import OtherItemWithThisOrderId from './components/otherItemWithThisOrderId';
import useCgMutation from '../../../../../services/api/useCgMutation';
import {MethodTypes} from '../../../../../services/constants';
import {GET_ORDER_ITEM_DETAILS} from '../../../../../services/endpoints';
import {
  getOrderDetails,
  OrderDetail,
} from '../../../../../services/models/orderdetails/getorderdetails';
import OrerDetailsShimmer from './components/shimmer';
import {useIsFocused} from '@react-navigation/core';
import {ORDER_FROM} from '../../../../utils/enum';

const OrderDetails = props => {
  const {id, from} = props?.route?.params;

  const isFocused = useIsFocused();
  const [orderDetails, setOrderDetails] = useState<OrderDetail>();
  const [loader, setLoader] = useState(false);

  const {mutateAsync: getOrderItemDetails} = useCgMutation<getOrderDetails>({
    key: GET_ORDER_ITEM_DETAILS + id + '&from=' + from,
    method: MethodTypes.GET,
    url: GET_ORDER_ITEM_DETAILS + id + '&from=' + from,
    disableLoader: true,
    offSuccessToast: true,
  });
  useEffect(() => {
    isFocused && hitGetOrderItemDetails();
  }, [id, from, isFocused]);

  const hitGetOrderItemDetails = async () => {
    setLoader(true);
    const response = await getOrderItemDetails();
    if (response.success) {
      setOrderDetails(response.data);
    }
    setLoader(false);
  };

  return (
    <SafeAreaView style={styles.continer}>
      <Header lable={translations.ORDER_DETAILS} isUnderLineRequired />
      {loader ? (
        <OrerDetailsShimmer />
      ) : (
        <ScrollView contentContainerStyle={styles.bgcolor}>
          <OrderProductDetails
            orderDetails={orderDetails?.order_detail}
            hitGetOrderItemDetails={hitGetOrderItemDetails}
            id={id}
            from={from}
            setLoader={setLoader}
          />
          <View style={styles.seperator} />
          <Details
            heading={translations.BUYER_DETAILS}
            name={orderDetails?.order_detail?.buyer_details?.name}
            email={orderDetails?.order_detail?.buyer_details?.email}
            orderNotes={orderDetails?.order_detail?.order_notes}
          />
          <View style={styles.seperator} />
          <Details
            heading={translations.SHIPPING_DETAILS}
            name={orderDetails?.order_detail?.shipping_details?.name}
            address={
              orderDetails?.order_detail?.shipping_details?.address +
              ' , ' +
              orderDetails?.order_detail?.shipping_details?.city +
              ' , ' +
              orderDetails?.order_detail?.shipping_details?.state +
              ' , ' +
              orderDetails?.order_detail?.shipping_details?.country +
              ' , ' +
              orderDetails?.order_detail?.shipping_details?.zipcode
            }
            email={orderDetails?.order_detail?.shipping_details?.email}
            phoneNo={formatPhoneNumber(
              orderDetails?.order_detail?.shipping_details?.phone + ''
            )}
          />
          <View style={styles.seperator} />
          <Amount orderDetails={orderDetails?.order_detail} from={from}/>
          <View style={styles.seperator} />

          {from == ORDER_FROM.BUYER && (
            <Details
              heading={translations.BILLING_DETAILS}
              name={orderDetails?.order_detail?.billing_details?.name}
              address={
                orderDetails?.order_detail?.billing_details?.address +
                ' , ' +
                orderDetails?.order_detail?.billing_details?.city +
                ' , ' +
                orderDetails?.order_detail?.billing_details?.state +
                ' , ' +
                orderDetails?.order_detail?.billing_details?.country +
                ' , ' +
                orderDetails?.order_detail?.billing_details?.zipcode
              }
              email={orderDetails?.order_detail?.billing_details?.email}
              phoneNo={formatPhoneNumber(
                orderDetails?.order_detail?.billing_details?.phone + ''
              )}
            />
          )}
          {!!!orderDetails?.order_detail?.otherProducts &&
            from == ORDER_FROM.BUYER && <View style={styles.seperator} />}

          <OtherItemWithThisOrderId
            otherProducts={orderDetails?.order_detail?.otherProducts}
            hitGetOrderItemDetails={hitGetOrderItemDetails}
            from={from}
          />
          <View style={styles.height} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default OrderDetails;

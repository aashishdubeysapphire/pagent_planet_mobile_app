import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import translations from '../../../../../../../assets/translations';
import AppImages from '../../../../../../../assets/images/AppImages';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';
import PriceBreakup from '../priceBreakup';
import {checkIsNull} from '../../../../../../utils/validations';
import moment from 'moment';
import {TIME_FORMAT} from '../../../../../../utils/datetimemanger';
import {getStatusTitle} from '../../../../../../utils/helperFunction';
import {ORDER_FROM, PRODUCT_STATUS_NAME} from '../../../../../../utils/enum';

const Amount = ({orderDetails, from}: any) => {
  const [isPriceBreakUpModalvisible, setisPriceBreakUpModalvisible] =
    useState(false);
  const getNumberAmount = (num = orderDetails?.order_net_amount) => {
    let arr = checkIsNull(num) ? num.substring(1) : 0;
    return Number(arr);
  };

  const getFormatedDueDate = val => {
    return moment(val, TIME_FORMAT.YYYYMMDD).format(TIME_FORMAT.DDMMMYYYY);
  };

  const showInstalmentsBool = () => {
    if (
      getStatusTitle(orderDetails?.product[0]?.status) ==
      PRODUCT_STATUS_NAME.FAILED
    ) {
      return false;
    } else if (orderDetails?.paid_in_installments == 0) {
      return false;
    } else {
      return true;
    }
  };
  getStatusTitle(orderDetails?.product[0]?.status);
  return (
    <View style={styles.continer}>
      {showInstalmentsBool() && from == ORDER_FROM.BUYER && (
        <>
          <View
            style={[styles.rowView, {marginBottom: moderateScaleVertical(12)}]}>
            <View style={styles.timeIcon}>
              {orderDetails?.installments[0]?.status == 1 ? (
                <AppImages.Common.PinkTickIcon
                  width={moderateScale(15)}
                  height={moderateScale(15)}
                />
              ) : (
                <AppImages.SHOPING_BAG.tpp_time_medium_icon />
              )}
            </View>
            <Text style={styles.instalmentText}>
              {translations.INTSTALMENT_1}
            </Text>
            <Text style={styles.price}>
              ${orderDetails?.installments[0]?.amount.toFixed(2)}
            </Text>
          </View>
          <View
            style={[styles.rowView, {marginBottom: moderateScaleVertical(12)}]}>
            <View style={styles.timeIcon}>
              {orderDetails?.installments[1]?.status == 1 ? (
                <AppImages.Common.PinkTickIcon
                  width={moderateScale(15)}
                  height={moderateScale(15)}
                />
              ) : (
                <AppImages.SHOPING_BAG.tpp_time_medium_icon />
              )}
            </View>
            <Text style={styles.instalmentText}>
              {translations.INTSTALMENT_2}(
              {orderDetails?.installments[1]?.status == 1
                ? translations.PAID
                : getFormatedDueDate(
                    orderDetails?.installments[1]?.payment_due_on
                  )}
              )
            </Text>
            <Text style={styles.price}>
              ${orderDetails?.installments[1]?.amount.toFixed(2)}
            </Text>
          </View>
          <View
            style={[styles.rowView, {marginBottom: moderateScaleVertical(12)}]}>
            <View style={styles.timeIcon}>
              {orderDetails?.installments[2]?.status == 1 ? (
                <AppImages.Common.PinkTickIcon
                  width={moderateScale(15)}
                  height={moderateScale(15)}
                />
              ) : (
                <AppImages.SHOPING_BAG.tpp_time_medium_icon />
              )}
            </View>
            <Text style={styles.instalmentText}>
              {translations.INTSTALMENT_3}(
              {orderDetails?.installments[2]?.status == 1
                ? translations.PAID
                : getFormatedDueDate(
                    orderDetails?.installments[2]?.payment_due_on
                  )}
              )
            </Text>
            <Text style={styles.price}>
              ${orderDetails?.installments[2]?.amount.toFixed(2)}
            </Text>
          </View>
          {getNumberAmount(orderDetails?.due_amount).toFixed(2) ==
          '0.00' ? null : (
            <>
              <View style={styles.line} />
              <View style={styles.rowView}>
                <Text style={styles.amountDueText}>
                  {translations.AMOUNT_DUE}
                </Text>
                <Text style={styles.pinkDigit}>
                  ${getNumberAmount(orderDetails?.due_amount).toFixed(2)}
                </Text>
              </View>

              <View
                style={[styles.line, {marginBottom: moderateScaleVertical(16)}]}
              />
            </>
          )}
        </>
      )}
      <View style={styles.rowView}>
        <View>
          <Text style={styles.heading}>{translations.TOTAL_AMOUNT}</Text>
          <Text style={styles.amount}>${getNumberAmount().toFixed(2)}</Text>
        </View>
        <Text
          style={styles.breakupText}
          onPress={() => setisPriceBreakUpModalvisible(true)}>
          {translations.PRICING_DETAILS}
        </Text>
      </View>

      <View style={[styles.rowView, styles.paymentTypeView]}>
        <AppImages.ORDER_DETAILS.cards />
        {getStatusTitle(orderDetails?.product[0]?.status) ==
        PRODUCT_STATUS_NAME.FAILED ? (
          <Text style={styles.paymentType}>
            {translations.CC_PAYMENT_FAILED}
          </Text>
        ) : (
          <Text style={styles.paymentType}>
            {translations.PAID_BY_CREDIT_CARD}
            {orderDetails?.paid_in_installments !== 0 && translations.USING_PP}
          </Text>
        )}
      </View>
      <PriceBreakup
        setIsModalVisible={setisPriceBreakUpModalvisible}
        isModalVisible={isPriceBreakUpModalvisible}
        otherProducts={orderDetails?.otherProducts}
        product={orderDetails?.product[0]}
        total_price={getNumberAmount(orderDetails?.total_price).toFixed(2)}
        total_discount={getNumberAmount(orderDetails?.total_discount).toFixed(
          2
        )}
        grandTotal={getNumberAmount().toFixed(2)}
      />
    </View>
  );
};

export default Amount;

import {View, Text, SafeAreaView} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {styles} from './styles';
import AppImages from '../../../../../../../assets/images/AppImages';
import translations from '../../../../../../../assets/translations';
import {moderateScaleVertical} from '../../../../../../utils/responsiveSize';
import CustomButton from '../../../../../../common/button';
import {StackActions, useNavigation} from '@react-navigation/core';
import {GET_CART_COUNT} from '../../../../../../../services/endpoints';
import {useSetScreenRefresh} from '../../../../../../../store/useAppStore';
import {
  IS_MINOR_VALUES,
  PAYMENT_FOR,
  REFESH_SCREEN,
} from '../../../../../../utils/enum';
import moment from 'moment';
import useCgMutation from '../../../../../../../services/api/useCgMutation';
import {MethodTypes} from '../../../../../../../services/constants';
import {SCREEN} from '../../../../../../../root/screenname';
import {User} from '../../../../../../../services/models/user/user';
import {Base} from '../../../../../../../services/models/base';
import {
  currencyFormatter,
  onShare,
} from '../../../../../../utils/helperFunction';
import {PAGEANT_DETAIL_MENU_ID} from '../../../../../dashboard/pageantdashboard/pageantdetail/components/menu';
import {RootContext} from '../../../../../../../store/rootStore';

/* The `const PaymentConfirmation = ({route}) => {` is defining a functional component named
`PaymentConfirmation` that accepts a `route` prop as its parameter. The `route` prop is used to
access the navigation route information passed to the component. */
const PaymentConfirmation = ({route}) => {
  const {
    transactionDetail,
    orderDetail,
    installment,
    paymentType,
    contestantPublicUrl,
    contestantName,
    memberhsip,
  } = route?.params;
  const {setCounter} = useContext(RootContext);

  const navigation = useNavigation();
  const setScreenRefresh = useSetScreenRefresh();

  const {mutateAsync: viewProducts} = useCgMutation<Base<User>>({
    key: GET_CART_COUNT,
    method: MethodTypes.GET,
    url: GET_CART_COUNT,
    disableLoader: true,
    offSuccessToast: true,
  });

  /* The `useEffect` hook is used to perform side effects in functional components. In this case, the
`useEffect` hook is used to call the `getCartCountApi` function and update the screen refresh state
when the component mounts. */
  useEffect(() => {
    getCartCountApi();
    if (paymentType === PAYMENT_FOR.BUY_PAGEANT_PLAN) {
      setScreenRefresh(REFESH_SCREEN.DIRECTORY_FILTER);
    }
  }, []);

  /**
   * The function `getCartCountApi` retrieves the count of items in the cart by calling the
   * `viewProducts` API and updating the counter state with the returned data.
   */
  const getCartCountApi = async () => {
    const productAllDetail = await viewProducts();
    if (productAllDetail?.success) {
      setCounter(productAllDetail?.data);
    }
  };
  /**
   * The function `addDaysTodate` takes an optional parameter `days` and returns a formatted date string
   * that is `days` number of days in the future from the current date.
   * @param [days=14] - The `days` parameter is the number of days to add to the current date. By
   * default, it is set to 14, which means it will add 14 days to the current date if no value is
   * provided when calling the function.
   * @returns The function `addDaysTodate` returns a formatted date string in the format 'DD MMM YYYY'.
   * The date being returned is the current date plus the specified number of days (default is 14 days).
   */
  const addDaysTodate = (days = 14) => {
    return moment(new Date(Date.now() + 1000 * 60 * 60 * 24 * days)).format(
      'DD MMM YYYY',
    );
  };
  /**
   * The function `onActionClick` handles different actions based on the value of `paymentType`.
   */
  const onActionClick = () => {
    if (
      paymentType !== undefined &&
      paymentType === PAYMENT_FOR.BUY_CONTESTANT_CLAIM_LEAD
    ) {
      navigation.dispatch(
        StackActions.replace(SCREEN.CONTACT_LIST, {
          pageantId: memberhsip.profile_id,
          my_leads_count: memberhsip.claimCount,
        }),
      );
    } else if (
      paymentType !== undefined &&
      paymentType === PAYMENT_FOR.BUY_VOTE_FOR_CONTESTANT &&
      contestantPublicUrl !== undefined
    ) {
      onShare('', contestantPublicUrl);
    } else if (
      paymentType !== undefined &&
      paymentType === PAYMENT_FOR.BUY_PAGEANT_PLAN
    ) {
      navigation.dispatch(
        StackActions.replace(SCREEN.PAGEANT_DETAIL, {
          pageantId: memberhsip.profile_id,
          tab: PAGEANT_DETAIL_MENU_ID.ADVERTISE,
        }),
      );
    } else {
      navigation.dispatch(StackActions.replace(SCREEN.MY_ORDERS));
    }
  };
  /**
   * The function `getPaidAmount` returns a formatted currency value based on the order detail or
   * membership amount.
   * @returns The function `getPaidAmount` returns the result of calling the `currencyFormatter`
   * function on either `orderDetail.order_net_amount` (if `orderDetail` is not undefined) or
   * `memberhsip.amount` (if `orderDetail` is undefined).
   */
  const getPaidAmount = () => {
    if (orderDetail !== undefined) {
      return currencyFormatter(Number(orderDetail.order_net_amount).toFixed(2));
    } else {
      return currencyFormatter(Number(memberhsip.amount).toFixed(2));
    }
  };
  return (
    <View style={{flex: 1, marginHorizontal: 0, marginVertical: 0}}>
      <SafeAreaView style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.congratulationText}>
            {translations.CONGRATULATION}
          </Text>
          <AppImages.Common.thankYou_ICON />
          {paymentType !== undefined &&
            paymentType !== PAYMENT_FOR.BUY_VOTE_FOR_CONTESTANT &&
            paymentType !== undefined &&
            paymentType !== PAYMENT_FOR.BUY_CONTESTANT_CLAIM_LEAD && (
              <Text style={styles.orderIdText}>
                {translations.YOUR_ORDER_ID}{' '}
                <Text style={styles.pinkOrderId}>
                  {orderDetail !== undefined ? orderDetail.id : memberhsip.id}
                </Text>
              </Text>
            )}

          <Text
            style={[
              styles.orderIdText,
              {marginTop: moderateScaleVertical(16)},
            ]}>
            {translations.AMOUNT_PAID}{' '}
            {installment === IS_MINOR_VALUES.YES ? (
              <Text style={styles.priceText}>
                1 of 3 paid (
                {currencyFormatter(
                  Number(transactionDetail.payment_amount.toFixed(2)),
                ).replace('$$', '$')}
                )
              </Text>
            ) : (
              <Text style={styles.priceText}>{getPaidAmount()}</Text>
            )}
          </Text>
          {paymentType !== undefined &&
            contestantName !== undefined &&
            paymentType === PAYMENT_FOR.BUY_VOTE_FOR_CONTESTANT && (
              <Text style={styles.contestantNameVote}>
                {translations.SHARE_THAT_JUST_VOTED_FOR +
                  contestantName +
                  translations.ENCOURGE_YOUR_FIRNEDS_TO_DO_THE_SAME}
              </Text>
            )}
          {installment === IS_MINOR_VALUES.YES && (
            <>
              <Text style={styles.instalmentsText}>
                <AppImages.SHOPING_BAG.tpp_time_medium_icon />{' '}
                {translations.SECOND_DUE_INSTALLMENT}({addDaysTodate(14)})
              </Text>
              <Text style={styles.instalmentsText}>
                <AppImages.SHOPING_BAG.tpp_time_medium_icon />{' '}
                {translations.THIRD_DUE_INSTALLMENT} ({addDaysTodate(28)})
              </Text>
              <View style={[styles.rowView]}>
                <Text style={styles.note}>{translations.NOTE} </Text>
                <Text style={[styles.noteText, styles.pinkNote]}>
                  {translations.INSTALMENT_NOTES}
                </Text>
              </View>
            </>
          )}

          <View style={styles.orderBtn}>
            <CustomButton
              inactive
              label={
                paymentType !== undefined &&
                paymentType === PAYMENT_FOR.BUY_VOTE_FOR_CONTESTANT
                  ? translations.SHARE_PROFILE
                  : paymentType !== undefined &&
                    paymentType === PAYMENT_FOR.BUY_PAGEANT_PLAN
                  ? translations.VIEW_MY_PLAN
                  : paymentType !== undefined &&
                    paymentType === PAYMENT_FOR.BUY_CONTESTANT_CLAIM_LEAD
                  ? translations.VIEW_CONTACT_LIST
                  : translations.MY_ORDERS
              }
              onPress={onActionClick}
            />
          </View>
          <View style={styles.containerLogin}>
            <CustomButton
              inactive
              label={translations.NO_SKIP_FOR_NOW}
              border={true}
              textStyle={styles.borderButtonText}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default PaymentConfirmation;

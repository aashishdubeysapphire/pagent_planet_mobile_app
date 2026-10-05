import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import translations from '../../../../../../assets/translations';
import {PAYMENT_TYPE} from '../../localEnum';
import {styles} from './styles';
import AppImages from '../../../../../../assets/images/AppImages';
import {
  createFirebaseLog,
  currencyFormatter,
  keyBoardManager,
  trackScreenView,
} from '../../../../../utils/helperFunction';
import PageantPayModal from '../../../components/pageantpaymodal';
import PriceComponent from '../../pricecomponent';
import {color} from '../../../../../../assets/colorConstant';
import PaymentManagerView from './paymentcontrolview';
import {isValid} from './valiation';
import moment from 'moment';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../root/screenname';
import {TransactionDetail} from '../../../../../../services/models/shop/transactionDetail';
import {
  DressOrderObj,
  MemberhsipOrderObj,
  TransactionVerification,
} from '../../../../../../services/models/sellitems/bagProducts';
import PCAPriceComponent from '../../../../directory/publicprofile/pageant/eventpublicprofile/contestants/contestantvote/buyvotes/pcaprice';
import {IS_MINOR_VALUES, PAYMENT_FOR} from '../../../../../utils/enum';
import {useKeyboard} from '@react-native-community/hooks';
import {ANALYTICS_SCREEN} from '../../../../../../assets/translations/analyticsscreenname';
import Bagitemview from './bagitemview';
import Loader from '../../../../../common/customloader';

const Payment = ({
  bagItems,
  paymentType = PAYMENT_FOR.BUY_BAG_PRODUCT,
  billingAddress,
  shippingAddress,
  orderNotes,
  pageantPlanDetail,
  votesInfo,
  pageantId,
}) => {
  const navigator = useNavigation();
  const keyboard = useKeyboard();
  const [tokenKey] = useState(new Date().getMilliseconds() + '');
  const [selectedType] = useState();
  const [isModalShow, setIsModalShow] = useState(false);
  const [isTandCAccepted, setIsTandCAccepted] = useState(false);
  const [isApplyPayment, setApplyPayment] = useState(false);
  console.log('Payment component rendered', isApplyPayment);

  const [isPayNowPressed, setIsPayNowPressed] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    trackScreenView(ANALYTICS_SCREEN.PAYMENT);
    keyBoardManager();
  }, []);
  const onPressPayNow = () => {
    createFirebaseLog(onPressPayNow.name, Payment.name, false);
    if (isValid(isTandCAccepted)) {
      setApplyPayment(true);

      setTimeout(() => {
        setApplyPayment(false);
      }, 500);
    }
  };
  const pressPayNowOnlyOnce = () => {
    createFirebaseLog(pressPayNowOnlyOnce.name, Payment.name, false);
    if (!isPayNowPressed) {
      setIsPayNowPressed(true);
      onPressPayNow();
      setTimeout(() => {
        setIsPayNowPressed(false);
      }, 1000);
    }
  };
  const addDaysTodate = (days = 14) => {
    createFirebaseLog(addDaysTodate.name, Payment.name, false);
    return moment(new Date(Date.now() + 1000 * 60 * 60 * 24 * days)).format(
      'DD MMM YYYY',
    );
  };
  const getPriceInNumer = () => {
    createFirebaseLog(getPriceInNumer.name, Payment.name, false);
    if (
      pageantPlanDetail !== undefined &&
      paymentType === PAYMENT_FOR.BUY_PAGEANT_PLAN
    ) {
      return pageantPlanDetail?.price;
    }
    let price =
      paymentType === PAYMENT_FOR.BUY_VOTE_FOR_CONTESTANT ||
      paymentType === PAYMENT_FOR.BUY_CONTESTANT_CLAIM_LEAD
        ? votesInfo?.totalCost.split('$')
        : bagItems?.finalprice.split('$');
    return Number(price?.[1]);
  };

  const getPriceInDecimal = (prices: any) => {
    createFirebaseLog(getPriceInDecimal.name, Payment.name, false);
    let newPrice = prices.split('$');
    return Number(newPrice?.[1]);
  };

  const onPaymentSucess = (
    transactionDetail?: TransactionDetail,
    dressOrderObj?: DressOrderObj | undefined,
    memberhsip?: MemberhsipOrderObj | undefined,
    transactionVerification?: TransactionVerification | undefined,
    isContestantAvailable?: boolean,
  ) => {
    createFirebaseLog(onPaymentSucess.name, Payment.name, false);
    navigator.reset({
      index: 0,
      routes: [{name: SCREEN.DASHBOARD_NAVIGATION}],
    });
    setTimeout(() => {
      navigator.navigate(
        isContestantAvailable
          ? SCREEN.SUPPORT_CONTESTANT
          : SCREEN.PAYMENT_ORDER_CONFIRMATION,
        {
          transactionDetail: transactionDetail,
          transactionVerification: transactionVerification,
          orderDetail: dressOrderObj,
          paymentType: paymentType,
          memberhsip: memberhsip,
          contestantName: votesInfo?.contestantName,
          contestantPublicUrl: votesInfo?.contestantPublicUrl,
          installment:
            selectedType === undefined ||
            selectedType === PAYMENT_TYPE.CREADIT_CARD
              ? IS_MINOR_VALUES.NO
              : IS_MINOR_VALUES.YES,
        },
      );
    }, 50);
  };

  const getFinnalCost = () => {
    createFirebaseLog(getFinnalCost.name, Payment.name, false);
    return pageantPlanDetail?.buying_lead !== undefined
      ? pageantPlanDetail?.prepaid_lead_price !== undefined &&
          pageantPlanDetail?.prepaid_lead_price *
            Number(pageantPlanDetail?.buying_lead)
      : 0;
  };

  return (
    <View style={styles.mainView}>
      <Loader isLoading={loader} />
      <ScrollView style={styles.scrollView}>
        <Bagitemview
          bagItems={bagItems}
          pageantPlanDetail={pageantPlanDetail}
          paymentType={paymentType}
          votesInfo={votesInfo}
        />
        {paymentType === PAYMENT_FOR.BUY_VOTE_FOR_CONTESTANT ||
        paymentType === PAYMENT_FOR.BUY_CONTESTANT_CLAIM_LEAD ? (
          <PCAPriceComponent
            paymentType={votesInfo.paymentType}
            votesInfo={votesInfo}
            bgColor={color.WHITE}
          />
        ) : pageantPlanDetail !== undefined ? (
          <PriceComponent
            bgColor={
              paymentType === PAYMENT_FOR.BUY_PAGEANT_PLAN
                ? color.WHITE
                : color.S_GRAY_1
            }
            pageantPlanDetail={pageantPlanDetail}
            price={'$' + pageantPlanDetail?.price}
            shipping={
              pageantPlanDetail?.prepaid_lead_price !== undefined
                ? '$' + getFinnalCost()
                : translations.FREE
            }
            finalPrice={
              pageantPlanDetail?.price !== undefined &&
              pageantPlanDetail?.prepaid_lead_price !== undefined &&
              pageantPlanDetail.buying_lead !== undefined &&
              pageantPlanDetail.buying_lead.length > 0
                ? '$' + (pageantPlanDetail?.price + getFinnalCost())
                : pageantPlanDetail?.price !== undefined
                ? '$' + pageantPlanDetail?.price
                : '$0'
            }
          />
        ) : (
          <PriceComponent
            bgColor={color.WHITE}
            totalItems={bagItems?.cartData?.marked_for_checkout_item_count}
            price={bagItems?.subtotal}
            shipping={translations.FREE}
            discount={bagItems?.discount}
            finalPrice={bagItems?.finalprice}
          />
        )}
        <View style={[styles.rowView, styles.mar16]}>
          <TouchableOpacity
            onPress={() => setIsTandCAccepted(!isTandCAccepted)}
            style={styles.tickIcon}>
            {isTandCAccepted ? (
              <AppImages.Common.Filled_ICON />
            ) : (
              <AppImages.Common.UnFilled_ICON />
            )}
          </TouchableOpacity>
          <Text
            style={[
              styles.addresText,
              !isTandCAccepted && styles.unselectedTickText,
            ]}>
            {translations.ACCEPT}
            <Text
              style={styles.T_C}
              onPress={() =>
                navigator.navigate(SCREEN.STATIC_PAGE, {
                  title: translations.TERMS_OF_SERVIC,
                })
              }>
              {translations.T_C}
            </Text>
          </Text>
        </View>
        <View style={styles.extraheight} />
        {tokenKey !== undefined && (
          <PaymentManagerView
            description={orderNotes}
            onTransactionSuccuss={onPaymentSucess}
            paymentType={paymentType}
            billingAddress={billingAddress}
            shippingAddress={shippingAddress}
            pageantId={pageantId}
            selectedType={selectedType}
            isApplyPayment={isApplyPayment}
            voteContestantDetail={votesInfo}
            pageantPlanDetail={pageantPlanDetail}
            totalPrice={
              paymentType === PAYMENT_FOR.BUY_VOTE_FOR_CONTESTANT ||
              paymentType === PAYMENT_FOR.BUY_CONTESTANT_CLAIM_LEAD
                ? votesInfo.totalCost
                : paymentType === PAYMENT_FOR.BUY_PAGEANT_PLAN
                ? pageantPlanDetail?.price !== undefined &&
                  pageantPlanDetail?.cost_per_lead !== undefined &&
                  pageantPlanDetail.buying_lead !== undefined &&
                  pageantPlanDetail.buying_lead.length > 0
                  ? pageantPlanDetail?.price +
                    pageantPlanDetail?.cost_per_lead *
                      Number(pageantPlanDetail.buying_lead)
                  : pageantPlanDetail?.price !== undefined &&
                    pageantPlanDetail?.price
                : bagItems?.finalprice?.replace('$', '')
            }
            tokenKey={tokenKey}
            setLoader={setLoader}
          />
        )}
      </ScrollView>
      {!keyboard.keyboardShown && (
        <KeyboardAvoidingView style={styles.shadowView} behavior={'padding'}>
          <View style={styles.paymentView}>
            {selectedType == PAYMENT_TYPE.PAGENT_PAY ? (
              <View>
                <Text style={styles.totalAmountText}>
                  {translations.PAYING_IN_THREE_INS}
                </Text>
                <Text style={styles.amountText}>
                  ${(getPriceInNumer() / 3).toFixed(2)}
                </Text>
              </View>
            ) : (
              <View>
                <Text style={styles.totalAmountText}>
                  {translations.TOTAL_AMOUNT}
                </Text>
                <Text style={styles.amountText}>
                  {paymentType === PAYMENT_FOR.BUY_VOTE_FOR_CONTESTANT ||
                  paymentType === PAYMENT_FOR.BUY_CONTESTANT_CLAIM_LEAD
                    ? currencyFormatter(votesInfo.totalCost?.toFixed(2))
                    : paymentType === PAYMENT_FOR.BUY_PAGEANT_PLAN
                    ? pageantPlanDetail?.price !== undefined &&
                      pageantPlanDetail?.cost_per_lead !== undefined &&
                      pageantPlanDetail.buying_lead !== undefined &&
                      pageantPlanDetail.buying_lead.length > 0
                      ? currencyFormatter(
                          pageantPlanDetail?.price + getFinnalCost(),
                        )
                      : pageantPlanDetail?.price !== undefined
                      ? currencyFormatter(pageantPlanDetail?.price)
                      : '$0.00'
                    : currencyFormatter(
                        getPriceInDecimal(bagItems?.finalprice)?.toFixed(2),
                      )}
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.btnView}
              onPress={pressPayNowOnlyOnce}>
              <Text style={styles.payNowBtnText}>
                {translations.PAY_NOW.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}

      <PageantPayModal
        isModalVisible={isModalShow}
        setModalVisible={setIsModalShow}
      />
    </View>
  );
};

export default Payment;

import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  MethodTypes,
  Param,
  ProfileType,
} from '../../../../../../../services/constants';
import {
  CREATE_ORDER,
  GET_BRAINTREE_TOKEN,
  IS_PCA_ACTIVE,
} from '../../../../../../../services/endpoints';
import {
  TransactionDetail,
  VoteContestantDetail,
} from '../../../../../../../services/models/shop/transactionDetail';
import {
  internetState,
  toast,
  toastType,
} from '../../../../../../common/commonalert';
import useCgMutation from '../../../../../../../services/api/useCgMutation';
import {
  DressOrderObj,
  MemberhsipOrderObj,
  TppOrderData,
  TransactionVerification,
} from '../../../../../../../services/models/sellitems/bagProducts';
import {useNetInfo} from '@react-native-community/netinfo';
import {Base} from '../../../../../../../services/models/base';
import {IS_MINOR_VALUES, PAYMENT_FOR} from '../../../../../../utils/enum';
import {ProductsData} from '../../../../../../../services/models/shop/shopLandingDetails';
import {PAYMENT_TYPE} from '../../../localEnum';
import {Plan} from '../../../../../../../services/models/planData';
import {NativeModules} from 'react-native';
import {isIosDevice} from '../../../../../../utils/helperFunction';

interface Props {
  totalPrice?: string;
  description?: string;
  onTransactionSuccuss?: (
    transactionDetail?: TransactionDetail,
    dressOrderObj?: DressOrderObj | undefined,
    membership?: MemberhsipOrderObj | undefined,
    transactionVerification?: TransactionVerification | undefined,
    isContestantAvailable?: boolean,
  ) => void;
  isApplyPayment?: boolean;
  paymentType?: PAYMENT_FOR;
  billingAddress?: any;
  shippingAddress?: any;
  selectedType?: number;
  voteContestantDetail?: VoteContestantDetail;
  pageantId: number;
  pageantPlanDetail?: Plan;
  setLoader?: (val: boolean) => void;
}

const PaymentManagerView = ({
  totalPrice,
  description,
  onTransactionSuccuss,
  isApplyPayment,
  paymentType,
  billingAddress,
  shippingAddress,
  selectedType = PAYMENT_TYPE.CREADIT_CARD,
  voteContestantDetail,
  setLoader,
  pageantId,
  pageantPlanDetail,
}: Props) => {
  const [isBraintreeReady, setIsBraintreeReady] = useState(false);
  const [tokenNonce, setTokenNonce] = useState('');
  const netInfo = useNetInfo();
  const PaymentModule = NativeModules.PaymentModule;

  const {mutateAsync: getBrainTreeToken} = useCgMutation<Base>({
    key: GET_BRAINTREE_TOKEN,
    offSuccessToast: true,
    disableLoader: true,
    method: MethodTypes.GET,
    url: GET_BRAINTREE_TOKEN,
  });

  const {mutateAsync: getPcaState} = useCgMutation<Base<ProductsData>>({
    key:
      IS_PCA_ACTIVE +
      voteContestantDetail?.event_id +
      Param.AGE_DIVISION_ID +
      voteContestantDetail?.age_division_id,
    method: MethodTypes.GET,
    offSuccessToast: true,
    disableLoader: true,
    url:
      IS_PCA_ACTIVE +
      voteContestantDetail?.event_id +
      Param.AGE_DIVISION_ID +
      voteContestantDetail?.age_division_id,
  });

  const {mutateAsync: createTppOrderID} = useCgMutation<Base<TppOrderData>>({
    key: CREATE_ORDER,
    method: MethodTypes.Post,
    disableLoader: true,
    body:
      paymentType === PAYMENT_FOR.BUY_VOTE_FOR_CONTESTANT
        ? {
            billing_address_book_id: billingAddress?.id,
            type: paymentType,
            shipping_address_book_id:
              shippingAddress?.id !== undefined
                ? shippingAddress?.id
                : billingAddress?.id,
            event_id: voteContestantDetail?.event_id,
            contestant_id: voteContestantDetail?.contestant_id,
            age_division_id: voteContestantDetail?.age_division_id,
            quantity: voteContestantDetail?.totalVotes,
            full_title: voteContestantDetail?.contestantName,
            nonce: tokenNonce,
          }
        : paymentType === PAYMENT_FOR.BUY_CONTESTANT_CLAIM_LEAD
        ? {
            billing_address_book_id: billingAddress?.id,
            type: paymentType,
            profile_type: ProfileType.PAGEANT,
            profile_id: voteContestantDetail?.profileId,
            lead_list: voteContestantDetail?.claimIds,
            lead_amount: totalPrice,
            nonce: tokenNonce,
          }
        : paymentType === PAYMENT_FOR.BUY_PAGEANT_PLAN
        ? {
            billing_address_book_id: billingAddress?.id,
            type: paymentType,
            profile_type: ProfileType.PAGEANT,
            profile_id: pageantId,
            membership_id: pageantPlanDetail?.id,
            prepaid_lead_number: pageantPlanDetail?.buying_lead,
            prepaid_lead_price: pageantPlanDetail?.prepaid_lead_price,
            nonce: tokenNonce,
          }
        : {
            billing_address_book_id: billingAddress?.id,
            shipping_address_book_id:
              shippingAddress?.id !== undefined
                ? shippingAddress?.id
                : billingAddress?.id,
            installment:
              selectedType === PAYMENT_TYPE.CREADIT_CARD
                ? IS_MINOR_VALUES.NO
                : IS_MINOR_VALUES.YES,
            nonce: tokenNonce,
            order_notes: description,
            type: paymentType,
          },
    offSuccessToast: true,
    url: CREATE_ORDER,
  });

  const verifyPcaTimerState = async () => {
    isIosDevice() ? null : setLoader(true);
    let res = await getPcaState();

    if (res.success) {
      onPaymentButtonClick();
    } else {
      isIosDevice() ? null : setLoader(false);
      toast(res?.message, toastType?.ERROR_TOAST);
    }
  };

  const onPayClick = async () => {
    if (billingAddress !== undefined) {
      setLoader(true);

      let tppOrderResponse = await createTppOrderID();
      console.log('Tpp Order Response:', tppOrderResponse);
      setLoader(false);
      if (
        tppOrderResponse !== undefined &&
        tppOrderResponse.data?.unique_id !== undefined
      ) {
        if (
          onTransactionSuccuss !== undefined &&
          paymentType === PAYMENT_FOR.BUY_BAG_PRODUCT
        ) {
          onTransactionSuccuss(
            {
              payment_amount:
                selectedType === PAYMENT_TYPE.CREADIT_CARD
                  ? Number(totalPrice)
                  : Number(totalPrice) / 3,
            },
            tppOrderResponse?.data?.dressOrderObj,
            undefined,
            undefined,
            tppOrderResponse?.data?.ticket_contestants.length > 0 &&
              tppOrderResponse?.data?.ticket_contestants[0]?.contestants !==
                undefined &&
              tppOrderResponse?.data?.ticket_contestants[0]?.contestants
                ?.length > 0,
          );
        } else if (
          paymentType === PAYMENT_FOR.BUY_PAGEANT_PLAN &&
          onTransactionSuccuss !== undefined
        ) {
          onTransactionSuccuss(
            undefined,
            undefined,
            tppOrderResponse?.data?.memberhsipOrderObj,
            undefined,
            false,
          );
        } else if (
          paymentType === PAYMENT_FOR.BUY_CONTESTANT_CLAIM_LEAD &&
          onTransactionSuccuss !== undefined
        ) {
          onTransactionSuccuss(
            undefined,
            undefined,
            {
              amount: Number(totalPrice),
              profile_id: Number(voteContestantDetail?.profileId),
              claimCount: voteContestantDetail?.claimIds?.split(',').length,
            },
            undefined,
            false,
          );
        } else if (
          paymentType === PAYMENT_FOR.BUY_VOTE_FOR_CONTESTANT &&
          onTransactionSuccuss !== undefined
        ) {
          onTransactionSuccuss(
            undefined,
            tppOrderResponse?.data?.dressOrderObj,
            undefined,
            undefined,
          );
        }
      } else {
        toast(tppOrderResponse.message, toastType.ERROR_TOAST);
      }
    }
  };

  useEffect(() => {
    if (isApplyPayment && isBraintreeReady) {
      // ← Add isBraintreeReady to condition
      if (!netInfo.isConnected && !netInfo.isInternetReachable) {
        internetState(netInfo.isConnected!!);
        return false;
      } else {
        if (paymentType === PAYMENT_FOR.BUY_VOTE_FOR_CONTESTANT) {
          verifyPcaTimerState();
        } else {
          onPaymentButtonClick();
        }
      }
    }
  }, [isApplyPayment, isBraintreeReady]); // ← Add isBraintreeReady to deps

  //////////Brain Tree

  const callbackSuccess = (nonceId: any) => {
    setTokenNonce(nonceId);
  };

  useEffect(() => {
    if (tokenNonce !== undefined && tokenNonce.length > 0) {
      onPayClick();
    }
  }, [tokenNonce]);

  const callbackError = (error: string) => {
    console.log('BrainTree Error:', error);
    if (error !== 'USER_CANCELLED') {
      // Real error — show feedback to user
      toast(
        error || 'Payment failed. Please try again.',
        toastType.ERROR_TOAST,
      );
    }
    // If USER_CANCELLED, do nothing — user pressed back intentionally
  };

  useEffect(() => {
    console.log('isBraintreeReady:', isBraintreeReady);
  }, [isBraintreeReady]);

  const initBrainTreeToken = async () => {
    try {
      setLoader(true);
      console.log('Fetching Braintree token...');
      let res = await getBrainTreeToken();

      // Log the raw value so we can debug what the server actually returns
      console.log('BrainTree API response:', JSON.stringify(res));
      console.log(
        'BrainTree res.data type:',
        typeof res.data,
        'value:',
        res.data,
      );

      // Ensure we have a valid non-empty string token
      const token = typeof res.data === 'string' ? res.data.trim() : '';
      if (!token) {
        console.error('BrainTree token is missing or not a string:', res.data);
        toast(
          'Payment initialization failed. Please try again.',
          toastType.ERROR_TOAST,
        );
        setIsBraintreeReady(false);
        return;
      }

      console.log('BrainTree token ready, length:', token.length);
      PaymentModule.initBrainTree(token);
      setIsBraintreeReady(true);
      console.log('Braintree marked READY');
    } catch (error) {
      setIsBraintreeReady(false);
      console.log('BrainTree Token Error:', error);
      toast(
        'Payment initialization failed. Please try again.',
        toastType.ERROR_TOAST,
      );
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    initBrainTreeToken();
  }, []);

  const onPaymentButtonClick = () => {
    if (!PaymentModule) {
      console.error('PaymentModule is null - registration issue');
      toast('Payment system not available', toastType.ERROR_TOAST);
      return;
    }

    if (!isBraintreeReady) {
      console.warn('Braintree not ready yet');
      toast('Payment is initializing, please wait...', toastType.INFO_TOAST);
      return;
    }

    console.log(PaymentModule, 'this is payment module');
    PaymentModule.getCardNonce(callbackSuccess, callbackError);
  };

  return <View />;
};

export default PaymentManagerView;

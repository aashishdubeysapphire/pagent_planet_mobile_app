import {
  View,
  Text,
  SafeAreaView,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import translations from '../../../../../../../assets/translations';
import MultiSelectList from '../../../../../../common/multiselectlist';
import {emptyFunction} from '../../../../../../utils/helperFunction';
import {color} from '../../../../../../../assets/colorConstant';
import {
  GET_TICKET_CONTESTANT,
  SUBMIT_CONTESTANT_SUPPORT,
} from '../../../../../../../services/endpoints';
import {SupportContestantData} from '../../../../../../../services/models/pageantdetails/supportContestantData';
import {StackActions, useNavigation} from '@react-navigation/core';
import useHtQuery from '../../../../../../../services/api/useHtQuery';
import {TransactionDetail} from '../../../../../../../services/models/shop/transactionDetail';
import {
  DressOrderObj,
  TppOrderData,
} from '../../../../../../../services/models/sellitems/bagProducts';
import {SCREEN} from '../../../../../../../root/screenname';
import useCgMutation from '../../../../../../../services/api/useCgMutation';
import {Base} from '../../../../../../../services/models/base';

import {useNetInfo} from '@react-native-community/netinfo';
import {
  internetState,
  toast,
  toastType,
} from '../../../../../../common/commonalert';
import {useSetLoader} from '../../../../../../../store/useAppStore';

import {moderateScaleVertical} from '../../../../../../utils/responsiveSize';

const SupportContestant = ({route}) => {
  const {installment} = route?.params;

  const navigator = useNavigation();
  const [eventContestantArrayPositon, setEventContestantArrayPositon] =
    useState(0);
  const [mTransactionDetail] = useState<TransactionDetail>(
    route?.params?.transactionDetail,
  );
  const [mDressOrderObj] = useState<DressOrderObj>(route?.params?.orderDetail);
  const setLoader = useSetLoader();
  const netInfo = useNetInfo();
  const [selectedArr, setSelectedArr] = useState([]);
  const [eventContestant, setEventContestant] =
    useState<SupportContestantData>();

  const {data: supportContestantsResponse, isLoading} =
    useHtQuery<SupportContestantData>({
      key: GET_TICKET_CONTESTANT + mDressOrderObj.id,
      url: GET_TICKET_CONTESTANT + mDressOrderObj.id,
      offSuccessToast: true,
    });

  const {mutateAsync: submitContestant} = useCgMutation<Base<TppOrderData>>({
    key: SUBMIT_CONTESTANT_SUPPORT,
    body: {
      order_item_id: mDressOrderObj.id,
      vote_count: eventContestant?.quantity,
      event_id: eventContestant?.event?.id,
      contestant_id: selectedArr[0]?.id,
    },
    url: SUBMIT_CONTESTANT_SUPPORT,
  });

  useEffect(() => {
    if (!isLoading && supportContestantsResponse !== undefined) {
      setEventContestant(
        supportContestantsResponse.data[eventContestantArrayPositon],
      );
    }
  }, [isLoading]);

  const onSkipButtonClick = () => {
    if (
      supportContestantsResponse !== undefined &&
      eventContestantArrayPositon + 1 < supportContestantsResponse?.data?.length
    ) {
      setEventContestant(
        supportContestantsResponse?.data[eventContestantArrayPositon + 1],
      );
      setEventContestantArrayPositon(eventContestantArrayPositon + 1);
    } else {
      navigator.dispatch(
        StackActions.replace(SCREEN.PAYMENT_ORDER_CONFIRMATION, {
          transactionDetail: mTransactionDetail,
          orderDetail: mDressOrderObj,
          transactionVerification: route?.params?.transactionVerification,
          installment: installment,
        }),
      );
    }
  };

  const onSubmitClick = async () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else if (selectedArr.length < 1) {
      toast(translations.PLEASE_SELECT_A_CONTESTANT, toastType.ERROR_TOAST);
    } else if (selectedArr.length > 0) {
      setLoader(true);
      let res = await submitContestant();
      if (res.success) {
        setLoader(false);
        setSelectedArr([]);
        onSkipButtonClick();
      }
    }
  };

  const _onsetSelectedArray = list => {
    if (list.length >= 2) {
      let obj = [list[0]];
      setSelectedArr(obj);
    } else {
      setSelectedArr(list);
    }
  };

  const onPressBack = () => {
    return true;
  };

  useEffect(() => {
    const hardBack = BackHandler.addEventListener(
      'hardwareBackPress',
      onPressBack,
    );
    return () => hardBack.remove();
  }, [onPressBack]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>
        {translations.WHICH_CONTESTANT_ARE_YOU_SUPPORTING}
      </Text>
      <Text style={styles.subHeading}>
        {eventContestant !== undefined ? eventContestant?.event?.title : ''}
      </Text>

      <View
        style={[
          styles.listContainer,
          {marginStart: isLoading ? 0 : moderateScaleVertical(16)},
        ]}>
        <MultiSelectList
          displayData={
            eventContestant?.contestants !== undefined
              ? eventContestant?.contestants
              : []
          }
          selectedArray={selectedArr}
          setSelectedArray={_onsetSelectedArray}
          areSelectable={true}
          onTextClickListener={emptyFunction}
          isLoading={isLoading}
        />
      </View>
      <View style={styles.shadowView}>
        <View style={styles.paymentView}>
          <TouchableOpacity
            style={styles.containerDelete}
            onPress={onSkipButtonClick}>
            <Text style={{...styles.borderButtonText, color: color.BLACK}}>
              {translations.SKIP_BUTTON}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.containerConfirm}
            onPress={onSubmitClick}>
            <Text style={styles.borderButtonText}>{translations.SUBMIT}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SupportContestant;

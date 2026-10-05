import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from '../../../../../../../../../common/button';
import translations from '../../../../../../../../../../assets/translations';
import {styles} from '../../../../../../../../shop/shoppingbag/components/address/styles';
import useHtQuery from '../../../../../../../../../../services/api/useHtQuery';
import {GET_ADDRESS_LIST} from '../../../../../../../../../../services/endpoints';
import {AddressInfo} from '../../../../../../../../../../services/models/shop/addressList';
import {checkIsNull} from '../../../../../../../../../utils/validations';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../../../../root/screenname';
import {
  ADDRESS_TYPE,
  FORM_TYPE,
  PAYMENT_FOR,
  REFESH_SCREEN,
} from '../../../../../../../../../utils/enum';
import AddressShimmer from '../../../../../../../../../common/shimmer/addressshimmer';
import CommonAddressLayout from '../../../../../../../../shop/shoppingbag/components/address/components/commonaddresslayout';
import PCAPriceComponent from '../pcaprice';
import {emptyFunction} from '../../../../../../../../../utils/helperFunction';
import {SHOPPING_BAG} from '../../../../../../../../shop/shoppingbag/localEnum';
import { color } from '../../../../../../../../../../assets/colorConstant';
import useAppStore, { useSetScreenRefresh } from '../../../../../../../../../../store/useAppStore';

interface Props {
  setStep: Function;
  billingAddress: any;
  setBillingAddress: Function;
  votesInfo: any;
  setBillAddressState : Function;
  prevStep ?: number;
  setSelectedBillIndex: Function;
  selectedBillIndex: number;

}

const PCAAddress = ({
  setStep,
  billingAddress,
  setBillingAddress,
  votesInfo,
  setBillAddressState,
  prevStep,
  selectedBillIndex,
  setSelectedBillIndex
}: Props) => {
  const [billingError, setBillingError] = useState('');
  const navigation = useNavigation();
  const {
    storeData: {refresh},
  } = useAppStore();
  const setScreenRefresh = useSetScreenRefresh();

  //API GET ADDRESS LIST --------------------------------------- START
  const {data, isLoading, refetch, isRefetching} = useHtQuery<AddressInfo>({
    key: GET_ADDRESS_LIST,
    url: GET_ADDRESS_LIST,
    offSuccessToast: true,
    disableLoader: true,
    enabled: true
  });
  //API GET ADDRESS LIST  ----------------------------------------- END

  useEffect(() => {
    refeshScreen();
    setBillingError('')
  }, [refresh]);

  const refeshScreen = async () => {
    if (REFESH_SCREEN.PCA_ADDRESS === refresh ) {
      await refetch();
      setScreenRefresh(REFESH_SCREEN.NONE);
    }
  };

  useEffect(() => {
    if (checkIsNull(data)) {
      let index = checkIsNull(selectedBillIndex) ? selectedBillIndex : 0;
      let billingInfo = data?.data?.billingAdrreses[index];
      if (checkIsNull(billingInfo)) {
        setSelectedBillIndex(billingInfo?.is_default_address === 1 ? 0 : null);
      }
      setBillingAddress({
        id: billingInfo?.id,
        address:
          billingInfo?.address +
          ' ' +
          billingInfo?.city +
          ', ' +
          billingInfo?.state_name?.name +
          ', ' +
          billingInfo?.country_name?.name +
          ', ' +
          billingInfo?.zipcode,
        name: billingInfo?.first_name + ' ' + billingInfo?.last_name,
        phoneNo: billingInfo?.phone,
        email: billingInfo?.email,
        default: billingInfo?.is_default_address === 1 ? true : false,
      });
    }
  }, [data]);

  const onChangeAddressClicked = (name: string, goToAddrssForm: boolean) => {
    if (goToAddrssForm) {
      navigation.navigate(SCREEN.ADD_EDIT_ADDRESS, {
        formType: FORM_TYPE.ADD,
        addressType: ADDRESS_TYPE.BILLING,
        paymentType: PAYMENT_FOR.BUY_VOTE_FOR_CONTESTANT,
        setStep: setStep,
        setBillAddressState: setBillAddressState,
      });
    } else {
      navigation.navigate(SCREEN.CHANGE_ADDRESS, {
        name: name,
        addressList: data?.data?.billingAdrreses,
        refectAPI: refetch,
        setStep: setStep,
        setNewAddress: setBillingAddress,
        selectedIndex: selectedBillIndex,
        setSelectedIndex: setSelectedBillIndex,
        setCheckBoxState: emptyFunction,
      });
    }
  };

  const isValid = (address: any, setError: Function) => {
    if (Object.values(address)[0] == undefined) {
      setError(translations.PLEASE_ADD_ADDRESS_TO_PROCEED);
      return false;
    } else {
      return true;
    }
  };

  const onPressContinue = () => {
    if (isValid(billingAddress, setBillingError)) {
      setStep(SHOPPING_BAG.PAYMENT);
    }
  };

  return (
    <View style={styles.topContainer}>
      <ScrollView style={styles.container}>
        {isLoading || isRefetching ? (
          <AddressShimmer changePassword={false} />
        ) : !(isLoading || isRefetching) && checkIsNull(billingAddress) ? (
          <View style={styles.wrapper}>
            <View style={styles.addressList}>
              <CommonAddressLayout
                showHeading={true}
                heading={translations.BILLING_ADDRESS}
                onPress={onChangeAddressClicked}
                errorMsg={billingError}
                info={billingAddress}
              />
            </View>
            <PCAPriceComponent
              paymentType={votesInfo.paymentType}
              votesInfo={votesInfo}
              bgColor={color.S_GRAY_1}
            />
          </View>
        ) : null}
      </ScrollView>
      <View style={styles.addressList}>
        <CustomButton
          label={translations.CONTINUE}
          inactive={true}
          onPress={() => onPressContinue()}
        />
      </View>
    </View>
  );
};

export default PCAAddress;

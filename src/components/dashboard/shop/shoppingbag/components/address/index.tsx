import {ScrollView, View, KeyboardAvoidingView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from '../../../../../common/button';
import translations from '../../../../../../assets/translations';
import CommonAddressLayout from './components/commonaddresslayout';
import {styles} from './styles';
import FloatingBigInput from '../../../../../common/floatingbiginput';
import useHtQuery from '../../../../../../services/api/useHtQuery';
import {
  GET_ADDRESS_LIST,
  GET_PRODUCT_UNAVAILABILITY,
} from '../../../../../../services/endpoints';
import {AddressInfo, BillingAddress} from '../../../../../../services/models/shop/addressList';
import {checkIsNull} from '../../../../../utils/validations';
import {useNavigation} from '@react-navigation/core';
import UpdateBagModal from './updatebagmodal';
import {SCREEN} from '../../../../../../root/screenname';
import {ADDRESS_TYPE, FORM_TYPE} from '../../../../../utils/enum';
import AddressShimmer from '../../../../../common/shimmer/addressshimmer';
import PriceComponent from '../../pricecomponent';
import {color} from '../../../../../../assets/colorConstant';
import {SHOPPING_BAG} from '../../localEnum';
import {useSetLoader} from '../../../../../../store/useAppStore';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {Base} from '../../../../../../services/models/base';
import {MethodTypes} from '../../../../../../services/constants';
import {UnavailableProducts} from '../../../../../../services/models/shop/unavailableProductsList';
import {isValid} from './validations';
import {
  dontAcceptEmoji,
  keyBoardManager,
  trackScreenView,
} from '../../../../../utils/helperFunction';
import {useKeyboard} from '@react-native-community/hooks';
import {Plan} from '../../../../../../services/models/planData';
import { ANALYTICS_SCREEN } from '../../../../../../assets/translations/analyticsscreenname';

interface addressProp {
  id: number | string;
  address: string;
  name: string;
  phoneNo: string;
  email: string;
  default: boolean;
}

interface Props {
  setStep: Function;
  billingAddress: addressProp;
  setBillingAddress: Function;
  shippingAddress: addressProp;
  setShippingAddress: Function;
  orderNotes: string;
  setOrderNotes: Function;
  isCheckBoxActive: boolean;
  pageantPlanDetail: Plan | undefined;
  setCheckBoxState: Function;
  bagItems: any;
  prevStep: any;
  selectedBillIndex: number;
  setSelectedBillIndex: Function;
  selectedShippIndex: number;
  setSelectedShippIndex : Function;
}

const Address = ({
  setStep,
  billingAddress,
  setBillingAddress,
  shippingAddress,
  setShippingAddress,
  orderNotes,
  setOrderNotes,
  isCheckBoxActive,
  setCheckBoxState,
  pageantPlanDetail,
  bagItems,
  prevStep,
  selectedBillIndex,
  setSelectedBillIndex,
  selectedShippIndex, 
  setSelectedShippIndex,
}: Props) => {
  const [isModalVisible, setModalState] = useState(false);
  const [billingError, setBillingError] = useState('');
  const [shippingError, setShippingError] = useState('');
  const [wearDateError, setWearDateError] = useState('');
  const [addressBookId, setAddressBookId] = useState(0);
  const [unavailableAddList, setUnavailableAddList] =
    useState<UnavailableProducts>();
  const navigation = useNavigation();
  const setLoader = useSetLoader();
  const [isDisableCheckbox, setDisableCheckbox] = useState(false);
  const {keyboardShown} = useKeyboard();

  //API GET ADDRESS LIST --------------------------------------- START
  const {data, isLoading, refetch, isRefetching} = useHtQuery<AddressInfo>({
    key: GET_ADDRESS_LIST,
    url: GET_ADDRESS_LIST,
    offSuccessToast: true,
    enabled: prevStep !== 1 ? false : true,
  });

  //API GET ADDRESS LIST  ----------------------------------------- END
  const {mutateAsync: getAddUnavailability} = useCgMutation<Base<UnavailableProducts>>({
    key: GET_PRODUCT_UNAVAILABILITY + '?address_book_id=' + addressBookId,
    url: GET_PRODUCT_UNAVAILABILITY + '?address_book_id=' + addressBookId,
    disableLoader: true,
    method: MethodTypes.GET,
    offSuccessToast: true,
  });

  useEffect(() => {
    keyBoardManager();
    trackScreenView(ANALYTICS_SCREEN.ADDRESS)
  }, []);

  useEffect(() => {
    if (checkIsNull(data)) {
      let index = checkIsNull(selectedBillIndex) ? selectedBillIndex : 0;
      let billingInfo = data?.data?.billingAdrreses[index];
      let shippingInfo = data?.data?.shippingAdrreses[0];
      if (checkIsNull(billingInfo)) {
        setDisableCheckbox(false);
        setBillingError('');
      } else {
        setDisableCheckbox(true);
      }
      if (checkIsNull(shippingInfo)) {
        setShippingError('');
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

      setShippingAddress({
        id: shippingInfo?.id,
        address:
          shippingInfo?.address +
          ' ' +
          shippingInfo?.city +
          ', ' +
          shippingInfo?.state_name?.name +
          ', ' +
          shippingInfo?.country_name?.name +
          ', ' +
          shippingInfo?.zipcode,
        name: shippingInfo?.first_name + ' ' + shippingInfo?.last_name,
        phoneNo: shippingInfo?.phone,
        email: shippingInfo?.email,
        default: shippingInfo?.is_default_address === 1 ? true : false,
      });
      setCheckBoxState(false);
    }
  }, [data]);

  useEffect(() => {
    if (isCheckBoxActive) {
      setShippingAddress({...billingAddress, default: false});
      setShippingError('');
      setCheckBoxState(true);
    } else {
      setCheckBoxState(false);
      let index = checkIsNull(selectedShippIndex) ? selectedShippIndex : 0;
      let shippingInfo = data?.data?.shippingAdrreses[index];
      if (checkIsNull(shippingInfo)) {
        setShippingAddress({
          id: shippingInfo?.id,
          address:
            shippingInfo?.address +
            ' ' +
            shippingInfo?.city +
            ', ' +
            shippingInfo?.state_name?.name +
            ', ' +
            shippingInfo?.country_name?.name +
            ', ' +
            shippingInfo?.zipcode,
          name: shippingInfo?.first_name + ' ' + shippingInfo?.last_name,
          phoneNo: shippingInfo?.phone,
          email: shippingInfo?.email,
          default: shippingInfo?.is_default_address === 1 ? true : false,
        });
      } else {
        setShippingAddress({});
      }
    }
  }, [isCheckBoxActive]);

  const onChangeAddressClicked = (name: string, goToAddrssForm: boolean) => {
    if (goToAddrssForm) {
      navigation.navigate(SCREEN.ADD_EDIT_ADDRESS, {
        formType: FORM_TYPE.ADD,
        addressType:
          name === translations.BILLING_ADDRESS
            ? ADDRESS_TYPE.BILLING
            : ADDRESS_TYPE.SHIPPING,
        firstTimeForm:
          Object.values(billingAddress)[0] === undefined &&
          Object.values(shippingAddress)[0] === undefined
            ? true
            : false,
        setStep: setStep,
        addressId: '',
        refectAPI: refetch,
      });
    } else {
      navigation.navigate(SCREEN.CHANGE_ADDRESS, {
        name: name,
        addressList:
          name === translations.BILLING_ADDRESS
            ? data?.data?.billingAdrreses
            : data?.data?.shippingAdrreses,
        refectAPI: refetch,
        setStep: setStep,
        setNewAddress:
          name === translations.BILLING_ADDRESS
            ? setBillingAddress
            : setShippingAddress,
        setCheckBoxState: setCheckBoxState,
        selectedIndex:
          name === translations.BILLING_ADDRESS
            ? selectedBillIndex
            : selectedShippIndex,
        setSelectedIndex:
          name === translations.BILLING_ADDRESS
            ? setSelectedBillIndex
            : setSelectedShippIndex,
      });
    }
  };

  const isAddressValid=(address : BillingAddress)=>{
    if(Object.values(address)[0] === undefined){
      setBillingError(translations.PLEASE_ADD_ADDRESS_TO_PROCEED)
      return false
    }else{
      return true
    }
  }

  const onPressContinue = () => {
    if (pageantPlanDetail !== undefined && isAddressValid(billingAddress) ) {
      setStep(SHOPPING_BAG.PAYMENT);
    } else if (
      isValid(
        billingAddress,
        shippingAddress,
        orderNotes,
        setBillingError,
        setShippingError,
        setWearDateError
      )
    ) {
      setLoader(true);
      setAddressBookId(shippingAddress?.id);
      setTimeout(async () => {
        const res = await getAddUnavailability();
        if (res.success) {
          if (res?.data?.length > 0) {
            setUnavailableAddList(res?.data);
            setModalState(true);
          } else {
            setStep(SHOPPING_BAG.PAYMENT);
          }
          setLoader(false);
        }
        setLoader(false);
      }, 600);
    }
  };
  const getFinnalCost = () => {
    return pageantPlanDetail?.buying_lead !== undefined
      ? pageantPlanDetail?.prepaid_lead_price !== undefined &&
          pageantPlanDetail?.prepaid_lead_price *
            Number(pageantPlanDetail?.buying_lead)
      : 0;
  };

  return (
    <View style={styles.topContainer}>
      <ScrollView style={styles.container}>
        {isLoading || isRefetching ? (
          <AddressShimmer changePassword={false} />
        ) : !(isLoading || isRefetching) && checkIsNull(billingAddress) ? (
          <KeyboardAvoidingView>
            <View style={styles.wrapper}>
              <View style={styles.addressList}>
                <CommonAddressLayout
                  showHeading={true}
                  heading={translations.BILLING_ADDRESS}
                  onPress={onChangeAddressClicked}
                  errorMsg={billingError}
                  info={billingAddress}
                />
                {pageantPlanDetail === undefined && (
                  <>
                    <CommonAddressLayout
                      showHeading={true}
                      heading={translations.SHIPPING_ADDRESS}
                      showCheckBox={true}
                      info={shippingAddress}
                      activeCheckBox={isCheckBoxActive}
                      setCheckBoxState={setCheckBoxState}
                      onPress={onChangeAddressClicked}
                      errorMsg={shippingError}
                      isDisableCheckbox={isDisableCheckbox}
                      showAddNewAddress={
                        !checkIsNull(data?.data?.shippingAdrreses[0])
                      }
                    />
                    <FloatingBigInput
                      floatingText={translations.WEAR_DATE_ORDER_DATE}
                      value={orderNotes}
                      returnKeyType={'done'}
                      multiline={true}
                      textAlignVertical={'top'}
                      maxLength={255}
                      setText={val => {
                        setOrderNotes(dontAcceptEmoji(val));
                        if (val?.length !== 1) {
                          setWearDateError('');
                        }
                      }}
                      forMultiline={true}
                      autoCapitalize={'sentences'}
                      isMandatory={false}
                      isMoreThan250={false}
                      showLength={false}
                      errorMsg={wearDateError}
                    />
                  </>
                )}
              </View>
              {pageantPlanDetail !== undefined ? (
                <PriceComponent
                  pageantPlanDetail={pageantPlanDetail}
                  bgColor={color.S_GRAY_1}
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
                  bgColor={color.S_GRAY_1}
                  totalItems={
                    bagItems?.cartData?.marked_for_checkout_item_count
                  }
                  price={bagItems?.subtotal}
                  shipping={translations.FREE}
                  discount={bagItems?.discount}
                  finalPrice={bagItems?.finalprice}
                />
              )}
            </View>
          </KeyboardAvoidingView>
        ) : null}
        <UpdateBagModal
          isModalVisible={isModalVisible}
          setModalVisible={setModalState}
          setSteps={setStep}
          unavailableAddList={unavailableAddList}
        />
      </ScrollView>
      {!keyboardShown && (
        <View style={styles.addressList}>
          <CustomButton
            label={translations.CONTINUE}
            inactive={true}
            onPress={() => onPressContinue()}
          />
        </View>
      )}
    </View>
  );
};

export default Address;

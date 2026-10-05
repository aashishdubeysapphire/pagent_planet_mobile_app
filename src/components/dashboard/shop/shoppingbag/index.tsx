import { View, Image, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import Header from '../../../common/header';
import translations from '../../../../assets/translations';
import AppImages from '../../../../assets/images/AppImages';
import { styles } from './styles';
import { SHOPPING_BAG } from './localEnum';
import Bag from './components/bag';
import Address from './components/address';
import Payment from './components/payment';
import { useNavigation } from '@react-navigation/core';
import { useBackHandler } from '@react-native-community/hooks';
import WarningModel from '../../../common/warningmodel';
import usePrevious from '../../../utils/usePrevious';
import { createFirebaseLog, keyBoardManager, trackScreenView } from '../../../utils/helperFunction';
import Lead from './components/lead';
import { Plan } from '../../../../services/models/planData';
import { PAYMENT_FOR } from '../../../utils/enum';
import { RootContext } from '../../../../store/rootStore';
import { ANALYTICS_SCREEN } from '../../../../assets/translations/analyticsscreenname';
import { SCREEN } from '../../../../root/screenname';

const ShoppingBag = props => {
  const navigation = useNavigation();
  const { setShoppingBagWarningModal, showShoppingBagWarningModal } =
    useContext(RootContext);
  const [pageantPlanDetailData, setPageantPlanDetailData] = useState<
    Plan | undefined
  >(props?.route?.params?.palnData);
  const { getCartCountApi } = props?.route?.params;
  const [isBillingAddress, setIsBillingAddress] = useState(
    props?.route?.params?.have_billing_address,
  );

  const [billingAddress, setBillingAddress] = useState({
    id: '',
    address: '',
    name: '',
    phoneNo: '',
    email: '',
    default: false,
  });
  const [shippingAddress, setShippingAddress] = useState({
    id: '',
    address: '',
    name: '',
    phoneNo: '',
    email: '',
    default: false,
  });
  const [orderNotes, setOrderNotes] = useState('');
  const [isCheckBoxActive, setCheckBoxState] = useState(false);
  const [step, setStep] = useState(SHOPPING_BAG.BAG);
  const [isWarningMoadlVisible, setIsWarningMoadlVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [bagItems, setBagItems] = useState([]);
  const prevStep = usePrevious(step);
  const [selectedBillIndex, setSelectedBillIndex] = useState(0);
  const [selectedShippIndex, setSelectedShippIndex] = useState(0);

  useEffect(() => {
    keyBoardManager();
    trackScreenView(ANALYTICS_SCREEN.SHOPPING_BAG);
  }, []);

  useBackHandler(() => {
    createFirebaseLog(useBackHandler.name, SCREEN.SHOPPING_BAG);
    onPressBack();
    return true;
  });

  const getHeaderImg = () => {
    createFirebaseLog(getHeaderImg.name, SCREEN.SHOPPING_BAG);
    if (step === SHOPPING_BAG.BAG) {
      return AppImages.SHOPING_BAG.bagHeader;
    } else if (step === SHOPPING_BAG.ADDRESS) {
      return AppImages.SHOPING_BAG.addressHeader;
    } else if (step === SHOPPING_BAG.PAYMENT) {
      return AppImages.SHOPING_BAG.paymentHeader;
    }
  };

  const getBannerHeaderImg = () => {
    createFirebaseLog(getBannerHeaderImg.name, SCREEN.SHOPPING_BAG);
    if (step === SHOPPING_BAG.BAG) {
      return AppImages.SHOPING_BAG.bannerLeadHeaderIcon;
    } else if (step === SHOPPING_BAG.ADDRESS) {
      return AppImages.SHOPING_BAG.bannerAddressHeaderIcon;
    } else if (step === SHOPPING_BAG.PAYMENT) {
      return AppImages.SHOPING_BAG.bannerPaymentHeaderIcon;
    }
  };

  const getMainView = () => {
    createFirebaseLog(getMainView.name, SCREEN.SHOPPING_BAG);
    if (step === SHOPPING_BAG.BAG) {
      if (
        props?.route?.params?.paymentType !== undefined &&
        props?.route?.params?.paymentType === PAYMENT_FOR.BUY_PAGEANT_PLAN
      ) {
        return (
          <Lead
            setStep={setStep}
            setPageantPlanDetailData={setPageantPlanDetailData}
            pageantPlanDetail={pageantPlanDetailData}
            have_billing_address={isBillingAddress}
            setIsBillingAddress={setIsBillingAddress}
          />
        );
      } else {
        return (
          <Bag
            setStep={setStep}
            bagItems={bagItems}
            setBagItems={setBagItems}
            getCartCountApi={getCartCountApi}
          />
        );
      }
    } else if (step === SHOPPING_BAG.ADDRESS) {
      return (
        <Address
          setStep={setStep}
          prevStep={prevStep}
          bagItems={bagItems}
          pageantPlanDetail={pageantPlanDetailData}
          billingAddress={billingAddress}
          setBillingAddress={setBillingAddress}
          shippingAddress={shippingAddress}
          setShippingAddress={setShippingAddress}
          orderNotes={orderNotes}
          setOrderNotes={setOrderNotes}
          isCheckBoxActive={isCheckBoxActive}
          setCheckBoxState={setCheckBoxState}
          selectedBillIndex={selectedBillIndex}
          setSelectedBillIndex={setSelectedBillIndex}
          selectedShippIndex={selectedShippIndex}
          setSelectedShippIndex={setSelectedShippIndex}
        />
      );
    } else if (step === SHOPPING_BAG.PAYMENT) {
      return (
        <Payment
          setStep={setStep}
          paymentType={props?.route?.params?.paymentType}
          pageantId={props?.route?.params?.pageantId}
          bagItems={bagItems}
          pageantPlanDetail={pageantPlanDetailData}
          billingAddress={billingAddress}
          shippingAddress={shippingAddress}
          orderNotes={orderNotes}
          setCheckBoxState={setCheckBoxState}
        />
      );
    }
  };
  const onPressBack = () => {
    createFirebaseLog(onPressBack.name, SCREEN.SHOPPING_BAG);
    setIsChecked(false);

    if (step === SHOPPING_BAG.BAG) {
      navigation.goBack();
    } else if (
      showShoppingBagWarningModal !== true &&
      isWarningMoadlVisible == false
    ) {
      setIsWarningMoadlVisible(true);
    } else {
      if (step === SHOPPING_BAG.ADDRESS) {
        setStep(SHOPPING_BAG.BAG);
      } else if (step === SHOPPING_BAG.PAYMENT) {
        setStep(SHOPPING_BAG.ADDRESS);
      }
    }
  };
  const getHeaderText = () => {
    createFirebaseLog(getHeaderText.name, SCREEN.SHOPPING_BAG);
    if (
      props?.route?.params?.paymentType !== undefined &&
      props?.route?.params?.paymentType === PAYMENT_FOR.BUY_PAGEANT_PLAN
    ) {
      return translations.PURCHASE_PLAN;
    } else {
      if (step === SHOPPING_BAG.BAG) {
        return translations.SHOPPING_BAG;
      } else if (step === SHOPPING_BAG.ADDRESS) {
        return translations.ADDRESS_DETAILS;
      } else if (step === SHOPPING_BAG.PAYMENT) {
        return translations.PAYMENTS;
      }
    }
  };

  const getCancleBtnText = () => {
    createFirebaseLog(getCancleBtnText.name, SCREEN.SHOPPING_BAG);
    if (step === SHOPPING_BAG.BAG) {
      return translations.YES;
    } else if (step === SHOPPING_BAG.ADDRESS) {
      if (
        props?.route?.params?.paymentType !== undefined &&
        props?.route?.params?.paymentType === PAYMENT_FOR.BUY_PAGEANT_PLAN
      ) {
        return translations.GO_TO_LEAD;
      } else {
        return translations.GO_TO_BAG;
      }
    } else if (step === SHOPPING_BAG.PAYMENT) {
      return translations.GO_TO_ADDRESS;
    }
  };

  const onStayHere = () => {
    createFirebaseLog(onStayHere.name, SCREEN.SHOPPING_BAG);
    if (isChecked == true) {
      setShoppingBagWarningModal(true);
    } else {
      setIsWarningMoadlVisible(false);
    }
  };
  return (
    <SafeAreaView style={styles.continer}>
      <Header
        lable={getHeaderText()}
        isUnderLineRequired
        isFavorite={props?.route?.params?.paymentType === undefined}
        onPressBack={onPressBack}
      />

      {bagItems?.cartData?.quote_item?.length > 0 ? (
        <Image source={getHeaderImg()} style={styles.headerImg} />
      ) : props?.route?.params?.paymentType !== undefined &&
        props?.route?.params?.paymentType === PAYMENT_FOR.BUY_PAGEANT_PLAN ? (
        <Image source={getBannerHeaderImg()} style={styles.headerImg} />
      ) : null}

      <View>{getMainView()}</View>
      <WarningModel
        msg={translations.ARE_YOU_SURE_YOU_WANT_TO_GO_BACK}
        isModalVisible={isWarningMoadlVisible}
        setConfirm={onStayHere}
        setIsModalVisible={setIsWarningMoadlVisible}
        yesButtonText={translations.STAY_HERE}
        cancleButtonText={getCancleBtnText()}
        onDenay={() => {
          onPressBack();
          onStayHere();
        }}
        headingStyle={styles.modalHeading}>
        <View style={styles.TIckView}>
          <TouchableOpacity
            onPress={() => setIsChecked(!isChecked)}
            style={styles.tickIcon}>
            {isChecked ? (
              <AppImages.Common.Filled_ICON />
            ) : (
              <AppImages.Common.UnFilled_ICON />
            )}
          </TouchableOpacity>
          <Text
            style={[
              styles.addresText,
              !isChecked && styles.unselectedTickText,
            ]}>
            {translations.DONT_SHOW_THIS_MSG_AGAIN}
          </Text>
        </View>
      </WarningModel>
    </SafeAreaView>
  );
};

export default ShoppingBag;

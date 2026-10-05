import {View, SafeAreaView, Image, TouchableOpacity, Text} from 'react-native';
import React, {useContext, useState} from 'react';
import Header from '../../../../../../../../common/header';
import {SHOPPING_BAG} from '../../../../../../../shop/shoppingbag/localEnum';
import AppImages from '../../../../../../../../../assets/images/AppImages';
import translations from '../../../../../../../../../assets/translations';
import {styles} from './styles';
import Payment from '../../../../../../../shop/shoppingbag/components/payment';
import PCAAddress from './pcaaddress';
import {useNavigation} from '@react-navigation/core';
import {ADDRESS_TYPE, FORM_TYPE} from '../../../../../../../../utils/enum';
import {SCREEN} from '../../../../../../../../../root/screenname';
import {styles as style} from '../../../../../../../shop/shoppingbag/styles';
import WarningModel from '../../../../../../../../common/warningmodel';
import {useBackHandler} from '@react-native-community/hooks';
import {RootContext} from '../../../../../../../../../store/rootStore';
import usePrevious from '../../../../../../../../utils/usePrevious';

const BuyVotes = props => {
  const {votesInfo} = props.route.params;
  const navigation = useNavigation();
  const {setShoppingBagWarningModal, showShoppingBagWarningModal} =
    useContext(RootContext);
  const [step, setStep] = useState(SHOPPING_BAG.ADDRESS);
  const [isBillAddress, setBillAddressState] = useState(false);
  const [isWarningMoadlVisible, setIsWarningMoadlVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [billingAddress, setBillingAddress] = useState({
    id: '',
    address: '',
    name: '',
    phoneNo: '',
    email: '',
    default: false,
  });
  const prevStep = usePrevious(step);
  const [selectedBillIndex, setSelectedBillIndex] = useState(0);

  useBackHandler(() => {
    onPressBack();
    return true;
  });

  const onPressBack = () => {
    setIsChecked(false);
    if (step === SHOPPING_BAG.ADDRESS) {
      navigation.goBack();
    } else if (
      isWarningMoadlVisible == false &&
      showShoppingBagWarningModal !== true
    ) {
      setIsWarningMoadlVisible(true);
    } else if (step === SHOPPING_BAG.PAYMENT) {
      setStep(SHOPPING_BAG.ADDRESS);
    }
  };
  const getHeading = () => {
    if (step === SHOPPING_BAG.ADDRESS) {
      return translations.ADDRESS_DETAILS;
    } else if (step === SHOPPING_BAG.PAYMENT) {
      return translations.PAYMENTS;
    }
  };

  const getTopImg = () => {
    if (step === SHOPPING_BAG.ADDRESS) {
      return AppImages.SHOPING_BAG.addressticked;
    } else if (step === SHOPPING_BAG.PAYMENT) {
      return AppImages.SHOPING_BAG.paymentTicked;
    }
  };

  const getMainView = () => {
    if (votesInfo?.have_billing_address === 0 && !isBillAddress) {
      navigation.navigate(SCREEN.ADD_EDIT_ADDRESS, {
        formType: FORM_TYPE.ADD,
        addressType: ADDRESS_TYPE.BILLING,
        paymentType: votesInfo.paymentType,
        setStep: setStep,
        setBillAddressState: setBillAddressState,
      });
    } else if (step === SHOPPING_BAG.ADDRESS) {
      return (
        <PCAAddress
          setStep={setStep}
          billingAddress={billingAddress}
          setBillingAddress={setBillingAddress}
          votesInfo={votesInfo}
          setBillAddressState= {setBillAddressState}
          prevStep={prevStep}
          selectedBillIndex={selectedBillIndex}
          setSelectedBillIndex={setSelectedBillIndex}
        />
      );
    } else if (step === SHOPPING_BAG.PAYMENT) {
      return (
        <Payment
          setStep={setStep}
          paymentType={votesInfo.paymentType}
          bagItems={{}}
          votesInfo={votesInfo}
          billingAddress={billingAddress}
        />
      );
    }
  };
  const getCancleBtnText = () => {
    if (step === SHOPPING_BAG.ADDRESS) {
      return translations.YES;
    } else if (step === SHOPPING_BAG.PAYMENT) {
      return translations.GO_TO_ADDRESS;
    }
  };

  const onStayHere = () => {
    if (isChecked == true) {
      setShoppingBagWarningModal(true);
    } else {
      setIsWarningMoadlVisible(false);
    }
  };
  return (
    <SafeAreaView style={styles.continer}>
      <Header
        lable={getHeading()}
        isUnderLineRequired
        onPressBack={onPressBack}
      />
      <Image source={getTopImg()} style={styles.headerImg} />
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
        headingStyle={style.modalHeading}>
        <View style={style.TIckView}>
          <TouchableOpacity
            onPress={() => setIsChecked(!isChecked)}
            style={style.tickIcon}>
            {isChecked ? (
              <AppImages.Common.Filled_ICON />
            ) : (
              <AppImages.Common.UnFilled_ICON />
            )}
          </TouchableOpacity>
          <Text
            style={[style.addresText, !isChecked && style.unselectedTickText]}>
            {translations.DONT_SHOW_THIS_MSG_AGAIN}
          </Text>
        </View>
      </WarningModel>
    </SafeAreaView>
  );
};

export default BuyVotes;

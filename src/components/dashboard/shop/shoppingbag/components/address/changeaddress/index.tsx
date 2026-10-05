import {View, Text, SafeAreaView, FlatList, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from '../../../../../../common/button';
import translations from '../../../../../../../assets/translations';
import {styles} from './styles';
import AddAddressButton from '../components/addaddressbutton';
import Header from '../../../../../../common/header';
import SelectAddressView from '../components/selectaddressview';
import {
  ADDRESS_TYPE,
  FORM_TYPE,
  REFESH_SCREEN,
} from '../../../../../../utils/enum';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../root/screenname';
import useCgMutation from '../../../../../../../services/api/useCgMutation';
import {Base} from '../../../../../../../services/models/base';
import {DELETE_ADDRESS} from '../../../../../../../services/endpoints';
import {checkIsConnected} from '../../../../../../utils/helperFunction';
import AddressShimmer from '../../../../../../common/shimmer/addressshimmer';
import WarningModel from '../../../../../../common/warningmodel';
import {BillingAddress} from '../../../../../../../services/models/shop/addressList';
import {useBackHandler} from '@react-native-community/hooks';
import {useSetScreenRefresh} from '../../../../../../../store/useAppStore';

const ChangeAddress = props => {
  const {
    name,
    addressList,
    refectAPI,
    setStep,
    setNewAddress,
    setCheckBoxState,
    selectedIndex,
    setSelectedIndex,
  } = props.route.params;
  const [isActiveAddress, setActiveAddress] = useState([false]);
  const [selectedAddress, setSelectedAddress] = useState(selectedIndex);
  const [firstAddress, setFirstAddress] = useState(addressList[0]);
  const [completeAddressList, setCompleteAddressList] = useState(addressList);
  const [addressId, setAddressId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const setScreenRefresh = useSetScreenRefresh();
  const navigation = useNavigation();

  const {mutateAsync: deleteAddress, isLoading} = useCgMutation<Base>({
    key: DELETE_ADDRESS,
    url: DELETE_ADDRESS,
    body: {address_id: addressId},
    disableLoader: true,
  });

  useEffect(() => {
    const address = [...isActiveAddress];
    address[selectedIndex] = true;
    setActiveAddress(address);
  }, []);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
  }, [isLoading]);

  const refeshScreenList = async () => {
    const res = await refectAPI();
    let data = name?.includes(ADDRESS_TYPE.SHIPPING)
      ? res?.data?.data?.shippingAdrreses
      : res?.data?.data?.billingAdrreses;
    setCompleteAddressList(data);
    setFirstAddress(data[0]);
  };

  const handleRadioButtonState = (index: number) => {
    const address = [...isActiveAddress];
    address[index] = !address[index];
    if (index !== selectedAddress) {
      address[selectedAddress] = false;
    } else {
      address[selectedAddress] = true;
    }
    setActiveAddress(address);
    if (address[index] === true) {
      setSelectedAddress(index);
      setSelectedIndex(index);
    }
    let addressInfo = completeAddressList[index];
    setAddressType(addressInfo);
  };

  const setAddressType = (info: BillingAddress) => {
    setNewAddress({
      id: info?.id,
      address:
        info?.address +
        ' ' +
        info?.city +
        ', ' +
        info?.state_name?.name +
        ', ' +
        info?.country_name?.name +
        ', ' +
        info?.zipcode,
      name: info?.first_name + ' ' + info?.last_name,
      phoneNo: info?.phone,
      email: info?.email,
      default: info?.is_default_address === 1 ? true : false,
    });
  };

  const handleEditButton = (i: number) => {
    navigation.navigate(SCREEN.ADD_EDIT_ADDRESS, {
      formType: FORM_TYPE.EDIT,
      addressType: name?.includes(ADDRESS_TYPE.SHIPPING)
        ? ADDRESS_TYPE.SHIPPING
        : ADDRESS_TYPE.BILLING,
      addressId: completeAddressList?.[i]?.id,
      setStep: setStep,
      refeshScreenList: refeshScreenList,
    });
  };

  const deleteButtonClicked = (index: number) => {
    setAddressId(completeAddressList?.[index]?.id);
    setScreenRefresh(REFESH_SCREEN.CONTESTANT_VOTE_SCREEN);
    setShowModal(true);
  };

  const listFooterComponent = () => {
    return <View style={styles.footerStyles} />;
  };

  const onConfirmDelete = async () => {
    if (checkIsConnected()) {
      setTimeout(async () => {
        const response = await deleteAddress();
        if (response.success) {
          const res = await refectAPI();
          let data = name?.includes(ADDRESS_TYPE.SHIPPING)
            ? res?.data?.data?.shippingAdrreses
            : res?.data?.data?.billingAdrreses;
          if (data?.length === 0) {
            setCompleteAddressList({});
            setFirstAddress({});
            navigation.goBack();
          } else {
            setCompleteAddressList(data);
            setFirstAddress(data[0]);
          }
          setAddressId(0);
        }
      }, 600);
    }
  };

  const handleConfirmButton = () => {
    setCheckBoxState(false);
    const address = [...isActiveAddress];
    if (address[0] === true) {
      handleRadioButtonState(0);
    }
    navigation.goBack();
  };

  useBackHandler(() => {
    onBack();
    return true;
  });

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header lable={translations.CHANGE + name} isUnderLineRequired />

      {loading ? (
        <AddressShimmer changePassword={true} />
      ) : (
        <ScrollView>
          <View style={styles.wrapper}>
            <AddAddressButton
              formType={FORM_TYPE.ADD}
              setStep={setStep}
              refeshScreenList={refeshScreenList}
              addressType={
                name?.includes(ADDRESS_TYPE.SHIPPING)
                  ? ADDRESS_TYPE.SHIPPING
                  : ADDRESS_TYPE.BILLING
              }
            />
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.heading}>{name}</Text>
            <SelectAddressView
              userName={
                firstAddress?.first_name + ' ' + firstAddress?.last_name
              }
              address={
                firstAddress?.address +
                ' ' +
                firstAddress?.city +
                ', ' +
                firstAddress?.state_name?.name +
                ', ' +
                firstAddress?.country_name?.name +
                ', ' +
                firstAddress?.zipcode
              }
              email={firstAddress?.email}
              mobileNo={firstAddress?.phone}
              showDefault={firstAddress?.is_default_address === 1}
              isActiveAddress={isActiveAddress[0]}
              index={0}
              onPress={handleRadioButtonState}
              onPressEdit={handleEditButton}
              onPressDelete={deleteButtonClicked}
            />
          </View>
          {completeAddressList?.length > 1 && !isLoading ? (
            <>
              <View style={styles.divider}></View>
              <View style={styles.wrapper}>
                <Text style={styles.heading}>{translations.OTHER + name}</Text>
                <FlatList
                  data={completeAddressList?.slice(1)}
                  keyExtractor={item => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                  ListFooterComponent={listFooterComponent}
                  renderItem={({item, index}) => (
                    <SelectAddressView
                      userName={item?.first_name + ' ' + item?.last_name}
                      address={
                        item?.address +
                        ' ' +
                        item?.city +
                        ', ' +
                        item?.state_name?.name +
                        ', ' +
                        item?.country_name?.name +
                        ', ' +
                        item?.zipcode
                      }
                      email={item?.email}
                      mobileNo={item?.phone}
                      showDefault={item?.is_default_address === 1}
                      index={index + 1}
                      isActiveAddress={isActiveAddress[index + 1]}
                      onPress={handleRadioButtonState}
                      onPressEdit={handleEditButton}
                      onPressDelete={deleteButtonClicked}
                    />
                  )}
                />
              </View>
            </>
          ) : null}
        </ScrollView>
      )}
      <View style={styles.wrapper}>
        <CustomButton
          label={translations.CONFIRM}
          inactive={loading ? false : true}
          onPress={handleConfirmButton}
        />
      </View>

      <WarningModel
        isModalVisible={showModal}
        setIsModalVisible={setShowModal}
        msg={translations.ARE_YOU_SURE_YOU_WANT_TO_DELETE_THE_ADDRESS}
        setConfirm={onConfirmDelete}
        headingStyle={styles.modalHeading}
      />
    </SafeAreaView>
  );
};

export default ChangeAddress;

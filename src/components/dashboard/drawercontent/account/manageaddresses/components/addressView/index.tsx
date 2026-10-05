import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import DetailsView from '../../../../../shop/shoppingbag/components/address/components/detailsview';
import {color} from '../../../../../../../assets/colorConstant';
import translations from '../../../../../../../assets/translations';
import AppImages from '../../../../../../../assets/images/AppImages';
import {moderateScale} from '../../../../../../utils/responsiveSize';
import {
  DELETE_ADDRESS,
  MARK_AS_DEFAULT_ADDRESS,
} from '../../../../../../../services/endpoints';
import useCgMutation from '../../../../../../../services/api/useCgMutation';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../root/screenname';
import WarningModel from '../../../../../../common/warningmodel';
import {checkIsConnected} from '../../../../../../utils/helperFunction';
import {useSetLoader} from '../../../../../../../store/useAppStore';
import {ADDRESS_TYPE, FORM_TYPE} from '../../../../../../utils/enum';
import {Base} from '../../../../../../../services/models/base';
import {MethodTypes} from '../../../../../../../services/constants';

interface Props {
  info: any;
  addressType: string;
  activeCheckBox: boolean;
  showDefault: boolean;
  refetchAPI: Function;
  setCheckbox : Function;
  index : number;
}

const AddressView = ({
  info,
  addressType,
  activeCheckBox,
  showDefault,
  refetchAPI,
  setCheckbox,
  index
}: Props) => {
  const [addressId, setAddressId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const setLoader = useSetLoader();
  const navigation = useNavigation();

  const {mutateAsync: deleteAddress} = useCgMutation<Base>({
    key: DELETE_ADDRESS,
    url: DELETE_ADDRESS,
    body: {address_id: addressId},
    disableLoader: true,
  });

  const addressBody = {
    address_state: 1,
    address_id: addressId,
    type: addressType?.includes(ADDRESS_TYPE.SHIPPING) ? 1 : 0,
  };

  const {mutateAsync: markAddressAsDefault} = useCgMutation<Base>({
    key: MARK_AS_DEFAULT_ADDRESS,
    url: MARK_AS_DEFAULT_ADDRESS,
    body: addressBody,
    disableLoader: true,
    method: MethodTypes.Post,
  });

  const handleCheckBox = (address_id: number) => {
    setAddressId(address_id);
    setShowModal(true);
    setModalText(translations.MAKE_THIS_AS_MY_DEFAULT_ADDRESS);
    setCheckbox(index);
  };

  const onDeleteClicked = (address_Id: number) => {
    setAddressId(address_Id);
    setShowModal(true);
    setModalText(translations.ARE_YOU_SURE_YOU_WANT_TO_DELETE_THE_ADDRESS);
  };

  const onEditClicked = (address_id: number) => {
    navigation.navigate(SCREEN.ADD_EDIT_ADDRESS, {
      formType: FORM_TYPE.EDIT,
      addressType: addressType?.includes(ADDRESS_TYPE.SHIPPING)
        ? ADDRESS_TYPE.SHIPPING
        : ADDRESS_TYPE.BILLING,
      addressId: address_id,
      refectAPI: refetchAPI,
    });
  };

  const onConfirmDelete = async () => {
    if (checkIsConnected()) {
      setTimeout(async () => {
        setLoader(true);
        const response = await deleteAddress();
        if (response.success) {
          await refetchAPI();
          setAddressId(0);
        }
        setLoader(false);
      }, 600);
    }
  };

  const onAddDefault = () => {
    if (checkIsConnected()) {
      setTimeout(async () => {
        setLoader(true);
        const response = await markAddressAsDefault();
        if (response.success) {
          await refetchAPI();
          setAddressId(0);
          setCheckbox(null);
        }
        setLoader(false);
      }, 600);
    }
  };

  const editDeleteView = (id: number) => {
    return (
      <View style={styles.editSection}>
        <TouchableOpacity onPress={() => onEditClicked(id)}>
          <AppImages.SELL_ITEMS.EditIcon20px marginRight={moderateScale(8)} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDeleteClicked(id)}>
          <AppImages.Common.MyUploadsDelete />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.topContainer}>
      <TouchableOpacity 
         onPress={() => handleCheckBox(info?.id)}
         style={styles.squareContainer}>
        {!showDefault && (       //when address is not default, then show the checkbox to make it default.
          <View style={styles.wrapper}>
            <View style={styles.checkBoxArea}>
              <TouchableOpacity onPress={() => handleCheckBox(info?.id)}>
                {activeCheckBox ? (
                  <AppImages.PCA.checkBoxselected />
                ) : (
                  <AppImages.PCA.checkBoxunselected />
                )}
              </TouchableOpacity>
              <Text
                style={{
                  ...styles.checkboxText,
                  color: activeCheckBox ? color.INPUT_TEXT : color.S_GRAY_4,
                }}>
                {translations.MARK_AS_DEFAULT}
              </Text>
            </View>
            {editDeleteView(info?.id)}
          </View>
        )}
        <View style={styles.wrapper}>
          <View style={styles.nameSection}>
            <Text style={styles.nameStyles} numberOfLines={1}>
              {info?.first_name + ' ' + info?.last_name}
            </Text>
            {showDefault && (
              <Text style={styles.defaultStyles}>({translations.DEFAULT})</Text>
            )}
          </View>
          {showDefault ? editDeleteView(info?.id) : null}
        </View>
        <DetailsView
          image={<AppImages.SHOPING_BAG.Address />}
          body={
            info?.address +
            ' ' +
            info?.city +
            ', ' +
            info?.state_name?.name +
            ', ' +
            info?.country_name?.name +
            ', ' +
            info?.zipcode
          }
          noOfLines={2}
        />
        <DetailsView
          image={<AppImages.SHOPING_BAG.AtTheRate />}
          body={info?.email}
          noOfLines={1}
        />
        <DetailsView
          image={<AppImages.SHOPING_BAG.MobileNo />}
          body={info?.phone}
          noOfLines={1}
        />
      </TouchableOpacity>
      <WarningModel
        isModalVisible={showModal}
        setIsModalVisible={setShowModal}
        msg={modalText}
        setConfirm={
          modalText === translations.MAKE_THIS_AS_MY_DEFAULT_ADDRESS
            ? onAddDefault
            : onConfirmDelete
        }
        headingStyle={styles.modalHeading}
        setCancel={() => setCheckbox(null)}
        isTodoModal={true}            // sending true, so that when user clciks on cross icon, the selected checkbox is unselected
      />
    </View>
  );
};

export default AddressView;

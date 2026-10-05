import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import translations from '../../../../../../../../assets/translations';
import AppImages from '../../../../../../../../assets/images/AppImages';
import DetailsView from '../detailsview';
import {color} from '../../../../../../../../assets/colorConstant';
import {BillingAddress} from '../../../../../../../../services/models/shop/addressList';

interface Props {
  heading: string;
  showHeading: boolean;
  showCheckBox: boolean;
  activeCheckBox: boolean;
  setCheckBoxState: Function;
  onPress: Function;
  errorMsg: string;
  isDisableCheckbox: boolean;
  showAddNewAddress: boolean;
  info: BillingAddress;
}

const CommonAddressLayout = ({
  heading,
  showHeading,
  showCheckBox,
  activeCheckBox,
  setCheckBoxState,
  onPress,
  errorMsg,
  isDisableCheckbox,
  showAddNewAddress,
  info,
}: Props) => {
  const handleCheckBox = () => {
    if (!isDisableCheckbox) {
      setCheckBoxState(!activeCheckBox);
    }
  };

  const changeAddressClicked = (headerName: string) => {
    if (
      (heading === translations.SHIPPING_ADDRESS && showAddNewAddress) ||
      (heading === translations.BILLING_ADDRESS && info?.email === undefined)
    ) {
      onPress(headerName, true);
    } else {
      onPress(headerName, false);
    }
  };

  return (
    <View style={styles.topContainer}>
      <View style={styles.squareContainer}>
        {showHeading && (
          <View style={styles.topHeader}>
            <Text style={styles.heading}>{heading}</Text>
            <TouchableOpacity onPress={() => changeAddressClicked(heading)}>
              <Text style={styles.changeAddressStyle}>
                {(heading === translations.SHIPPING_ADDRESS &&
                  showAddNewAddress) ||
                (heading === translations.BILLING_ADDRESS &&
                  info?.email === undefined)
                  ? translations.ADD_NEW_ADDRESS
                  : translations.CHANGE_OR_ADD_ADDRESS}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {showCheckBox && (
          <View style={styles.nameSection}>
            <TouchableOpacity onPress={() => handleCheckBox()}>
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
              {translations.SAME_AS_BILLING_ADDRESS}
            </Text>
          </View>
        )}

        {info?.email === undefined ? null : (
          <>
            <View style={styles.nameSection}>
              <Text style={styles.nameStyles} numberOfLines={1}>
                {info?.name}
              </Text>
              {info?.default && (
                <Text style={styles.defaultStyles}>
                  ({translations.DEFAULT})
                </Text>
              )}
            </View>
            <DetailsView
              image={<AppImages.SHOPING_BAG.Address />}
              body={info?.address}
              noOfLines={2}
            />
            <DetailsView
              image={<AppImages.SHOPING_BAG.AtTheRate />}
              body={info?.email}
              noOfLines={1}
            />
            <DetailsView
              image={<AppImages.SHOPING_BAG.MobileNo />}
              body={info?.phoneNo}
              noOfLines={1}
            />
          </>
        )}
      </View>
      {errorMsg?.length > 0 ? (
        <View style={styles.alertSection}>
          <AppImages.Common.Alert_ICON />
          <Text style={styles.error}> {errorMsg} </Text>
        </View>
      ) : (
        <Text style={styles.noError} />
      )}
    </View>
  );
};

export default CommonAddressLayout;

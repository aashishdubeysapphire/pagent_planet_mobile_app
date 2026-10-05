import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import DetailsView from '../../../../../shop/shoppingbag/components/address/components/detailsview';
import AppImages from '../../../../../../../assets/images/AppImages';
import {capitalizeFirstLowercaseRest} from '../../../../../../utils/helperFunction';
const Details = ({heading, name, address, email, phoneNo, orderNotes}) => {
  return (
    <View style={styles.continer}>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.name}>{name}</Text>
      {!!address && (
        <DetailsView
          image={<AppImages.SHOPING_BAG.Address />}
          body={capitalizeFirstLowercaseRest(address)}
          noOfLines={2}
        />
      )}
      {!!email && (
        <DetailsView
          image={<AppImages.SHOPING_BAG.AtTheRate />}
          body={email}
          noOfLines={1}
        />
      )}
      {!!phoneNo && (
        <DetailsView
          image={<AppImages.SHOPING_BAG.MobileNo />}
          body={phoneNo}
          noOfLines={1}
        />
      )}
      {!!orderNotes && (
        <>
          <Text style={[styles.name, styles.marginTop16]}>
            Wear Date/Order Notes
          </Text>

          <Text style={styles.orderNotesText}>{orderNotes}</Text>
        </>
      )}
    </View>
  );
};

export default Details;

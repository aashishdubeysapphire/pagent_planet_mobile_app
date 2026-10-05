import {Text, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import translations from '../../../../../../assets/translations';
import ProductVariation, {
  SCREEN_ENUM,
} from '../../../../sellitemservices/sell/preview/components/productvariations';
import {checkIsNull} from '../../../../../utils/validations';
export default function ProductDetails({non_variable_fields = []}) {
  const areNameAvailable = () => {
    let isAvailable = false;
    for (let index = 0; index < non_variable_fields.length; index++) {
      const item = non_variable_fields[index];
      if (checkIsNull(item?.values?.name) && item.label !== SCREEN_ENUM.BRAND) {
        isAvailable = true;
      }
    }
    return isAvailable;
  };
  return areNameAvailable() ? (
    <View style={styles.continer}>
      <Text style={styles.heading}>{translations.PRODUCT_DETAILS}</Text>

      {checkIsNull(non_variable_fields) && (
        <ProductVariation
          nonVariableFields={non_variable_fields}
          skipNull={true}
        />
      )}
    </View>
  ) : null;
}

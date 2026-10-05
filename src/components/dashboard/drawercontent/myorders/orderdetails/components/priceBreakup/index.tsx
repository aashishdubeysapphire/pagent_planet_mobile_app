import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import BottomModal from '../../../../../../common/bottommodal';
import {styles} from './styles';
import AppImages from '../../../../../../../assets/images/AppImages';
import translations from '../../../../../../../assets/translations';
import {checkIsNull} from '../../../../../../utils/validations';

const PriceBreakup = ({
  isModalVisible,
  setIsModalVisible,
  otherProducts,
  product,
  total_price,
  total_discount,
  grandTotal,
}: any) => {
  return (
    <BottomModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      customStyles={styles.modalStyle}>
      <View style={styles.rowView}>
        <Text style={styles.heading}>{translations.PRICING_DETAILS}</Text>
        <TouchableOpacity onPress={() => setIsModalVisible(false)}>
          <AppImages.ProfileImage.Tpp_cross_icon />
        </TouchableOpacity>
      </View>
      <View style={{...styles.rowView}}>
        <Text style={styles.productName} numberOfLines={1}>
          {product?.quantity}x {product?.name}
        </Text>
        <Text style={styles.price}>
          ${Number(product?.price.substring(1)).toFixed(2)}
        </Text>
      </View>

      {checkIsNull(otherProducts) &&
        otherProducts.map(item => {
          return (
            <View style={{...styles.rowView}}>
              <Text style={styles.productName} numberOfLines={1}>
                {item?.quantity}x {item?.product?.unique_style_number}
              </Text>
              <Text style={styles.price}>
                ${Number(item?.sub_total).toFixed(2)}
              </Text>
            </View>
          );
        })}
      <View style={styles.line} />
      <View style={styles.rowView}>
        <Text style={styles.productName} numberOfLines={1}>
          {translations.TOTAL_PRICE}
        </Text>
        <Text style={styles.price}>${total_price}</Text>
      </View>
      <View style={styles.rowView}>
        <Text style={styles.productName} numberOfLines={1}>
          {translations.DISCOUNT}
        </Text>
        <Text style={[styles.price, styles.greenColor]}>
          -${total_discount}
        </Text>
      </View>
      <View style={styles.rowView}>
        <Text style={styles.productName} numberOfLines={1}>
          {translations.SHIPPING_CHARGES}
        </Text>
        <Text style={styles.price}>{translations.FREE}</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.rowView}>
        <Text style={styles.grandTotal} numberOfLines={1}>
          {translations.GRAND_TOTAL}
        </Text>
        <Text style={[styles.grandTotal, styles.pinkColor]}>${grandTotal}</Text>
      </View>
    </BottomModal>
  );
};

export default PriceBreakup;

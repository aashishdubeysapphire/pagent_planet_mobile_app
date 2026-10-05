import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import translations from '../../../../../assets/translations';
import {color} from '../../../../../assets/colorConstant';
import {Plan} from '../../../../../services/models/planData';
import {currencyFormatter} from '../../../../utils/helperFunction';

interface Props {
  bgColor?: string;
  totalItems?: number;
  price?: string;
  shipping?: string;
  discount?: number;
  finalPrice?: string;
  pageantPlanDetail?: Plan;
}

const PriceComponent = ({
  bgColor,
  totalItems,
  price,
  shipping,
  discount,
  finalPrice,
  pageantPlanDetail,
}: Props) => {
  const priceSection = (label: string, amount: string) => {
    return (
      <View style={styles.priceArea}>
        <Text style={styles.priceLabel}>{label}</Text>
        <Text
          style={{
            ...styles.priceLabel,
            color:
              label === translations.DISCOUNT
                ? color.UPCOMING
                : color.INPUT_TEXT,
          }}>
          {label === translations.DISCOUNT ? '-' : null}
          {label === translations.SHIPPING
            ? amount
            : currencyFormatter(getPriceInNumer(amount)?.toFixed(2))}
        </Text>
      </View>
    );
  };

  const getPriceInNumer = (prices: any) => {
    if (prices !== undefined) {
      let newPrice = prices.toString()?.split('$');
      if (newPrice?.length > 1) {
        return Number(newPrice[1]);
      } else {
        return prices;
      }
    } else {
      return 0;
    }
  };

  return (
    <View style={{...styles.mainContainer, backgroundColor: bgColor}}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>
          {pageantPlanDetail !== undefined
            ? translations.ORDER_SUMMARY
            : translations.PRICE_DETAILS}
        </Text>
        {totalItems !== undefined && (
          <Text style={styles.headerLabel}>
            ({totalItems + ' ' + translations.ITEMS})
          </Text>
        )}
      </View>
      <View style={styles.seperator} />

      {priceSection(
        pageantPlanDetail !== undefined
          ? pageantPlanDetail.name
          : translations.SUBTOTAL,
        price
      )}
      {discount !== undefined && priceSection(translations.DISCOUNT, discount)}
      {priceSection(
        pageantPlanDetail !== undefined
          ? translations.EXTRA_LEADS_CREDITS
          : translations.SHIPPING,
        shipping
      )}

      <View style={styles.seperator} />

      <View style={styles.priceArea}>
        <Text style={{...styles.headerLabel, color: color.INPUT_TEXT}}>
          {pageantPlanDetail !== undefined
            ? translations.MONTHLY_TOTAL
            : translations.GRAND_TOTAL}
        </Text>
        <Text style={{...styles.headerLabel, color: color.P_PINK}}>
          {currencyFormatter(getPriceInNumer(finalPrice)?.toFixed(2))}
        </Text>
      </View>
    </View>
  );
};

export default PriceComponent;

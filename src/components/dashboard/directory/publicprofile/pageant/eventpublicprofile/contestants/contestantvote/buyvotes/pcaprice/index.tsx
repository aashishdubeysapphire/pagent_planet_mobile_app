import {View, Text} from 'react-native';
import React from 'react';
import translations from '../../../../../../../../../../assets/translations';
import {color} from '../../../../../../../../../../assets/colorConstant';
import {styles} from '../../../../../../../../shop/shoppingbag/pricecomponent/styles';
import {checkIsNull} from '../../../../../../../../../utils/validations';
import {PAYMENT_FOR} from '../../../../../../../../../utils/enum';
import {currencyFormatter} from '../../../../../../../../../utils/helperFunction';

interface Props {
  votesInfo: any;
  paymentType: number;
  bgColor: string;
}

const PCAPriceComponent = ({
  votesInfo,
  paymentType = PAYMENT_FOR.BUY_VOTE_FOR_CONTESTANT,
  bgColor,
}: Props) => {
  const priceSection = (label: string, price: number, half_price: number) => {
    return (
      <View style={styles.priceArea}>
        <Text style={styles.priceLabel}>{label}</Text>
        <View style={styles.halfPriceSection}>
          {checkIsNull(half_price) && half_price > 0 ? (
            <>
              <Text
                style={{
                  ...styles.priceLabel,
                  textDecorationLine: 'line-through',
                }}>
                {label === translations.TOTAL_VOTES ||
                label === translations.NO_OF_LEADS_CREDIT
                  ? ''
                  : votesInfo?.currencySign + ''}
                {price + ' '}
              </Text>
              <Text style={{...styles.priceLabel, color: color.INPUT_TEXT}}>
                {label === translations.TOTAL_VOTES ||
                label === translations.NO_OF_LEADS_CREDIT
                  ? ''
                  : votesInfo?.currencySign + ''}
                {half_price}
              </Text>
            </>
          ) : (
            <Text style={{...styles.priceLabel, color: color.INPUT_TEXT}}>
              {label === translations.TOTAL_VOTES ||
              label === translations.NO_OF_LEADS_CREDIT
                ? ''
                : votesInfo?.currencySign + ''}
              {price}
            </Text>
          )}
        </View>
      </View>
    );
  };

  const getPaymentTitle = () => {
    if (paymentType === PAYMENT_FOR.BUY_CONTESTANT_CLAIM_LEAD) {
      return translations.PRICING_DETAILS;
    } else {
      return translations.VOTING_FOR + votesInfo?.contestantName;
    }
  };

  return (
    <View style={{...styles.mainContainer, backgroundColor: bgColor}}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>{getPaymentTitle()}</Text>
      </View>
      <View style={styles.seperator} />

      {priceSection(
        paymentType === PAYMENT_FOR.BUY_CONTESTANT_CLAIM_LEAD
          ? translations.NO_OF_LEADS_CREDIT
          : translations.TOTAL_VOTES,
        votesInfo?.totalVotes,
        null
      )}
      {priceSection(
        paymentType === PAYMENT_FOR.BUY_CONTESTANT_CLAIM_LEAD
          ? translations.PER_LEAD_AMOUNT
          : translations.VOTE_PER_PRICE,
        votesInfo?.perVotePrice?.toFixed(2),
        votesInfo?.halfPrice?.toFixed(2),
      )}
      <View style={styles.seperator} />

      <View style={styles.priceArea}>
        <Text style={{...styles.headerLabel, color: color.INPUT_TEXT}}>
          {translations.TOTAL_AMOUNT}
        </Text>
        <Text style={{...styles.headerLabel, color: color.P_PINK}}>
          {currencyFormatter(votesInfo?.totalCost?.toFixed(2))}
        </Text>
      </View>
    </View>
  );
};

export default PCAPriceComponent;

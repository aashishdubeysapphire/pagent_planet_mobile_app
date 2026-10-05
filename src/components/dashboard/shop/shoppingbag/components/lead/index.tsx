import {View, Text, Image, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from '../../../../../common/button';
import translations from '../../../../../../assets/translations';
import {styles} from './styles';
import PriceComponent from '../../pricecomponent';
import FloatingInput from '../../../../../common/floatinginput';
import {color} from '../../../../../../assets/colorConstant';
import {SHOPPING_BAG} from '../../localEnum';
import {Plan} from '../../../../../../services/models/planData';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../root/screenname';
import {ADDRESS_TYPE, FORM_TYPE} from '../../../../../utils/enum';
import AppImages from '../../../../../../assets/images/AppImages';
import {toast, toastType} from '../../../../../common/commonalert';
import {useKeyboard} from '@react-native-community/hooks';

interface Props {
  setStep: any;
  setPageantPlanDetailData: any;
  have_billing_address?: any;
  pageantPlanDetail: Plan | undefined;
  setIsBillingAddress: Function;
}
const Lead = ({
  setStep,
  pageantPlanDetail,
  have_billing_address,
  setPageantPlanDetailData,
  setIsBillingAddress,
}: Props) => {
  const [lead, setLead] = useState();
  const {keyboardShown} = useKeyboard();
  const navigation = useNavigation();

  const goToAddressForm = () => {
    navigation.navigate(SCREEN.ADD_EDIT_ADDRESS, {
      formType: FORM_TYPE.ADD,
      addressType: ADDRESS_TYPE.BILLING,
      firstTimeForm: true,
      setStep: setStep,
      setIsBillingAddress: setIsBillingAddress,
    });
  };
  const getFinnalCost = () => {
    return pageantPlanDetail?.buying_lead !== undefined
      ? pageantPlanDetail?.prepaid_lead_price !== undefined &&
          pageantPlanDetail?.prepaid_lead_price *
            Number(pageantPlanDetail?.buying_lead)
      : 0;
  };

  useEffect(() => {
    if (lead !== undefined && setPageantPlanDetailData !== undefined) {
      setPageantPlanDetailData({
        ...pageantPlanDetail,
        buying_lead: lead,
      });
    }
  }, [lead]);

  useEffect(() => {
    if (
      pageantPlanDetail !== undefined &&
      pageantPlanDetail?.buying_lead !== undefined
    ) {
      setLead(pageantPlanDetail?.buying_lead);
    }
  }, []);

  return (
    <View style={styles.container1}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        <View style={styles.container}>
          <Image
            source={AppImages.RESULTS.tpp_lead_illustration_icon}
            style={styles.mainimage}
          />
          <Text style={styles.leadTitleText}>
            {
              translations.INCLUDE_AITIONAL_LEADS_WITH_YOUR_PACKAGAE_A_COST_JUST_4_PER_LEAD
            }
          </Text>
          <View style={styles.divider} />
          <View style={styles.rowLeadView}>
            <Text style={styles.leadHeaderTitle}>
              {translations.PER_LEAD_PRICE}
            </Text>
            {pageantPlanDetail?.cost_per_lead !== undefined &&
              pageantPlanDetail?.prepaid_lead_price !== undefined &&
              pageantPlanDetail?.prepaid_lead_price <
                pageantPlanDetail?.cost_per_lead && (
                <Text style={styles.leadHeaderCount}>
                  {'$' + pageantPlanDetail?.prepaid_lead_price}
                </Text>
              )}
            <Text
              style={
                pageantPlanDetail?.cost_per_lead !== undefined &&
                pageantPlanDetail?.prepaid_lead_price !== undefined &&
                pageantPlanDetail?.prepaid_lead_price <
                  pageantPlanDetail?.cost_per_lead
                  ? styles.realPrice
                  : styles.leadHeaderCount
              }>
              {'$' + pageantPlanDetail?.cost_per_lead}
            </Text>
          </View>
          <FloatingInput
            floatingText={translations.QUANTITY}
            value={lead}
            maxLength={4}
            keyboardType={'number-pad'}
            autoCapitalize={'none'}
            returnKeyType={'done'}
            setText={value => setLead(value.replace(/[^0-9 ]/g, ''))}
          />
          <View style={styles.rowView}>
            <Text style={styles.noteHeader}>{'Note*'}</Text>
            <Text style={styles.noteText}>
              {
                translations.THESE_LEADS_WILL_BECOME_A_PART_OF_YOUR_MONTHLY_PACKAGE_WITH_JUST_PAYING_A_MINIMAL_AMOUNT_UO_YOUR_PACKAGE
              }
            </Text>
          </View>
        </View>
        <View style={styles.priceView}>
          <PriceComponent
            pageantPlanDetail={pageantPlanDetail}
            bgColor={color.S_GRAY_1}
            price={'$' + pageantPlanDetail?.price}
            shipping={
              pageantPlanDetail?.prepaid_lead_price !== undefined
                ? '$' + getFinnalCost()
                : translations.FREE
            }
            finalPrice={
              pageantPlanDetail?.price !== undefined &&
              pageantPlanDetail?.cost_per_lead !== undefined &&
              lead !== undefined &&
              lead.length > 0
                ? '$' + (pageantPlanDetail?.price + getFinnalCost())
                : pageantPlanDetail?.price !== undefined
                ? '$' + pageantPlanDetail?.price
                : '$0'
            }
          />
        </View>
      </ScrollView>
      {!keyboardShown && (
        <View style={styles.leadTitleText}>
          <CustomButton
            label={translations.CONTINUE}
            inactive={true}
            onPress={() => {
              if (
                have_billing_address === undefined ||
                have_billing_address === 0
              ) {
                goToAddressForm();
              } else if (
                (pageantPlanDetail?.buying_lead !== undefined &&
                  pageantPlanDetail?.buying_lead.length > 0 &&
                  Number(pageantPlanDetail?.buying_lead) < 1) ||
                (lead !== undefined && lead?.length > 0 && Number(lead) < 1)
              ) {
                toast(
                  translations.PLEASE_ENTER_VALID_LEADS_QUANITY,
                  toastType.ERROR_TOAST,
                );
              } else {
                setStep(SHOPPING_BAG.ADDRESS);
              }
            }}
          />
        </View>
      )}
    </View>
  );
};

export default Lead;

import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CommonStyles} from '../../../../../../assets/commonStyles';
import {color} from '../../../../../../assets/colorConstant';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../utils/responsiveSize';
import FastImageView from '../../../../../common/fastimageview';
import {
  currencyFormatter,
  readAbleJSON,
} from '../../../../../utils/helperFunction';
import {PAYMENT_FOR} from '../../../../../utils/enum';
import translations from '../../../../../../assets/translations';
import {image} from '../../../../../../assets/images/imagePath';
import AppImages from '../../../../../../assets/images/AppImages';

const Bagitemview = ({bagItems, paymentType, pageantPlanDetail, votesInfo}) => {
  const [displayList, setDisplayList] = useState([]);
  useEffect(() => {
    var requiredFormatList = [];
    if (paymentType == PAYMENT_FOR.BUY_PAGEANT_PLAN) {
      requiredFormatList = [
        {
          name: pageantPlanDetail?.name,
          qty: 1,
          image: pageantPlanDetail?.payment_thumbnail,
          totalPrice: pageantPlanDetail?.price,
        },
        {
          name: translations.EXTRA_LEADS_CREDITS,
          qty: pageantPlanDetail?.buying_lead
            ? pageantPlanDetail?.buying_lead
            : '0',
          localImage: true,
          totalPrice: pageantPlanDetail?.prepaid_lead_price,
        },
      ];
    } else if (paymentType == PAYMENT_FOR.BUY_BAG_PRODUCT) {
      let listData = bagItems?.cartData?.quote_item?.filter(
        i => i?.marked_for_checkout == 1,
      );

      listData?.map(i => {
        requiredFormatList.push({
          name: i?.product?.unique_style_number,
          qty: i?.quantity,
          image: i?.product?.product_img_url,
          totalPrice: i?.product?.selling_price?.toFixed(2) * i?.quantity,
        });
      });
    } else if (paymentType == PAYMENT_FOR.BUY_VOTE_FOR_CONTESTANT) {
      requiredFormatList = [
        {
          name: votesInfo?.contestantName,
          numberOfVotes: !!votesInfo?.totalVotes? votesInfo?.totalVotes:"0",
          image: votesInfo?.contestantDp,
          totalPrice: votesInfo?.totalCost,
        },
      ];
    }

    setDisplayList(requiredFormatList);
  }, []);

  const getPriceInDecimal = (prices: any) => {
    if (!!prices) {
      let newPrice = prices.split('$');
      return Number(newPrice?.[1]);
    }
  };
  return (
    <View>
      {bagItems?.finalprice &&
        (paymentType == PAYMENT_FOR.BUY_BAG_PRODUCT ||
          paymentType == PAYMENT_FOR.BUY_PAGEANT_PLAN) && (
          <View style={styles.headerView}>
            <Text style={styles.headerTotalItem}>
              Total Items: {bagItems?.cartData?.marked_for_checkout_item_count}{' '}
            </Text>
            <Text style={styles.headerTotalAmount}>
              (
              {currencyFormatter(
                getPriceInDecimal(bagItems?.finalprice)?.toFixed(2),
              )}
              )
            </Text>
          </View>
        )}

      <View style={styles.listView}>
        <FlatList
          data={displayList}
          renderItem={({item}) => {
            return item?.qty== 0 ? null: (
              <View style={styles.listItem}>
                <View style={styles.itemImg}>
                  {item?.localImage ? (
                    <Image
                      source={AppImages.SHOP.tpp_buy_leads}
                      style={styles.itemImg}
                    />
                  ) : (
                    <FastImageView
                      width={moderateScale(40)}
                      height={moderateScale(40)}
                      borderRadius={moderateScaleVertical(5)}
                      imageUrl={item?.image}
                    />
                  )}
                </View>
                <View>
                  <Text
                    style={[styles.itemName, {width: moderateScale(280)}]}
                    numberOfLines={1}>
                    {item?.name}
                  </Text>
                  <View
                    style={[
                      styles.rowView,
                      {
                        marginTop: moderateScaleVertical(4),
                      },
                    ]}>
                    <Text
                      style={[
                        styles.itemName,
                        {
                          marginRight: moderateScale(8),
                          marginTop: 'auto',
                          marginBottom: 'auto',
                        },
                      ]}>
                      {item?.numberOfVotes ? 'Number of Votes' : 'Qty'} :{' '}
                      {item?.numberOfVotes ? item?.numberOfVotes : item?.qty}
                    </Text>
                    <Text style={styles.itemPrice}>
                      {currencyFormatter(item?.totalPrice)}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
          ItemSeparatorComponent={() => {
            return <View style={styles.seperator} />;
          }}
        />
      </View>
    </View>
  );
};

export default Bagitemview;

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: color.WHITE,
    padding: moderateScaleVertical(8),
    paddingHorizontal: moderateScale(16),
    flexDirection: 'row',
  },
  headerTotalItem: {
    ...CommonStyles.latoBoldPink14,
    color: color.S_GRAY_4,
    marginRight: 'auto',
  },
  headerTotalAmount: {
    ...CommonStyles.robotoMedium14,
    fontSize: textScale(12),
    color: color.P_PINK,
  },
  listView: {
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScaleVertical(12),
  },
  itemImg: {
    marginRight: moderateScale(8),
    width: moderateScale(40),
    aspectRatio: 1,
    overflow: 'hidden',
  },
  listItem: {
    padding: moderateScale(8),
    backgroundColor: color.WHITE,
    borderRadius: 10,
    flexDirection: 'row',
  },
  seperator: {
    height: moderateScaleVertical(12),
  },
  itemName: {
    ...CommonStyles.tpp_s2,
    color: color.BLACK,
    lineHeight: 16,
  },
  rowView: {
    flexDirection: 'row',
  },
  itemPrice: {
    ...CommonStyles.tpp_h5,
    color: color.P_PINK,
    fontSize: textScale(14),
    // bottom: 2,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

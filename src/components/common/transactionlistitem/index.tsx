import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {color} from '../../../assets/colorConstant';
import AppImages from '../../../assets/images/AppImages';
import translations from '../../../assets/translations';
import {TIME_FORMAT} from '../../utils/datetimemanger';
import {moderateScale} from '../../utils/responsiveSize';

import {styles} from './styles';

interface Props {
  item: any;
  selectedArray: any;
  setSelectedArray: any;
}
const TransactionListItem = ({
  item,
  selectedArray,
  setSelectedArray,
}: Props) => {
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    if (selectedArray.length === 0) {
      setSelected(false);
    }
  }, [selectedArray]);

  const onBulletClick = (itm: any) => {
    if (selected) {
      setSelected(false);
    } else if (!selected && itm?.amount_to_pay > 1) {
      setSelected(true);
    }

    if (selectedArray?.length > 0 && selectedArray.includes(itm.id)) {
      const filterArray = selectedArray.filter(i => {
        return i !== itm.id;
      });

      setSelectedArray(filterArray);
    } else if (itm?.amount_to_pay > 1) {
      setSelectedArray([itm?.id, ...selectedArray]);
    }
  };

  const getDate = (date: string) => {
    if (date !== null) {
      let splitDate = date.split(' ');
      return moment(splitDate, TIME_FORMAT.YYYYMMDD).format(TIME_FORMAT.DDMMMYYYY);
    }
  };
  return (
    <View>
      <View
        style={{
          ...styles.closedContainer,
          flexDirection:
            item?.status === translations.PENDING ? 'row' : 'column',
          opacity: item?.amount_to_pay < 1 ? 0.6 : 1,
        }}>
        {item?.status === translations.PENDING ? (
          <View style={styles.bulletView}>
            <TouchableOpacity
              style={selected ? styles.bulletSelected : styles.bulletUnselected}
              onPress={() => onBulletClick(item)}>
              {selected && <AppImages.Common.CheckBox />}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.headingRow}>
            <View style={styles.topRow1}>
              {item?.status === translations.PAID ? (
                <AppImages.Common.paidIcon />
              ) : (
                <AppImages.MY_ORDERS.InProcessIcon />
              )}
              <View style={styles.column}>
                <Text
                  style={{
                    ...styles.statusText,
                    color:
                      item?.status === translations.PAID
                        ? color.UPCOMING
                        : color.RECENT,
                  }}>
                  {item?.status === translations.PAID
                    ? translations.PAID
                    : translations.TRANSFER_INITIATED}
                </Text>
                <Text style={styles.date1} numberOfLines={1}>
                  {getDate(item?.order_item_completed_date)}
                </Text>
              </View>
            </View>
            {item?.order_id && (
              <Text style={styles.productLabel1} numberOfLines={1}>
                {translations.ORDER_ID}
                <Text style={styles.productLabel2}>{item?.order_id}</Text>
              </Text>
            )}
          </View>
        )}
        <View style={{flex: 1}}>
          <View
            style={{
              ...styles.topSection,
              paddingHorizontal:
                item?.status === translations.PENDING
                  ? moderateScale(12)
                  : moderateScale(16),
            }}>
            {item?.order_id && item?.status === translations.PENDING && (
              <Text style={styles.productLabel} numberOfLines={1}>
                {translations.ORDER_ID}
                <Text style={styles.productLabel3}>{item?.order_id}</Text>
              </Text>
            )}
            {item?.order_item_completed_date &&
              item?.status === translations.PENDING && (
                <Text style={styles.date} numberOfLines={1}>
                  {getDate(item?.order_item_completed_date)}
                </Text>
              )}
            <Text style={styles.productName} numberOfLines={2}>
              {item?.product_name}
            </Text>
            <View style={styles.categoryRow}>
              <AppImages.SELL_ITEMS.CategoryIcon />
              <Text style={styles.productCategory} numberOfLines={1}>
                {translations.CATEGORY}:{' '}
                <Text style={styles.productCategory1}>{item?.sale_type}</Text>
              </Text>
              <Text style={styles.productPrice} numberOfLines={1}>
                {`$${item?.amount_to_pay}`}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TransactionListItem;

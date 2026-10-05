import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import AppImages from '../../../assets/images/AppImages';
import translations from '../../../assets/translations';
import {SCREEN} from '../../../root/screenname';
import {getDateFormat, TIME_FORMAT} from '../../utils/datetimemanger';
import {moderateScale} from '../../utils/responsiveSize';
import {toast, toastType} from '../commonalert';

import {styles} from './styles';

interface Props {
  item: any;
  selectedArray: any;
  setSelectedArray: any;
  pageantId: number;
  availableCredits: number;
}
const LeadListItem = ({
  item,
  selectedArray,
  setSelectedArray,
  pageantId,
  availableCredits,
}: Props) => {
  const [selected, setSelected] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    if (selectedArray.length === 0) {
      setSelected(false);
    }
  }, [selectedArray]);

  const onBulletClick = (itm: any) => {
    if (selected) {
      setSelected(false);
    } else if (
      !selected &&
      (selectedArray?.length < availableCredits || availableCredits === 0)
    ) {
      setSelected(true);
    }

    if (selectedArray?.length > 0 && selectedArray.includes(itm.id)) {
      const filterArray = selectedArray.filter(i => {
        return i !== itm.id;
      });

      setSelectedArray(filterArray);
    } else if (
      selectedArray?.length < availableCredits ||
      availableCredits === 0
    ) {
      setSelectedArray([itm?.id, ...selectedArray]);
    } else {
      toast(
        '{translations. CLAIMED_LEADS_NUMBER}',
        toastType.ERROR_TOAST,
      );
    }
  };

  return (
    <View>
      <View
        style={{
          ...styles.closedContainer,
          flexDirection: 'row',
        }}>
        <View style={styles.bulletView}>
          <TouchableOpacity
            style={selected ? styles.bulletSelected : styles.bulletUnselected}
            onPress={() => onBulletClick(item)}>
            {selected && <AppImages.Common.CheckBox />}
          </TouchableOpacity>
        </View>

        <View style={{flex: 1}}>
          <View
            style={{
              ...styles.topSection,
              paddingHorizontal: moderateScale(12),
            }}>
            <View style={styles.categoryRow}>
              <View style={styles.categoryRow2}>
                <AppImages.Dashboard.DateIconMedium_ICON />
                <Text style={styles.productCategory} numberOfLines={1}>
                  {translations.DATE_OF_BIRTH}:{' '}
                  <Text style={styles.productCategory1}>
                    {item?.dob !== undefined && item?.dob !== null
                      ? getDateFormat(item?.dob, TIME_FORMAT.MMslashDDslashYYYY)
                      : 'N/A'}
                  </Text>
                </Text>
              </View>
              <View>
                <Text
                  style={styles.viewDetails}
                  onPress={() => {
                    navigation.navigate(SCREEN.CONTESTANT_DETAILS, {
                      id: item.id,
                      pageantId: pageantId,
                    });
                  }}>
                  {translations.MORE_DETAILS}
                </Text>
              </View>
            </View>
            <View style={styles.categoryRow1}>
              <AppImages.Common.location />
              <Text style={styles.productCategory} numberOfLines={1}>
                {translations.LOCATION}:{' '}
                <Text style={styles.productCategory1}>
                  {item?.state?.name === undefined
                    ? 'N/A'
                    : item?.state?.name + ', ' + item?.country?.name}
                </Text>
              </Text>
            </View>

            <View style={styles.categoryRow}>
              <View style={styles.categoryRow2}>
                <AppImages.Common.ClaimedBy />
                <Text style={styles.productCategory} numberOfLines={1}>
                  {translations.CLAIMED_BY}{' '}
                  <Text style={styles.productCategory1}>
                    {item?.claimed_by_total}
                  </Text>
                </Text>
              </View>
              <View>
                {item?.created_on && (
                  <Text style={styles.date}>
                    {translations.CREATED_ON + item?.created_on}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LeadListItem;

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImageView from '../../../../../../common/fastimageview';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../../../utils/responsiveSize';
import {CommonStyles} from '../../../../../../../assets/commonStyles';
import {color} from '../../../../../../../assets/colorConstant';
import moment from 'moment';
import {checkIsNull} from '../../../../../../utils/validations';
import translations from '../../../../../../../assets/translations';
import {TIME_FORMAT} from '../../../../../../utils/datetimemanger';
import {isIosDevice} from '../../../../../../utils/helperFunction';

const MyJourneyCards = ({item, onPressCard}) => {
  const getDate = val => {
    return moment(val, TIME_FORMAT.YYYYMMDD).format('DD MMM');
  };
  return (
    <TouchableOpacity
      style={styles.upperView}
      onPress={() =>
        onPressCard(
          checkIsNull(item.item.pageant.end_date),
          item?.item?.id,
          item?.item?.pageant_id,
          item?.item?.pageant?.event_directors_todo,
        )
      }>
      {item.item.pageant.start_date ? (
        <Text style={[styles.ovelText, styles.dueView]}>
          {translations.DUE} {getDate(item.item.pageant.start_date)}
        </Text>
      ) : (
        <Text style={[styles.ovelText, styles.noDate]}>
          {translations.NO_START_END_DATE}
        </Text>
      )}

      <View style={styles.mainView}>
        <View>
          <FastImageView
            width={moderateScale(60)}
            height={moderateScale(60)}
            borderRadius={100}
            imageUrl={item.item.pageant.main_image}
            isCircle={true}
          />
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {item.item.pageant.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MyJourneyCards;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: moderateScaleVertical(16),
    paddingLeft: moderateScale(16),
  },
  upperView: {
    borderRadius: 20,
    borderColor: color.S_GRAY_2,
    borderWidth: 1,
    marginBottom: moderateScaleVertical(16),
  },
  title: {
    ...CommonStyles.tpp_h5,
    fontSize: textScale(14),
    marginLeft: moderateScale(12),
    paddingRight: moderateScale(16),
    width: '75%',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  ovelText: {
    ...CommonStyles.tpp_s1,
    marginLeft: 'auto',
    borderRadius: isIosDevice() ? moderateScale(12) : moderateScale(20),
    borderWidth: 1,
    marginTop: moderateScaleVertical(12),
    marginRight: moderateScaleVertical(12),
    paddingHorizontal: moderateScale(12),
    textAlign: 'center',
    paddingTop: moderateScale(4),
    paddingBottom: moderateScale(4),
  },
  dueView: {
    borderColor: color.UPCOMING,
    color: color.UPCOMING,
  },
  noDate: {
    borderColor: color.S_GRAY_3,
    color: color.S_GRAY_3,
  },
});

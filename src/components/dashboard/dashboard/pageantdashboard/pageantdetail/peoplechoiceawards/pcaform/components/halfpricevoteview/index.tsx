import {View, Text} from 'react-native';
import React from 'react';
import translations from '../../../../../../../../../assets/translations';
import styles from '../startenddateView/styles';
import FloatingDateTimeInput from '../../../../../../../../common/floatingdatetimeinput';
import {moderateScaleVertical} from '../../../../../../../../utils/responsiveSize';
import { TIME_FORMAT } from '../../../../../../../../utils/datetimemanger';

const HalfPriceVoteView = ({halfPrice, pcaData, onChangePcaData, pcaError}) => {
  return (
    <View>
      <Text style={{...styles.heading, marginBottom: moderateScaleVertical(8)}}>
        {translations.HALF_PRICE_VOTES} {translations.START_END_DATE}
      </Text>
      <View style={styles.margin}>
        <FloatingDateTimeInput
          floatingText={translations.START_DATE_TIME_EST}
          onChange={value => onChangePcaData({halfPriceStartDate: value + ''})}
          value={
            pcaData.halfPriceStartDate
              // ? moment(
              //     pcaData.halfPriceStartDate,
              //     TIME_FORMAT.DDslashMMslashYYYY_hhmmA,
              //   ).format(TIME_FORMAT.MMslashDDslashYYYY_hhmmA)
              // : ''
          }
          frontEndOnlyFormat={TIME_FORMAT.MMslashDDslashYYYY_hhmmA}

          isMandatory
          errorMsg={pcaError?.halfPriceStartDate}
        />
        <FloatingDateTimeInput
          floatingText={translations.END_DATE_TIME_EST}
          onChange={value => onChangePcaData({halfPriceEndDate: value + ''})}
          value={
            pcaData.halfPriceEndDate
              // ? moment(
              //     pcaData.halfPriceEndDate,
              //     TIME_FORMAT.DDslashMMslashYYYY_hhmmA,
              //   ).format(TIME_FORMAT.MMslashDDslashYYYY_hhmmA)
              // : ''
          }
          frontEndOnlyFormat={TIME_FORMAT.MMslashDDslashYYYY_hhmmA}

          errorMsg={pcaError?.halfPriceEndDate}
          //   isMandatory
        />
      </View>
    </View>
  );
};

export default HalfPriceVoteView;

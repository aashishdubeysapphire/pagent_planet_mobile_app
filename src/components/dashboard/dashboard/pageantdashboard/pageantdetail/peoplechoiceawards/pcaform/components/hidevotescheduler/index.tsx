import {View, Text} from 'react-native';
import React from 'react';
import translations from '../../../../../../../../../assets/translations';
import styles from '../startenddateView/styles';
import FloatingDateTimeInput from '../../../../../../../../common/floatingdatetimeinput';
import {moderateScaleVertical} from '../../../../../../../../utils/responsiveSize';
import { TIME_FORMAT } from '../../../../../../../../utils/datetimemanger';

const HideVotesScheduler = ({pcaData, onChangePcaData, pcaError}) => {
  return (
    <View>
      <Text
        style={{
          ...styles.heading,
          marginBottom: moderateScaleVertical(8),
          marginTop: moderateScaleVertical(8),
        }}
      >
        {translations.HIDE_VOTES_SCHEDULER}
      </Text>
      <View style={styles.margin}>
        <FloatingDateTimeInput
          floatingText={translations.START_DATE_TIME_EST.slice(6)}
          onChange={value =>
            onChangePcaData({hideVoteSchedulerDate: value + ''})
          }
          frontEndOnlyFormat={TIME_FORMAT.MMslashDDslashYYYY_hhmmA}

          value={pcaData.hideVoteSchedulerDate}
          errorMsg={pcaError?.hideVoteSchedulerDate}
        />
      </View>
    </View>
  );
};

export default HideVotesScheduler;

import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './styles';
import FloatingDateTimeInput from '../../../../../../../../common/floatingdatetimeinput';
import translations from '../../../../../../../../../assets/translations';
import {
  TIME_FORMAT,
  dateDifference,
  verifyIfDateLiesBtw,
} from '../../../../../../../../utils/datetimemanger';
import {useIsFocused} from '@react-navigation/core';

const AgeDivisionView = ({
  item,
  index,
  setAgeDivisionData,
  ageDivisionData,
  hideVotes,
  pcaData,
  setCount,
  count,
}) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    onChangeDataPCAEndDate(
      ageDivisionData[index]?.pca_end_date_time_est,
      index
    );
    onChangeDataEndDate(
      ageDivisionData[index]?.hide_votes_scheduler_date_time_est,
      index
    );
  }, [isFocused]);

  const onChangeDataPCAEndDate = (val: any, position: string | number) => {
    const newArr = ageDivisionData;
    newArr[position].pca_end_date_time_est = val;
    newArr[position].isValidPCAEndDate = validatePCAEndDate();
    setCount(count + 1);
    setAgeDivisionData(newArr);
  };
  const onChangeDataEndDate = (val: any, position: string | number) => {
    const newArr = ageDivisionData;
    newArr[position].hide_votes_scheduler_date_time_est = val;
    newArr[position].isValidHideVoteSchedulerDate =
      validateHideVoteSchedulerDate();
    setCount(count + 1);
    setAgeDivisionData(newArr);
  };
  const validateHideVoteSchedulerDate = () => {
    if (
      ageDivisionData[index]?.hide_votes_scheduler_date_time_est !== '' &&
      hideVotes
    ) {
      if (
        verifyIfDateLiesBtw(
          pcaData.startDate,
          pcaData.endDate,
          ageDivisionData[index]?.hide_votes_scheduler_date_time_est
        )
      ) {
        return translations.SCHEDULER_DATE_SHOULD_BE_BETWEEN_PCA_START_END_DATE;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  const validatePCAEndDate = () => {
    if (ageDivisionData[index]?.pca_end_date_time_est !== '') {
      if (
        verifyIfDateLiesBtw(
          pcaData.startDate,
          pcaData.endDate,
          ageDivisionData[index]?.pca_end_date_time_est
        )
      ) {
        return translations.CONTEST_DATE_VALIDATION_PCA;
      } else if (
        dateDifference(
          pcaData.startDate,
          ageDivisionData[index]?.pca_end_date_time_est
        ) <= 3
      ) {
        return translations.CONTEST_LENGTH;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };
  return (
    <View>
      <Text style={styles.heading}>{item.age_division.name}</Text>
      <FloatingDateTimeInput
        floatingText={translations.PCA_CAPITAL + translations.END_DATE_TIME_EST}
        onChange={value => onChangeDataPCAEndDate(value, index)}
        value={ageDivisionData[index]?.pca_end_date_time_est}
        errorMsg={validatePCAEndDate()}
        frontEndOnlyFormat={TIME_FORMAT.MMslashDDslashYYYY_hhmmA}

      />
      {hideVotes && (
        <FloatingDateTimeInput
          floatingText={translations.HIDE_VOTE_SCHELULER_DATE_TIME_EST}
          onChange={value => onChangeDataEndDate(value, index)}
          value={ageDivisionData[index]?.hide_votes_scheduler_date_time_est}
          errorMsg={validateHideVoteSchedulerDate()}
          frontEndOnlyFormat={TIME_FORMAT.MMslashDDslashYYYY_hhmmA}

        />
      )}

      <View style={styles.inputbottomHeight} />
    </View>
  );
};

export default AgeDivisionView;

import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import translations from '../../../../../../../../../assets/translations';
import DynamicradioButton from '../../../../../../../../common/dynamicradiobutton/dynamicradioButton';
import {CONTEST_SORT_BY, SHOW_PREDICTIVE_MATRIX} from '../../localArray';

const HideVotesView = ({pcaData, onChangePcaData}) => {
  return (
    <View>
      <Text style={styles.heading}>
        {translations.HIDE_VOTES_ON_EVERY_PROFILE}
      </Text>
      <Text style={styles.subHeading}>
        {translations.CONTEST_SORT_BY}
        <Text style={styles.redStar}>*</Text>
      </Text>
      <DynamicradioButton
        data={CONTEST_SORT_BY}
        selectedRadio={pcaData.contestentSortBy}
        setSelectedRadio={val => {
          onChangePcaData({contestentSortBy: val});
        }}
        customStyles={styles.marginRight32}
        numColumns={3}
      />
      <Text style={styles.subHeading}>
        {translations.SHOW_PREDICTIVE_MATRIX}
        <Text style={styles.redStar}>*</Text>
      </Text>
      <DynamicradioButton
        data={SHOW_PREDICTIVE_MATRIX}
        selectedRadio={pcaData.showPredictiveMatrix}
        setSelectedRadio={val => {
          onChangePcaData({showPredictiveMatrix: val});
        }}
        customStyles={styles.marginRight32}
        numColumns={3}
      />
      <View style={styles.extraHeight} />
    </View>
  );
};

export default HideVotesView;

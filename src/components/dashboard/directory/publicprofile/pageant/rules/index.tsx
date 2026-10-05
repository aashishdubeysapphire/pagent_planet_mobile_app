import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {styles} from './styles';
import translations from '../../../../../../assets/translations';
import Header from '../../../../../common/header';
import PageantRules from '../../../../dashboard/pageantdashboard/pageantdetail/pageantrules';

const PageantPublicProfileRules = ({route}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header lable={translations.RULES} isUnderLineRequired />
      <ScrollView style={styles.space} nestedScrollEnabled={true}>
        <PageantRules rules={route?.params?.pageant} isActive = {true} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PageantPublicProfileRules;

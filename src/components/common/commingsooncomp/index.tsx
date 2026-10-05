import {StyleSheet, View} from 'react-native';
import React from 'react';
import AppImages from '../../../assets/images/AppImages';

const CommingSoonComp = () => {
  return (
    <View style={styles.container}>
      <AppImages.Common.ComingSoon_ICON
        marginTop={'auto'}
        marginBottom={'auto'}
        marginLeft={'auto'}
        marginRight={'auto'}
      />
    </View>
  );
};

export default CommingSoonComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

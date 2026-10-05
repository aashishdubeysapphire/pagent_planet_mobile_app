import React from 'react';
import {View, Text, ScrollView, Linking, Platform} from 'react-native';
import Logo from '../common/logo';
import useStyle from './style';
import CustomButton from '../common/button';
import {APPLE_STORELINK, GOOGLE_STORE_LINK} from '../../services/staticWebUrl';

const ForceUpdateScreen = () => {
  const styles = useStyle();

  const onUpdatePress = async () => {
    console.log('called update');
    let storeUrl = '';
    let webUrl = '';

    if (Platform.OS === 'ios') {
      // Use itms-apps:// scheme to jump straight to the App Store app
      storeUrl = 'itms-apps://apps.apple.com/us/app/pageant-planet/id6446762006';
      webUrl = APPLE_STORELINK;
    } else {
      const packageName = 'com.pageantplanet.app';
      storeUrl = `market://details?id=${packageName}`;
      webUrl = GOOGLE_STORE_LINK;
    }

    try {
      const supported = await Linking.canOpenURL(storeUrl);

      if (supported) {
        await Linking.openURL(storeUrl);
      } else {
        await Linking.openURL(webUrl);
      }
    } catch (error) {
      console.log('Error opening store:', error);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps={'handled'}
      contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
      <View style={styles.container}>
        <Logo width={185} height={185} />

        <View style={styles.divider} />

        <Text style={styles.headerText}>Update Required</Text>

        <Text style={styles.message}>
          A new version of the app is available. Please update the app to
          continue using all features.
        </Text>

        <CustomButton inactive={true} label={'Update Now'} onPress={() => onUpdatePress()} />
      </View>
    </ScrollView>
  );
};

export default ForceUpdateScreen;

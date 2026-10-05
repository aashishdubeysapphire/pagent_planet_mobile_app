import React, {useEffect} from 'react';
import {SafeAreaView, BackHandler, View} from 'react-native';
import {WebView} from 'react-native-webview';
import Header from '../../../../common/header';
import {TERMS_N_SERVICIES} from '../../../../../services/staticPageEndpoints';
import {useNavigation} from '@react-navigation/core';
import {styles} from './styles';
import Config from 'react-native-config';
const WebPage = ({route}) => {
  const INJECTEDJAVASCRIPT = "document.body.style.userSelect = 'none'";
  const navigation = useNavigation();
  //We nee to handle system back here becase we using system back in previous screen.
  useEffect(() => {
    const hardBack = BackHandler.addEventListener(
      'hardwareBackPress',
      onPressBack,
    );
    return () => hardBack.remove();
  }, [onPressBack]);

  const onPressBack = () => {
    navigation.goBack();
    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header isUnderLineRequired lable={route.params.title} />
        <View style={styles.innnerContainer}>
          <WebView
            startInLoadingState={true}
            source={{uri: Config.BASE_URL + TERMS_N_SERVICIES}}
            injectedJavaScript={INJECTEDJAVASCRIPT}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WebPage;

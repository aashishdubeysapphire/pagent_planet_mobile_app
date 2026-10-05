import React from 'react';
import {Text, View} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {color} from '../../../assets/colorConstant';
import {BaseToast, ErrorToast, ToastConfig} from 'react-native-toast-message';

const CustomToast = () => {
  const toastConfig: ToastConfig = {
    success: props => (
      <BaseToast
        {...props}
        style={{borderLeftColor: 'pink'}}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 15,
          fontWeight: '400',
        }}
      />
    ),

    error: props => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 15,
        }}
      />
    ),
    successToast: ({text1, props}) => (
      <View
        style={{
          width: '80%',
          backgroundColor: color.GREEN,
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          borderRadius: 10,
          paddingEnd: 20,
          opacity: 1,
          paddingStart: 20,
          paddingTop: 15,
          paddingBottom: 15,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: color.DARK_GREEN,
            textAlign: 'center',
            alignSelf: 'center',
          }}>
          {text1}
        </Text>
      </View>
    ),

    errorToast: ({text1, props}) => (
      <View
        style={{
          width: '80%',
          backgroundColor: color.PINK,
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          borderRadius: 10,
          paddingEnd: 20,
          opacity: 1,
          paddingStart: 20,
          paddingTop: 15,
          paddingBottom: 15,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: color.RED,
            textAlign: 'center',
            alignSelf: 'center',
          }}>
          {text1}
        </Text>
      </View>
    ),
  };

  return <Toast config={toastConfig} />;
};

export default CustomToast;

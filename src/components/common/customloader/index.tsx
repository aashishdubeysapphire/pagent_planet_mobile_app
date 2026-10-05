// A Component for showing custom loader on overall App.
import React from 'react';
import {View, Modal, StyleSheet, ActivityIndicator} from 'react-native';
import {color} from '../../../assets/colorConstant';

interface Props {
  isLoading: boolean;
}

const Loader = ({isLoading = false}: Props) => {
  if (isLoading) {
    return (
      <Modal transparent visible={isLoading}>
        <View style={{...styles.loadercontainer, ...styles.container}}>
          <View style={styles.loaderRoot}>
            <View style={styles.borderButtonBg} />
            <View style={styles.taj}>
              <ActivityIndicator
                style={styles.loader}
                size="large"
                color={color.P_PINK}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  return null;
};

export default Loader;

export const styles = StyleSheet.create({
  container: {
    zIndex:500000
  },
  loadercontainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderRoot: {
    width: '20%',
    height: '12%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderButtonBg: {
    borderRadius: 10,
    borderColor: color.S_GRAY_6,
    borderWidth: 1,
    width: '100%',
    opacity: 0.8,
    backgroundColor: color.S_PINK,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    marginTop: 1,
  },
  taj: {
    position: 'absolute',
    marginBottom: 0,
  },
});

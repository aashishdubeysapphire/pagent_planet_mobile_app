import React, {useEffect} from 'react';
import {View, ActivityIndicator, Modal} from 'react-native';
import {color} from '../../../assets/colorConstant';
import useAppStore, {useSetLoader} from '../../../store/useAppStore';
import {styles} from '../customloader';

/* A function that returns a view if the loader is true. */
const AppLoader = () => {
  const setLoader = useSetLoader();
  const {
    storeData: {loader},
  } = useAppStore();
  useEffect(() => {
    if (loader) {
      setTimeout(() => {
        if (loader) {
          setLoader(false);
        }
      }, 10000);
    }
  }, [loader]);
  return loader ? (
    <Modal transparent visible={true}>
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
  ) : null;
};

export default AppLoader;

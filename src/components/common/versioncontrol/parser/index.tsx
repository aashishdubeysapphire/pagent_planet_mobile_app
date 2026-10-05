import React, {useEffect, useState} from 'react';
import DeviceInfo from 'react-native-device-info';
import VersionControlModal from '..';
import {VersionDetail} from '../../../../services/models/version';
import {isIosDevice} from '../../../utils/helperFunction';

const FirebaseRemoteConfigParser = () => {
  const [isModalVisible, setisModalVisible] = useState(false);
  const [version, setVersion] = useState<VersionDetail>();

  const parseData = async () => {
    try {
      // Dynamic import here – defers loading remote-config until called
      const remoteConfig = (
        await import('@react-native-firebase/remote-config')
      ).default;

      await remoteConfig().setConfigSettings({
        minimumFetchIntervalMillis: 10000,
        fetchTimeMillis: 10000,
      });
      await remoteConfig().fetch(0);
      await remoteConfig().fetchAndActivate();

      let installedVersion = DeviceInfo.getVersion();

      if (!isIosDevice()) {
        let versionCode = remoteConfig()
          .getValue('android_version_code')
          .asString();
        if (versionCode.length > 0 && installedVersion < versionCode) {
          setVersion({
            version: versionCode,
            forceUpdate: remoteConfig().getBoolean('android_force_update'),
          });
          setTimeout(() => {
            setisModalVisible(true);
          }, 100);
        }
      } else {
        let versionCode = remoteConfig()
          .getValue('ios_version_code')
          .asString();

        if (versionCode.length > 0 && installedVersion < versionCode) {
          setVersion({
            version: versionCode,
            forceUpdate: remoteConfig().getBoolean('ios_force_update'),
          });
          setisModalVisible(true);
        }
      }
    } catch (err) {
      console.log('Remote config error:', err);
    }
  };

  useEffect(() => {
    parseData();
  }, []);

  return (
    <></>
    // <VersionControlModal
    //   isModalVisible={isModalVisible}
    //   closeModal={setisModalVisible}
    //   version={version}
    // />
  );
};
export default FirebaseRemoteConfigParser;

// src/hooks/useAppInit.ts (or wherever it's located)

import { useEffect } from 'react';
import {
  requestUserPermission,
  subscribeToForegroundNotifications,
} from '../components/utils/pushnotification';
import { default as useAppStore } from '../store/useAppStore';
import firebaseApp from '@react-native-firebase/app';
const useAppInit = () => {
  const { setData, storeData } = useAppStore();
  console.log(firebaseApp,"firebaseApp");
  
  useEffect(() => {
    setData({
      ...storeData,
      loader: false,
      hideBottomBar: false,
      isModalState: false,
    });
  }, []);

  // Safely enable Crashlytics with dynamic import
  useEffect(() => {
    const enableCrashlytics = async () => {
      try {
        const { default: crashlytics } = await import('@react-native-firebase/crashlytics');
        crashlytics().setCrashlyticsCollectionEnabled(true);
      } catch (error) {
        console.log('Failed to enable Crashlytics:', error);
      }
    };

    enableCrashlytics();
  }, []);

  // Request push notification permission
  useEffect(() => {
    requestUserPermission();
  }, []);

  // Subscribe to foreground notifications
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const setupForegroundListener = async () => {
      unsubscribe = await subscribeToForegroundNotifications();
    };

    setupForegroundListener();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);
};

export default useAppInit;
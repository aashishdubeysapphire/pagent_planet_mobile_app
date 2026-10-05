// Root.tsx
import React, {useEffect, useState} from 'react';
import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'; // Updated import
import {SafeAreaView} from 'react-native-safe-area-context';
import Store from '../store';
import Navigation from './navigation';
import {color} from '../assets/colorConstant';
import AppLoader from '../components/common/loader';
import CustomToast from '../components/common/toast';
import Config from 'react-native-config';
import FlashMessage from 'react-native-flash-message';
// import SplashScreen from 'react-native-splash-screen';
import RNBootSplash from 'react-native-bootsplash';
// import FirebaseRemoteConfigParser from '../components/common/versioncontrol/parser';
import {isIosDevice} from '../components/utils/helperFunction';
import useInfiniteHtQuery from '../services/api/useHtInfiniteQuery';
import {versionData} from '../services/models/auth';
import {APP_VERSION} from '../services/endpoints';
import useHtQuery from '../services/api/useHtQuery';
const LazyFirebaseRemoteConfigParser = React.lazy(
  () => import('../components/common/versioncontrol/parser'),
);
const {height} = Dimensions.get('window');
// Create QueryClient with sensible defaults (recommended in 2025)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60, // 1 minute
      cacheTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      retry: 0,
    },
  },
});

const Root = () => {
  const [isRemoteParsingActive, setRemoteParsingActive] = useState(false);
  useEffect(() => {
    // Hide splash screen as early as possible
    const splashTimer = setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 100);

    // Activate remote config parser after splash (iOS needs longer delay due to animation)
    const remoteTimer = setTimeout(
      () => {
        setRemoteParsingActive(true);
      },
      isIosDevice() ? 10000 : 1000,
    );

    return () => {
      clearTimeout(splashTimer);
      clearTimeout(remoteTimer);
    };
  }, []);
  console.log(Config.BASE_URL, 'this is base urls');
  return (
    <>
      <Store>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={color.WHITE}
          translucent={false}
        />

        {/* Wrap your entire app with TanStack Query */}
        <SafeAreaView
          style={{flex: 1, backgroundColor: color.WHITE, height: height}}>
          <QueryClientProvider client={queryClient}>
            <Navigation />
          </QueryClientProvider>
        </SafeAreaView>

        {/* Global UI overlays */}
        <AppLoader />
        <CustomToast />

        {/* Remote config/version control parser */}
        {isRemoteParsingActive && (
          <React.Suspense fallback={null}>
            <LazyFirebaseRemoteConfigParser />
          </React.Suspense>
        )}
      </Store>

      {/* Flash messages (toasts) */}
      <FlashMessage position="top" style={{zIndex: 100000}} />
    </>
  );
};

export default Root;

// import Store from '../store';
// import {QueryClient, QueryClientProvider} from 'react-query';
// import Navigation from './navigation';
// import React, {useEffect, useState} from 'react';
// import {StatusBar} from 'react-native';
// import {color} from '../assets/colorConstant';
// import AppLoader from '../components/common/loader';
// import CustomToast from '../components/common/toast';
// import FlashMessage from 'react-native-flash-message';
// import SplashScreen from 'react-native-splash-screen';
// import FirebaseRemoteConfigParser from '../components/common/versioncontrol/parser';
// import {isIosDevice} from '../components/utils/helperFunction';

// const queryClient = new QueryClient();

// const Root = () => {
//   const [isRemoteParsingActive, setRemoteParsingActive] = useState(false);
//   useEffect(() => {
//     setTimeout(
//       () => {
//         setRemoteParsingActive(true);
//       },
//       isIosDevice() ? 4000 : 1000,
//     );
//     setTimeout(() => {
//       SplashScreen.hide();
//     }, 100);
//   }, []);

//   return (
//     <>
//       <Store>
//         <StatusBar
//           barStyle="dark-content"
//           backgroundColor={color.WHITE}
//           translucent={false}
//         />
//         <QueryClientProvider client={queryClient}>
//           <Navigation />
//         </QueryClientProvider>
//         <AppLoader />
//         <CustomToast />

//         {isRemoteParsingActive ? <FirebaseRemoteConfigParser /> : null}
//       </Store>
//       <FlashMessage position="top" style={{zIndex: 100000}} />
//     </>
//   );
// };

// export default Root;

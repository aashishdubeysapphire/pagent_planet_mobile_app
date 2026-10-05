// src/services/api/useHtApi.ts (or wherever it's located)

import { useContext } from 'react';
import Config from 'react-native-config';
import { UserContext } from '../../store/userStore';
import { MethodTypes } from '../constants';
import { API_VERSION } from '../endpoints';

const useHtApi = () => {
  const { storeData } = useContext(UserContext);

  const fetchWithPerformanceMetric = async (url: string) => {
    let metric;

    try {
      // Dynamically import perf only when the request is made
      const { default: perf } = await import('@react-native-firebase/perf');

      metric = await perf().newHttpMetric(
        Config.BASE_URL + API_VERSION + url,
        'GET',
      );

      metric.putAttribute('url', url);
      await metric.start();
    } catch (importError) {
      console.log('Firebase Performance not available for this request:', importError);
      // Continue without monitoring — request must still succeed
    }

    const response = await fetch(Config.BASE_URL + API_VERSION + url, {
      method: MethodTypes.GET,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + storeData.data?.access_token,
      },
    });
    const responseData = await response.json();

    // Stop metric if it was created
    if (metric) {
      try {
        metric.setHttpResponseCode(response.status);
        const contentType = response.headers.get('Content-Type');
        if (contentType) metric.setResponseContentType(contentType);

        const contentLength = response.headers.get('Content-Length');
        if (contentLength) metric.setResponsePayloadSize(Number(contentLength));

        await metric.stop();
      } catch (stopError) {
        console.log('Error stopping performance metric:', stopError);
      }
    }

    return responseData;
  };

  return fetchWithPerformanceMetric;
};

export default useHtApi;
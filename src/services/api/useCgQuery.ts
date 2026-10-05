// src/services/api/useCgQuery.ts (or wherever it's located)

import { useContext } from 'react';
import Config from 'react-native-config';
import { useQuery } from '@tanstack/react-query';
import { UserContext } from '../../store/userStore';
import { MethodTypes } from '../constants';
import { API_VERSION } from '../endpoints';
import useResponseHandler from '../useResponseHandler';

interface Props {
  key: string;
  url: string;
  method?: string;
  body?: object | null;
  auth?: string | null;
  customHeader?: any;
  isJson?: boolean;
  offSuccessToast?: boolean;
  disableLoader?: boolean;
}

const useCgQuery = <T>({
  key,
  url,
  method = MethodTypes.GET,
  body,
  isJson = true,
  customHeader,
  offSuccessToast = false,
  disableLoader = false,
}: Props) => {
  const { onSuccess, onError } = useResponseHandler(
    key,
    offSuccessToast,
    undefined, // offErrorToast not used here
    disableLoader,
  );
  const { storeData } = useContext(UserContext);

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + storeData.data?.access_token,
    ...customHeader,
  };

  return useQuery<T>({
    queryKey: [key],

    queryFn: async () => {
      let metric;
      try {
        // Dynamically import perf only when the query runs
        const { default: perf } = await import('@react-native-firebase/perf');
        metric = await perf().newHttpMetric(
          Config.BASE_URL + API_VERSION + url,
          method,
        );

        metric.putAttribute('url', url);
        await metric.start();
      } catch (importError) {
        console.log('Firebase Performance not available for this query:', importError);
        // Continue without monitoring — query must still work
      }

      const response = await fetch(Config.BASE_URL + API_VERSION + url, {
        method,
        headers,
        body: body ? (isJson ? JSON.stringify(body) : body) : null,
      });

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

      console.log(response, 'this is query response object');
      const responseData = await response.json();
      console.log(responseData, 'this is query response data');

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      return responseData as T;
    },

    onSuccess,
    onError,
  });
};

export default useCgQuery;
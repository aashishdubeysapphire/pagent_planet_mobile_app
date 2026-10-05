// src/services/api/useCgMutation.ts (or wherever it's located)

import { useContext } from 'react';
import Config from 'react-native-config';
import { useMutation } from '@tanstack/react-query';
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
  offErrorToast?: boolean;
}

const useCgMutation = <T>({
  key,
  url,
  method = MethodTypes.Post,
  body,
  isJson = true,
  customHeader,
  offSuccessToast = false,
  disableLoader = false,
  offErrorToast = false,
}: Props) => {
  const { onSuccess, onError } = useResponseHandler(
    key,
    offSuccessToast,
    offErrorToast,
    disableLoader,
    body,
  );
  const { storeData } = useContext(UserContext);

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + storeData.data?.access_token,
    ...customHeader,
  };

  return useMutation<T>({
    mutationKey: [key],

    mutationFn: async () => {
      // Dynamically import perf only when the request runs
      let networkMetric;
      try {
        const { default: perf } = await import('@react-native-firebase/perf');
        networkMetric = await perf().newHttpMetric(
          Config.BASE_URL + API_VERSION + url,
          method,
        );

        networkMetric.putAttribute('url', url);
        await networkMetric.start();
      } catch (importError) {
        console.log('Firebase Performance not available:', importError);
        // Continue without perf monitoring if import fails
      }

      const fullUrl = Config.BASE_URL + API_VERSION + url;

      // CURL generator
      let curl = `curl -X ${method} "${fullUrl}"`;

      Object.entries(headers).forEach(([key, value]) => {
        curl += ` -H "${key}: ${value}"`;
      });

      if (body) {
        curl += ` -d '${JSON.stringify(body)}'`;
      }

      console.log("CURL REQUEST 👉\n", curl);

      const response = await fetch(fullUrl, {
        body: body ? (isJson ? JSON.stringify(body) : body) : null,
        method,
        headers,
      });
      console.log('response',);
      const coreResponse = await response.json();

      console.log('URL 👉', Config.BASE_URL + API_VERSION + url);
      console.log('STATUS 👉', response.status);
      console.log('HEADERS 👉', response.headers);
      // console.log('BODY 👉', JSON.stringify(body));
      console.log('CORE RESPONSE', coreResponse);

      // Stop metric if it was created
      if (networkMetric) {
        try {
          networkMetric.setHttpResponseCode(response.status);
          networkMetric.setResponseContentType(response.headers.get('Content-Type') || '');
          const contentLength = response.headers.get('Content-Length');
          if (contentLength) {
            networkMetric.setResponsePayloadSize(Number(contentLength));
          }
          await networkMetric.stop();
        } catch (stopError) {
          console.log('Error stopping performance metric:', stopError);
        }
      }

      if (!response.ok) {
        const error: any = new Error('API Error');
        error.status = response.status;
        error.data = coreResponse; // 👈 VERY IMPORTANT
        throw error;
      }

      return coreResponse;
    },
    onSuccess,
    onError,
  });
};

export default useCgMutation;
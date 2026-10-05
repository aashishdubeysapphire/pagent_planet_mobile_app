import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import useResponseHandler from '../../services/useResponseHandler';
import { UserContext } from '../../store/userStore';
import { Base } from '../models/base';
import useHtApi from './useHtApi';
import Config from 'react-native-config';
import { API_VERSION } from '../endpoints';

interface Props {
  key: string;                  // Make required or handle undefined safely
  url: string;                  // Make required
  offSuccessToast?: boolean;
  offErrorToast?: boolean;
  enabled?: boolean;
}

const useHtQuery = <T>({
  key,
  url,
  offSuccessToast = false,
  offErrorToast = false,
  enabled = true,
}: Props) => {
  const apiCall = useHtApi();
  const { storeData } = useContext(UserContext);
  const { onSuccess, onError } = useResponseHandler(
    key,
    offSuccessToast,
    offErrorToast,
  );

  const userId = storeData.data?.user?.id;
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + storeData.data?.access_token,
  };

  const fullUrl = Config.BASE_URL + API_VERSION + url;

  return useQuery<Base<T>>({
    queryKey: [key, userId],  // Array form + user dependency for auto-invalidation on login/logout

    queryFn: () => {
      // Log only when a real fetch runs — never log in render (e.g. parent `globalTimer` ticks every 1s).

        let curl = `curl -X GET "${fullUrl}"`;
        Object.entries(headers).forEach(([headerName, value]) => {
          curl += ` -H "${headerName}: ${value}"`;
        });
        console.log('CURL REQUEST 👉\n', curl);
      
      return apiCall<Base<T>>(url);
    },

    onSuccess,
    onError,
    enabled: enabled && !!url && !!key,  // Extra safety: disable if key/url missing
  });
};

export default useHtQuery;
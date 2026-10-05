import { useContext } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';
import translations from '../../assets/translations';
import {
  internetState,
  toast,
  toastType,
} from '../../components/common/commonalert';
import useHtApi from '../../services/api/useHtApi';
import { ApiStatusType } from '../../services/constants';
import { Base } from '../../services/models/base';
import useResponseHandler from '../../services/useResponseHandler';
import {
  useClaimAlertModalVisible,
  useSetLoader,
} from '../../store/useAppStore';
import { UserContext } from '../../store/userStore';

const initialGetDataArray = <R>(page: any): R => page;

const useInfiniteHtQuery = <T, R = any>({
  key,
  url,
  page,
  getDataArray = initialGetDataArray as (page: T) => R,
  offSuccessToast = false,
  disableLoader = false, // You had this in previous hooks — add if needed
}: {
  key: QueryKey;
  url: string;
  page: string;
  getDataArray?: (page: T) => R;
  getRange?: (page: T) => number;
  showLogs?: boolean;
  refetchInterval?: number;
  offSuccessToast?: boolean;
  disableLoader?: boolean;
}) => {
  const apiCall = useHtApi();
  const { storeData, removeData } = useContext(UserContext);
  const setClaimAlertModalVisible = useClaimAlertModalVisible();
  const setLoader = useSetLoader();
  const netInfo = useNetInfo();
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + storeData.data?.access_token,
  };

  const fullUrl = url;

  // CURL generator
  let curl = `curl -X GET "${fullUrl}"`;

  Object.entries(headers).forEach(([key, value]) => {
    curl += ` -H "${key}: ${value}"`;
  });

  console.log("CURL REQUEST 👉\n", curl);
  const { onError } = useResponseHandler(key, false);

  const userId = storeData.data?.user?.id;

  const onSuccess = (data: InfiniteData<Base<T>>) => {
    console.log(
      '----------------------------------- TPP Request -----------------------------------',
    );
    console.log(key + ' response: ' + '    ' + JSON.stringify(data));
    console.log(
      '----------------------------------- TPP Request end -----------------------------------',
    );

    const firstPage = data.pages[0];

    if (
      !firstPage.success &&
      firstPage.status_code === ApiStatusType.AuthenticationFail &&
      storeData?.data?.user != null
    ) {
      toast(
        firstPage.message,
        firstPage.success ? toastType.SUCESS_TOAST : toastType.ERROR_TOAST,
      );
      setTimeout(() => removeData(), 100);
    } else if (
      !firstPage.success &&
      firstPage.status_code === ApiStatusType.ClaimApproved
    ) {
      setClaimAlertModalVisible(true);
    } else {
      try {
        if (!offSuccessToast || !firstPage.success) {
          toast(
            firstPage?.message ?? '',
            firstPage.success ? toastType.SUCESS_TOAST : toastType.ERROR_TOAST,
          );
        }
      } catch (_e) {
        console.error('Error in onSuccess toast:', _e);
        if (!netInfo.isConnected || !netInfo.isInternetReachable) {
          internetState(false);
        } else {
          toast(
            translations.OOPS_SOMETHING_WENT_WRONG_TRY_LETER,
            toastType.ERROR_TOAST,
          );
        }
      } finally {
        setLoader(false);
      }
    }
  };

  return useInfiniteQuery<Base<T>, Error, InfiniteData<Base<T>>, QueryKey>({
    queryKey: [...(Array.isArray(key) ? key : [key]), userId].filter(Boolean), // Safe array + user dependency

    queryFn: async ({ pageParam = 1 }) => {
      const response = await apiCall(url + page + pageParam);
      return response as Base<T>; // Assuming apiCall returns parsed JSON
    },

    getNextPageParam: (lastPage, allPages) => {
      const dataArray = getDataArray(lastPage);
      try {
        if (Array.isArray(dataArray) && dataArray.length === 0) return undefined;
      } catch (err) {
        return undefined;
      }
      return allPages.length + 1;
    },

    onSuccess,
    onError,
    initialPageParam: 1,
    gcTime: 0, // Replaced cacheTime
    // keepPreviousData: true, // Use if you want to keep old data while fetching new
    // staleTime: 0, // Add if needed
  });
};

export default useInfiniteHtQuery;
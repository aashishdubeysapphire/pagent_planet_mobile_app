import {QueryKey, useQueryClient} from '@tanstack/react-query';
import {Base} from '../models/base';
import useHtApi from './useHtApi';

const useHtPrefetch = <T>(
  key: QueryKey,
  url: string,
  body?: string,
  methodType?: string
) => {
  const apiCall = useHtApi();
  const queryClient = useQueryClient();

  const preFetch = async () => {
    const data = await queryClient.fetchQuery<Base<T>>(key, () =>
      apiCall(url, body, methodType)
    );
    queryClient.setQueryData(key, () => data);
  };
  return preFetch;
};

export default useHtPrefetch;

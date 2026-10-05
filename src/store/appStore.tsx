import React, {createContext} from 'react';
import {App, InitialApp} from '../services/models/app';
import useStore from './useStore';

const APP_STORE_KEY = 'APP_STORE_KEY';

export const AppContext = createContext({
  storeData: InitialApp,
  setDataToStore: (data: App) => {
    console.log(data);
  },
  removeData: () => {},
});

const AppStore: React.FC = ({children}) => {
  const {storeData, dataRetrieved, setDataToStore, removeData} = useStore<App>({
    KEY: APP_STORE_KEY,
    initData: InitialApp,
  });

  return (
    <AppContext.Provider
      value={{
        storeData,
        setDataToStore,
        removeData,
      }}>
      {dataRetrieved && children}
    </AppContext.Provider>
  );
};

export default AppStore;

import React, {createContext} from 'react';
import {Auth, InitialAuth} from '../services/models/auth';

import useStore from './useStore';

const USER_DATA_KEY = 'USER_DATA_KEY';

export const UserContext = createContext({
  storeData: InitialAuth,
  setDataToStore: (data: Auth) => {
    console.log(data);
  },
  removeData: () => {},
});

const UserStorage: React.FC = ({children}) => {
  const {storeData, dataRetrieved, setDataToStore, removeData} = useStore<Auth>(
    {
      KEY: USER_DATA_KEY,
      initData: InitialAuth,
    },
  );

  return (
    <UserContext.Provider value={{storeData, setDataToStore, removeData}}>
      {dataRetrieved && children}
    </UserContext.Provider>
  );
};

export default UserStorage;

import UserStorage from './userStore';
import React from 'react';
import AppStore from './appStore';
import RootStore from './rootStore';
const Store: React.FC = ({children}) => {
  return (
    <RootStore>
      <UserStorage>
        <AppStore>{children}</AppStore>
      </UserStorage>
    </RootStore>
  );
};

export default Store;

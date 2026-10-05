import {useContext} from 'react';
import {AppContext} from './appStore';
const useAppStore = () => {
  const {storeData, setDataToStore, removeData} = useContext(AppContext);
  const setData = data => {
    setDataToStore({...storeData, ...data});
  };
  return {
    storeData,
    setData,
    removeData,
  };
};

export const useSetLoader = () => {
  const {setData} = useAppStore();

  const setLoader = (isVisible: boolean) => {
    setData({loader: isVisible});
  };
  return setLoader;
};
export const useSetSelectedRole = () => {
  const {setData} = useAppStore();

  return (val: string) => {
    setData({selectedRole: val});
  };
};
export const useSetScreenRefresh = () => {
  const {setData} = useAppStore();

  const setScreenRefresh = (refeshId: number) => {
    setData({refresh: refeshId});
  };
  return setScreenRefresh;
};

export const useSetImagePasteToast = () => {
  const {setData} = useAppStore();

  const setMoveImageToast = (moveImageToastValue: number) => {
    setData({moveImageToast: moveImageToastValue});
  };
  return setMoveImageToast;
};
export const useSetRearrangeAlbumToastToast = () => {
  const {setData} = useAppStore();

  const setRearrangeAlbumToast = (rearrangeAlbumToastValue: number) => {
    setData({rearrangeAlbumToast: rearrangeAlbumToastValue});
  };
  return setRearrangeAlbumToast;
};
export const useSetOnBoarding = () => {
  const {setData} = useAppStore();

  const setOnBoarding = (isVisible: boolean) => {
    setData({isOnBoardingViewed: isVisible});
  };
  return setOnBoarding;
};

export const useSetUserLoginState = () => {
  const {setData} = useAppStore();

  const setLogined = (loginState: boolean) => {
    setData({isLogined: loginState});
  };
  return setLogined;
};

export const useShowStartModal = () => {
  const {setData} = useAppStore();

  const setShowModal = (modalState: boolean) => {
    setData({isModalState: modalState});
  };
  return setShowModal;
};

export const useSetHideShowBottomBar = () => {
  const {setData} = useAppStore();

  const setHideBottomBar = (toggleBar: boolean) => {
    setData({hideBottomBar: toggleBar});
  };
  return setHideBottomBar;
};

export const useSelectedImageIds = () => {
  const {setData} = useAppStore();

  const setSelectedImageIds = (ids: any) => {
    setData({imageIds: ids});
  };
  return setSelectedImageIds;
};

export const useAddResultModalVisible = () => {
  const {setData} = useAppStore();

  const setAddResultModalVisible = (visibleState: boolean) => {
    setData({addResultModalVisible: visibleState});
  };
  return setAddResultModalVisible;
};
export const useClaimAlertModalVisible = () => {
  const {setData} = useAppStore();

  const setClaimAlertModalVisible = (visibleState: boolean) => {
    setData({claimAlertModalVisible: visibleState});
  };
  return setClaimAlertModalVisible;
};

export default useAppStore;

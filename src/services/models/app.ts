export interface App {
  hideBottomBar: boolean;
  loader: boolean;
  isOnBoardingViewed: boolean;
  isLogined: boolean;
  isModalState: boolean;
  refresh: number;
  notificationCount: number;
  messageCount: number;
  favoriteCount: number;
  cartCount: number;
  moveImageToast: number;
  rearrangeAlbumToast: number;
  imageIds: any;
  addResultModalVisible: boolean;
  claimAlertModalVisible: boolean;
}

export const InitialApp: App = {
  hideBottomBar: false,
  loader: false,
  isOnBoardingViewed: false,
  isLogined: false,
  isModalState: false,
  refresh: 0,
  notificationCount: 0,
  messageCount: 0,
  favoriteCount: 0,
  cartCount: 0,
  moveImageToast: 0,
  rearrangeAlbumToast: 0,
  imageIds: [],
  addResultModalVisible: true,
  claimAlertModalVisible: false,
};

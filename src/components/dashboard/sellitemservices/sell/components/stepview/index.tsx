import React from 'react';
import {Image} from 'react-native';
import {styles} from './styles';
import AppImages from '../../../../../../assets/images/AppImages';

interface Props {
  currentTab: number;
  completedStep: number;
  isTwoStep?: boolean;
  isEditProduct?: boolean;
}

export enum SELL_TABS {
  STEP_ONE = 1,
  STEP_TWO = 2,
  STEP_THREE = 3,
}

export const SellStepsManager = ({currentTab, isTwoStep = false}: Props) => {
  const getHeaderImg = () => {
    if (isTwoStep) {
      if (currentTab === SELL_TABS.STEP_ONE) {
        return AppImages.SHOPING_BAG.sellHeader21;
      } else if (currentTab === SELL_TABS.STEP_THREE) {
        return AppImages.SHOPING_BAG.sellHeader22;
      }
    } else {
      if (currentTab === SELL_TABS.STEP_ONE) {
        return AppImages.SHOPING_BAG.sellHeader31;
      } else if (currentTab === SELL_TABS.STEP_TWO) {
        return AppImages.SHOPING_BAG.sellHeader32;
      } else if (currentTab === SELL_TABS.STEP_THREE) {
        return AppImages.SHOPING_BAG.sellHeader33;
      }
    }
  };

  return <Image source={getHeaderImg()} style={styles.headerImg} />;
};

export default SellStepsManager;

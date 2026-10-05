import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import AppImages from '../../../../../../../../../assets/images/AppImages';
import styles from './styles';
import translations from '../../../../../../../../../assets/translations';

const ActivateContestView = ({
  activateContestent,
  setActivateContestent,
  onChangePcaData,
}) => {
  const onPress = () => {
    setActivateContestent(!activateContestent);
    if (activateContestent) {
      onChangePcaData({
        perVotePrice: '0',
        pcaname: translations.PEOPLE_CHOICE_AWARD,
      });
    } else {
      onChangePcaData({
        perVotePrice: '1',
        pcaname: translations.PEOPLE_CHOICE_AWARD,
      });
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        {activateContestent ? (
          <Image
            source={AppImages.PCA.selectedPCA}
            style={styles.img}
            borderRadius={20}
          />
        ) : (
          <Image
            source={AppImages.PCA.unselectedPCA}
            style={styles.img}
            borderRadius={20}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ActivateContestView;

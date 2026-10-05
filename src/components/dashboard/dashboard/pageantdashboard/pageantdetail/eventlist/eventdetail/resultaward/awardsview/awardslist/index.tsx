import React from 'react';
import {Text, View} from 'react-native';
import FastImageView from '../../../../../../../../../common/fastimageview';
import {moderateScaleVertical} from '../../../../../../../../../utils/responsiveSize';
import {styles} from './styles';

interface Props {
  awardTitle: string;
  winnerName: string;
  imageUrl: string;
  itemSize: number;
}

const EventAwardsList = ({
  awardTitle,
  winnerName,
  imageUrl,
  itemSize,
}: Props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.awardSection}>
          <View style={styles.imageSection}>
            <FastImageView
              width={itemSize}
              height={itemSize}
              borderRadius={moderateScaleVertical(24)}
              imageUrl={imageUrl}
            />
          </View>
          <View style={styles.awardView}>
            <Text
              style={styles.awardLabel}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              {awardTitle}
            </Text>
          </View>
        </View>
        <View style={styles.awardView}>
          <Text
            style={styles.contestantName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {winnerName}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default EventAwardsList;

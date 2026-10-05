import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';
import FastImageView from '../../../../../common/fastimageview';

interface Props {
  label?: string;
  maxLines?: number;
  designation: string;
  info: string;
}

const TestimonialListComp = ({
  label,
  designation,
  maxLines = 2,
  info,
}: Props) => {

  return (
    <View style={styles.container}>
      <View style={styles.showData}>
        <View style={styles.circleContainer}>
          <FastImageView
            width={moderateScaleVertical(60)}
            height={moderateScaleVertical(60)}
            borderRadius={moderateScaleVertical(60)}
            imageUrl={null}
            isCircle
          />
        </View>
        <View style={styles.titleView}>
          <Text
            style={styles.title}
            numberOfLines={maxLines}
            ellipsizeMode="tail"
          >
            {label}
          </Text>
          <Text
            style={styles.designation}
            numberOfLines={maxLines}
            ellipsizeMode="tail"
          >
            {designation}
          </Text>
        </View>
      </View>
      <Text style={styles.infoLabel} ellipsizeMode="tail">
        {info}
      </Text>
    </View>
  );
};

export default TestimonialListComp;

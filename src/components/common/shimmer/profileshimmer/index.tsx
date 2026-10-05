import React from 'react';
import {View} from 'react-native';
import Shimmer from '../../../common/shimmer';
import {moderateScale} from '../../../utils/responsiveSize';
import {styles} from './styles';

interface Props {
  isDisplayLines?: boolean;
}

/**
 * It's a function that takes in a bunch of props and returns a FlatList with a bunch of Shimmer
 * components
 * @param {Props}  - Props) => {
 * @returns A view with a flatlist.
 */
const ShimmerProfile = ({isDisplayLines = false}: Props) => {
  return (
    <View style={styles.textShimmer}>
      <View style={styles.profileArea}>
        <Shimmer
          width={moderateScale(124)}
          height={moderateScale(124)}
          borderRadius={moderateScale(124)}
          bottomSpace={moderateScale(16)}
        />
      </View>
      <Shimmer
        width={moderateScale(200)}
        height={10}
        borderRadius={5}
        bottomSpace={moderateScale(12)}
      />
      <Shimmer
        width={moderateScale(200)}
        height={10}
        borderRadius={5}
        bottomSpace={moderateScale(8)}
      />
      {isDisplayLines && (
        <View>
          <View style={styles.profileArea}>
            <Shimmer
              width={moderateScale(15)}
              height={moderateScale(15)}
              leftBottomSpace={moderateScale(5)}
              borderRadius={moderateScale(15)}
            />
            <Shimmer
              width={moderateScale(15)}
              height={moderateScale(15)}
              borderRadius={moderateScale(15)}
              leftBottomSpace={moderateScale(5)}
            />
            <Shimmer
              height={moderateScale(15)}
              width={moderateScale(15)}
              borderRadius={moderateScale(15)}
              leftBottomSpace={moderateScale(5)}
            />
            <Shimmer
              width={moderateScale(15)}
              height={moderateScale(15)}
              borderRadius={moderateScale(15)}
              leftBottomSpace={moderateScale(5)}
            />
            <Shimmer
              borderRadius={moderateScale(15)}
              width={moderateScale(15)}
              height={moderateScale(15)}
              leftBottomSpace={moderateScale(10)}
            />
          </View>
          <View style={styles.textShimmer}>
            <Shimmer
              width={moderateScale(200)}
              height={8}
              borderRadius={5}
              bottomSpace={moderateScale(10)}
            />
            <Shimmer
              width={moderateScale(200)}
              height={6}
              borderRadius={5}
              bottomSpace={moderateScale(16)}
            />
          </View>
        </View>
      )}

      <View style={styles.profileArea}>
        <Shimmer
          width={moderateScale(25)}
          height={moderateScale(25)}
          borderRadius={moderateScale(20)}
          leftBottomSpace={moderateScale(10)}
        />
        <Shimmer
          width={moderateScale(25)}
          height={moderateScale(25)}
          borderRadius={moderateScale(20)}
          leftBottomSpace={moderateScale(10)}
        />
        <Shimmer
          width={moderateScale(25)}
          borderRadius={moderateScale(20)}
          height={moderateScale(25)}
          leftBottomSpace={moderateScale(10)}
        />
        <Shimmer
          width={moderateScale(25)}
          height={moderateScale(25)}
          borderRadius={moderateScale(20)}
          leftBottomSpace={moderateScale(10)}
        />
      </View>
    </View>
  );
};

export default ShimmerProfile;

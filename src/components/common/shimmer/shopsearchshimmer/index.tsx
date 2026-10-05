import React from 'react';
import {Dimensions, View, SafeAreaView} from 'react-native';
import Shimmer from '..';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';
import ShimmerList from '../listshimmer';
import {styles} from './styles';

interface Props {
  itemSize?: number;
}
/**
 * It's a function that takes in a bunch of props and returns a FlatList with a bunch of Shimmer
 * components
 * @param {Props}  - Props) => {
 * @returns A view with a flatlist.
 */
const ShopSearchShimmer = ({
  itemSize = Dimensions.get('window').width - moderateScaleVertical(32),
}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.shimmerContainer}>
        <Shimmer
          width={itemSize}
          height={moderateScaleVertical(44)}
          borderRadius={moderateScale(20)}
          bottomSpace={6}
        />
        <View style={styles.textContainer}>
          <Shimmer
            width={itemSize / 3}
            height={8}
            borderRadius={5}
            bottomSpace={8}
          />
          <Shimmer
            width={itemSize / 1.5}
            height={8}
            borderRadius={5}
            bottomSpace={8}
          />
          <Shimmer
            width={itemSize / 1.5}
            height={8}
            borderRadius={5}
            bottomSpace={8}
          />
          <Shimmer
            width={itemSize / 1.5}
            height={8}
            borderRadius={5}
            bottomSpace={8}
          />
          <Shimmer
            width={itemSize / 1.5}
            height={8}
            borderRadius={5}
            bottomSpace={8}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <ShimmerList
          padding={12}
          borderRadius={20}
          horizontal={false}
          numColumns={2}
          width={moderateScale(164)}
          height={moderateScale(164)}
        />
      </View>
    </SafeAreaView>
  );
};

export default ShopSearchShimmer;

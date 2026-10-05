import React from 'react';
import {Dimensions, View} from 'react-native';
import Shimmer from '../../../common/shimmer';
import {moderateScaleVertical} from '../../../utils/responsiveSize';
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
const ProductsDetailShimmer = ({
  itemSize = Dimensions.get('window').width,
}: Props) => {
  return (
    <View>
      <Shimmer width={itemSize} height={itemSize / 1.1} borderRadius={0} />

      <View style={styles.profileContainer}>
        <View style={styles.profileButtonContainer}>
          <Shimmer
            width={itemSize / 1.4}
            height={11}
            borderRadius={5}
            bottomSpace={8}
          />
          <View style={[styles.profileButtonContainer, {marginStart: 0}]}>
            {Array.from(Array(5).keys()).map(i => {
              return (
                <Shimmer
                  width={10}
                  height={10}
                  borderRadius={5}
                  bottomSpace={8}
                />
              );
            })}
          </View>
        </View>

        <Shimmer
          width={itemSize / 1.3}
          height={8}
          borderRadius={5}
          bottomSpace={8}
        />
        <Shimmer
          width={itemSize / 1.4}
          height={8}
          borderRadius={5}
          bottomSpace={8}
        />
        <Shimmer
          width={itemSize / 1.1}
          height={8}
          borderRadius={5}
          bottomSpace={15}
        />
      </View>
      <View style={styles.profileContainer}>
        <Shimmer
          width={itemSize / 1.1}
          height={itemSize / 3.5}
          borderRadius={10}
        />
        <View style={styles.profileContainer} />
        <Shimmer
          width={itemSize / 3}
          height={8}
          borderRadius={5}
          bottomSpace={15}
        />
        <View style={styles.profileCircleContainer}>
          <Shimmer width={12} height={12} borderRadius={5} bottomSpace={8} />
          {Array.from(Array(11).keys()).map(i => {
            return (
              <Shimmer
                width={12}
                height={12}
                borderRadius={5}
                bottomSpace={8}
                leftBottomSpace={5}
              />
            );
          })}
        </View>
        <Shimmer
          width={itemSize / 1.3}
          height={8}
          borderRadius={5}
          bottomSpace={8}
        />
        <Shimmer
          width={itemSize / 1.1}
          height={8}
          borderRadius={5}
          bottomSpace={8}
        />
      </View>
      <ShimmerList
        width={itemSize / 2.3}
        height={itemSize + moderateScaleVertical(20)}
        padding={15}
        numColumns={2}
      />
    </View>
  );
};

export default ProductsDetailShimmer;

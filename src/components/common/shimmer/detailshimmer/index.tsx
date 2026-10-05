import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';
import Shimmer from '../../../common/shimmer';
import {moderateScaleVertical} from '../../../utils/responsiveSize';
import ShimmerList from '../listshimmer';
import {styles} from './styles';
interface Props {
  itemWdith?: number;
}

/**
 * It's a function that takes in a bunch of props and returns a FlatList with a bunch of Shimmer
 * components
 * @param {Props}  - Props) => {
 * @returns A view with a flatlist.
 */
const DetailShimmer = ({
  itemWdith = Dimensions.get('window').width / 2 - moderateScaleVertical(24),
}: Props) => {
  const [itemSize] = useState(itemWdith);

  return (
    <View style={{}}>
      <View style={styles.webSiteShimmerContainer}>
        <Shimmer
          width={itemSize * 2 + 10}
          height={7}
          borderRadius={5}
          bottomSpace={8}
        />
        <Shimmer
          width={itemSize * 2 + 10}
          height={7}
          borderRadius={5}
          bottomSpace={8}
        />
        <Shimmer
          width={itemSize * 2 + 10}
          height={7}
          borderRadius={5}
          bottomSpace={15}
        />
        <Shimmer
          width={itemSize * 2 + 10}
          height={100}
          borderRadius={15}
          bottomSpace={20}
        />
      </View>

      <ShimmerList
        width={itemSize}
        height={itemSize}
        padding={15}
        numColumns={2}
      />
    </View>
  );
};

export default DetailShimmer;

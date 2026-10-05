import React from 'react';
import {Dimensions, View} from 'react-native';
import Shimmer from '../../../common/shimmer';
import {moderateScaleVertical} from '../../../utils/responsiveSize';
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
const ConvoShimmer = ({
  itemWdith = Dimensions.get('window').width / 2 - moderateScaleVertical(24),
}: Props) => {
  return (
    <View style={styles.webSiteShimmerContainer}>
      <View style={styles.profileContainer}>
        <Shimmer width={50} height={50} borderRadius={40} bottomSpace={0} />
        <View style={styles.webSiteShimmerContainer}>
          <Shimmer width={240} height={10} borderRadius={4} bottomSpace={9} />
          <Shimmer width={180} height={7} borderRadius={3} bottomSpace={7} />
          <Shimmer width={100} height={5} borderRadius={2} bottomSpace={20} />
        </View>
      </View>
      <Shimmer width={itemWdith} height={80} borderRadius={5} bottomSpace={9} />
    </View>
  );
};

export default ConvoShimmer;

import React from 'react';
import {FlatList, View} from 'react-native';
import Shimmer from '../../../common/shimmer';

interface Props {
  padding?: number;
  numColumns?: number;
  height?: number;
  borderRadius?: number;
  horizontal?: boolean;
  width?: number;
}

/**
 * It's a function that takes in a bunch of props and returns a FlatList with a bunch of Shimmer
 * components
 * @param {Props}  - Props) => {
 * @returns A view with a flatlist.
 */
const ContestantDashboardShimmer = ({
  padding = 0,
  numColumns,
  borderRadius = 20,
  horizontal = false,
  width,
  height,
}: Props) => {
  return (
    <View>
      <FlatList
        data={[{key: '1'}, {key: '2'}, {key: '3'}, {key: '4'}]}
        key={'*'}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        numColumns={numColumns}
        horizontal={horizontal}
        renderItem={() => (
          <View>
            <Shimmer
              width={width}
              height={height}
              leftBottomSpace={padding}
              borderRadius={borderRadius}
            />
          </View>
        )}
      />
    </View>
  );
};

export default ContestantDashboardShimmer;

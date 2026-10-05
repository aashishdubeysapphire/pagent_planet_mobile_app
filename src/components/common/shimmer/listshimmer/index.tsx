import React from 'react';
import {FlatList, View} from 'react-native';
import Shimmer from '../../../common/shimmer';
import ConvoShimmer from '../convoshimmar';
import {shimmerListData} from '../../../utils/localarray';

interface Props {
  padding?: number;
  numColumns?: number;
  imageUrl?: string;
  isList?: boolean;
  isLast?: boolean;
  maxLines?: number;
  editIcon?: boolean;
  isFeaturedImage?: boolean;
  width?: number;
  height?: number;
  borderRadius?: number;
  horizontal?: boolean;
  isConvoShimmer?: boolean;
  onItemClickListener?: (param1: number) => void;
  customStyle?: Object;
}

/**
 * It's a function that takes in a bunch of props and returns a FlatList with a bunch of Shimmer
 * components
 * @param {Props}  - Props) => {
 * @returns A view with a flatlist.
 */
const ShimmerList = ({
  padding = 0,
  numColumns,
  borderRadius = 20,
  horizontal = false,
  width = 20,
  height = 20,
  isConvoShimmer = false,
  customStyle = {},
}: Props) => {
  return (
    <View>
      <FlatList
        data={shimmerListData}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        numColumns={numColumns}
        horizontal={horizontal}
        key={'#'}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <View style={{...customStyle}}>
            {isConvoShimmer ? (
              <ConvoShimmer itemWdith={width} />
            ) : (
              <Shimmer
                width={width}
                height={height}
                leftBottomSpace={padding}
                borderRadius={borderRadius}
              />
            )}
          </View>
        )}
      />
    </View>
  );
};

export default ShimmerList;

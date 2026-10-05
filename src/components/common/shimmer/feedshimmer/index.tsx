import React from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import Shimmer from '../../../common/shimmer';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';
import {styles} from './styles';
import {shimmerListData} from '../../../utils/localarray';
const {width, height} = Dimensions.get('window');
interface Props {
  numColumns?: number;
  imageUrl?: string;
  isList?: boolean;
  isLast?: boolean;
  maxLines?: number;
  editIcon?: boolean;
  isFeaturedImage?: boolean;
  horizontal?: boolean;
  onItemClickListener?: (param1: number) => void;
}

/**
 * It's a function that takes in a bunch of props and returns a FlatList with a bunch of Shimmer
 * components
 * @param {Props}  - Props) => {
 * @returns A view with a flatlist.
 */
const ShimmerFeed = ({numColumns = 1, horizontal = false}: Props) => {
  const itemSeparatorComponent = () => {
    return <View style={styles.seperatorStyle} />;
  };
  return (
    <View style={{}}>
      <FlatList
        data={shimmerListData}
        nestedScrollEnabled={true}
        numColumns={numColumns}
        key={'#'}
        showsHorizontalScrollIndicator={false}
        horizontal={horizontal}
        ItemSeparatorComponent={itemSeparatorComponent}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <View style={styles.webSiteShimmerContainer}>
            <View style={styles.headerView}>
              <Shimmer
                width={moderateScale(60)}
                height={moderateScale(60)}
                borderRadius={100}
                bottomSpace={8}
              />
              <View style={styles.headerDetail}>
                <Shimmer
                  width={moderateScale(90)}
                  height={moderateScaleVertical(10)}
                  borderRadius={5}
                  bottomSpace={8}
                />
                <Shimmer
                  width={moderateScale(150)}
                  height={moderateScaleVertical(10)}
                  borderRadius={5}
                  bottomSpace={8}
                />
                <Shimmer
                  width={moderateScale(115)}
                  height={moderateScaleVertical(10)}
                  borderRadius={5}
                  bottomSpace={8}
                />
              </View>
            </View>
            <Shimmer
              width={moderateScale(width - 40)}
              height={moderateScaleVertical(182)}
              borderRadius={5}
              leftBottomSpace={12}
            />
            <View style={styles.contentRow}>
              <Shimmer
                width={moderateScale(width - 50)}
                height={moderateScaleVertical(10)}
                borderRadius={5}
                bottomSpace={8}
              />
              <Shimmer
                width={moderateScale(width - 50)}
                height={moderateScaleVertical(10)}
                borderRadius={5}
                bottomSpace={8}
              />
            </View>
            <View style={styles.likeRow}>
              <View style={styles.row}>
                <Shimmer
                  width={moderateScale(13)}
                  height={moderateScale(13)}
                  borderRadius={100}
                  bottomSpace={8}
                />
                <Shimmer
                  width={moderateScale(13)}
                  height={moderateScale(13)}
                  borderRadius={100}
                  bottomSpace={8}
                />
                <Shimmer
                  width={moderateScale(13)}
                  height={moderateScale(13)}
                  borderRadius={100}
                  bottomSpace={8}
                />
                <View style={{justifyContent: 'center'}}>
                  <Shimmer
                    width={moderateScale(40)}
                    height={moderateScaleVertical(10)}
                    borderRadius={5}
                    bottomSpace={8}
                  />
                </View>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Shimmer
                  width={moderateScale(80)}
                  height={moderateScaleVertical(10)}
                  borderRadius={5}
                  bottomSpace={8}
                />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ShimmerFeed;

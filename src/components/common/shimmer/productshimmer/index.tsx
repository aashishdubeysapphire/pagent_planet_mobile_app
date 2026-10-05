import React from 'react';
import {Dimensions, View, FlatList} from 'react-native';
import Shimmer from '../../../common/shimmer';
import {moderateScaleVertical} from '../../../utils/responsiveSize';
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
const ProductsShimmer = ({
  itemSize = Dimensions.get('window').width / 2 - moderateScaleVertical(24),
}: Props) => {
  return (
    <>
      <FlatList
        data={[{key: '1'}, {key: '2'}, {key: '3'}, {key: '4'}, {key: '5'}]}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        key={'#'}
        showsHorizontalScrollIndicator={false}
        renderItem={() => (
          <>
            <View
              style={{
                paddingStart: moderateScaleVertical(8),
                paddingBottom: moderateScaleVertical(16),
              }}>
              <View style={styles.shimmerContainer}>
                <Shimmer
                  width={itemSize / 1.5}
                  height={itemSize / 1.5}
                  borderRadius={12}
                  bottomSpace={6}
                />
                <View style={{margin: 15}}>
                  <Shimmer
                    width={itemSize + 30}
                    height={10}
                    borderRadius={5}
                    bottomSpace={8}
                  />
                  <Shimmer
                    width={itemSize}
                    height={10}
                    borderRadius={5}
                    bottomSpace={8}
                  />
                  <Shimmer
                    width={itemSize + 30}
                    height={10}
                    borderRadius={5}
                    bottomSpace={15}
                  />
                </View>
              </View>
              <View style={{marginTop: 12}}>
                <Shimmer
                  width={2 * itemSize}
                  height={8}
                  borderRadius={5}
                  bottomSpace={8}
                />
                <Shimmer
                  width={2 * itemSize - 50}
                  height={8}
                  borderRadius={5}
                  bottomSpace={8}
                />
                <Shimmer
                  width={2 * itemSize}
                  height={8}
                  borderRadius={5}
                  bottomSpace={8}
                />
                <Shimmer
                  width={2 * itemSize - 50}
                  height={8}
                  borderRadius={5}
                  bottomSpace={15}
                />
              </View>
            </View>
          </>
        )}
      />
    </>
  );
};

export default ProductsShimmer;

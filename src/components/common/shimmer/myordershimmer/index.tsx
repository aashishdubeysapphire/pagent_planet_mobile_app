import React from 'react';
import {Dimensions, View, FlatList} from 'react-native';
import Shimmer from '../../../common/shimmer';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';
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
const MyOrdersListShimmer = ({
  itemSize = Dimensions.get('window').width / 2 - moderateScaleVertical(24),
}: Props) => {
  const itemSeparatorComponent = () => {
    return <View style={styles.seperatorStyle} />;
  };
  return (
    <>
      <FlatList
        data={[{key: '1'}, {key: '2'}, {key: '3'}, {key: '4'}]}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        key={'#'}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={itemSeparatorComponent}
        renderItem={() => (
          <>
            <View style={styles.topView}>
              <View style={styles.row}>
                <Shimmer
                  width={moderateScale(36)}
                  height={moderateScaleVertical(36)}
                  borderRadius={moderateScaleVertical(20)}
                  bottomSpace={8}
                />
                <View>
                  <Shimmer
                    width={moderateScale(90)}
                    height={10}
                    borderRadius={12}
                    leftBottomSpace={8}
                  />
                  <Shimmer
                    width={moderateScale(120)}
                    height={10}
                    borderRadius={12}
                    leftBottomSpace={8}
                  />
                </View>
              </View>
              <View style={styles.iconView}>
                <Shimmer
                  width={moderateScale(130)}
                  height={moderateScaleVertical(13)}
                  borderRadius={12}
                  bottomSpace={20}
                />
              </View>
            </View>
            <View style={styles.productContainer}>
              <View style={{padding: moderateScaleVertical(16)}}>
                <View style={styles.shimmerContainer}>
                  <Shimmer
                    width={moderateScale(78)}
                    height={moderateScaleVertical(78)}
                    borderRadius={12}
                    bottomSpace={0}
                  />
                  <View style={{margin: 12}}>
                    <Shimmer
                      width={
                        Dimensions.get('window').width -
                        moderateScaleVertical(160)
                      }
                      height={12}
                      borderRadius={10}
                      bottomSpace={8}
                    />
                    <Shimmer
                      width={itemSize}
                      height={12}
                      borderRadius={10}
                      bottomSpace={15}
                    />
                    <View style={styles.bottomView}>
                      <Shimmer
                        width={moderateScale(60)}
                        height={13}
                        borderRadius={15}
                        bottomSpace={15}
                      />
                      <Shimmer
                        width={moderateScale(50)}
                        height={13}
                        borderRadius={15}
                        bottomSpace={15}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </>
        )}
      />
    </>
  );
};

export default MyOrdersListShimmer;

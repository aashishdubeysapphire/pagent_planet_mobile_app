import React from 'react';
import {Dimensions, View, SafeAreaView, FlatList} from 'react-native';
import Shimmer from '..';
import {
  moderateScale,
  moderateScaleVertical,
  width,
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
const ShopShimmer = ({
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
          <FlatList
            data={[
              {key: '1'},
              {key: '2'},
              {key: '3'},
              {key: '4'},
              {key: '5'},
              {key: '6'},
              {key: '7'},
              {key: '8'},
              {key: '9'},
              {key: '10'},
            ]}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            numColumns={5}
            key={'#'}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={() => (
              <View style={{marginRight: moderateScale(12)}}>
                <Shimmer
                  width={moderateScale(60)}
                  height={moderateScale(60)}
                  borderRadius={moderateScale(50)}
                  bottomSpace={16}
                />
              </View>
            )}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <ShimmerList
          padding={moderateScale(15)}
          borderRadius={20}
          horizontal={false}
          numColumns={2}
          width={width/2.4}
          height={moderateScale(160)}
        />
      </View>
    </SafeAreaView>
  );
};

export default ShopShimmer;

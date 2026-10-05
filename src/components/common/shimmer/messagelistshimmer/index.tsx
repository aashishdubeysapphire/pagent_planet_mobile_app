import React from 'react';
import {FlatList, View} from 'react-native';
import Shimmer from '../../../common/shimmer';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';
import {styles} from './styles';

/**
 * It's a function that takes in a bunch of props and returns a FlatList with a bunch of Shimmer
 * components
 * @param {Props}  - Props) => {
 * @returns A view with a flatlist.
 */
const ShimmerMessageList = () => {
  return (
    <View style={styles.topContainer}>
      <Shimmer
        width={moderateScale(100)}
        height={moderateScale(12)}
        leftBottomSpace={moderateScaleVertical(25)}
        borderRadius={moderateScale(4)}
      />
      <View style={styles.separator} />
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
        ]}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        horizontal={false}
        key={'#'}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <View style={styles.container}>
            <Shimmer
              width={moderateScale(60)}
              height={moderateScale(60)}
              leftBottomSpace={10}
              borderRadius={moderateScale(30)}
            />
            <View style={styles.detailsSection}>
              <Shimmer
                width={moderateScale(100)}
                height={moderateScale(12)}
                leftBottomSpace={10}
                borderRadius={moderateScale(4)}
              />
              <Shimmer
                width={moderateScale(220)}
                height={moderateScale(8)}
                leftBottomSpace={10}
                borderRadius={moderateScale(4)}
              />
              <Shimmer
                width={moderateScale(260)}
                height={moderateScale(8)}
                leftBottomSpace={10}
                borderRadius={moderateScale(4)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ShimmerMessageList;

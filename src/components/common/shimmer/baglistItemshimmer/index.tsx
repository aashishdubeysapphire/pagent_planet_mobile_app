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
const BagListShimmer = ({
  itemSize = Dimensions.get('window').width / 2 - moderateScaleVertical(24),
}: Props) => {
  const itemSeparatorComponent = () => {
    return <View style={styles.seperatorStyle} />;
  };
  return (
    <>
      <View style={styles.greyView}>
        <View style={styles.row}>
          <Shimmer
            width={moderateScale(20)}
            height={moderateScaleVertical(20)}
            borderRadius={5}
            bottomSpace={8}
          />
          <Shimmer
            width={moderateScale(118)}
            height={12}
            borderRadius={12}
            leftBottomSpace={8}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.iconView}>
            <Shimmer
              width={moderateScale(20)}
              height={moderateScaleVertical(20)}
              borderRadius={5}
              bottomSpace={8}
            />
          </View>
          <View style={styles.iconView}>
            <Shimmer
              width={moderateScale(20)}
              height={moderateScaleVertical(20)}
              borderRadius={5}
              bottomSpace={8}
            />
          </View>
        </View>
      </View>
      <FlatList
        data={[{key: '1'}, {key: '2'}]}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        key={'#'}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={itemSeparatorComponent}
        renderItem={() => (
          <>
            <View
              style={{
                padding: moderateScaleVertical(16),
              }}>
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
                      moderateScaleVertical(118)
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
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginRight: moderateScale(32),
                    }}>
                    <Shimmer
                      width={moderateScale(88)}
                      height={13}
                      borderRadius={15}
                      bottomSpace={15}
                    />
                    <Shimmer
                      width={moderateScale(88)}
                      height={13}
                      borderRadius={15}
                      bottomSpace={15}
                    />
                  </View>
                </View>
              </View>
              <View style={{marginTop: 12}}>
                <Shimmer
                  width={
                    Dimensions.get('window').width - moderateScaleVertical(32)
                  }
                  height={10}
                  borderRadius={5}
                  bottomSpace={8}
                />
                <Shimmer
                  width={2 * itemSize - 50}
                  height={10}
                  borderRadius={5}
                  bottomSpace={8}
                />
              </View>
            </View>
          </>
        )}
      />
      <View style={styles.seperatorStyle} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: moderateScale(16),
        }}>
        <Shimmer
          width={moderateScale(150)}
          height={13}
          borderRadius={15}
          bottomSpace={15}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: moderateScale(16),
        }}>
        <Shimmer
          width={moderateScale(110)}
          height={10}
          borderRadius={15}
          bottomSpace={10}
        />
        <Shimmer
          width={moderateScale(68)}
          height={10}
          borderRadius={15}
          bottomSpace={10}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: moderateScale(16),
        }}>
        <Shimmer
          width={moderateScale(70)}
          height={10}
          borderRadius={15}
          bottomSpace={10}
        />
        <Shimmer
          width={moderateScale(78)}
          height={10}
          borderRadius={15}
          bottomSpace={10}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: moderateScale(16),
        }}>
        <Shimmer
          width={moderateScale(120)}
          height={10}
          borderRadius={15}
          bottomSpace={10}
        />
        <Shimmer
          width={moderateScale(58)}
          height={10}
          borderRadius={15}
          bottomSpace={10}
        />
      </View>
      <View style={styles.seperatorStyle} />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          margin: moderateScale(16),
        }}>
        <Shimmer
          width={moderateScale(150)}
          height={13}
          borderRadius={15}
          bottomSpace={15}
        />
        <Shimmer
          width={Dimensions.get('window').width - moderateScaleVertical(32)}
          height={moderateScaleVertical(80)}
          borderRadius={5}
          bottomSpace={15}
        />
      </View>
    </>
  );
};

export default BagListShimmer;

import {View, FlatList} from 'react-native';
import React from 'react';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';
import Shimmer from '../../../../../common/shimmer';
import {styles} from './styles';
const CommentShimmer = ({postShimmerOnly = false}) => {
  const itemSeparatorComponent = () => {
    return <View style={styles.seperatorStyle} />;
  };
  return (
    <>
      {postShimmerOnly ? (
        <View style={styles.webSiteShimmerContainer}>
          <View style={styles.headerView}>
            <Shimmer
              width={moderateScale(60)}
              height={moderateScale(60)}
              borderRadius={99}
              bottomSpace={8}
            />
            <View style={styles.headerDetail}>
              <Shimmer
                width={moderateScale(90)}
                height={moderateScaleVertical(9)}
                borderRadius={5}
                bottomSpace={8}
              />
              <Shimmer
                width={moderateScale(150)}
                height={moderateScaleVertical(9)}
                borderRadius={5}
                bottomSpace={8}
              />
              <Shimmer
                width={moderateScale(115)}
                height={moderateScaleVertical(9)}
                borderRadius={5}
                bottomSpace={8}
              />
            </View>
          </View>
          <Shimmer
            width={'100%'}
            height={moderateScaleVertical(182)}
            borderRadius={5}
            bottomSpace={8}
          />
          <View style={styles.contentRow}>
            <Shimmer
              width={'94%'}
              height={moderateScaleVertical(9)}
              borderRadius={5}
              bottomSpace={8}
            />
            <Shimmer
              width={'87%'}
              height={moderateScaleVertical(9)}
              borderRadius={5}
              bottomSpace={8}
            />
          </View>
          <View style={styles.likeRow}>
            <View style={styles.row}>
              <Shimmer
                width={moderateScale(12)}
                height={moderateScale(12)}
                borderRadius={100}
                bottomSpace={8.1}
              />
              <Shimmer
                width={moderateScale(12)}
                height={moderateScale(12)}
                borderRadius={100}
                bottomSpace={8.1}
              />
              <Shimmer
                width={moderateScale(12)}
                height={moderateScale(12)}
                borderRadius={100}
                bottomSpace={8.1}
              />
              <View style={{justifyContent: 'center'}}>
                <Shimmer
                  width={moderateScale(40)}
                  height={moderateScaleVertical(9)}
                  borderRadius={5}
                  bottomSpace={8}
                />
              </View>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Shimmer
                width={moderateScale(80)}
                height={moderateScaleVertical(9)}
                borderRadius={5}
                bottomSpace={8}
              />
            </View>
          </View>
        </View>
      ) : (
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
            {key: '11'},
            {key: '12'},
            {key: '13'},
            {key: '24'},
            {key: '15'},
            {key: '16'},
            {key: '17'},
            {key: '18'},
            {key: '19'},
            {key: '20'},
          ]}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          key={'#'}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={itemSeparatorComponent}
          renderItem={({item, index}) => (
            <View>
              <View style={styles.webSiteShimmerContainer}>
                <View style={styles.headerView}>
                  <Shimmer
                    width={moderateScale(40)}
                    height={moderateScale(40)}
                    borderRadius={100}
                    bottomSpace={8}
                  />
                  <View style={styles.headerDetail}>
                    <Shimmer
                      width={'70%'}
                      height={moderateScaleVertical(8)}
                      borderRadius={5}
                      bottomSpace={8}
                    />
                    <Shimmer
                      width={'90%'}
                      height={moderateScaleVertical(8)}
                      borderRadius={5}
                      bottomSpace={8}
                    />
                    <Shimmer
                      width={'80%'}
                      height={moderateScaleVertical(8)}
                      borderRadius={5}
                      bottomSpace={8}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </>
  );
};

export default CommentShimmer;

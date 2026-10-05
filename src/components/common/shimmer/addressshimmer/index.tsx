import React from 'react';
import {FlatList, View} from 'react-native';
import Shimmer from '../../../common/shimmer';
import {width} from '../../../utils/responsiveSize';
import {styles} from './styles';

interface Props {
  changePassword: boolean;
}

const AddressShimmer = ({changePassword}: Props) => {
  const commonComponent = () => {
    return (
      <View style={styles.addressSection}>
        <Shimmer width={30} height={30} borderRadius={16} bottomSpace={2} />
        <View>
          <Shimmer
            width={width / 1.3}
            height={10}
            borderRadius={4}
            leftBottomSpace={6}
          />
          <Shimmer
            width={width / 2.2}
            height={10}
            borderRadius={4}
            leftBottomSpace={6}
          />
        </View>
      </View>
    );
  };
  return (
    <FlatList
      data={[
        {key: '1'},
        {key: '2'},
        {key: '3'},
        {key: '4'},
        {key: '5'},
        {key: '6'},
      ]}
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      numColumns={1}
      horizontal={false}
      key={'#'}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => (
        <View style={styles.Container}>
          <View style={styles.wrapper}>
            {!changePassword ? (
              <>
                <Shimmer
                  width={width / 2.4}
                  height={14}
                  borderRadius={4}
                  bottomSpace={10}
                />
                <Shimmer
                  width={width / 2}
                  height={12}
                  borderRadius={4}
                  bottomSpace={10}
                />
              </>
            ) : null}
            {commonComponent()}
            {commonComponent()}
            {commonComponent()}
          </View>
          <Shimmer
            width={width * 1.2}
            height={20}
            borderRadius={5}
            bottomSpace={8}
          />
        </View>
      )}
    />
  );
};

export default AddressShimmer;

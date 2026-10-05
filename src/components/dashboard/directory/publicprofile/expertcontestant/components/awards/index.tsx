import React from 'react';
import {FlatList, Linking, TouchableOpacity, View} from 'react-native';
import {moderateScale} from '../../../../../../utils/responsiveSize';
import {styles} from './styles';
import FastImageView from '../../../../../../../components/common/fastimageview';

const AwardsList = ({data}) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={data}
        keyExtractor={(x, i) => i.toString()}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        initialNumToRender={5}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.wrapper}
            onPress={() =>
              item?.image_url ? Linking.openURL(item?.image_url) : null
            }>
            <View style={styles.imageSection}>
              <FastImageView
                width={moderateScale(154)}
                height={moderateScale(154)}
                borderRadius={moderateScale(20)}
                imageUrl={
                  item?.trophy_original_image_path !== undefined
                    ? item?.trophy_original_image_path
                    : item?.imageSrc
                }
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default AwardsList;

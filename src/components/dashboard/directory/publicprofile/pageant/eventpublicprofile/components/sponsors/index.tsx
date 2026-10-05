import React from 'react';
import {FlatList, View} from 'react-native';
import {styles} from './styles';
import {Sponser} from '../../../../../../../../services/models/pageantdetails/pageantPublicProfile';
import SponsorItem from '../../../../../../../common/sponsoritem';
import {moderateScaleVertical} from '../../../../../../../utils/responsiveSize';

interface Props {
  dataList: Sponser[];
  itemSize: number;
  onButtonClick: any;
}

const SponsorsList = ({dataList, itemSize, onButtonClick}: Props) => {
  return (
    <View
      style={{
        ...styles.wrapper,
        height: itemSize + moderateScaleVertical(50 + 30),
      }}>
      <FlatList
        horizontal={true}
        data={dataList}
        keyExtractor={(x, i) => i.toString()}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        initialNumToRender={5}
        renderItem={({item, index}) => (
          <SponsorItem
            position={index}
            imageUrl={item?.logoSrc}
            label={item?.name}
            maxLines={2}
            onItemClickListener={onButtonClick}
            size={itemSize}
            horizontal={true}
          />
        )}
      />
    </View>
  );
};

export default SponsorsList;

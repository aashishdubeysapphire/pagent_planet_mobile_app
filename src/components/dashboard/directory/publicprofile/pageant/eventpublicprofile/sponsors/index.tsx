import React from 'react';
import {SafeAreaView, View, FlatList} from 'react-native';
import {styles} from './styles';
import translations from '../../../../../../../assets/translations';
import Header from '../../../../../../common/header';
import useInfiniteHtQuery from '../../../../../../../services/api/useHtInfiniteQuery';
import {Base} from '../../../../../../../services/models/base';
import {EVENT_PUBLIC_PROFILE_SPONSOR_LIST} from '../../../../../../../services/endpoints';
import {Param} from '../../../../../../../services/constants';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../../../utils/responsiveSize';
import {PageantPublicProfileResponse} from '../../../../../../../services/models/pageantdetails/pageantPublicProfile';
import ShimmerList from '../../../../../../common/shimmer/listshimmer';
import SponsorItem from '../../../../../../common/sponsoritem';
import {openWebLink} from '../../../../../../utils/helperFunction';
import { checkIsNull } from '../../../../../../utils/validations';

const EventPublicProfileSponsors = ({route}) => {
  const itemSize = width / 2 - moderateScale(24);
  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
  } = useInfiniteHtQuery<Base<PageantPublicProfileResponse>>({
    key: EVENT_PUBLIC_PROFILE_SPONSOR_LIST + route.params.eventId,
    url: EVENT_PUBLIC_PROFILE_SPONSOR_LIST + route.params.eventId,
    page: Param.PAGE_,
    getDataArray: page => page?.data?.sponsors?.length,
    reverse: true,
    disableLoader: true,
  });

  const pageantList =
    paginatedData?.pages
      ?.map((page: Base<PageantPublicProfileResponse>) => {
        if (
          page?.data?.sponsors !== null &&
          page?.data?.sponsors !== undefined
        ) {
          return page?.data?.sponsors;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  const onItemClick = (index: number) => {
    if(checkIsNull(pageantList[index].link)){
      openWebLink(pageantList[index].link);
    } 
  };

  /**
   * It fetches the next page of data when the user scrolls to the bottom of the page.
   */
  const onEndReached = async () => {
    fetchNextPage();
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Header lable={translations.SPONSORS} isUnderLineRequired />
      <View
        style={{
          ...styles.space,
          height: itemSize + moderateScaleVertical(50 + 30),
        }}>
        {pageantList?.length > 0 && !isLoading ? (
          <FlatList
            data={pageantList}
            onEndReached={onEndReached}
            keyExtractor={(x, i) => i.toString()}
            showsHorizontalScrollIndicator={false}
            numColumns={2}
            renderItem={({item, index}) => (
              <SponsorItem
                position={index}
                imageUrl={item?.logoSrc}
                label={item?.name}
                maxLines={2}
                onItemClickListener={onItemClick}
                size={itemSize}
                horizontal={false}
              />
            )}
          />
        ) : (
          isLoading && (
            <View style={[{flex: 1, marginLeft: -moderateScale(16)}]}>
              <ShimmerList
                width={itemSize}
                height={itemSize + moderateScaleVertical(20)}
                padding={15}
                numColumns={2}
              />
            </View>
          )
        )}
      </View>
    </SafeAreaView>
  );
};

export default EventPublicProfileSponsors;

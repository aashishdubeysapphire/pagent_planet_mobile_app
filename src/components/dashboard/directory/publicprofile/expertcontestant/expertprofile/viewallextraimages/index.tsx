import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, Dimensions, View} from 'react-native';
import {styles} from './styles';
import {PUBLIC_PROFILE_EXPERT_EXTRA_IMAGES} from '../../../../../../../services/endpoints';
import Header from '../../../../../../common/header';
import NoRecord from '../../../../../../common/norecord';
import AppImages from '../../../../../../../assets/images/AppImages';
import useInfiniteHtQuery from '../../../../../../../services/api/useHtInfiniteQuery';
import {moderateScaleVertical} from '../../../../../../utils/responsiveSize';
import ShimmerList from '../../../../../../common/shimmer/listshimmer';
import {useNetInfo} from '@react-native-community/netinfo';
import {Param} from '../../../../../../../services/constants';
import {PageantResult} from '../../../../../../../services/models/pageantdetails/contestantPublicDetails';
import GalleryGridItem from '../../../../../../common/gallerygriditem';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../root/screenname';
import { trackScreenView } from '../../../../../../utils/helperFunction';
import { ANALYTICS_SCREEN } from '../../../../../../../assets/translations/analyticsscreenname';

const ViewAllExpertExtraImages = ({route}) => {
  const [isTouchEnable, setTouchEnable] = useState(true);
  const [itemSize, setItemSize] = useState(Number);
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  //API GALLERY Images ----------------------------------------- START
  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
  } = useInfiniteHtQuery<PageantResult>({
    key: PUBLIC_PROFILE_EXPERT_EXTRA_IMAGES + route.params.business_profile_id,
    url: PUBLIC_PROFILE_EXPERT_EXTRA_IMAGES + route.params.business_profile_id,
    page: Param.PAGE_,
    getDataArray: page => {
      return page.data?.extraImages.length;
    },
    offSuccessToast: true,
  });

  const albumList =
    paginatedData?.pages
      ?.map((page: PageantResult) => {
        if (
          page?.data?.extraImages !== null &&
          page?.data?.extraImages !== undefined
        ) {
          return page.data?.extraImages;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  const onEndReached = async () => {
    fetchNextPage();
  };

  useEffect(() => {
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
    trackScreenView(ANALYTICS_SCREEN.EXPERT_PUBLIC_PROFILE_EXTRA_IMAGES)
  }, []);

  const onItemClick = (index: number) => {
    if (isTouchEnable) {
      setTouchEnable(false);
      setTimeout(() => {
        setTouchEnable(true);
      }, 1000);
      navigation.navigate(SCREEN.ALBUM_DETAIL, {
        albumList: albumList,
        index: index,
        displayKey:
          route.params.business_profile_id + new Date().getMilliseconds() + '',
        isPublicProfileView: true,
        lbumId: route.params.business_profile_id,
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header lable={route.params.screenName} isUnderLineRequired />
        <View style={styles.gap} />
        {albumList.length > 0 ? (
          <FlatList
            data={albumList}
            onEndReached={onEndReached}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={2}
            numColumns={2}
            key={'#'}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            renderItem={({item, index}) => (
              <GalleryGridItem
                position={index}
                imageId={item.image_id.toString()}
                imageUrl={'' + item.imageSrc}
                maxLines={1}
                onItemClickListener={() => {
                  onItemClick(index);
                }}
                editIcon={false}
                size={itemSize}
              />
            )}
          />
        ) : isLoading && netInfo.isInternetReachable ? (
          <ShimmerList
            width={itemSize}
            height={itemSize}
            padding={15}
            numColumns={2}
          />
        ) : (
          netInfo.isInternetReachable && (
            <NoRecord rightIcon={<AppImages.Common.NO_IMAGE_FOUND_ICON />} />
          )
        )}
      </View>
    </SafeAreaView>
  );
};

export default ViewAllExpertExtraImages;

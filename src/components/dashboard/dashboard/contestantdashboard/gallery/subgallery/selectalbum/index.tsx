import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Dimensions,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AppImages from '../../../../../../../assets/images/AppImages';
import GalleryGridItem from '../../../../../../common/gallerygriditem';
import {styles} from './styles';
import {GALLERY} from '../../../../../../../services/endpoints';
import {GalleryData} from '../../../../../../../services/models/gallery/galleryData';
import useInfiniteHtQuery from '../../../../../../../services/api/useHtInfiniteQuery';
import {SCREEN} from '../../../../../../../root/screenname';
import {useNavigation} from '@react-navigation/native';
import {Param} from '../../../../../../../services/constants';
import translations from '../../../../../../../assets/translations';
import {moderateScaleVertical} from '../../../../../../utils/responsiveSize';
import NoRecord from '../../../../../../common/norecord';
import ShimmerList from '../../../../../../common/shimmer/listshimmer';
import {useNetInfo} from '@react-native-community/netinfo';
import Header from '../../../../../../common/header';
import {PARAM_VALUE} from '../../../../../../utils/enum';

const SelectableAlbum = props => {
  const [isListActive, setListState] = useState(false);
  const navigation = useNavigation();
  const [itemSize, setItemSize] = useState(Number);
  const netInfo = useNetInfo();

  //API GALLERY----------------------------------------- START
  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
  } = useInfiniteHtQuery<GalleryData>({
    key: GALLERY + props?.route?.params?.galleryParam,
    url: GALLERY + props?.route?.params?.galleryParam,
    page: Param.PAGE_,
    getDataArray: page => page?.data?.galleryList?.length,
    reverse: true,
  });

  let galleryList =
    paginatedData?.pages
      ?.map((page: GalleryData) => {
        if (
          page?.data?.galleryList !== null &&
          page?.data?.galleryList !== undefined
        ) {
          return page?.data?.galleryList;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  galleryList = galleryList.filter(function (obj) {
    return obj.album_name !== PARAM_VALUE.GENERAL;
  });

  //API GALLERY----------------------------------------- END

  const onListModeActive = () => {
    setListState(!isListActive);
  };

  useEffect(() => {
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
  }, []);

  const onEndReached = async () => {
    fetchNextPage();
  };

  const onItemClick = (galleryItem: number) => {
    navigation.navigate(SCREEN.EVENT_SUB_GALLERY, {
      galleryItem: galleryList[galleryItem],
      isMoveImage: true,
      selectedImageId: props?.route?.params?.selectedImageId,
      noOfItemSelected: props?.route?.params?.noOfItemSelected,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header lable={translations.SELECT_ALBUM} isUnderLineRequired />
      <View style={styles.modeContainer}>
        <TouchableOpacity onPress={onListModeActive}>
          {isListActive ? (
            <AppImages.Gallery.GridActive_ICON />
          ) : (
            <AppImages.Gallery.ListActive_ICON />
          )}
        </TouchableOpacity>
      </View>

      {galleryList?.length > 0 ? (
        <FlatList
          data={galleryList}
          onEndReached={onEndReached}
          showsVerticalScrollIndicator={false}
          numColumns={isListActive ? 1 : 2}
          key={isListActive ? '_' : '#'}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <GalleryGridItem
              position={index}
              imageUrl={item.original_image}
              label={item.album_name}
              maxLines={isListActive ? 3 : 1}
              isList={isListActive}
              onItemClickListener={onItemClick}
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
      ) : netInfo.isInternetReachable ? (
        <NoRecord rightIcon={<AppImages.Common.NO_IMAGE_FOUND_ICON />} />
      ) : (
        <View />
      )}
    </SafeAreaView>
  );
};

export default SelectableAlbum;

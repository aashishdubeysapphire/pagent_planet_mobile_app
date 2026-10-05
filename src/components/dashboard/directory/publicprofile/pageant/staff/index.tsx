import React, {useState, useEffect} from 'react';
import {
  FlatList,
  ScrollView,
  SafeAreaView,
  Dimensions,
  View,
} from 'react-native';
import AppImages from '../../../../../../assets/images/AppImages';
import GalleryGridItem from '../../../../../common/gallerygriditem';
import {styles} from './styles';
import {PAGEANT_PUBLIC_PROFILE_STAFF} from '../../../../../../services/endpoints';
import useInfiniteHtQuery from '../../../../../../services/api/useHtInfiniteQuery';
import translations from '../../../../../../assets/translations';
import {moderateScaleVertical} from '../../../../../utils/responsiveSize';
import NoRecord from '../../../../../common/norecord';
import ShimmerList from '../../../../../common/shimmer/listshimmer';
import {useNetInfo} from '@react-native-community/netinfo';
import {Param} from '../../../../../../services/constants';
import Header from '../../../../../common/header';
import {PageantPublicProfileResponse} from '../../../../../../services/models/pageantdetails/pageantPublicProfile';
import {Base} from '../../../../../../services/models/base';

const PageantPublicProfileStaff = ({route}) => {
  const [itemSize, setItemSize] = useState(Number);

  const netInfo = useNetInfo();

  //API GALLERY----------------------------------------- START
  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
  } = useInfiniteHtQuery<Base<PageantPublicProfileResponse>>({
    key: PAGEANT_PUBLIC_PROFILE_STAFF + route.params.profileId,
    url: PAGEANT_PUBLIC_PROFILE_STAFF + route.params.profileId,
    page: Param.PAGE_,
    getDataArray: page => page?.data?.pageantStaffList?.data?.length,
    reverse: true,
    disableLoader: true,
  });

  const galleryList =
    paginatedData?.pages
      ?.map((page: Base<PageantPublicProfileResponse>) => {
        if (
          page?.data?.pageantStaffList?.data !== null &&
          page?.data?.pageantStaffList?.data !== undefined
        ) {
          return page?.data?.pageantStaffList?.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  //API GALLERY----------------------------------------- END

  /* Setting the item size of the gallery grid item. */
  useEffect(() => {
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
  }, []);

  /**
   * It fetches the next page of data when the user scrolls to the bottom of the page.
   */
  const onEndReached = async () => {
    fetchNextPage();
  };

  /**
   * It returns a View component with a style of staticHeight
   * @returns A view with a static height.
   */
  const listFooterComponent = () => {
    return <View style={styles.staticHeight} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header lable={translations.STAFF} isUnderLineRequired />
      <View style={styles.space} />
      {galleryList !== undefined && galleryList.length > 0 ? (
        <FlatList
          data={galleryList}
          nestedScrollEnabled={true}
          onEndReached={onEndReached}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          key={'#'}
          ListFooterComponent={listFooterComponent}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <GalleryGridItem
              position={index}
              imageUrl={item?.headshot_image_full_url}
              label={item?.first_name + ' ' + item?.last_name}
              maxLines={1}
              customStyles={styles.customTitleStyles}
              size={itemSize}
            />
          )}
        />
      ) : isLoading ? (
        <View style={[{flex: 1}]}>
          <ShimmerList
            width={itemSize}
            height={itemSize + moderateScaleVertical(20)}
            padding={15}
            numColumns={2}
          />
        </View>
      ) : (
        netInfo.isInternetReachable && (
          <View style={styles.container}>
            <ScrollView
              keyboardShouldPersistTaps={'handled'}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: moderateScaleVertical(90),
                paddingHorizontal: moderateScaleVertical(8),
              }}>
              <NoRecord
                text={translations.NO_STAFF_FOUND}
                rightIcon={
                  <AppImages.Common.NO_FILTER_RESULT_FOUND_ICON
                    width={itemSize * 2 + 12}
                  />
                }
              />
            </ScrollView>
          </View>
        )
      )}
    </SafeAreaView>
  );
};

export default PageantPublicProfileStaff;

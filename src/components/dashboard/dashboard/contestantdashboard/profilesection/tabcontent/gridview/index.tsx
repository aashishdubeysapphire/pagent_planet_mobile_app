import React, {useState, useEffect} from 'react';
import {FlatList, View, Dimensions, TouchableOpacity, Text} from 'react-native';
import {styles} from './styles';
import translations from '../../../../../../../assets/translations';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppImages from '../../../../../../../assets/images/AppImages';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';
import AwardsGrid from '../../../../../../common/awardsgrid';
import {checkDownloadPermission} from '../../../../../../utils/permissions';
import {downloadImage} from '../../../../../../utils/downloadImage';
import {toast, toastType} from '../../../../../../common/commonalert';
import ShimmerList from '../../../../../../common/shimmer/listshimmer';
import useInfiniteHtQuery from '../../../../../../../services/api/useHtInfiniteQuery';
import {AssociateBusinessData} from '../../../../../../../services/models/associatebusiness/associateBusinessData';
import {Param, Public_Profile} from '../../../../../../../services/constants';
import {ContestantAwardsData} from '../../../../../../../services/models/pageantdetails/contestantAwards';
import {
  GET_EVENT_AWARDS,
  GET_EXPERT_VIEWAL_ALL_AWARDS,
  GET_PAGEANT_AWARDS,
} from '../../../../../../../services/endpoints';
import GalleryGridItem from '../../../../../../common/gallerygriditem';

const GridComponent = props => {
  const [url, setUrl] = useState(props?.route?.params?.Url);
  const [label, setLabel] = useState(props?.route?.params?.screenName);
  const [itemWidth, setItemWidth] = useState(Number);
  const [itemHeight, setItemHeight] = useState(Number);

  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
  } = useInfiniteHtQuery({
    key: url + label + props?.route?.params?.contestantId,
    url: url + props?.route?.params?.contestantId,
    page: Param.PAGE_,
    reverse: true,
  });

  let eventListData;
  if (label === translations.ASSOCIATE_BUSINESS) {
    eventListData =
      paginatedData?.pages
        ?.map((page: AssociateBusinessData) => {
          if (page?.data?.data !== null) {
            return page?.data?.data;
          } else {
            return [];
          }
        })
        .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];
  } else if (
    url.includes(GET_EXPERT_VIEWAL_ALL_AWARDS) ||
    url.includes(GET_PAGEANT_AWARDS) ||
    url.includes(GET_EVENT_AWARDS)
  ) {
    eventListData =
      paginatedData?.pages
        ?.map(page => {
          if (page?.data?.awards.data !== null) {
            return page?.data?.awards.data;
          } else {
            return [];
          }
        })
        .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];
  } else {
    eventListData =
      paginatedData?.pages
        ?.map((page: ContestantAwardsData) => {
          if (page?.data?.contestant_awards?.data !== null) {
            return page?.data?.contestant_awards?.data;
          } else {
            return [];
          }
        })
        .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];
  }

  const onEndReached = async () => {
    fetchNextPage();
  };

  const onItemClick = (galleryItem: number) => {
    //empty
  };

  useEffect(() => {
    setItemWidth(Dimensions.get('window').width / 2 - moderateScale(25));
    setItemHeight(
      Dimensions.get('window').width / 1.6 - moderateScaleVertical(24),
    );
  }, [eventListData]);

  const onPressHandle = async (path: string, name: string) => {
    const response = await checkDownloadPermission();
    if (response) {
      downloadImage(path);
    } else {
      toast(translations.STORAGE_PERMISION_NOT_GRANTED, toastType.ERROR_TOAST);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}>
          <AppImages.Common.Back_ICON style={styles.backIcon} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginLeft: moderateScale(10)}}>
          <Text style={styles.lableStyle}>{label}</Text>
        </View>
      </View>
      <View style={{marginTop: moderateScaleVertical(16)}}>
        {eventListData?.length > 0 ? (
          <FlatList
            data={eventListData}
            onEndReached={onEndReached}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            key={'@'}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) =>
              props?.route?.params?.type === Public_Profile &&
              label === translations.AWARDS ? (
                <GalleryGridItem
                  imageUrl={item?.trophy_original_image_path}
                  editIcon={false}
                  position={index}
                  size={itemWidth}
                  url={item?.image_url}
                />
              ) : (
                <AwardsGrid
                  imageUrl={
                    label === translations.AWARDS
                      ? item?.trophy_original_image_path
                      : item?.from_business?.image
                  }
                  url={item?.image_url}
                  label={
                    label === translations.AWARDS
                      ? item?.image_title
                      : item?.from_business?.business_title
                  }
                  onItemClickListener={onItemClick}
                  screenName={label}
                  onPressButtonClick={() => {
                    onPressHandle(item?.trophy_original_image_path, label);
                  }}
                  ratings={
                    label === translations.AWARDS
                      ? null
                      : item?.from_business?.rating_average
                  }
                  review_count={
                    label === translations.AWARDS
                      ? 0
                      : item?.from_business?.review_count
                  }
                  numberOfLinesForHeading={2}
                />
              )
            }
          />
        ) : (
          isLoading && (
            <ShimmerList
              width={itemWidth}
              height={itemHeight}
              padding={15}
              numColumns={2}
            />
          )
        )}
      </View>
    </SafeAreaView>
  );
};

export default GridComponent;

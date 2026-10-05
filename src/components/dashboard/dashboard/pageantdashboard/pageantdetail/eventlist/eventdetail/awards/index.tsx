import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import ShimmerList from '../../../../../../../common/shimmer/listshimmer';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../../../../utils/responsiveSize';
import {styles} from './styles';
import FastImageView from '../../../../../../../common/fastimageview';
import AppImages from '../../../../../../../../assets/images/AppImages';
import translations from '../../../../../../../../assets/translations';
import useInfiniteHtQuery from '../../../../../../../../services/api/useHtInfiniteQuery';
import {Base} from '../../../../../../../../services/models/base';
import {Param} from '../../../../../../../../services/constants';
import {PagentEventAwards} from '../../../../../../../../services/models/pageantdetails/pagenteventawards';
import {downloadImage} from '../../../../../../../utils/downloadImage';
import {
  openWebLink,
  trackScreenView,
} from '../../../../../../../utils/helperFunction';
import {ANALYTICS_SCREEN} from '../../../../../../../../assets/translations/analyticsscreenname';

interface Props {
  isFlatListScrollEnable: boolean;
  url: string;
  isPageant: boolean;
}

const Awards = ({isFlatListScrollEnable, url, isPageant}: Props) => {
  useEffect(() => {
    trackScreenView(
      isPageant
        ? ANALYTICS_SCREEN.PAGEANT_AWARDS
        : ANALYTICS_SCREEN.EVENT_AWARDS,
    );
  }, []);

  const RenderItem = item => {
    const data = item?.item?.item;
    return (
      <TouchableOpacity
        style={styles.continer}
        onPress={() => (data?.image_url ? openWebLink(data?.image_url) : null)}>
        <View style={styles.subcontiner}>
          <View style={styles.zindex}>
            <FastImageView
              width={width / 2 - moderateScale(24)}
              height={width / 2 - moderateScale(24)}
              borderRadius={moderateScaleVertical(20)}
              imageUrl={data?.trophy_thumb_image_path}
            />
          </View>

          <TouchableOpacity
            style={styles.downloadView}
            onPress={() => {
              downloadImage(data.trophy_original_image_path);
            }}>
            <View style={styles.innerView}>
              <View style={styles.downloadViewIcon}>
                <AppImages.Dashboard.download_ICON />
              </View>
              <Text style={styles.downloadText}>{translations.DOWNLOAD}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  //API GET BIP AWARDS LIST----------------------------------------- START
  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
  } = useInfiniteHtQuery<Base<PagentEventAwards>>({
    key: url,
    url: url,
    page: Param.PAGE_,
    reverse: true,
    disableLoader: true,
  });

  let dataList;
  if (isPageant) {
    dataList =
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
    dataList =
      paginatedData?.pages
        ?.map(page => {
          if (
            page?.data?.event_awards?.data !== null &&
            page?.data?.event_awards?.data !== undefined
          ) {
            return page?.data?.event_awards.data;
          } else {
            return [];
          }
        })
        .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];
  }
  //API GET BIP AWARDS LIST----------------------------------------- END

  const emptyList = () => {
    return <AppImages.Common.NoRecordIcon />;
  };

  return (
    <View>
      <Text style={styles.heading}>{translations.AWARDS}</Text>
      <View>
        {isLoading ? (
          <ShimmerList
            width={width / 2 - moderateScale(24)}
            height={moderateScaleVertical(196)}
            padding={16}
            numColumns={2}
          />
        ) : (
          <FlatList
            data={dataList}
            numColumns={2}
            scrollEnabled={isFlatListScrollEnable}
            renderItem={item => <RenderItem item={item} />}
            onEndReached={() => fetchNextPage}
            ListEmptyComponent={emptyList}
          />
        )}
      </View>
      <View style={styles.height} />
    </View>
  );
};

export default Awards;

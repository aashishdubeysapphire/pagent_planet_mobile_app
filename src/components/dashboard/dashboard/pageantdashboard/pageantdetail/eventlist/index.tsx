import React, { useState, useEffect } from 'react';
import { Dimensions, View, FlatList } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import AppImages from '../../../../../../assets/images/AppImages';
import NoRecord from '../../../../../common/norecord';
import ShimmerList from '../../../../../common/shimmer/listshimmer';
import { SCREEN } from '../../../../../../root/screenname';
import { useNetInfo } from '@react-native-community/netinfo';
import UpcomingPageantGridListView from '../../../../../common/upcomingpageantgridlist';
import { moderateScaleVertical } from '../../../../../utils/responsiveSize';
import { Pageant } from '../../../../../../services/models/pageantdetails/pageant';
import { PARAM_VALUE } from '../../../../../utils/enum';
import { AdvertisingBannerData } from '../../../../../../services/models/pageantdetails/pageantDetailData';
import { PlanData } from '../../../../../../services/models/planData';
import { trackScreenView } from '../../../../../utils/helperFunction';
import { ANALYTICS_SCREEN } from '../../../../../../assets/translations/analyticsscreenname';

interface Props {
  list: Pageant[];
  plan: AdvertisingBannerData;
  parentImageUrl: string;
  parentBannerImageUrl: string;
  parentWebsiteUrl: string;
  parentTitle: string;
  pageantDetail: Pageant;
  pageantPlanDetail?: PlanData;
  isFlatListScroolEnable: boolean;
}
const PageantEventList = ({
  list,
  plan,
  parentImageUrl,
  parentBannerImageUrl,
  parentWebsiteUrl,
  parentTitle,
  pageantDetail,
  pageantPlanDetail,
  isFlatListScroolEnable,
}: Props) => {
  const [itemSize, setItemSize] = useState(-1);
  const [pagentLogoImageUrl] = useState(parentImageUrl);
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  useEffect(() => {
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
    trackScreenView(ANALYTICS_SCREEN.EVENT_LIST);
  }, []);

  const onItemClick = (index: number) => {
    navigation.navigate(SCREEN.EVENT_DETAIL, {
      pageantEventDetailId: list[index].id,
      pageantEventDetail: list[index],
      plan: plan,
      pagentLogo: pagentLogoImageUrl,
      parentBannerImageUrl: parentBannerImageUrl,
      parentWebsiteUrl: parentWebsiteUrl,
      parentTitle: parentTitle,
      pageantPlanDetail: pageantPlanDetail,
      pageantDetail: pageantDetail,
    });
  };
  const listFooterComponent = () => {
    return <View style={styles.staticHeight} />;
  };

  return (
    <View style={styles.container}>
      {list.length > 0 && itemSize > 0 ? (
        <FlatList
          data={list}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          key={'_'}
          bounces={false}
          alwaysBounceVertical={false}
          ListFooterComponent={listFooterComponent}
          nestedScrollEnabled={true}
          scrollEnabled={isFlatListScroolEnable}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <UpcomingPageantGridListView
              position={index}
              imageUrl={
                item.main_image_full_url === null
                  ? pagentLogoImageUrl
                  : item.main_image_full_url
              }
              label={item.title}
              maxLines={2}
              eventYearName={item.eventYearName}
              isInactive={item.status !== PARAM_VALUE.ACTIVE}
              onItemClickListener={onItemClick}
              ratings={item?.average_rating}
              isDisplayYear
              ratingsCount={item?.rating_count}
              participantsCount={item?.participants_count}
              isList={false}
              size={itemSize}
            />
          )}
        />
      ) : netInfo.isInternetReachable ? (
        <ShimmerList
          width={itemSize}
          height={itemSize}
          padding={15}
          numColumns={2}
        />
      ) : netInfo.isInternetReachable ? (
        <NoRecord rightIcon={<AppImages.Common.NoRecordIcon />} />
      ) : (
        <View />
      )}
    </View>
  );
};

export default PageantEventList;

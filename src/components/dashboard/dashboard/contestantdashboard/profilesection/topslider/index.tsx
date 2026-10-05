import React, {useRef, useEffect, useState} from 'react';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import AppImages from '../../../../../../assets/images/AppImages';
import {styles} from './styles';
import translations from '../../../../../../assets/translations';

export const contestantTabs = [
  {
    title: translations.PROFILE,
    cover: AppImages.Dashboard.inactiveProfile_ICON,
    cover2: AppImages.Dashboard.profile_ICON,
    isComingSoon: false,
  },
  {
    title: translations.MY_JOURNEY,
    cover: AppImages.Dashboard.journey_ICON,
    cover2: AppImages.Dashboard.activeJourney_ICON,
    isComingSoon: false,
  },
  {
    title: translations.GALLERY,
    cover: AppImages.Dashboard.gallery_ICON,
    cover2: AppImages.Dashboard.activeGallery_ICON,
    isComingSoon: false,
  },
  {
    title: translations.MEMBERSHIP,
    // cover: AppImages.Dashboard.membership_ICON,
    cover: AppImages.Dashboard.ComingSoonSmall,
    cover2: AppImages.Dashboard.activeMembership_ICON,
    isComingSoon: true,
  },
  {
    title: translations.CROWN_ME,
    cover: AppImages.Dashboard.ComingSoonSmall,
    // cover: AppImages.Dashboard.Convo_ICON,
    cover2: AppImages.Dashboard.activeConvo_ICON,
    isComingSoon: true,
  },
  {
    title: translations.RESOURCE,
    cover: AppImages.Dashboard.ComingSoonSmall,
    // cover: AppImages.Dashboard.resource_ICON,
    cover2: AppImages.Dashboard.activeResource_ICON,
    isComingSoon: true,
  },
  {
    title: translations.PODCAST,
    cover: AppImages.Dashboard.ComingSoonSmall,
    // cover: AppImages.Dashboard.podcast_ICON,
    cover2: AppImages.Dashboard.activePodcast_ICON,
    isComingSoon: true,
  },
  {
    title: translations.STATISTICS,
    cover: AppImages.Dashboard.ComingSoonSmall,
    // cover: AppImages.Dashboard.statistics_ICON,
    cover2: AppImages.Dashboard.activeStatistics_ICON,
    isComingSoon: true,
  },
];

export const expertTabs = [
  {
    title: translations.PROFILE,
    cover: AppImages.Dashboard.inactiveProfile_ICON,
    cover2: AppImages.Dashboard.profile_ICON,
    isComingSoon: false,
  },
  {
    title: translations.MY_WORK,
    cover: AppImages.Dashboard.tab.myworkIcon,
    cover2: AppImages.Dashboard.tab.myworkActiveIcon,
    isComingSoon: false,
  },
  {
    title: translations.CLIENTS,
    cover: AppImages.Dashboard.ComingSoonSmall,
    // cover: AppImages.Dashboard.tab.potentialClientsIcon,
    cover2: AppImages.Dashboard.tab.potentialClientsIcon,
    isComingSoon: true,
  },
  {
    title: translations.ADVERTISE,
    cover: AppImages.Dashboard.ComingSoonSmall,
    // cover: AppImages.Dashboard.tab.advertiseIcon,
    cover2: AppImages.Dashboard.tab.advertiseIcon,
    isComingSoon: true,
  },
  {
    title: translations.REVIEWS,
    cover: AppImages.Dashboard.tab.reviewIcon,
    cover2: AppImages.Dashboard.tab.reviewActiveIcon,
    isComingSoon: false,
  },
];

interface Props {
  onTabClick: (param: number) => void;
  selectedTab: any;
  isExpertTabs?: boolean;
}

const TopSlider = ({
  onTabClick,
  selectedTab = 0,
  isExpertTabs = false,
}: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const flatList = useRef();

  useEffect(() => {
    try {
      setSelectedIndex(selectedTab);
      setTimeout(() => {
        flatList?.current?.scrollToIndex({
          index: selectedTab,
          animated: true,
          viewPosition: 0.5,
        });
      }, 500);
    } catch (error) {
      //
    }
  }, [selectedTab]);

  const handleChange = index => {
    setSelectedIndex(index);
    onTabClick(index);
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        horizontal={true}
        ref={flatList}
        data={isExpertTabs ? expertTabs : contestantTabs}
        keyExtractor={(x, i) => i.toString()}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={0}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            flatList.current?.scrollToIndex({
              index: info.index,
              animated: true,
              viewPosition: 0.5,
            });
          });
        }}
        nestedScrollEnabled={true}
        renderItem={({item, index}) => (
          <>
            <TouchableOpacity
              style={[
                {
                  backgroundColor:
                    index === selectedIndex ? color.P_PINK : color.WHITE,
                  borderColor: item.isComingSoon
                    ? color.S_PINK_2
                    : color.S_GRAY_2,
                },
                styles.container,
              ]}
              disabled={item.isComingSoon}
              onPress={() => handleChange(index)}>
              {index === selectedIndex ? <item.cover2 /> : <item.cover />}
              <Text
                style={
                  item.isComingSoon
                    ? styles.comingSoonTextStyles
                    : index === selectedIndex
                    ? styles.activeTitle
                    : styles.inactiveTitle
                }>
                {item.title}
              </Text>
            </TouchableOpacity>
          </>
        )}
      />
    </View>
  );
};

export default TopSlider;

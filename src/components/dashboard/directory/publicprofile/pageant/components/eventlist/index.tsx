import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import translations from '../../../../../../../assets/translations';
import {SCREEN} from '../../../../../../../root/screenname';
import {Pageant} from '../../../../../../../services/models/pageantdetails/pageant';
import UpcomingPageantGridListView from '../../../../../../common/upcomingpageantgridlist';
import {moderateScale} from '../../../../../../utils/responsiveSize';
import {styles} from './styles';

interface Props {
  pagentId: number | undefined;
  eventData: Pageant[] | undefined;
  forPublicPage:boolean | undefined;
}

const EventList = ({eventData, pagentId ,forPublicPage}: Props) => {
  const navigation = useNavigation();
  const onItemClick = (index: number) => {
    if (eventData !== undefined) {
      navigation.navigate(SCREEN.PAGEANT_EVENT_PUBLIC_PROFILE, {
        eventId: eventData[index].id,
        name: eventData[index].title,
      });
    }
  };
  return (
    <View style={styles.eventSection}>
      <View style={styles.rowSection}>
        <Text style={ forPublicPage?styles.headingPublic: styles.heading}>{translations.EVENTS}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(SCREEN.PAGEANT_PUBLIC_PROFILE_EVENTS, {
              pagentId: pagentId,
            });
          }}
          style={styles.viewStyles}>
          <Text style={styles.viewButton}>{translations.VIEW_ALL}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.flatlistView}>
        <FlatList
          data={eventData}
          numColumns={1}
          key={'#'}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({item, index}) => (
            <UpcomingPageantGridListView
              position={index}
              imageUrl={item?.main_image_full_url}
              label={item?.title}
              maxLines={2}
              isList={false}
              isDisplayYear
              eventYearName={item.eventYearName}
              onItemClickListener={() => onItemClick(index)}
              size={moderateScale(154)}
              ratings={item?.average_rating}
              ratingsCount={item?.rating_count}
              participantsCount={item?.participants_count}
              horizontalView={true}
            />
          )}
        />
      </View>
    </View>
  );
};

export default EventList;

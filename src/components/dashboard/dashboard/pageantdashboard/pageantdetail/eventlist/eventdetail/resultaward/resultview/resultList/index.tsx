import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Text, Dimensions} from 'react-native';
import translations from '../../../../../../../../../../assets/translations';
import {moderateScaleVertical} from '../../../../../../../../../utils/responsiveSize';
import PageantListView from '../../../../../../../../../common/pageantlistview';
import {styles} from './styles';
import EventResultGridView from '../resultgridview';
import AppImages from '../../../../../../../../../../assets/images/AppImages';
import {color} from '../../../../../../../../../../assets/colorConstant';
import {FlatList} from 'react-native-gesture-handler';

interface Props {
  resultName?: string;
  eventId?: number;
  isList: boolean;
  data: any;
}

const EventResultsList = ({data, resultName, isList}: Props) => {
  const [itemSize, setItemSize] = useState(Number);
  const [isGridOpen, setGridOpenState] = useState(true);
  const [dataList, setData] = useState(data);

  useEffect(() => {
    setItemSize(Dimensions.get('window').width / 2 - moderateScaleVertical(24));
    setData(data);
  }, [data]);

  return data !== undefined && data?.length > 0 ? (
    <View style={styles.flatlistContainer}>
      <View style={styles.flatlistView}>
        {!isList ? (
          <>
            <Text
              style={{
                ...styles.awardsHeading,
                color: isGridOpen ? color.P_PINK : color.BLACK,
              }}>
              {resultName}
            </Text>
            <TouchableOpacity
              style={styles.arrowSection}
              onPress={() => {
                setGridOpenState(!isGridOpen);
              }}>
              {isGridOpen ? (
                <AppImages.Dashboard.upArrow_ICON />
              ) : (
                <AppImages.Dashboard.downArrow_ICON />
              )}
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.awardsHeading}>{resultName}</Text>
        )}
      </View>
      {isList ? (
        <FlatList
          data={dataList}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          nestedScrollEnabled
          key={'*'}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          renderItem={({item, index}) => (
            <View style={styles.listViewContainer}>
              <PageantListView
                screenName={translations.AWARD_WON}
                imageUrl={item?.contestant_image_url}
                label={item?.contestant_name}
                type={item?.type}
                subHeading={item?.additional_title_value}
                numberOfLinesForTitle={1}
                numberOfLinesForSubTitle={2}
                smallBannerImage={true}
              />
            </View>
          )}
        />
      ) : (
        isGridOpen &&
        !isList && (
          <EventResultGridView
            data={data}
            numberOfLinesForTitle={1}
            numberOfLinesForSubTitle={2}
            itemSize={itemSize}
            horizontal={false}
          />
        )
      )}
    </View>
  ) : null;
};

export default EventResultsList;

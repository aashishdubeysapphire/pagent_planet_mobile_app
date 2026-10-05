import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './styles';
import {color} from '../../../../../../../../../../../assets/colorConstant';
import AppImages from '../../../../../../../../../../../assets/images/AppImages';
import translations from '../../../../../../../../../../../assets/translations';
import {GET_EVENT_CONTESTANT_LIST} from '../../../../../../../../../../../services/endpoints';
import {Param} from '../../../../../../../../../../../services/constants';
import useInfiniteHtQuery from '../../../../../../../../../../../services/api/useHtInfiniteQuery';
import {Contestant} from '../../../../../../../../../../../services/models/pageantdetails/contestant';
import ShimmerList from '../../../../../../../../../../common/shimmer/listshimmer';
import NoRecord from '../../../../../../../../../../common/norecord';
import {PageantContestantData} from '../../../../../../../../../../../services/models/pageantdetails/pageantContestantData';
import {Base} from '../../../../../../../../../../../services/models/base';
import FastImageView from '../../../../../../../../../../common/fastimageview';
import {moderateScaleVertical} from '../../../../../../../../../../utils/responsiveSize';
import BottomModal from '../../../../../../../../../../common/bottommodal';

interface Props {
  eventId: number;
  isModalVisible: boolean;
  isDisableAdd?: boolean;
  setIsModalVisible: any;
  onContestantClick: (contestant: Contestant | undefined) => void;
  ageDivisionId: number | undefined;
  preSelectedValue: number | undefined;
}
const SearchEventContestantModal = ({
  isModalVisible,
  setIsModalVisible,
  onContestantClick,
  ageDivisionId,
  eventId,
  preSelectedValue,
}: Props) => {
  const [searchText, setSearchText] = useState('');

  //API GET CONTESTANT_LIST ----------------------------------------- START
  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    refetch,
    isFetching,
  } = useInfiniteHtQuery<Base<PageantContestantData>>({
    key: GET_EVENT_CONTESTANT_LIST + searchText,
    url:
      GET_EVENT_CONTESTANT_LIST +
      Param.EVENT_ID +
      eventId +
      Param.AGE_DIVISION_ID +
      ageDivisionId +
      Param.SEARCH +
      searchText,
    page: Param.PAGE_,
    getDataArray: page => page?.data?.pageantContestants.data.length,
    reverse: true,
    disableLoader: true,
  });

  const eventAddedContestantList =
    paginatedData?.pages
      ?.map(page => {
        if (
          page?.data?.pageantContestants.data !== null &&
          page?.data?.pageantContestants.data !== undefined
        ) {
          return page?.data?.pageantContestants.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  //API GET CONTESTANT_LIST ----------------------------------------- END

  /**
   * The searchFilterFunction is a function that takes in a text parameter and sets the searchText
   * state to the text parameter. It then calls the refetch function
   */
  const searchFilterFunction = (query: string) => {
    setSearchText(query);
    searchQuery();
  };
  const searchQuery = async () => {
    await refetch();
  };

  const onItemClick = (index: number) => {
    onContestantClick(eventAddedContestantList[index]);
    setIsModalVisible(false);
  };

  /**
   * It fetches the next page of data.
   */
  const onEndReached = async () => {
    fetchNextPage();
  };

  /* This is a react hook that is used to perform side effects. It is called after every render. */
  useEffect(() => {
    if (isModalVisible) {
      // setIsSelected(preSeelctedContestantID);
    } else {
      setSearchText('');
      refetch();
    }
  }, [isModalVisible]);

  return (
    <BottomModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      customStyles={{paddingHorizontal: moderateScaleVertical(16)}}>
      <View style={styles.headingView}>
        {eventAddedContestantList !== undefined && (
          <Text style={styles.modalHeading}>{translations.SELECT_WINNER}</Text>
        )}

        <TouchableOpacity
          style={styles.crossIcon}
          onPress={() => {
            setIsModalVisible(false);
            setTimeout(() => {
              setSearchText('');
              searchQuery();
            }, 200);
          }}>
          <AppImages.ProfileImage.Tpp_cross_icon />
        </TouchableOpacity>
      </View>
      <View style={styles.searchBOx}>
        <TextInput
          placeholder={translations.SEARCH_HERE}
          selectionColor={color.P_PINK}
          style={styles.searchTextinput}
          value={searchText}
          onChangeText={val => {
            searchFilterFunction(val);
          }}
        />

        <View>
          {isFetching && searchText.length > 0 ? (
            <View style={styles.searchImage}>
              <ActivityIndicator size="small" color={color.P_PINK} />
            </View>
          ) : (
            <View style={styles.searchImage}>
              <AppImages.Common.tpp_search_small_icon />
            </View>
          )}
        </View>
      </View>

      <View style={styles.container}>
        {eventAddedContestantList !== null &&
        eventAddedContestantList?.length > 0 ? (
          <View>
            <FlatList
              data={eventAddedContestantList}
              keyExtractor={item => item?.id?.toString()}
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={1}
              initialNumToRender={100}
              onEndReached={onEndReached}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => onItemClick(index)}>
                  <View style={styles.circleImageContainer}>
                    <FastImageView
                      width={moderateScaleVertical(34)}
                      height={moderateScaleVertical(34)}
                      borderRadius={moderateScaleVertical(34)}
                      imageUrl={item.final_image_url}
                      isCircle
                    />
                  </View>
                  <Text
                    style={
                      preSelectedValue === item?.contestant_id
                        ? styles.selectionName
                        : styles.selectiontext
                    }
                    numberOfLines={1}>
                    {item.name}
                  </Text>
                  {preSelectedValue === item?.contestant_id && (
                    <View style={styles.tick}>
                      <AppImages.Common.PinkTickIcon />
                    </View>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        ) : isLoading ? (
          <ShimmerList
            width={300}
            height={18}
            padding={16}
            borderRadius={6}
            numColumns={1}
          />
        ) : eventAddedContestantList !== null &&
          eventAddedContestantList?.length === 0 ? (
          <ScrollView
            keyboardShouldPersistTaps={'always'}
            showsVerticalScrollIndicator={false}>
            <View>
              <NoRecord rightIcon={<AppImages.Common.NoRecordIcon />} />
            </View>
          </ScrollView>
        ) : (
          <View />
        )}
      </View>
    </BottomModal>
  );
};

export default SearchEventContestantModal;

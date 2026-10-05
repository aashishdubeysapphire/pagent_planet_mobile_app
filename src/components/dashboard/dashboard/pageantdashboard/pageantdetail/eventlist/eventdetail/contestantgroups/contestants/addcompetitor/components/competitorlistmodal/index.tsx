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
import useStyle from './styles';
import BottomModal from '../../../../../../../../../../../common/bottommodal';
import {color} from '../../../../../../../../../../../../assets/colorConstant';
import AppImages from '../../../../../../../../../../../../assets/images/AppImages';
import translations from '../../../../../../../../../../../../assets/translations';
import {GET_CONTESTANT_LIST} from '../../../../../../../../../../../../services/endpoints';
import {Param} from '../../../../../../../../../../../../services/constants';
import useInfiniteHtQuery from '../../../../../../../../../../../../services/api/useHtInfiniteQuery';
import {
  ContestantData,
  Contestant,
} from '../../../../../../../../../../../../services/models/pageantdetails/contestant';
import ShimmerList from '../../../../../../../../../../../common/shimmer/listshimmer';
import NoRecord from '../../../../../../../../../../../common/norecord';
import {onlyAlphabets} from '../../../../../../../../../../../utils/validations';
import FastImageView from '../../../../../../../../../../../common/fastimageview';
import { moderateScaleVertical } from '../../../../../../../../../../../utils/responsiveSize';

interface Props {
  isModalVisible: boolean;
  isDisableAdd?: boolean;
  setIsModalVisible: any;
  preSeelctedContestantID: number | undefined;
  onAddClick?: (name: string) => void;
  onContestantClick: (contestant: Contestant | undefined) => void;
}
const CompetitorListModal = ({
  isModalVisible,
  setIsModalVisible,
  onAddClick,
  onContestantClick,
  isDisableAdd = false,
  preSeelctedContestantID = -1,
}: Props) => {
  const styles = useStyle();

  const [selectedContestant, setSelectedContestant] = useState<Contestant>();

  const [isSelected, setIsSelected] = useState(preSeelctedContestantID);
  const [searchText, setSearchText] = useState('');

  //API GET CONTESTANT_LIST ----------------------------------------- START
  /* This is a custom hook that is used to fetch data from the server. */
  const {
    data: paginatedPageantTitle,
    fetchNextPage,
    isLoading,
    refetch,
    isFetching,
  } = useInfiniteHtQuery<ContestantData>({
    key: GET_CONTESTANT_LIST + searchText,
    url: GET_CONTESTANT_LIST + searchText,
    page: Param.PAGE_,
    getDataArray: page => page.data?.length,
    disableLoader: true,
  });
  const pageantTitleList =
    paginatedPageantTitle?.pages
      ?.map((page: ContestantData) => {
        if (page?.data !== null && page?.data !== undefined) {
          return page.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];
  //API GET CONTESTANT_LIST ----------------------------------------- END

  useEffect(() => {
    if (!isLoading) {
      console.log('sdsdaaasasddd ' + JSON.stringify(pageantTitleList, null, 2));
    }
  }, [isLoading]);
  /**
   * The searchFilterFunction is a function that takes in a text parameter and sets the searchText
   * state to the text parameter. It then calls the refetch function
   */
  const searchFilterFunction = (query: string) => {
    setSearchText(query);
    searchQuery();
  };

  /**
   * A function that is called when the user clicks the search button. It calls the refetch function
   * which is a function that is passed in as a prop from the parent component.
   */
  const searchQuery = async () => {
    await refetch();
  };


  /**
   * When the user clicks the "Add" button, the modal will close and the user will be redirected to the
   * "Add" screen
   */
  const onPressAdd = () => {
    if (onAddClick !== undefined) {
      onAddClick(searchText);
      setIsModalVisible(false);
      setSearchText('');
    }
  };

  /**
   * When the user clicks the "Add Competitor" button in the modal, the modal is closed and the selected
   * contestant is added to the list of competitors
   */
  const onCompetitorAddClick = () => {
    if (isSelected > 0 || (preSeelctedContestantID > 0 && isSelected === -1)) {
      onContestantClick(selectedContestant);
      setSearchText('');
      setIsModalVisible(false);
      searchQuery();
    }
  };

  /**
   * The function sets the state of the modal to false, which closes the modal
   */
  const onPressCancle = () => {
    setIsModalVisible(false);
    setSearchText('');
    searchQuery();
  };

  /**
   * The function takes in an index number and sets the state of the selected contestant to the
   * contestant at the index number
   * @param {number} index - the index of the item in the list
   */
  const onItemClick = (index: number) => {
    setIsSelected(pageantTitleList[index].id);
    setSelectedContestant(pageantTitleList[index]);
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
      searchQuery();

      setIsSelected(-1);
      setSelectedContestant(undefined);
    }
  }, [isModalVisible]);

  return (
    <BottomModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}>
      <View style={styles.headingView}>
        {pageantTitleList != undefined ? (
          <Text style={styles.modalHeading}>
            {translations.NAME_OF_THE_COMPETITOR}
          </Text>
        ) : null}

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
      <View
        style={[
          styles.searchBOx,
          searchText.length > 0 && {backgroundColor: color.WHITE},
        ]}>
        <TextInput
          placeholder={translations.ADD_OR_SEARCH_YOUR_COMPETITOR}
          selectionColor={color.P_PINK}
          style={styles.searchTExtinput}
          value={searchText}
          onChangeText={val => {
            searchFilterFunction(onlyAlphabets(val));
          }}
        />
        {searchText.length > 0 && !isDisableAdd ? (
          <View>
            <View style={styles.searchImage}>
              <TouchableOpacity onPress={() => onPressAdd()}>
                <Text
                  style={{
                    ...styles.save,
                    opacity:
                      searchText === ''
                        ? 0
                        : selectedContestant !== undefined ||
                          pageantTitleList.length > 0
                        ? 0.2
                        : 1,
                  }}>
                  {translations.ADD}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.searchImage}>
            <AppImages.Common.tpp_search_small_icon />
          </View>
        )}
      </View>

      <View style={styles.container}>
        {pageantTitleList !== null && pageantTitleList?.length > 0 ? (
          <View>
            <FlatList
              data={pageantTitleList}
              keyExtractor={item => item?.id?.toString()}
              keyboardShouldPersistTaps="always"
              onEndReachedThreshold={1}
              onEndReached={onEndReached}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={styles.textView}
                  onPress={() => onItemClick(index)}>
                  <View style={styles.circleImageContainer}>
                    <FastImageView
                      width={moderateScaleVertical(34)}
                      height={moderateScaleVertical(34)}
                      borderRadius={moderateScaleVertical(34)}
                      imageUrl={item.image_with_path}
                      isCircle
                    />
                  </View>
                  <Text
                    style={{
                      ...styles.selectiontext,
                      color:
                        isSelected === item?.id ||
                        (preSeelctedContestantID === item?.id && isSelected) ===
                          -1
                          ? color.P_PINK
                          : color.BLACK,
                    }}
                    numberOfLines={1}>
                    {item.text}
                  </Text>
                  {
                    <View>
                      {isSelected === item?.id ||
                      (preSeelctedContestantID === item?.id && isSelected) ===
                        -1 ? (
                        <AppImages.Common.PinkTickIcon />
                      ) : null}
                    </View>
                  }
                </TouchableOpacity>
              )}
            />
            {isFetching && searchText.length === 0 ? (
              <View style={styles.loadMore}>
                <ActivityIndicator size="small" color={color.P_PINK} />
              </View>
            ) : null}
          </View>
        ) : isLoading && pageantTitleList?.length === 0 ? (
          <ShimmerList
            width={300}
            height={18}
            padding={16}
            borderRadius={6}
            numColumns={1}
          />
        ) : pageantTitleList !== null && pageantTitleList?.length === 0 ? (
          <ScrollView
            keyboardShouldPersistTaps={'always'}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.emptyContainer}>
            <View>
              <NoRecord rightIcon={<AppImages.Common.NoRecordIcon />} />
            </View>
          </ScrollView>
        ) : (
          <View />
        )}
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.containerDelete}
          onPress={onPressCancle}>
          <Text style={{...styles.borderButtonText, color: color.BLACK}}>
            {translations.CANCLE}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            ...styles.containerConfirm,
            opacity:
              isSelected > 0 ||
              (preSeelctedContestantID > 0 && isSelected === -1)
                ? 1
                : 0.2,
          }}>
          <TouchableOpacity onPress={onCompetitorAddClick}>
            <Text style={styles.borderButtonText}>{translations.ADD}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomModal>
  );
};

export default CompetitorListModal;

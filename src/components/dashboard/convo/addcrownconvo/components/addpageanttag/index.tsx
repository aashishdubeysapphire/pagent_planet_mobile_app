// Import necessary components and modules from 'react-native' and other files
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import Header from '../../../../../common/header';
import translations from '../../../../../../assets/translations';
import AppImages from '../../../../../../assets/images/AppImages';
import {GET_PAGEANT_NAME_LIST} from '../../../../../../services/endpoints';
import {PagentNameList} from '../../../../../../services/models/constantsForm/pagentnameList';
import FastImageView from '../../../../../common/fastimageview';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../../utils/responsiveSize';
import ShimmerList from '../../../../../common/shimmer/listshimmer';
import {useNavigation} from '@react-navigation/core';
import {TextInput} from 'react-native-gesture-handler';
import NoRecord from '../../../../../common/norecord';
import {useBackHandler} from '@react-native-community/hooks';
import {Param} from '../../../../../../services/constants';
import useInfiniteHtQuery from '../../../../../../services/api/useHtInfiniteQuery';
import {color} from '../../../../../../assets/colorConstant';

const AddPageantTag = props => {
  // Extract 'onClick' function from the navigation route parameters
  const {onClick} = props.route.params;

  // States to manage search functionality
  const [nameOfPageantSearchText, setNameOfPageantSearchText] = useState('');
  const [isSearchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Get the navigation object to handle navigation actions
  const navigation = useNavigation();

  // State to store item size for FlatList rendering
  const [itemSize, setItemSize] = useState(Number);

  // Fetch pageant list data from the server using Infinite Query
  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    refetch,
    isFetchingNextPage,
    isRefetching,
  } = useInfiniteHtQuery<PagentNameList>({
    key: GET_PAGEANT_NAME_LIST + nameOfPageantSearchText,
    url: GET_PAGEANT_NAME_LIST + Param.STR_ + nameOfPageantSearchText,
    page: Param.PAGE_,
    getDataArray: page => page?.data?.pageants?.length,
    disableLoader: true,
  });

  // Extract pageant list data from the paginatedData
  const pageantListData =
    paginatedData?.pages
      ?.map(page => {
        if (page?.data?.pageants != null && page?.data?.pageants != undefined) {
          return page?.data?.pageants;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  // Set the item size for the FlatList to achieve responsive design
  useEffect(() => {
    setItemSize(width / 2 - moderateScaleVertical(24));
  }, []);
  // Handle hardware back button press to navigate back or close the search
  useBackHandler(() => {
    onBack();
    return true;
  });

  // Handle the hardware back button press
  const onBack = () => {
    if (isSearchActive) {
      // If search is active, close the search
      onCrossButtonClicked();
    } else {
      // If search is not active, navigate back
      navigation.goBack();
    }
  };

  // Function to handle pageant selection and pass the selected data back to the previous screen
  const pageantSelected = (title, id, image) => {
    onClick(title, id, image);
    navigation.goBack();
  };

  // Function to activate search when search icon is clicked
  const onSearchClicked = () => {
    setSearchActive(true);
  };

  // Function to fetch search results based on the entered text
  const hitSearchApi = async () => {
    // Add a small delay before making the API call to prevent frequent requests during fast typing
    setTimeout(async () => {
      await refetch();
    }, 400);
  };

  // Function to handle input text change during search
  const onChangeInputText = val => {
    setSearchValue(val);
    setNameOfPageantSearchText(val);
    hitSearchApi();
  };

  // Function to handle the cross button click and clear the search
  const onCrossButtonClicked = () => {
    setNameOfPageantSearchText('');
    setSearchActive(false);
    setSearchValue('');
    hitSearchApi();
  };

  // Function to load more data when the end of the FlatList is reached
  const onEndReached = async () => {
    fetchNextPage();
  };
  const showLoader = () => isLoading || isRefetching || isFetchingNextPage;
  const renderPageantList = () => {
    switch (true) {
      case pageantListData?.length > 0:
        // Render the FlatList with pageant data
        return (
          <View style={styles.inputContainer}>
            <FlatList
              data={pageantListData}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              showsHorizontalScrollIndicator={false}
              ListFooterComponent={() => {
                // Show loading indicator at the bottom of the list while fetching more data
                return (
                  <View style={styles.bottomHeight}>
                    {isFetchingNextPage ? (
                      <ActivityIndicator size={'small'} color={color.P_PINK} />
                    ) : null}
                  </View>
                );
              }}
              onEndReached={onEndReached}
              renderItem={({item}) => (
                // Render each item in the FlatList as a touchable container with pageant details
                <TouchableOpacity
                  style={styles.listContainer}
                  onPress={() =>
                    pageantSelected(item?.title, item?.id, item?.image_full_url)
                  }>
                  <View>
                    <FastImageView
                      imageUrl={item?.image_full_url}
                      width={moderateScale(50)}
                      height={moderateScale(50)}
                      isCircle
                      borderRadius={moderateScale(25)}
                    />
                  </View>
                  <Text style={styles.pageantNameLabel} numberOfLines={2}>
                    {item?.title}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        );

      case showLoader():
        // Show shimmer loading animation while data is being fetched
        return (
          <View style={{marginTop: moderateScaleVertical(16)}}>
            <ShimmerList
              padding={moderateScale(16)}
              borderRadius={moderateScale(20)}
              width={'95%'}
              height={moderateScale(45)}
            />
          </View>
        );

      case pageantListData?.length === 0:
        // Show a message when no pageant data is found for the search query
        return (
          <NoRecord
            text={
              translations.NO_PAGEANT_FOUND_FOR +
              '"' +
              nameOfPageantSearchText +
              '"'
            }
            rightIcon={
              <AppImages.Common.NO_FILTER_RESULT_FOUND_ICON
                width={itemSize * 2 + 12}
              />
            }
          />
        );

      default:
        return null;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {isSearchActive ? (
        // Render the search view with a text input for search
        <View style={styles.searchView}>
          <TouchableOpacity onPress={() => onCrossButtonClicked()}>
            <AppImages.Common.crossIcon />
          </TouchableOpacity>
          <TextInput
            style={styles.textInputStyles}
            value={searchValue}
            onChangeText={val => onChangeInputText(val)}
            numberOfLines={1}
            autoFocus
          />
        </View>
      ) : (
        // Render the header with search icon and title when search is not active
        <Header
          lable={translations.TAG_A_PAGEANT}
          isUnderLineRequired
          rightIcon1={<AppImages.Dashboard.HeaderSearchIcon />}
          onPressRightIcon1={onSearchClicked}
        />
      )}
      {/* Render the pageant list or loading shimmer or no record message based
      on the data and loading states */}
      {renderPageantList()}
    </SafeAreaView>
  );
};

export default AddPageantTag;

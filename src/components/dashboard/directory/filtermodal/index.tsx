import {View, Text, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from './styles';
import AppImages from '../../../../assets/images/AppImages';
import translations from '../../../../assets/translations';
import React, {useEffect, useState} from 'react';
import {color} from '../../../../assets/colorConstant';
import Modal from 'react-native-modal';
import {CountryResponse} from '../../../../services/models/country/countryResponse';
import {CountryState} from '../../../../services/models/country/CountryState';
import {
  GET_COUNTRY,
  GET_STATES,
  GET_MASTER_DATA,
} from '../../../../services/endpoints';
import SearchAdressView from '../../../common/searchaddress/component';
import {Filter} from '../../../../services/models/filterData';
import useCgMutation from '../../../../services/api/useCgMutation';
import {MethodTypes} from '../../../../services/constants';
import RadioFilterOption from './componenets/radiofilteroption';
import {Base} from '../../../../services/models/base';
import {useNetInfo} from '@react-native-community/netinfo';
import {internetState, toast, toastType} from '../../../common/commonalert';
import DateTime from './componenets/datetime';
import SliderTwoWay from './componenets/slidertwoway';
import {MASTERDATA} from '../../../utils/enum';
import {
  MasterData,
  MasterRecordsItem,
} from '../../../../services/models/masterData';
// import {
//   AddressComponent,
//   GooglePlaceDetail,
// } from 'react-native-google-places-autocomplete';
import CheckBoxFilterOption from './componenets/checkboxfilteroption';
import RadioFilterWithSearch from './componenets/radioFilterWithSearchBox';
import CustomToast from '../../../common/toast';
import AllLockedFilter from './componenets/alllockedfilter';

// import RadioFilterWithSearch from './componenets/radiofilterwithsearchbox';

export enum ITEM_KEY {
  COUNTRY = 'Country',
  SHIPPED_TO = 'Shipped To',
  STATE = 'State',
  HAI_COLOR = 'Hair Color',
  EYE_COLOR = 'Eye Color',
  SORT = 'Sort',
  DATE = 'Date',
  AGE = 'Age',
  PRICE = 'Price',
}
export enum FILTER_VALUE {
  NONE = -1,
}
export enum FILTER_TYPE {
  ARRAY = 1,
  DATE = 2,
  STATIC_OPTION = 3,
  DATE_FROM_TO = 4,
  LOCATION = 5,
  SLIDER = 6,
  SELECT_MULTIPLE_OPTION = 7,
}

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: any;
  filter: Filter[] | undefined;
  onFilterApply: () => void;
  onClearFilterApply: () => void;
  upgradePlan: () => void;
  setIsPreviewModalVisible: any;
  isAllFillterApplied: boolean;
  sortByValue?: string;
  selectedCetegoryIndix?: number;
  areAllLockedInContestant?: boolean;
}

/* This is a react component which is used to show the list of countries and states. */
const DirectoryFilterModal = ({
  isModalVisible,
  setIsModalVisible,
  filter,
  onFilterApply,
  onClearFilterApply,
  upgradePlan,
  isAllFillterApplied,
  sortByValue,
  selectedCetegoryIndix,
  setIsPreviewModalVisible,
  areAllLockedInContestant,
}: Props) => {
  const netInfo = useNetInfo();

  const [isFiltterChanged, setFiltterChanged] = useState(true);
  const [isFillterItemSelected, setFilterItemSelected] = useState(false);
  const [isNewCountrySelected, setNewCountrySelected] = useState(false);
  const [isFillterButton, setFilterButton] = useState(true);
  const [selectedFilterRootItem, setSelectedFilterRootItem] = useState(0);
  const [selectedCountryId, setSelectedCountryId] = useState(-1);
  const [selectedCountryStateId, setSelectedCountryStateId] = useState(-1);
  const [countryArray, setCountryArray] = useState<CountryState[]>([]);
  const [eyeColorArray, setEyeColorArray] = useState<MasterRecordsItem[]>([]);
  const [hairColorArray, setHairColorArray] = useState<MasterRecordsItem[]>([]);
  const [locationAddressComponent, setLocationAddressComponent] = useState<any>([]);

  const [countryStateArray, setCountryStateArray] = useState<CountryState[]>(
    [],
  );

  const [searchAddressText, setSearchAddressText] = useState('');

  //API Country and State ----------------------------------------- START

  const {mutateAsync: getMasterData, isLoading: isMasterDataLoading} =
    useCgMutation<MasterData>({
      key: GET_MASTER_DATA,
      url: GET_MASTER_DATA,
      body: {
        master_record_type_id: `${MASTERDATA.EYE_COLOR},${MASTERDATA.HAIR_COLOR}`,
        is_countries: 1,
      },
      offSuccessToast: true,
    });

  const {mutateAsync: getCountryListRequest, isLoading} = useCgMutation<
    Base<CountryResponse>
  >({
    key: GET_COUNTRY,
    url: GET_COUNTRY,
    method: MethodTypes.GET,
    offSuccessToast: true,
  });

  const {
    mutateAsync: getCountryStateListRequest,
    isLoading: isLoadingCountryState,
  } = useCgMutation<Base<CountryResponse>>({
    key: GET_STATES + selectedCountryId,
    url: GET_STATES + selectedCountryId,
    method: MethodTypes.GET,
    offSuccessToast: true,
  });

  //API Country and State ----------------------------------------- END

  useEffect(() => {
    if (isModalVisible) {
      if (
        (filter !== undefined &&
          filter[selectedFilterRootItem].title === ITEM_KEY.COUNTRY) ||
        (filter !== undefined &&
          filter[selectedFilterRootItem].title === ITEM_KEY.SHIPPED_TO)
      ) {
        getCounterList();
      } else if (
        (filter !== undefined &&
          filter[selectedFilterRootItem].title === ITEM_KEY.STATE &&
          isNewCountrySelected) ||
        (filter !== undefined &&
          filter[selectedFilterRootItem].title === ITEM_KEY.STATE &&
          filter[selectedFilterRootItem - 1].title === ITEM_KEY.COUNTRY &&
          filter[selectedFilterRootItem - 1].selectedIndex + ''.length > 0)
      ) {
        if (
          filter !== undefined &&
          filter[selectedFilterRootItem].title === ITEM_KEY.STATE &&
          filter[selectedFilterRootItem - 1].title === ITEM_KEY.COUNTRY &&
          filter[selectedFilterRootItem - 1].selectedIndex + ''.length > 0
        ) {
          setSelectedCountryId(
            filter[selectedFilterRootItem - 1].selectedIndex,
          );
        }

        getCounterStateList();
      } else if (
        filter !== undefined &&
        filter[selectedFilterRootItem]?.type !== undefined &&
        filter[selectedFilterRootItem]?.type === FILTER_TYPE.LOCATION
      ) {
        resetLocationValue();
      } else if (
        (filter !== undefined &&
          filter[selectedFilterRootItem].title === ITEM_KEY.EYE_COLOR &&
          eyeColorArray.length === 0) ||
        (filter !== undefined &&
          filter[selectedFilterRootItem].title === ITEM_KEY.HAI_COLOR &&
          hairColorArray.length === 0)
      ) {
        getMasterEyeHailColor();
      }

      setTimeout(() => {
        setFiltterChanged(true);
      }, 1);
    }
  }, [selectedFilterRootItem]);

  /**
   * If the filter is not undefined, and the query is not undefined, and the query length is greater
   * than 0, then split the query by the equals sign and set the searchAddressText to the second item in
   * the array
   */
  const resetLocationValue = () => {
    if (
      filter !== undefined &&
      filter[selectedFilterRootItem].query !== undefined &&
      filter[selectedFilterRootItem].query.length > 0
    ) {
      const toDate = filter[selectedFilterRootItem].query[0].split('=');
      if (toDate.length > 1) {
        setSearchAddressText(toDate[1]);
      }
    }
  };

  /**
   * This function is used to get the master data of eye and hair color from the server
   */
  const getMasterEyeHailColor = async () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else {
      const res = await getMasterData();
      if (res?.data?.master_records?.eye_color !== undefined) {
        setEyeColorArray(res.data?.master_records.eye_color);
      }
      if (res?.data?.master_records?.hair_color !== undefined) {
        setHairColorArray(res.data?.master_records.hair_color);
      }
    }
  };

  useEffect(() => {
    setSelectedFilterRootItem(0);
    if (
      (isModalVisible &&
        filter !== undefined &&
        filter.length > 1 &&
        filter[1].type !== undefined &&
        filter[1].title === ITEM_KEY.COUNTRY) ||
      (isModalVisible &&
        filter !== undefined &&
        filter.length > 1 &&
        filter[1].type !== undefined &&
        filter[1].title === ITEM_KEY.SHIPPED_TO)
    ) {
      getCounterList();
    }

    if (isModalVisible) {
      setFiltterChanged(false);
      setTimeout(() => {
        setFiltterChanged(true);
        isFillterElementActive();
      }, 100);
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (
      locationAddressComponent !== undefined &&
      locationAddressComponent.length > 0 &&
      countryArray.length === 0
    ) {
      getCounterList();
    }
  }, [locationAddressComponent]);

  useEffect(() => {
    if (
      filter !== undefined &&
      filter[selectedFilterRootItem].title === ITEM_KEY.STATE &&
      filter[selectedFilterRootItem - 1].title === ITEM_KEY.COUNTRY &&
      filter[selectedFilterRootItem - 1].selectedIndex + ''.length > 0
    ) {
      getCounterStateList();
    }
  }, [selectedCountryId]);

  /**
   * A function that is used to get the list of countries from the server.
   */
  const getCounterList = async () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else if (countryArray.length === 0) {
      setNewCountrySelected(true);
      const res = await getCountryListRequest();
      if (res?.data?.countries !== undefined) {
        setCountryArray(res.data?.countries);
      }
      if (locationAddressComponent !== undefined) {
        res?.data?.countries?.forEach(element => {
          locationAddressComponent?.forEach(locationElement => {
            if (element?.name === locationElement.long_name) {
              setSelectedCountryId(element.id);
            }
          });
        });
        getCounterStateList();
      }
    }
  };

  /**
   * It gets the state list of a country.
   *
   */
  const getCounterStateList = async () => {
    if (!netInfo.isConnected && !netInfo.isInternetReachable) {
      internetState(netInfo.isConnected!!);
      return false;
    } else if (selectedCountryId > -1) {
      setNewCountrySelected(false);
      const res = await getCountryStateListRequest();
      if (res?.data?.states !== undefined) {
        setCountryStateArray(res.data?.states);
      }
    }
  };

  const clearCheckBoxOption = () => {
    if (filter !== undefined) {
      for (const filterOption of filter) {
        filterOption.isAllSelected = false;
        filterOption.isOneOptionActive = false;
        for (const option of filterOption.options) {
          option.isSelcted = false;
        }
      }
    }
  };

  /**
   * When the modal is closed, if the search state is greater than 0, refresh the list
   */
  const onClearFilterClick = () => {
    if (isFillterItemSelected || isAllFillterApplied) {
      clearCheckBoxOption();
      setSearchAddressText('');
      setCountryStateArray([]);
      setSelectedFilterRootItem(0);
      setFilterItemSelected(false);
      setSelectedCountryId(-1);
      setSelectedCountryStateId(-1);
      setLocationAddressComponent(undefined);
      onClearFilterApply();
      setFiltterChanged(false);
      setTimeout(() => {
        setFiltterChanged(true);
        isFillterElementActive();
      }, 10);
    }
  };

  /**
   * Function that is called when the user presses the "Add" button
   */
  const onFilterApplyPress = () => {
    if (isFillterItemSelected || isAllFillterApplied) {
      if (
        filter !== undefined &&
        filter.length === 1 &&
        filter[0].type === FILTER_TYPE.DATE_FROM_TO &&
        filter[0].query !== undefined &&
        filter[0].query.length !== 2
      ) {
        toast(translations.SELECT_THE_DATE, toastType.ERROR_TOAST);
      } else {
        setIsModalVisible(false);
        onFilterApply();
      }
    }
  };

  useEffect(() => {
    onClearFilterClick();
  }, [selectedCetegoryIndix]);

  useEffect(() => {
    if (!isAllFillterApplied) {
      setFilterButton(false);
      setTimeout(() => {
        setFilterButton(true);
      }, 10);
    }
  }, [isAllFillterApplied]);

  useEffect(() => {
    if (
      filter !== undefined &&
      sortByValue !== undefined &&
      sortByValue.length > 0
    ) {
      for (let index = 0; index < filter[0]?.options.length; index++) {
        if (filter[0]?.options[index].value === sortByValue) {
          updateFilter(0, index + 1, sortByValue);
        }
      }
    } else if (
      filter !== undefined &&
      filter.length > 0 &&
      filter[0].query !== undefined
    ) {
      updateFilter(0, -1, '');
    }
  }, [sortByValue]);

  /**
   * OnItemSelection is a function that takes in two parameters, id and query, and returns nothing
   * @param {number} id - The id of the selected item.
   * @param {string} query - The search query entered by the user.
   */
  const onItemSelection = (id: number, query: string) => {
    if (
      (filter !== undefined &&
        filter[selectedFilterRootItem].title === ITEM_KEY.COUNTRY) ||
      (filter !== undefined &&
        filter[selectedFilterRootItem].title === ITEM_KEY.SHIPPED_TO)
    ) {
      setSelectedCountryId(Number(id));
    } else if (
      filter !== undefined &&
      filter[selectedFilterRootItem].title === ITEM_KEY.STATE
    ) {
      setSelectedCountryStateId(Number(id));
    }
    updateFilter(selectedFilterRootItem, id, query);
    isFillterElementActive();
  };

  const onCheckBoxItemSelection = (index: number) => {
    if (filter !== undefined) {
      if (index === -1) {
        if (filter[selectedFilterRootItem].isAllSelected === undefined) {
          filter[selectedFilterRootItem].isAllSelected = true;
        } else {
          filter[selectedFilterRootItem].isAllSelected =
            !filter[selectedFilterRootItem].isAllSelected;
        }

        for (const filterOption of filter[selectedFilterRootItem].options) {
          filterOption.isSelcted = filter[selectedFilterRootItem].isAllSelected;
        }
        filter[selectedFilterRootItem].isOneOptionActive =
          filter[selectedFilterRootItem].isAllSelected;
      } else {
        if (
          filter[selectedFilterRootItem]?.options[index].isSelcted === undefined
        ) {
          filter[selectedFilterRootItem].options[index].isSelcted = true;
        } else {
          filter[selectedFilterRootItem].options[index].isSelcted =
            !filter[selectedFilterRootItem].options[index].isSelcted;
        }

        let counter = 0;
        for (const filterOption of filter[selectedFilterRootItem]?.options) {
          if (filterOption.isSelcted) {
            counter++;
          }
        }
        filter[selectedFilterRootItem].isAllSelected =
          counter === filter[selectedFilterRootItem].options.length;

        filter[selectedFilterRootItem].isOneOptionActive = counter > 0;
      }
    }
    createMultipleOptionQueryFilter(index);
    isFillterElementActive();
    setFiltterChanged(false);
    setTimeout(() => {
      setFiltterChanged(true);
    }, 5);
  };

  const createMultipleOptionQueryFilter = (index: number) => {
    if (filter !== undefined) {
      var selectedHeigt = '';

      for (const filterOption of filter[selectedFilterRootItem].options) {
        if (filterOption.isSelcted) {
          selectedHeigt = selectedHeigt + filterOption.value + ' ';
        }
      }
      selectedHeigt = selectedHeigt.trim().split(' ').join(',');
      updateFilter(
        selectedFilterRootItem,
        filter[selectedFilterRootItem].isAllSelected !== undefined &&
          filter[selectedFilterRootItem].isAllSelected
          ? index + 1
          : index,
        selectedHeigt.trim(),
      );
    }
  };
  /**
   * It updates the filter object with the selected index and query
   * @param {number} index - The index of the filter in the filter array.
   * @param {number} id - The id of the filter that was selected.
   * @param {string} query - The query string that will be appended to the URL.
   */
  const updateFilter = (index: number, id: number, query: string) => {
    if (filter !== undefined) {
      if (filter[index].query === undefined) {
        filter[index].query = [];
      }
      if (
        filter[index].query !== undefined &&
        filter[index]?.query?.length === 0 &&
        id !== FILTER_VALUE.NONE &&
        filter[index].slug !== undefined &&
        filter[index]?.slug.length > 0
      ) {
        filter[index]?.query.push('&' + filter[index]?.slug[0] + '=' + query);
      } else if (
        filter[index].query !== undefined &&
        id === FILTER_VALUE.NONE
      ) {
        filter[index].query[0] = '';
      } else if (
        filter[index]?.query !== undefined &&
        filter[index]?.slug !== undefined &&
        filter[index]?.slug.length > 0
      ) {
        filter[index].query[0] = '&' + filter[index].slug[0] + '=' + query;
      }

      filter[index].selectedIndex = id;
    }
  };

  /**
   * It takes a date and a tempDate as arguments and then checks if the filter is not undefined and if
   * the length of the slug is greater than 0. If that's true, it checks if the query is undefined and
   * if it is, it pushes the date and tempDate to the query and tempQuery arrays. If the query array is
   * empty, it pushes the date and tempDate to the query and tempQuery arrays. If the query array is
   * not empty, it sets the first element of the query array to the date and the first element of the
   * tempQuery array to the tempDate
   * @param {string} date - The date in the format of the API
   * @param {string} tempDate - The date that is selected by the user.
   */
  const onFromDateFilter = (date: string, tempDate: string) => {
    try {
      if (
        filter !== undefined &&
        filter[selectedFilterRootItem].slug.length > 0
      ) {
        if (filter[selectedFilterRootItem].query === undefined) {
          filter[selectedFilterRootItem].query = [];
          filter[selectedFilterRootItem].tempQuery = [];
        }

        if (
          filter[selectedFilterRootItem].query.length === 0 ||
          (filter[selectedFilterRootItem].query.length === 1 &&
            !filter[selectedFilterRootItem].query[0].includes(
              filter[selectedFilterRootItem].slug[0],
            ))
        ) {
          filter[selectedFilterRootItem].query.push(
            '&' + filter[selectedFilterRootItem].slug[0] + '=' + date,
          );
          filter[selectedFilterRootItem].tempQuery.push(tempDate);
        } else {
          filter[selectedFilterRootItem].query[0] =
            '&' + filter[selectedFilterRootItem].slug[0] + '=' + date;
          filter[selectedFilterRootItem].tempQuery[0] = tempDate;
        }
      }
      isFillterElementActive();
    } catch (error) {
      //empty
    }
  };

  /**
   * It takes a date and a tempDate as arguments and then checks if the filter is not undefined and if
   * the length of the slug is greater than 1. If that's true, it checks if the query is undefined and
   * if it is, it pushes the date and tempDate to the query and tempQuery arrays. If the query array is
   * empty, it pushes the date and tempDate to the query and tempQuery arrays. If the query array is
   * not empty, it sets the date and tempDate to the query and tempQuery arrays
   * @param {string} date - The date in the format of the API
   * @param {string} tempDate - The date that is selected by the user.
   */
  const onToDateFilter = (date: string, tempDate: string) => {
    try {
      if (
        filter !== undefined &&
        filter[selectedFilterRootItem]?.slug?.length > 1
      ) {
        if (filter[selectedFilterRootItem].query === undefined) {
          filter[selectedFilterRootItem].query = [];
          filter[selectedFilterRootItem].tempQuery = [];
        }

        if (
          filter[selectedFilterRootItem]?.query.length === 0 ||
          (filter[selectedFilterRootItem]?.query.length === 1 &&
            !filter[selectedFilterRootItem].query[0].includes(
              filter[selectedFilterRootItem].slug[1],
            ))
        ) {
          filter[selectedFilterRootItem].query.push(
            '&' + filter[selectedFilterRootItem].slug[1] + '=' + date,
          );
          filter[selectedFilterRootItem].tempQuery.push(tempDate);
        } else if (
          filter[selectedFilterRootItem]?.query.length === 1 &&
          filter[selectedFilterRootItem].query[0].includes(
            filter[selectedFilterRootItem].slug[1],
          )
        ) {
          filter[selectedFilterRootItem].query[0] =
            '&' + filter[selectedFilterRootItem].slug[1] + '=' + date;
          filter[selectedFilterRootItem].tempQuery[0] = tempDate;
        } else {
          filter[selectedFilterRootItem].query[1] =
            '&' + filter[selectedFilterRootItem].slug[1] + '=' + date;
          filter[selectedFilterRootItem].tempQuery[1] = tempDate;
        }
      }
      isFillterElementActive();
    } catch (error) {
      //empty
    }
  };

  /**
   * It checks if the filter is active or not.
   */
  const isFillterElementActive = () => {
    let count = 0;

    if (filter !== undefined) {
      filter.forEach(element => {
        if (element?.query?.length > 0) {
          element?.query?.forEach(elementQuery => {
            if (elementQuery?.length > 0) {
              count = count + 1;
            }
          });
        } else {
          element?.options?.forEach(elementOption => {
            if (elementOption.isSelcted) {
              count = count + 1;
            }
          });
        }
      });

      if (
        (count > 0 && !isFillterItemSelected && filter.length > 0) ||
        (count > 1 &&
          !isFillterItemSelected &&
          filter.length === 1 &&
          filter[0].title === ITEM_KEY.DATE)
      ) {
        setFilterButton(false);
        setFilterItemSelected(true);
        setTimeout(() => {
          setFilterButton(true);
        }, 0.1);
      } else if (count === 0 && isFillterItemSelected) {
        setFilterItemSelected(false);
        setFilterButton(false);
        setTimeout(() => {
          setFilterButton(true);
        }, 0.1);
      }
    }
  };

  /**
   * If the filter object is not undefined and the query property of the selectedFilterRootItem is
   * undefined, then set the query property of the selectedFilterRootItem to an empty array
   */
  const createEmptyArrayIfNot = () => {
    if (
      filter !== undefined &&
      filter[selectedFilterRootItem]?.query === undefined
    ) {
      filter[selectedFilterRootItem].query = [];
    }
  };

  /**
   * A function that is called when the user selects a range on the slider.
   * @param {number} min - The minimum value of the range slider
   * @param {number} max - The maximum value of the slider
   */
  const onRangeSelecting = (min: number, max: number) => {
    if (
      filter !== undefined &&
      filter[selectedFilterRootItem]?.slug?.length > 1
    ) {
      createEmptyArrayIfNot();
      if (
        filter[selectedFilterRootItem].query.length > 0 &&
        filter[selectedFilterRootItem].query[0].length > 0
      ) {
        filter[selectedFilterRootItem].query[0] =
          '&' + filter[selectedFilterRootItem].slug[0] + '=' + min;
      } else {
        filter[selectedFilterRootItem].query.push(
          '&' + filter[selectedFilterRootItem].slug[0] + '=' + min,
        );
      }

      if (
        filter[selectedFilterRootItem].query.length > 1 &&
        filter[selectedFilterRootItem].query[1].length > 0
      ) {
        filter[selectedFilterRootItem].query[1] =
          '&' + filter[selectedFilterRootItem].slug[1] + '=' + max;
      } else {
        filter[selectedFilterRootItem].query.push(
          '&' + filter[selectedFilterRootItem].slug[1] + '=' + max,
        );
      }
    }

    isFillterElementActive();
  };

  /**
   * A function that is called when the user selects an address from the modal.
   * @param {string} addres - The address of the location
   * @param {string} lat - latitude
   * @param {string} long - longitude
   */
  const onAddresss = (
    addres: string,
    lat: string,
    long: string,
    // details: GooglePlaceDetail | undefined,
  ) => {
    setSearchAddressText(addres);
    if (
      filter !== undefined &&
      filter[selectedFilterRootItem]?.slug?.length > 2
    ) {
      if (filter[selectedFilterRootItem]?.query === undefined) {
        filter[selectedFilterRootItem].query = [];
      }

      if (
        filter[selectedFilterRootItem].query.length > 0 &&
        filter[selectedFilterRootItem].query[0].length > 0
      ) {
        filter[selectedFilterRootItem].query[0] =
          '&' + filter[selectedFilterRootItem].slug[0] + '=' + addres;
      } else {
        filter[selectedFilterRootItem].query.push(
          '&' + filter[selectedFilterRootItem].slug[0] + '=' + addres,
        );
      }

      if (
        filter[selectedFilterRootItem].query.length > 1 &&
        filter[selectedFilterRootItem].query[1].length > 0
      ) {
        filter[selectedFilterRootItem].query[1] =
          '&' + filter[selectedFilterRootItem].slug[1] + '=' + long;
      } else {
        filter[selectedFilterRootItem].query.push(
          '&' + filter[selectedFilterRootItem].slug[1] + '=' + long,
        );
      }

      if (
        filter[selectedFilterRootItem].query.length > 2 &&
        filter[selectedFilterRootItem].query[2].length > 0
      ) {
        filter[selectedFilterRootItem].query[2] =
          '&' + filter[selectedFilterRootItem].slug[2] + '=' + lat;
      } else {
        filter[selectedFilterRootItem].query.push(
          '&' + filter[selectedFilterRootItem].slug[2] + '=' + lat,
        );
      }
    }
    setLocationAddressComponent(details?.address_components);
    isFillterElementActive();
  };

  return (
    <Modal
      isVisible={isModalVisible}
      backdropOpacity={0.2}
      useNativeDriver={true}
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      onBackButtonPress={onClearFilterClick}
      style={{marginHorizontal: 0, marginVertical: 0, marginTop: 68}}>
      <View style={styles.modalContainer}>
        <View style={styles.headingView}>
          <Text style={styles.modalHeading}>{'Filter'}</Text>
          <TouchableOpacity
            style={styles.crossIcon}
            onPress={() => {
              setIsModalVisible(false);
            }}>
            <AppImages.ProfileImage.Tpp_cross_icon />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomLine} />
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={
            areAllLockedInContestant
              ? styles.mainContinerCOntestant
              : styles.mainContiner
          }>
          {areAllLockedInContestant ? (
            <AllLockedFilter 
            data={filter} 
            setIsModalVisible = {setIsModalVisible}
            />
          ) : (
            <View style={styles.filterRootContainer}>
              <View style={styles.filterContainer}>
                <View style={styles.filterOptionContainer}>
                  <FlatList
                    data={filter}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    key={'#'}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => (
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            if (selectedFilterRootItem !== index) {
                              setFiltterChanged(false);
                              setSelectedFilterRootItem(index);
                            }
                          }}>
                          {index === selectedFilterRootItem ? (
                            <View style={styles.row}>
                              <View
                                style={
                                  styles.filterOptionActiveTextStripContainer
                                }
                              />
                              <Text
                                style={styles.filterOptionActiveTextContainer}>
                                {item.title}
                              </Text>
                              {item?.disable !== undefined &&
                                !item?.disable && (
                                  <AppImages.Common.LockActiveIcon
                                    width={8.18}
                                    height={10}
                                  />
                                )}
                            </View>
                          ) : (
                            <View style={styles.unselectedItemContainer}>
                              <Text style={styles.filterOptionTextContainer}>
                                {item.title}
                              </Text>
                              {(filter !== undefined &&
                                item.isOneOptionActive) ||
                              (item?.query !== undefined &&
                                item?.query?.length > 0 &&
                                item?.query[0].length > 0) ? (
                                <View
                                  style={styles.filterAppliedCircleContainer}
                                />
                              ) : null}

                              {item.disable !== undefined && !item.disable && (
                                <AppImages.Common.Lock
                                  width={8.18}
                                  height={10}
                                />
                              )}
                            </View>
                          )}
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                </View>

                <View style={styles.filterOptionValueContainer}>
                  {(filter !== undefined &&
                    filter[selectedFilterRootItem]?.type !== undefined &&
                    filter[selectedFilterRootItem]?.type ===
                      FILTER_TYPE.ARRAY &&
                    filter[selectedFilterRootItem]?.title ===
                      ITEM_KEY.COUNTRY &&
                    isFiltterChanged) ||
                  (filter !== undefined &&
                    filter[selectedFilterRootItem]?.type !== undefined &&
                    filter[selectedFilterRootItem]?.type ===
                      FILTER_TYPE.ARRAY &&
                    filter[selectedFilterRootItem]?.title ===
                      ITEM_KEY.SHIPPED_TO &&
                    isFiltterChanged) ? (
                    <RadioFilterWithSearch
                      countryState={countryArray}
                      onItemSelect={onItemSelection}
                      loader={isLoading}
                      locationAddressComponent={locationAddressComponent}
                      parantFilter={filter[selectedFilterRootItem]}
                      enableDefaultItem={true}
                      setModelVisible={setIsModalVisible}
                      isLock={filter[selectedFilterRootItem].disable}
                      selectedId={selectedCountryId}
                    />
                  ) : filter !== undefined &&
                    filter[selectedFilterRootItem]?.type !== undefined &&
                    filter[selectedFilterRootItem]?.type ===
                      FILTER_TYPE.ARRAY &&
                    filter[selectedFilterRootItem]?.title === ITEM_KEY.STATE &&
                    isFiltterChanged ? (
                    <RadioFilterWithSearch
                      countryState={countryStateArray}
                      onItemSelect={onItemSelection}
                      locationAddressComponent={locationAddressComponent}
                      parantFilter={filter[selectedFilterRootItem]}
                      enableDefaultItem={true}
                      upgradePlan={upgradePlan}
                      isLock={filter[selectedFilterRootItem].disable}
                      loader={isLoadingCountryState}
                      selectedId={selectedCountryStateId}
                    />
                  ) : filter !== undefined &&
                    filter[selectedFilterRootItem]?.type !== undefined &&
                    filter[selectedFilterRootItem]?.type ===
                      FILTER_TYPE.ARRAY &&
                    isFiltterChanged ? (
                    <RadioFilterOption
                      option={filter[selectedFilterRootItem].options}
                      onItemSelect={onItemSelection}
                      upgradePlan={upgradePlan}
                      eyeHairColor={
                        filter[selectedFilterRootItem]?.title ===
                        ITEM_KEY.EYE_COLOR
                          ? eyeColorArray
                          : filter[selectedFilterRootItem]?.title ===
                            ITEM_KEY.HAI_COLOR
                          ? hairColorArray
                          : undefined
                      }
                      loader={isMasterDataLoading}
                      parantFilter={filter[selectedFilterRootItem]}
                      isLock={filter[selectedFilterRootItem].disable}
                      enableDefaultItem={true}
                      selectedId={selectedCountryStateId}
                    />
                  ) : filter !== undefined &&
                    filter[selectedFilterRootItem]?.type !== undefined &&
                    filter[selectedFilterRootItem]?.type === FILTER_TYPE.DATE &&
                    isFiltterChanged ? (
                    <DateTime
                      fromDateTitle={translations.SEARCH_DATE}
                      title={translations.SEARCH_BY}
                      type={filter[selectedFilterRootItem]?.type}
                      filter={filter[selectedFilterRootItem]}
                      onFromDateSelect={onFromDateFilter}
                    />
                  ) : filter !== undefined &&
                    filter[selectedFilterRootItem]?.type !== undefined &&
                    filter[selectedFilterRootItem]?.type ===
                      FILTER_TYPE.STATIC_OPTION &&
                    isFiltterChanged ? (
                    <RadioFilterOption
                      option={filter[selectedFilterRootItem].options}
                      onItemSelect={onItemSelection}
                      enableDefaultItem={true}
                      parantFilter={filter[selectedFilterRootItem]}
                      isLock={filter[selectedFilterRootItem].disable}
                      selectedId={selectedCountryStateId}
                    />
                  ) : filter !== undefined &&
                    filter[selectedFilterRootItem]?.type !== undefined &&
                    filter[selectedFilterRootItem]?.type ===
                      FILTER_TYPE.DATE_FROM_TO &&
                    isFiltterChanged ? (
                    <DateTime
                      fromDateTitle={translations.FROM_DATE}
                      title={translations.SEARCH_BY}
                      displayToDateBox
                      currentMaxToDateActive={
                        filter[selectedFilterRootItem]?.currentMaxToDateActive
                      }
                      type={filter[selectedFilterRootItem]?.type}
                      onFromDateSelect={onFromDateFilter}
                      onToDateSelect={onToDateFilter}
                      filter={filter[selectedFilterRootItem]}
                    />
                  ) : filter !== undefined &&
                    filter[selectedFilterRootItem]?.type !== undefined &&
                    filter[selectedFilterRootItem]?.type ===
                      FILTER_TYPE.LOCATION &&
                    isFiltterChanged ? (
                    <View style={styles.searchGoogleContainer}>
                      <Text style={styles.locationSearchHeader}>
                        {translations.SEARCH_BY_LOCATION}
                      </Text>
                      {/* <SearchAdressView
                        disableNoRecordFound={true}
                        onItemSelect={onAddresss}
                        paceHolderText={translations.LOCATION}
                      /> */}
                      {searchAddressText.length > 0 ? (
                        <View style={[styles.selectedLocation]}>
                          <View style={styles.radioButtonImage}>
                            <AppImages.Common.RadioButton
                              width={14}
                              hegith={14}
                            />
                          </View>
                          <Text style={styles.selectedLocationText}>
                            {searchAddressText}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  ) : filter !== undefined &&
                    filter[selectedFilterRootItem]?.type !== undefined &&
                    filter[selectedFilterRootItem]?.type ===
                      FILTER_TYPE.SLIDER &&
                    isFiltterChanged ? (
                    <SliderTwoWay
                      isLock={filter[selectedFilterRootItem].disable}
                      parantFilter={filter[selectedFilterRootItem]}
                      setModelVisible={setIsModalVisible}
                      upgradePlan={upgradePlan}
                      setIsPreviewModalVisible={setIsPreviewModalVisible}
                      onRangeSelecting={onRangeSelecting}
                    />
                  ) : (
                    filter !== undefined &&
                    filter[selectedFilterRootItem]?.type ===
                      FILTER_TYPE.SELECT_MULTIPLE_OPTION && (
                      <CheckBoxFilterOption
                        option={filter[selectedFilterRootItem].options}
                        onItemSelect={onCheckBoxItemSelection}
                        setModelVisible={setIsModalVisible}
                        parantFilter={filter[selectedFilterRootItem]}
                        isLock={filter[selectedFilterRootItem].disable}
                      />
                    )
                  )}
                </View>
              </View>

              <View style={styles.bottomLine} />
              {isFillterButton ? (
                <View style={styles.bottomContainer}>
                  <TouchableOpacity
                    style={{
                      ...styles.containerDelete,
                      opacity:
                        isAllFillterApplied || isFillterItemSelected ? 1 : 0.5,
                    }}
                    onPress={onClearFilterClick}>
                    <Text
                      style={{...styles.borderButtonText, color: color.BLACK}}>
                      {translations.CLEAR_FILTER}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      ...styles.containerConfirm,
                      opacity:
                        isAllFillterApplied || isFillterItemSelected ? 1 : 0.5,
                    }}
                    onPress={onFilterApplyPress}>
                    <Text style={styles.borderButtonText}>
                      {translations.APPLY}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          )}
        </ScrollView>
        {isModalVisible && <CustomToast />}
      </View>
    </Modal>
  );
};

export default DirectoryFilterModal;

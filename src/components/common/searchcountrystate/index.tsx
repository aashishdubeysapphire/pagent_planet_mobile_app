import {
  View,
  Text,
  FlatList,
  Keyboard,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import useStyle from './styles';
import AppImages from '../../../assets/images/AppImages';
import translations from '../../../assets/translations';
import React, {useEffect, useState} from 'react';
import {color} from '../../../assets/colorConstant';
import Modal from 'react-native-modal';
import {CountryResponse} from '../../../services/models/country/countryResponse';
import {CountryState} from '../../../services/models/country/CountryState';
import {GET_COUNTRY, GET_STATES} from '../../../services/endpoints';
import useHtQuery from '../../../services/api/useHtQuery';
import {checkIsNull} from '../../utils/validations';
import ShimmerList from '../../common/shimmer/listshimmer';
import NoRecord from '../norecord';
import {moderateScaleVertical} from '../../utils/responsiveSize';
export enum ITEM_KEY {
  COUNTRY = 1,
  STATE = 2,
}

interface Props {
  isModalVisible: boolean;
  isMultiSelect?: boolean;
  setIsModalVisible: any;
  preSelectedValue?: number;
  title: string;
  modelId: any;
  countryId: number;
  selectedCountries?: CountryState[];

  onItemSelect?: (itemID: number, title: string, key: string) => void;
  onMultiItemSelect?: (items: CountryState[]) => void;
}

/* This is a react component which is used to show the list of countries and states. */
const SearchCountryState = ({
  isModalVisible,
  setIsModalVisible,
  preSelectedValue = -1,
  onItemSelect,
  title,
  modelId,
  countryId = -1,
  isMultiSelect = false,
  onMultiItemSelect,
  selectedCountries = [],
}: Props) => {
  const styles = useStyle();
  const [itemSize, setItemSize] = useState(Number);
  const [multiSelectedArray, setMultiSelectedArray] = useState<CountryState[]>(
    [],
  );
  const [displayList, setTasks] = useState<CountryState[]>([]);
  const [searchState, setSearchState] = useState('');

  //API Country and State ----------------------------------------- START
  const {data, isLoading, refetch, isFetching} = useHtQuery<CountryResponse>({
    key: modelId === ITEM_KEY.COUNTRY ? GET_COUNTRY : GET_STATES + countryId,
    url: modelId === ITEM_KEY.COUNTRY ? GET_COUNTRY : GET_STATES + countryId,
    offSuccessToast: true,
  });
  //API Country and State ----------------------------------------- END

  /**
   * The function takes in an item of type CountryState, and then toggles the item's isSelected
   * property. If the isMultiSelect property is true, then the function adds the item to the
   * multiSelectedArray if it's not already there, and removes it if it is. If isMultiSelect is false,
   * then the function closes the modal and calls the onItemSelect function with the item's id, name,
   * and modelId
   * @param {CountryState} item - CountryState - This is the item that is being selected.
   */
  const onItemSelection = (item: CountryState) => {
    Keyboard.dismiss();
    item.isSelected = !item.isSelected;
    if (isMultiSelect) {
      if (item.isSelected) {
        setMultiSelectedArray(oldArray => [...oldArray, item]);
      } else {
        setMultiSelectedArray(
          multiSelectedArray?.filter(arrayItem => arrayItem.id !== item.id),
        );
      }
    } else {
      onCloseModel();
      if (onItemSelect !== null) {
        onItemSelect(item.id, item.name, modelId);
      }
    }
  };

  /* This is a react hook that is called when the component is mounted. It sets the itemSize state to
 the width of the screen minus 60. */
  useEffect(() => {
    setItemSize(Dimensions.get('window').width - moderateScaleVertical(60));
  }, []);

  /* This is a react hook that is called when the component is mounted. It sets the itemSize state to
 the width of the screen minus 60. */
  useEffect(() => {
    if (!isFetching) {
      setSearchState('');
      searchFilterFunction('');
      setMultiSelectedArray([]);
      onModelVisible();
    }
  }, [isFetching]);

  /* This is a react hook that is called when the component is mounted. It sets the itemSize state to
 the width of the screen minus 60. */
  useEffect(() => {
    if (isModalVisible) {
      setSearchState('');
      searchFilterFunction('');
      setMultiSelectedArray([]);
      onModelVisible();
    }
  }, [isModalVisible]);

  /**
   * If the data is not null and the data has a data property and the displayList is not undefined, then
   * if the modal is visible, for each visible item in the displayList, set the visible item's
   * isSelected property to false and merge the old selected items
   */
  const onModelVisible = () => {
    if (data !== null && data?.data && displayList !== undefined) {
      if (isModalVisible) {
        for (const visibleItem of displayList) {
          visibleItem.isSelected = false;
        }
        mergeOldSelectedItems();
      }
    }
  };

  /* This is a react hook that is called when the component is mounted. It sets the itemSize state to
 the width of the screen minus 60. */
  useEffect(() => {
    if (!isLoading) {
      setSearchState('');
      searchFilterFunction('');
      setMultiSelectedArray([]);
      onModelVisible();
    }
  }, [isLoading]);

  /**
   * If the selectedCountries array is not null and has a length greater than 0, then for each item in
   * the selectedCountries array, for each visible item in the displayList array, if the visible item's
   * id matches the item's id, then set the visible item's isSelected property to true and add the item
   * to the multiSelectedArray
   */
  const mergeOldSelectedItems = () => {
    if (selectedCountries !== null && selectedCountries.length > 0) {
      for (const item of selectedCountries) {
        for (const visibleItem of displayList) {
          if (visibleItem.id === item.id) {
            visibleItem.isSelected = true;
            setMultiSelectedArray(oldArray => [...oldArray, item]);
          }
        }
      }
    }
  };

  /**
   * When the modal is closed, if the search state is greater than 0, refresh the list
   */
  const onCloseModel = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      if (searchState.length > 0) {
        refreshList();
      }
    }, 200);
  };

  /**
   * If the displayList has entries, then for each entry in the displayList, set the entry's isSelected
   * property to true and add the entry to the multiSelectedArray
   */
  const onAllSelected = () => {
    setMultiSelectedArray([]);
    if (displayList?.length > 0) {
      for (const entry of displayList) {
        entry.isSelected = true;
        setMultiSelectedArray(oldArray => [...oldArray, entry]);
      }
    }
  };

  /**
   * It sets the multiSelectedArray to an empty array, and then loops through the displayList and sets
   * the isSelected property of each entry to false
   */
  const onSelectNone = () => {
    setMultiSelectedArray([]);
    for (const entry of displayList) {
      entry.isSelected = false;
    }
  };

  /**
   * It filters the data based on the text entered in the search bar
   * @param {string} text - string - The text that is being searched for.
   */
  const searchFilterFunction = (text: string) => {
    setSearchState(text);
    if (!!text && checkIsNull(data)) {
      const filteredName =
        modelId === ITEM_KEY.COUNTRY
          ? data?.data?.countries.filter(item => {
              return String(item?.name).toLowerCase().match(text.toLowerCase());
            })
          : data?.data?.states.filter(item => {
              return String(item?.name).toLowerCase().match(text.toLowerCase());
            });

      setTasks([...filteredName]);
    } else {
      setTasks(
        modelId === ITEM_KEY.COUNTRY
          ? data?.data?.countries
          : data?.data?.states,
      );
    }
  };

  /**
   * OnPressAdd() is a function that is called when the user presses the "Add" button
   */
  const onPressAdd = () => {
    if (onMultiItemSelect !== null) {
      onMultiItemSelect(multiSelectedArray);
    }
    onCloseModel();
  };

  /**
   * It refreshes the list of items.
   */
  const refreshList = async () => {
    await refetch();
  };
  return (
    <Modal
      isVisible={isModalVisible}
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      onBackButtonPress={onCloseModel}
      backdropOpacity={0.2}
      useNativeDriver={true}
      style={{marginHorizontal: 0, marginVertical: 0, marginTop: 70}}>
      <View style={styles.modalContainer}>
        <View style={styles.headingView}>
          <Text style={styles.modalHeading}>{title}</Text>
          <TouchableOpacity
            style={styles.crossIcon}
            onPress={() => {
              setIsModalVisible(false);
              if (searchState.length > 0 && displayList.length === 0) {
                refreshList();
              }
            }}>
            <AppImages.ProfileImage.Tpp_cross_icon />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBox}>
          <TextInput
            placeholder={translations.SEARCH_HERE}
            selectionColor={color.P_PINK}
            style={styles.searchTextinput}
            value={searchState}
            onChangeText={val => {
              searchFilterFunction(
                val.replace(
                  /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
                  '',
                ),
              );
            }}
          />
          <View style={styles.searchImage}>
            <AppImages.Common.tpp_search_small_icon />
          </View>
        </View>
        {isMultiSelect && (
          <Text style={styles.selectedText}>
            {multiSelectedArray?.length === displayList?.length
              ? translations.ALL_SELECTED
              : multiSelectedArray?.length + ' ' + translations.SELECTED}
          </Text>
        )}
        {isMultiSelect && (
          <View style={styles.allSelected}>
            {multiSelectedArray?.length !== displayList?.length &&
            displayList?.length ? (
              <TouchableOpacity onPress={() => onAllSelected()}>
                <Text style={styles.selectedAllTitle}>
                  {translations.SELECT_ALL}
                </Text>
              </TouchableOpacity>
            ) : (
              <View />
            )}

            {multiSelectedArray?.length > 0 ? (
              <TouchableOpacity onPress={() => onSelectNone()}>
                <Text style={styles.selectedAllTitle}>
                  {translations.SELECT_NON}
                </Text>
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>
        )}

        {data !== null && displayList?.length > 0 ? (
          <FlatList
            data={displayList}
            numColumns={1}
            key={'#'}
            initialNumToRender={100}
            keyboardShouldPersistTaps="always"
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => onItemSelection(item)}
                style={styles.textView}>
                <Text
                  style={{
                    ...styles.selectiontext,
                    color:
                      item.isSelected || preSelectedValue === item.id
                        ? color.P_PINK
                        : color.BLACK,
                  }}>
                  {item?.name}
                </Text>
                {item.isSelected || preSelectedValue === item.id ? (
                  <AppImages.Common.PinkTickIcon />
                ) : null}
              </TouchableOpacity>
            )}
          />
        ) : isLoading ? (
          <ShimmerList
            width={itemSize}
            height={18}
            padding={16}
            borderRadius={6}
            numColumns={1}
          />
        ) : displayList?.length === 0 ? (
          <View style={styles.noRecordContainer}>
            <NoRecord rightIcon={<AppImages.Common.NoRecordIcon />} />
          </View>
        ) : (
          <View />
        )}

        {isMultiSelect && displayList?.length > 0 && (
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={styles.containerDelete}
              onPress={onCloseModel}>
              <Text style={{...styles.borderButtonText, color: color.BLACK}}>
                {translations.CANCLE}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.containerConfirm}
              onPress={onPressAdd}>
              <Text style={styles.borderButtonText}>{translations.ADD}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default SearchCountryState;

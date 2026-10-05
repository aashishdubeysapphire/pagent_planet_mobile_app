import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import AppImages from '../../../../../../assets/images/AppImages';
import React, {useEffect, useRef, useState} from 'react';
import {CountryState} from '../../../../../../services/models/country/CountryState';
import ShimmerList from '../../../../../common/shimmer/listshimmer';
import {Filter} from '../../../../../../services/models/filterData';
import UpgradePlan from '../upgradeplan';
import translations from '../../../../../../assets/translations';
// import {AddressComponent} from 'react-native-google-places-autocomplete';
import {color} from '../../../../../../assets/colorConstant';
import {checkIsNull} from '../../../../../utils/validations';

interface Props {
  loader?: boolean;
  enableDefaultItem?: boolean;
  selectedId: number;
  countryState?: CountryState[];
  onItemSelect: (itemID: number, query: string) => void;
  upgradePlan: () => void;
  isLock: boolean;
  parantFilter: Filter;
  // locationAddressComponent?: AddressComponent[];
}

/* This is a react component which is used to show the list of countries and states. */
const RadioFilterWithSearch = ({
  countryState,
  onItemSelect,
  upgradePlan,
  loader = false,
  enableDefaultItem = false,
  selectedId = -1,
  isLock,
  parantFilter,

  locationAddressComponent,
}: Props) => {
  const [isSelected, setIsSelected] = useState(parantFilter?.selectedIndex);

  const [searchState, setSearchState] = useState('');
  const [displayList, setTasks] = useState<CountryState[]>();
  const flatList = useRef();
  const renderRadioButton = (item: any | undefined) => {
    return parantFilter?.selectedIndex === undefined ||
      parantFilter?.selectedIndex === -1 ? (
      <View style={[styles.selected]}>
        <View style={styles.radioButtonImage}>
          <AppImages.Common.RadioButton width={14} height={14} />
        </View>
        <Text style={styles.selectedText}>{translations.DEFUALT_FILTER}</Text>
      </View>
    ) : (
      <TouchableOpacity
        style={[styles.selected]}
        onPress={() => {
          if (item !== undefined) {
            setIsSelected(item?.id);
            onItemSelect(item?.value, item?.value);
          } else {
            setIsSelected(-1);
            onItemSelect(-1, '');
          }
        }}>
        <View style={styles.radioButtonImage}>
          <AppImages.Common.Ellipse width={14} height={14} />
        </View>
        <Text style={styles.unselectedText}>{translations.DEFUALT_FILTER}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (
      locationAddressComponent !== undefined &&
      locationAddressComponent.length > 0 &&
      countryState !== undefined &&
      countryState.length > 0
    ) {
      for (let index = 0; index < countryState.length; index++) {
        locationAddressComponent?.forEach(locationElement => {
          if (countryState[index]?.name === locationElement.long_name) {
            setIsSelected(countryState[index].id);
            onRadioCountryStateSelection(countryState[index]);
          }
        });
      }
    }
    searchFilterFunction('');
  }, [countryState]);

  /**
   * It sets the state of the selected item and then calls the onItemSelect function with the id and
   * name of the selected item
   * @param {CountryState} item - CountryState - The item that was selected
   */
  const onRadioCountryStateSelection = (item: CountryState) => {
    setIsSelected(item?.id);
    if (item?.sort_name !== undefined) {
      onItemSelect(item?.id, item?.sort_name);
    } else {
      onItemSelect(item?.id, item?.slug);
    }
  };

  /**
   * It returns a View component with a style of staticHeight
   * @returns A view with a static height.
   */
  const listFooterComponent = () => {
    return <View style={styles.staticHeight} />;
  };

  const searchFilterFunction = (text: string) => {
    setSearchState(text);
    if (!!text && checkIsNull(countryState)) {
      const filteredName = countryState?.filter(item => {
        return String(item.name).toLowerCase().match(text.toLowerCase());
      });
      setTasks([...filteredName]);
    } else {
      setTasks(countryState);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.filterOptionValueTextContainer}>
        {parantFilter?.title}
      </Text>
      {!loader ? (
        <View>
          <View style={styles.searchBOx}>
            <TextInput
              placeholder={translations.SEARCH_HERE}
              selectionColor={color.P_PINK}
              style={styles.searchTExtinput}
              value={searchState}
              onChangeText={val => {
                searchFilterFunction(
                  val.replace(
                    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
                    ''
                  )
                );
              }}
            />
            <View style={styles.searchImage}>
              <AppImages.Common.tpp_search_small_icon />
            </View>
          </View>
          {isLock !== undefined && !isLock ? (
            <UpgradePlan upgradePlan={upgradePlan} />
          ) : (
            <FlatList
              data={displayList}
              ref={flatList}
              initialNumToRender={1000}
              ListFooterComponent={listFooterComponent}
              ListHeaderComponent={
                enableDefaultItem ? renderRadioButton(undefined) : null
              }
              renderItem={({item, index}) => (
                <View>
                  {isSelected === item?.id ||
                  selectedId === item?.id ||
                  (isSelected === -1 && item === undefined) ? (
                    <View style={[styles.selected]}>
                      <View style={styles.radioButtonImage}>
                        <AppImages.Common.RadioButton width={14} height={14} />
                      </View>
                      <Text style={styles.selectedText}>{item?.name}</Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={[styles.selected]}
                      onPress={() => {
                        onRadioCountryStateSelection(item);
                      }}>
                      <View style={styles.radioButtonImage}>
                        <AppImages.Common.Ellipse width={14} height={14} />
                      </View>
                      <Text style={styles.unselectedText}>{item?.name}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            />
          )}
        </View>
      ) : (
        <ShimmerList
          width={180}
          height={18}
          padding={8}
          borderRadius={6}
          numColumns={1}
        />
      )}
    </View>
  );
};

export default RadioFilterWithSearch;

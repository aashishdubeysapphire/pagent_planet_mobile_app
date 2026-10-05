import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import AppImages from '../../../../../../assets/images/AppImages';
import React, {useState} from 'react';
import {CountryState} from '../../../../../../services/models/country/CountryState';
import ShimmerList from '../../../../../common/shimmer/listshimmer';
import {Filter, Option} from '../../../../../../services/models/filterData';
import UpgradePlan from '../upgradeplan';
import translations from '../../../../../../assets/translations';
import {MasterRecordsItem} from '../../../../../../services/models/masterData';

interface Props {
  loader?: boolean;
  enableDefaultItem?: boolean;
  selectedId: number;
  option: Option[] | undefined;
  eyeHairColor: MasterRecordsItem[] | undefined;
  onItemSelect: (itemID: number, query: string) => void;
  upgradePlan: () => void;
  isLock: boolean | undefined;
  parantFilter: Filter;
}

/* This is a react component which is used to show the list of countries and states. */
const RadioFilterOption = ({
  onItemSelect,
  upgradePlan,
  option,
  loader = false,
  enableDefaultItem = false,
  selectedId = -1,
  isLock,
  parantFilter,
  eyeHairColor,
}: Props) => {
  const [isSelected, setIsSelected] = useState(parantFilter?.selectedIndex);

  const renderRadioButton = (item: any | undefined) => {
    return parantFilter?.selectedIndex === undefined ||
      parantFilter?.selectedIndex === -1 ? (
      <View style={[styles.selected]}>
        <View style={styles.circleImage}>
          <AppImages.Common.RadioButton width={14} height={14} />
        </View>
        <Text style={styles.selectedDefaultText}>
          {translations.DEFUALT_FILTER}
        </Text>
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
        <View style={styles.circleImage}>
          <AppImages.Common.Ellipse width={14} height={14} />
        </View>
        <Text style={styles.unselectedText}>{translations.DEFUALT_FILTER}</Text>
      </TouchableOpacity>
    );
  };

  /**
   * It sets the selected option's id as the selected id and calls the onItemSelect function with the
   * selected option's id and value
   * @param {Option} optionItem - Option - This is the option object that is passed to the
   * onRadioOptionSelection function.
   */
  const onRadioOptionSelection = (optionItem: Option) => {
    setIsSelected(optionItem?.id);
    onItemSelect(optionItem?.id, optionItem?.value);
  };

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

  return (
    <View style={styles.container}>
      <Text style={styles.filterOptionValueTextContainer}>
        {parantFilter?.title}
      </Text>
      {!loader ? (
        <View>
          {isLock !== undefined && !isLock ? (
            <UpgradePlan upgradePlan={upgradePlan} />
          ) : (
            <FlatList
              data={
                option !== undefined && option?.length > 0
                  ? option
                  : eyeHairColor
              }
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
                      <View style={styles.circleImage}>
                        <AppImages.Common.RadioButton width={14} height={14} />
                      </View>
                      <Text style={styles.selectedDefaultText}>
                        {item?.name}
                      </Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={[styles.selected]}
                      onPress={() => {
                        if (option !== undefined && item?.value !== undefined) {
                          onRadioOptionSelection(item);
                        } else {
                          onRadioCountryStateSelection(item);
                        }
                      }}>
                      <View style={styles.circleImage}>
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
          height={19}
          padding={8}
          borderRadius={6}
          numColumns={1}
        />
      )}
    </View>
  );
};

export default RadioFilterOption;

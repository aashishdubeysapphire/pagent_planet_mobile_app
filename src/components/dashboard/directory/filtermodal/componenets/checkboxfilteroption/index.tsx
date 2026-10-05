import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import AppImages from '../../../../../../assets/images/AppImages';
import React from 'react';
import ShimmerList from '../../../../../common/shimmer/listshimmer';
import {Filter, Option} from '../../../../../../services/models/filterData';
import UpgradePlan from '../upgradeplan';
import translations from '../../../../../../assets/translations';
import {SELL_COLOR} from '../../../../../utils/enum';

interface Props {
  loader?: boolean;
  isAllSelected?: boolean;
  option?: Option[];
  onItemSelect: (index: number) => void;
  isLock: boolean | undefined;
  parantFilter: Filter;
  setModelVisible?: any;
}

/* A function that returns a View component. */
const CheckBoxFilterOption = ({
  onItemSelect,
  option,
  loader = false,
  isLock,
  parantFilter,
  setModelVisible,
}: Props) => {
  /**
   * It renders a TouchableOpacity component with a View component inside it. The View component has a
   * View component inside it. The View component has a Text component inside it
   * @returns A function that returns a TouchableOpacity component.
   */
  const renderSelectAllOption = () => {
    return (
      <TouchableOpacity
        style={[styles.selected]}
        onPress={() => {
          onItemSelect(-1);
        }}>
        <View>
          {parantFilter.isAllSelected ? (
            <View style={[styles.row]}>
              <View style={styles.radioButtonImageAll}>
                <AppImages.PCA.checkBoxselected width={14} height={14} />
              </View>
              <Text style={styles.selectedTextAll}>{translations.ALL}</Text>
            </View>
          ) : (
            <View style={[styles.row]}>
              <View style={styles.radioButtonImageAll}>
                <AppImages.PCA.checkBoxunselected width={14} height={14} />
              </View>
              <Text style={styles.unselectedTextAll}>{translations.ALL}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
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
            <UpgradePlan setModelVisible={setModelVisible} />
          ) : (
            <FlatList
              data={option}
              initialNumToRender={1000}
              ListFooterComponent={listFooterComponent}
              ListHeaderComponent={renderSelectAllOption()}
              renderItem={({item, index}) => (
                <View>
                  <TouchableOpacity
                    style={[styles.selected]}
                    onPress={() => {
                      onItemSelect(index);
                    }}>
                    {item?.isSelcted !== undefined && item?.isSelcted ? (
                      <View style={[styles.rowItem]}>
                        <View style={styles.radioButtonImageAll}>
                          <AppImages.PCA.checkBoxselected
                            width={14}
                            height={14}
                          />
                        </View>
                        {item.hexcode !== undefined && (
                          <>
                            {item.name === SELL_COLOR.MULTI_COLOR ? (
                              <View style={[styles.colorCircle]}>
                                <AppImages.Dashboard.MultiColorIcon
                                  width={14}
                                  height={14}
                                />
                              </View>
                            ) : (
                              <View
                                style={[
                                  styles.colorCircle,
                                  {backgroundColor: item.hexcode},
                                ]}
                              />
                            )}
                          </>
                        )}
                        <Text numberOfLines={3} style={styles.selectedText}>
                          {item?.name}
                        </Text>
                      </View>
                    ) : (
                      <View style={[styles.rowItem]}>
                        <View style={styles.checkboxImageContainer}>
                          <AppImages.PCA.checkBoxunselected
                            height={14}
                            width={14}
                          />
                        </View>

                        {item.hexcode !== undefined &&
                          item.hexcode.length > 0 && (
                            <>
                              {item.name === SELL_COLOR.MULTI_COLOR ? (
                                <View style={[styles.colorCircle]}>
                                  <AppImages.Dashboard.MultiColorIcon
                                    width={14}
                                    height={14}
                                  />
                                </View>
                              ) : (
                                <View
                                  style={[
                                    styles.colorCircle,
                                    {backgroundColor: item.hexcode},
                                  ]}
                                />
                              )}
                            </>
                          )}

                        <Text numberOfLines={3} style={styles.unselectedText}>
                          {item?.name}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
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

export default CheckBoxFilterOption;

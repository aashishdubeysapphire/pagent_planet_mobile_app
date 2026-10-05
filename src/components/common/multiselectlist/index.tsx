import {View, Text, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import SelectableCards from '../selectablecards';
import {styles} from './styles';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';
import ShimmerList from '../shimmer/listshimmer';
import AppImages from '../../../assets/images/AppImages';
import translations from '../../../assets/translations';

/**
 * This function is used to display the list of contestants in the contest
 */
const MultiSelectList = ({
  displayData = [],
  selectedArray = [],
  setSelectedArray = () => {},
  onTextClickListener = item => {},
  onClaimButtonClicked = item => {},
  areSelectable = true,
  isLoading = false,
  showRatings = false,
  isReadOlny = false,
  isContestantList = false,
  isSearching = true,
  isFlatListScroolEnable,
}) => {
  const onPressitem = item => {
    if (JSON.stringify(selectedArray).includes(JSON.stringify(item.id))) {
      const filterArray = selectedArray.filter(i => {
        return i['id'] !== item.id;
      });
      setSelectedArray(filterArray);
    } else {
      setSelectedArray([item, ...selectedArray]);
    }
  };

  return (
    <View>
      {isLoading ? (
        <ShimmerList
          width={Dimensions.get('window').width / 2 - moderateScale(24)}
          height={moderateScaleVertical(189)}
          padding={15}
          numColumns={2}
        />
      ) : (
        <FlatList
          data={displayData}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          removeClippedSubviews={true} // Unmount components when outside of window
          initialNumToRender={2} // Reduce initial render amount
          maxToRenderPerBatch={1} // Reduce number in each render batch
          updateCellsBatchingPeriod={1} // Increase time between renders
          windowSize={70} // Reduce the window size
          numColumns={2}
          scrollEnabled={isFlatListScroolEnable}
          contentContainerStyle={{justifyContent: 'space-between'}}
          ItemSeparatorComponent={() => {
            return <View style={styles.itemSeperator}></View>;
          }}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => onPressitem(item)}
              activeOpacity={areSelectable ? 0.5 : 1}>
              <SelectableCards
                index={index}
                item={item}
                isDisplaiClaimButton={isReadOlny}
                onTextClickListener={onTextClickListener}
                onClaimButtonClicked={onClaimButtonClicked}
                isSelected={JSON.stringify(selectedArray).includes(item.id)}
                areSelectable={areSelectable}
                showRatings={showRatings}
              />
            </TouchableOpacity>
          )}
          ListFooterComponent={() => {
            return <View style={styles.freeHeight} />;
          }}
          ListEmptyComponent={() => {
            return isContestantList && !isSearching ? (
              <View style={styles.noContestantView}>
                <AppImages.Common.blackAlert />
                <Text style={styles.textStyle}>
                  {translations.NO_CONTESTANTS_FOUND}
                </Text>
              </View>
            ) : (
              <View style={styles.noRecordImg}>
                <AppImages.Common.NoRecordIcon />
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default MultiSelectList;

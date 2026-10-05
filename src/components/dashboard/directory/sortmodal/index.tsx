import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import BottomModal from '../../../common/bottommodal';
import {styles} from './styles';
import AppImages from '../../../../assets/images/AppImages';
import {Filter} from '../../../../services/models/filterData';
import translations from '../../../../assets/translations';
import { moderateScaleVertical } from '../../../utils/responsiveSize';

interface Props {
  isSorByFillterVisible: boolean;
  setSorByFillterVisible: any;
  filter: Filter | undefined;
  onItemSelect: (itemID: string) => void;
}
const SortMoal = ({
  isSorByFillterVisible,
  setSorByFillterVisible,
  filter,
  onItemSelect,
}: Props) => {
  /**
   * It renders a radio button with a pink tick icon if the selected index is equal to the item id or
   * if the selected index is equal to 0 and the item is undefined
   * @param {any | undefined} item - The item that is being rendered.
   * @returns A function that returns a view.
   */
  const renderRadioButton = () => {
    return filter?.selectedIndex === -1 ||
      filter?.selectedIndex === undefined ? (
      <View style={[styles.selected]}>
        <Text style={styles.selectedText}>{translations.DEFUALT_FILTER}</Text>
        <AppImages.Common.PinkTickIcon />
      </View>
    ) : (
      <TouchableOpacity
        style={[styles.selected]}
        onPress={() => {
          onItemSelect('');
        }}>
        <Text style={styles.unselectedText}>{translations.DEFUALT_FILTER}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <BottomModal
      isModalVisible={isSorByFillterVisible}
      setIsModalVisible={setSorByFillterVisible}
      customStyles={{
        height: '60%',
        paddingHorizontal: moderateScaleVertical(16),
      }}>
      <View>
        <View style={styles.headingView}>
          <Text style={styles.modalHeading}>{filter?.title}</Text>
          <TouchableOpacity
            onPress={() => {
              setSorByFillterVisible(false);
            }}>
            <AppImages.ProfileImage.Tpp_cross_icon />
          </TouchableOpacity>
        </View>

        <FlatList
          data={filter?.options}
          ListHeaderComponent={renderRadioButton()}
          renderItem={({item, index}) => (
            <View>
              {filter?.selectedIndex !== undefined &&
              filter?.selectedIndex === item?.id ? (
                <TouchableOpacity
                  onPress={() => {
                    if (filter !== undefined) {
                      onItemSelect(item?.value);
                    }
                  }}>
                  <View style={[styles.selected]}>
                    <Text style={styles.selectedText}>{item?.name}</Text>
                    <AppImages.Common.PinkTickIcon />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.selected]}
                  onPress={() => {
                    if (filter !== undefined) {
                      onItemSelect(item?.value);
                    }
                  }}>
                  <Text style={styles.unselectedText}>{item?.name}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </View>
    </BottomModal>
  );
};

export default SortMoal;

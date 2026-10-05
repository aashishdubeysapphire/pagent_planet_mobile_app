import {
  View,
  Text,
  FlatList,
  Keyboard,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {styles} from './styles';
import AppImages from '../../../../../../../../../assets/images/AppImages';
import translations from '../../../../../../../../../assets/translations';
import React, {useEffect, useState} from 'react';
import {color} from '../../../../../../../../../assets/colorConstant';
import Modal from 'react-native-modal';
import {MasterRecordsItem} from '../../../../../../../../../services/models/masterData';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: any;
  preSelectedValue?: number;
  title: string;
  voteCountListArr: MasterRecordsItem[] | undefined;
  onItemSelect?: (item: MasterRecordsItem, title: string) => void;
}

/* This is a react component which is used to show the list of countries and states. */
const VoteQuantityModel = ({
  isModalVisible,
  setIsModalVisible,
  preSelectedValue = -1,
  onItemSelect,
  title,
  voteCountListArr,
}: Props) => {
  const [displayList, setTasks] = useState<MasterRecordsItem[]>([]);
  const [searchState, setSearchState] = useState('');
  const [selectedVoteId, setSelecteVoteID] = useState(-1);

  const onItemSelection = (item: MasterRecordsItem) => {
    Keyboard.dismiss();
    for (const visibleItem of displayList) {
      visibleItem.isSelected = false;
    }
    for (const visibleItem of voteCountListArr) {
      visibleItem.isSelected = false;
    }
    setSelecteVoteID(item.id);
    // item.isSelected = !item.isSelected;
    onCloseModel();
    if (onItemSelect !== undefined) {
      onItemSelect(item, item.name + '');
    }
  };

  useEffect(() => {
    if (isModalVisible) {
      setSearchState('');
      searchFilterFunction('');
    }
  }, [isModalVisible]);

  /**
   * When the modal is closed, if the search state is greater than 0, refresh the list
   */
  const onCloseModel = () => {
    setIsModalVisible(false);
  };

  /**
   * It filters the data based on the text entered in the search bar
   * @param {string} text - string - The text that is being searched for.
   */
  const searchFilterFunction = (text: string) => {
    setSearchState(text);
    if (!!text && text.length > 0) {
      const filteredName = voteCountListArr?.filter(item => {
        return String(item.name).toLowerCase().match(text.toLowerCase());
      });

      setTasks([...filteredName]);
    } else {
      setTasks(voteCountListArr);
    }
  };

  useEffect(() => {
    searchFilterFunction('');
  }, []);

  return (
    <Modal
      backdropOpacity={0.2}
      useNativeDriver={true}
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      onBackButtonPress={onCloseModel}
      isVisible={isModalVisible}
      style={{marginHorizontal: 0, marginVertical: 0, marginTop: 70}}>
      <View style={styles.modalContainer}>
        <View style={styles.headingView}>
          <Text style={styles.modalHeading}>{title}</Text>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => {
              setIsModalVisible(false);
            }}>
            <AppImages.ProfileImage.Tpp_cross_icon />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBOx}>
          <TextInput
            placeholder={translations.SEARCH_HERE}
            selectionColor={color.P_PINK}
            style={styles.searchTextinput}
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

        {displayList?.length > 0 && (
          <FlatList
            data={displayList}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            numColumns={1}
            key={'#'}
            initialNumToRender={100}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.textView}
                onPress={() => onItemSelection(item)}>
                <Text
                  style={{
                    ...styles.selectionVoteText,
                    color:
                      selectedVoteId === item.id ? color.P_PINK : color.BLACK,
                  }}>
                  {item.name}
                </Text>
                {selectedVoteId === item.id && (
                  <AppImages.Common.PinkTickIcon />
                )}
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </Modal>
  );
};

export default VoteQuantityModel;

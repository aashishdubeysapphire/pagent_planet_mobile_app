import React, {useState} from 'react';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
import {color} from '../../../../../../assets/colorConstant';
import {styles} from './styles';
import translations from '../../../../../../assets/translations';
const TopSlider = ({data, selectedCallback, preSelected = ''}) => {
  const [isSelected, setIsSelected] = useState(translations.PAGEANT_ENTERED);
  React.useEffect(() => {
    sendSelected();
  }, [isSelected]);
  React.useEffect(() => {
    !!preSelected && setIsSelected(preSelected);
  }, [preSelected]);
  const sendSelected = () => {
    selectedCallback(isSelected);
  };
  const handleChange = item => {
    setIsSelected(item.title);
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        horizontal={true}
        data={data}
        keyExtractor={(x, i) => i.toString()}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        renderItem={({item, index}) => (
          <>
            <TouchableOpacity
              style={[
                styles.selectedHeaderView,
                {
                  backgroundColor:
                    item.title === isSelected ? color.P_PINK : color.S_GRAY_2,
                },
              ]}
              onPress={() => handleChange(item)}>
              <Text
                style={[
                  styles.selectedHeadingText,
                  {
                    color:
                      item.title === isSelected ? color.WHITE : color.S_GRAY_4,
                  },
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          </>
        )}
      />
    </View>
  );
};

export default TopSlider;

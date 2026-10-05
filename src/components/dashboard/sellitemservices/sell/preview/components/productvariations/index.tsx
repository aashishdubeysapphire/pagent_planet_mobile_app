import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {VariableField} from '../../../../../../../services/models/sellitems/stepOne/catgoryFields';
import translations from '../../../../../../../assets/translations';

interface Props {
  nonVariableFields?: VariableField[];
  skipNull?: boolean;
}
export enum SCREEN_ENUM {
  BRAND = 'Brand',
}

const ProductVariation = ({nonVariableFields, skipNull = false}: Props) => {
  const getFilteredlist = () => {
    let list: VariableField[] = [];
    !!nonVariableFields &&
      nonVariableFields.map(i => {
        if (getName(i) !== '---') {
          list.push(i);
        }
      });
    return list;
  };

  const getName = item => {
    return item?.values?.name === translations.NO_SMALL
      ? '---'
      : item?.values !== undefined &&
        item?.values !== null &&
        item?.values?.name !== undefined
      ? item?.values?.name
      : '---';
  };
  const renderitem = item => {
    return (
      item.label !== SCREEN_ENUM.BRAND && (
        <View style={styles.variationContainer}>
          <Text numberOfLines={1} style={styles.variationLabel}>
            {item.label}
          </Text>
          <Text style={styles.variationInfo} numberOfLines={1}>
            {getName(item)}
          </Text>
        </View>
      )
    );
  };
  return (
    <View style={styles.Container}>
      <FlatList
        data={skipNull ? getFilteredlist() : nonVariableFields}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        key={'*'}
        showsHorizontalScrollIndicator={false}
        columnWrapperStyle={{}}
        renderItem={({item, index}) => {
          return renderitem(item);
        }}
      />
    </View>
  );
};

export default ProductVariation;

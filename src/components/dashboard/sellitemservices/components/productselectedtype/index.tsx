import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';
import translations from '../../../../../assets/translations';
import AppImages from '../../../../../assets/images/AppImages';
import {SELL_COLOR} from '../../../../utils/enum';
import {checkIsNull} from '../../../../utils/validations';
import {
  ProductVariantSizeList,
  VariableField,
} from '../../../../../services/models/sellitems/stepOne/catgoryFields';

interface Props {
  label?: string;
  image?: any;
  info?: string | number;
  lastElementIndex?: number;
  colorsList?: VariableField[] ;
  productVariantSizeList?: ProductVariantSizeList[];
}

const ProductSelectedType = ({
  label,
  image,
  info,
  lastElementIndex,
  colorsList,
  productVariantSizeList,
}: Props) => {
  const getComma = (i: number, length: number) => {
    return i + 1 === length ? '' : ', ';
  };

  const getSizeLabel = (text: any | undefined) => {
    return text?.toString()?.split(' ')[0];
  };

  return (
    <View
      style={{
        ...styles.statsContainer,
        marginTop: lastElementIndex === 0 ? 0 : moderateScaleVertical(10),
      }}>
      {image}
      <Text
        style={{
          ...styles.categoryLabelTitle,
          marginLeft: checkIsNull(image) ? moderateScale(8) : 0,
        }}>
        {label === translations.AB_AURORA_BOREALIS ? label : `${label}:`}
      </Text>

      {info !== undefined && (
        <Text
          style={{
            ...styles.categoryLabel,
            width: label === translations.BRAND ? moderateScale(260) : null,
          }}
          numberOfLines={1}>
          {' ' + info}
        </Text>
      )}

      {label === translations.COLOR && (
        <View style={styles.colorSection}>
          <FlatList
            data={colorsList}
            horizontal={colorsList?.length > 1 ? true : false}
            nestedScrollEnabled={colorsList?.length > 1 ? true : false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View>
                {item.name === SELL_COLOR.MULTI_COLOR ? (
                  <View style={styles.colorCircle}>
                    <AppImages.Dashboard.MultiColorIcon
                      width={moderateScale(14)}
                      height={moderateScale(14)}
                    />
                  </View>
                ) : (
                  <View style={styles.colorRow}>
                    <View
                      style={[
                        styles.colorCircle,
                        {backgroundColor: item.hex_code},
                      ]}
                    />
                    {colorsList?.length === 1 && (
                      <Text style={styles.colorName}>{item.name}</Text>
                    )}
                  </View>
                )}
              </View>
            )}
          />
        </View>
      )}
      {label === translations.SIZE_SELECTED &&
        productVariantSizeList !== undefined && (
          <View style={styles.colorSection}>
            <FlatList
              data={productVariantSizeList}
              horizontal
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <Text style={styles.categoryLabel}>
                  {getSizeLabel(item?.size?.name) +
                    getComma(index, productVariantSizeList.length)}
                </Text>
              )}
            />
          </View>
        )}
      {label === translations.SIZE && productVariantSizeList !== undefined && (
        <View style={styles.colorSection}>
          <FlatList
            data={productVariantSizeList}
            nestedScrollEnabled={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <Text style={styles.categoryLabel}>{item?.size?.name}</Text>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default ProductSelectedType;

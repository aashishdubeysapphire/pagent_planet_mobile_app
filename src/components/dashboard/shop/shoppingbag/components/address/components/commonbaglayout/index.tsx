import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import AppImages from '../../../../../../../../assets/images/AppImages';
import {moderateScale} from '../../../../../../../utils/responsiveSize';
import FastImageView from '../../../../../../../common/fastimageview';
import {SELL_COLOR} from '../../../../../../../utils/enum';
import translations from '../../../../../../../../assets/translations';

interface Props {
  imageUrl: string;
  productName: string;
  colorName: string;
  colorCode: string;
  size: number;
  noOfLines: number;
  outofstock: boolean;
}

const CommonBagLayout = ({
  imageUrl,
  productName,
  colorName,
  colorCode,
  size,
  noOfLines,
  outofstock = false,
}: Props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.image}>
        <FastImageView
          imageUrl={imageUrl}
          width={moderateScale(50)}
          height={moderateScale(50)}
          borderRadius={moderateScale(8)}
          isCircle
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.productLabel} numberOfLines={noOfLines}>
          {productName}
        </Text>
        {colorCode && (
          <View style={styles.colorSizeSection}>
            {colorName === SELL_COLOR.MULTI_COLOR ? (
              <AppImages.Dashboard.MultiColorIcon
                width={moderateScale(10)}
                height={moderateScale(10)}
                marginRight={moderateScale(4)}
              />
            ) : (
              <View
                style={{
                  ...styles.circularColor,
                  backgroundColor: colorCode,
                }}></View>
            )}
            <Text style={styles.productsSize}>{colorName},</Text>
            <Text style={styles.productsSize}>{' ' + size}</Text>
          </View>
        )}
        {outofstock && (
          <View style={styles.colorSizeSection}>
            <View style={styles.color} />
            <Text style={styles.outofstock}>{translations.OUT_OF_STOCK}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default CommonBagLayout;

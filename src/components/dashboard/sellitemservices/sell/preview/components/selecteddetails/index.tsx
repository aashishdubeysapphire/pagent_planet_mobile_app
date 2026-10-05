import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import translations from '../../../../../../../assets/translations';
import {color} from '../../../../../../../assets/colorConstant';
import FastImageView from '../../../../../../common/fastimageview';
import AppImages from '../../../../../../../assets/images/AppImages';
import ProductSelectedType from '../../../../components/productselectedtype';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';
import {ProductsData} from '../../../../../../../services/models/sellitems/myProducts';
import {ProductVariantSizeList} from '../../../../../../../services/models/sellitems/stepOne/catgoryFields';
import {SELL_PRODUCT} from '../../../../../../utils/enum';
import {JEWELRY_ENUM} from '../../../components/selladdeditvariantitem/variantdetail';

interface Props {
  prodcutDetail: ProductsData;
  setUploadCounter: any;
  imageCount: number;
}

const ProductSelectedDetails = ({
  prodcutDetail,
  imageCount,
  setUploadCounter,
}: Props) => {
  const [prodcutSizes] = useState<ProductVariantSizeList[]>([]);
  const [isSetPriceViraint, setPriceViraint] = useState(false);
  const [totalFilerCount, setTotalFilerCount] = useState(0);
  const [brand, setBrand] = useState('');
  const [abJewelry, setAbJewelry] = useState('');

  useEffect(() => {
    var imageUploadCounter = 0;
    var totalFileDisplayCounter = 0;
    prodcutDetail?.result?.variable_fields?.forEach(element => {
      if (element.localImage !== undefined) {
        imageUploadCounter = imageUploadCounter + 1;
      }
      totalFileDisplayCounter = totalFileDisplayCounter + 1;

      if (
        (element.ab !== undefined &&
          prodcutDetail.category_detail?.id === SELL_PRODUCT.JEWELRY) ||
        (element.ab !== undefined &&
          prodcutDetail.category_id === SELL_PRODUCT.JEWELRY)
      ) {
        if (element.ab !== JEWELRY_ENUM.JEWELRY_AB_NO) {
          setAbJewelry(translations.YES);
        }
      }

      element?.productVariantSizeList?.forEach(elementSize => {
        if (!isExist(elementSize, prodcutSizes)) {
          prodcutSizes.push(elementSize);
        }
        if (
          !isSetPriceViraint &&
          elementSize?.isDiffPrice !== undefined &&
          elementSize?.isDiffPrice
        ) {
          setPriceViraint(elementSize?.isDiffPrice);
        }
      });
    });

    if (
      prodcutDetail?.additionalImage !== undefined &&
      prodcutDetail?.additionalImage?.length > 0
    ) {
      prodcutDetail?.additionalImage?.forEach(element => {
        if (element.uri !== undefined && element.uri.length > 0) {
          imageUploadCounter = imageUploadCounter + 1;
        }
      });
    }

    if (
      prodcutDetail?.additional_images !== undefined &&
      prodcutDetail?.additional_images?.length > 0
    ) {
      prodcutDetail?.additional_images?.forEach(element => {
        if (element !== undefined && element.length > 0) {
          totalFileDisplayCounter = totalFileDisplayCounter + 1;
        }
      });
    }

    prodcutDetail?.result?.non_variable_fields?.forEach(element => {
      if (element?.label !== undefined && element?.label === 'Brand') {
        setBrand(element?.values?.name);
      }
    });

    if (prodcutDetail?.ticket_image !== undefined) {
      imageUploadCounter = imageUploadCounter + 1;
      totalFileDisplayCounter = totalFileDisplayCounter + 1;
    } else if (prodcutDetail?.ticketImage !== undefined) {
      totalFileDisplayCounter = totalFileDisplayCounter + 1;
    }
    if (prodcutDetail?.sample_audio !== undefined) {
      imageUploadCounter = imageUploadCounter + 1;
    }
    if (prodcutDetail?.full_audio !== undefined) {
      imageUploadCounter = imageUploadCounter + 1;
    }
    if (prodcutDetail?.digital_file !== undefined) {
      imageUploadCounter = imageUploadCounter + 1;
    }

    setTotalFilerCount(totalFileDisplayCounter);
    if (prodcutDetail?.localImage !== undefined) {
      imageUploadCounter = imageUploadCounter + 1;
    }

    setUploadCounter(imageUploadCounter);
  }, []);

  const isExist = (
    variableField: ProductVariantSizeList,
    variant: ProductVariantSizeList[] | undefined
  ) => {
    var found = 0;
    variant?.forEach(newElement => {
      if (variableField?.size?.id === newElement?.size?.id && found < 1) {
        found = 1;
      }
    });
    return found === 1;
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.imageSection}>
          <FastImageView
            width={moderateScaleVertical(92)}
            height={moderateScaleVertical(92)}
            imageUrl={
              prodcutDetail?.featured_full_path_image !== undefined
                ? prodcutDetail?.featured_full_path_image
                : ''
            }
            borderRadius={moderateScale(12)}
            borderColor={color.S_GRAY_2}
          />
          {totalFilerCount > 0 && (
            <View style={styles.imageInfo}>
              <Text style={styles.infoProductLabel} numberOfLines={1}>
                {'+' + totalFilerCount + ' ' + translations.MORE_IMAGES}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.productSection}>
          <Text style={styles.productLabel} numberOfLines={2}>
            {prodcutDetail.unique_style_number}
          </Text>
          <View style={styles.infoSection}>
            <Text numberOfLines={1} ellipsizeMode={'tail'}>
              <Text
                style={[
                  prodcutDetail.selling_price !== undefined &&
                  prodcutDetail.selling_price !== null &&
                  prodcutDetail.selling_price.toString().length > 0 &&
                  prodcutDetail.price !== undefined &&
                  prodcutDetail.price.toString().length > 0 &&
                  prodcutDetail.price !== prodcutDetail.selling_price
                    ? styles.maxPriceLabel
                    : styles.actualPriceLabel,
                ]}>
                {'$' + prodcutDetail.price}
              </Text>
              {prodcutDetail.selling_price !== undefined &&
                prodcutDetail.selling_price !== null &&
                prodcutDetail?.selling_price.toString() !== '' &&
                prodcutDetail.price !== undefined &&
                prodcutDetail.price.toString().length > 0 &&
                prodcutDetail.price !== prodcutDetail.selling_price && (
                  <>
                    <View style={{width: moderateScale(8)}}></View>
                    <Text style={styles.actualPriceLabel}>
                      {'$' + prodcutDetail.selling_price}
                    </Text>
                  </>
                )}
            </Text>
          </View>
          {isSetPriceViraint && (
            <View style={styles.infoSection}>
              <AppImages.Common.TPP_INFO_GREY width={moderateScale(10)} />
              <Text style={styles.infoLabel} numberOfLines={1}>
                {translations.PRICE_IS_DIFF_FOR_VARIANTS}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.middleSection}>
        {brand?.length > 0 && (
          <ProductSelectedType
            label={translations.BRAND}
            image={<AppImages.SELL_ITEMS.BrandIcon />}
            info={brand}
          />
        )}

        {prodcutDetail?.result?.variable_fields !== undefined &&
          prodcutDetail?.result?.variable_fields.length > 0 && (
            <>
              <ProductSelectedType
                label={translations.COLOR}
                image={<AppImages.SELL_ITEMS.ColorIcon />}
                colorsList={prodcutDetail?.result?.variable_fields}
              />
              {prodcutSizes !== undefined && prodcutSizes?.length > 0 && (
                <ProductSelectedType
                  label={translations.SIZE_SELECTED}
                  image={<AppImages.SELL_ITEMS.SizeIcon />}
                  productVariantSizeList={prodcutSizes}
                />
              )}
            </>
          )}
        {prodcutDetail?.worn_status?.title !== undefined &&
          prodcutDetail?.category_detail?.id !== SELL_PRODUCT.BEAUTY &&
          prodcutDetail?.category_detail?.id !== SELL_PRODUCT.TICKETS_ENTRY &&
          prodcutDetail?.category_detail?.id !== SELL_PRODUCT.HIRE &&
          prodcutDetail?.category_detail?.id !== SELL_PRODUCT.DIGITAL_PAINT && (
            <ProductSelectedType
              label={translations.PRODUCT_CONDITION}
              image={<AppImages.SELL_ITEMS.ProductCondition />}
              info={prodcutDetail?.worn_status?.title}
            />
          )}

        {abJewelry.length > 0 && (
          <ProductSelectedType
            label={translations.AB_AURORA_BOREALIS}
            image={<AppImages.SELL_ITEMS.AuroraShine />}
            info={abJewelry}
          />
        )}
        {prodcutDetail.expired_on !== undefined &&
          prodcutDetail.expired_on !== null && (
            <ProductSelectedType
              label={translations.AVAILABLE_TILL}
              image={<AppImages.SELL_ITEMS.AvailabilityIcon />}
              info={prodcutDetail.expired_on}
            />
          )}
        {prodcutDetail?.subcategory !== undefined &&
          prodcutDetail?.subcategory?.values !== undefined &&
          prodcutDetail?.subcategory?.values?.name !== undefined && (
            <ProductSelectedType
              label={translations.TYPE}
              image={
                <AppImages.SELL_ITEMS.CategoryIcon width={16} height={16} />
              }
              info={prodcutDetail?.subcategory?.values?.name}
            />
          )}
      </View>
    </View>
  );
};

export default ProductSelectedDetails;

import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {styles} from './styles';
import translations from '../../../../../assets/translations';
import FastImageView from '../../../../common/fastimageview';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../utils/responsiveSize';
import {color} from '../../../../../assets/colorConstant';
import AppImages from '../../../../../assets/images/AppImages';
import {checkIsNull} from '../../../../utils/validations';
import {ORDER_FROM, PRODUCT_STATUS} from '../../../../utils/enum';
import {
  getProductStatusColour,
  getStatusTitle,
} from '../../../../utils/helperFunction';
import {checkDownloadPermission} from '../../../../utils/permissions';
import {toast, toastType} from '../../../../common/commonalert';
import {downloadImage} from '../../../../utils/downloadImage';
import {SCREEN} from '../../../../../root/screenname';
import {useSetLoader} from '../../../../../store/useAppStore';

const getProductStatusImage = (status: number) => {
  switch (status) {
    case PRODUCT_STATUS.DELIVERED: {
      return <AppImages.MY_ORDERS.DeliveredIcon />;
    }
    case PRODUCT_STATUS.IN_PROCESS: {
      return <AppImages.MY_ORDERS.InProcessIcon />;
    }
    case PRODUCT_STATUS.FAILED: {
      return <AppImages.MY_ORDERS.FailedIcon />;
    }
    case PRODUCT_STATUS.DISPUTED: {
      return <AppImages.MY_ORDERS.DisputedIcon />;
    }
    case PRODUCT_STATUS.SHIPPED: {
      return <AppImages.MY_ORDERS.ShippedIcon />;
    }
    case PRODUCT_STATUS.REFUNDED: {
      return <AppImages.MY_ORDERS.RefundedIcon />;
    }
    case PRODUCT_STATUS.RETURNED: {
      return <AppImages.MY_ORDERS.ReturnedIcon />;
    }
    default: {
      return null;
    }
  }
};

interface Props {
  index: number;
  id: number;
  status: number;
  dateTime: string;
  orderId: string;
  imagePath: string;
  title: string;
  noOfLines: number;
  price: number;
  productQty: number;
  raiseConcern: boolean;
  downloadLink: string;
  viewConcern: boolean;
  downloadType: string;
  from: string;
  handleConcernButton: Function;
}

const ProductView = ({
  index,
  id,
  status,
  dateTime,
  orderId,
  imagePath,
  title,
  noOfLines,
  price,
  productQty,
  raiseConcern,
  downloadLink,
  viewConcern,
  downloadType,
  from = ORDER_FROM.BUYER,
  handleConcernButton,
}: Props) => {
  const navigation = useNavigation();
  const setLoader = useSetLoader();

  const concernButtonPressed = () => {
    if (!viewConcern) {
      handleConcernButton(translations.RAISE_A_CONCERN, id, index);
    } else {
      handleConcernButton(translations.RAISED_CONCERN, id, index);
    }
  };

  const downloadFile = async (downloadPath: string) => {
    setLoader(true);
    const response = await checkDownloadPermission();
    if (response) {
      downloadImage(downloadPath);
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    } else {
      toast(translations.STORAGE_PERMISION_NOT_GRANTED, toastType.ERROR_TOAST);
      setLoader(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.productStatusSection}>
        {getProductStatusImage(status)}
        <View style={styles.orderSection}>
          <View style={styles.productDateTime}>
            <Text
              style={{
                ...styles.productLabel,
                color: getProductStatusColour(status),
              }}>
              {getStatusTitle(status)}
            </Text>
            <Text style={styles.dateTimeStyle}>{dateTime}</Text>
          </View>
          <View style={styles.rowflexDir}>
            <Text style={styles.orderIdLabel}>{translations.ORDER_ID}</Text>
            <Text style={styles.orderIdStyle}>{orderId}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.wrapper}
          onPress={() => {
            navigation.navigate(SCREEN.ORDER_DETAILS, {
              id: id,
              from: from,
            });
          }}>
          <View style={styles.imageSection}>
            <FastImageView
              width={moderateScaleVertical(84)}
              height={moderateScaleVertical(84)}
              imageUrl={imagePath}
              borderRadius={moderateScale(12)}
              borderColor={color.S_GRAY_2}
            />
          </View>
          <View style={styles.productSection}>
            <Text style={styles.productLabel} numberOfLines={noOfLines}>
              {title}
            </Text>
            <View style={styles.productDetails}>
              <Text style={styles.priceLabel}>${price}</Text>
              <View style={styles.rowflexDir}>
                <Text style={styles.orderIdLabel}>{translations.QTY}</Text>
                <Text style={styles.orderIdStyle}>{productQty}</Text>
              </View>
            </View>
            <View style={styles.productDetails}>
              {checkIsNull(downloadLink) && status !== PRODUCT_STATUS.FAILED ? (
                <TouchableOpacity
                  style={styles.raiseConcernSection}
                  onPress={() => downloadFile(downloadLink)}>
                  <AppImages.MY_ORDERS.DownloadIcon />
                  <Text style={styles.concernStyle}>
                    {translations.DOWNLOAD + ' ' + downloadType}
                  </Text>
                </TouchableOpacity>
              ) : null}
              {(raiseConcern || viewConcern) &&
              status !== PRODUCT_STATUS.FAILED ? (
                <TouchableOpacity
                  style={styles.raiseConcernSection}
                  onPress={() => concernButtonPressed()}>
                  {viewConcern ? (
                    <AppImages.MY_ORDERS.ViewIcon />
                  ) : (
                    <AppImages.MY_ORDERS.QuestionMarkIcon />
                  )}
                  <Text style={styles.concernStyle}>
                    {viewConcern
                      ? translations.VIEW_CONCERN
                      : translations.RAISE_A_CONCERN}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductView;

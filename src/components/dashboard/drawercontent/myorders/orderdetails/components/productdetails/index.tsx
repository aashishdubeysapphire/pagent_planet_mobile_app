import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import AppImages from '../../../../../../../assets/images/AppImages';
import translations from '../../../../../../../assets/translations';
import {
  ORDER_FROM,
  PRODUCT_STATUS,
  PRODUCT_STATUS_NAME,
} from '../../../../../../utils/enum';
import {
  getProductStatusColour,
  getStatusTitle,
} from '../../../../../../utils/helperFunction';
import FastImageView from '../../../../../../common/fastimageview';
import {moderateScale} from '../../../../../../utils/responsiveSize';
import {OrderDetail} from '../../../../../../../services/models/orderdetails/getorderdetails';
import RaiseConcernModal from '../../../../components/raiseconcernmodal';
import {checkIsNull} from '../../../../../../utils/validations';
import {checkDownloadPermission} from '../../../../../../utils/permissions';
import {downloadImage} from '../../../../../../utils/downloadImage';
import {toast, toastType} from '../../../../../../common/commonalert';
import CustomButton from '../../../../../../common/button';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../root/screenname';
import CustomBottomModal from '../../../../../../common/custombottommodal';
import {MethodTypes} from '../../../../../../../services/constants';
import useCgMutation from '../../../../../../../services/api/useCgMutation';
import {UPDATE_SHIPPING_STATUS} from '../../../../../../../services/endpoints';

const getProductStatusImage = (status: PRODUCT_STATUS) => {
  switch (status) {
    case PRODUCT_STATUS.SHIPPED: {
      return <AppImages.MY_ORDERS.ShippedIcon />;
    }
    case PRODUCT_STATUS.REFUNDED: {
      return <AppImages.MY_ORDERS.RefundedIcon />;
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
    case PRODUCT_STATUS.RETURNED: {
      return <AppImages.MY_ORDERS.ReturnedIcon />;
    }
    case PRODUCT_STATUS.DELIVERED: {
      return <AppImages.MY_ORDERS.DeliveredIcon />;
    }
    default: {
      return null;
    }
  }
};
const changeStatusList = [
  {id: 0, name: PRODUCT_STATUS_NAME.IN_PROCESS},
  {id: 1, name: PRODUCT_STATUS_NAME.SHIPPED},
  {id: 2, name: PRODUCT_STATUS_NAME.DELIVERED},
];

interface Props {
  orderDetails: OrderDetail;
}
const OrderProductDetails = ({
  orderDetails,
  hitGetOrderItemDetails,
  id,
  from,
  setLoader,
}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState();
  const navigation = useNavigation();
  const getDownloadFileType = (fileInfo: any) => {
    if (fileInfo?.name?.includes(translations.SMALL_TICKET)) {
      return translations.TICKET;
    } else if (fileInfo?.values?.name == translations.OTHER.trim()) {
      return translations.FILE;
    } else {
      return fileInfo?.values?.name;
    }
  };

  const downloadFile = async (downloadPath: string) => {
    const response = await checkDownloadPermission();
    if (response) {
      downloadImage(downloadPath);
    } else {
      toast(translations.STORAGE_PERMISION_NOT_GRANTED, toastType.ERROR_TOAST);
    }
  };

  const {mutateAsync: updateOrderStatus} = useCgMutation({
    key: UPDATE_SHIPPING_STATUS + id,
    method: MethodTypes.Post,
    url: UPDATE_SHIPPING_STATUS,
    disableLoader: true,
    body: {
      dress_order_item_id: id,
      shippingStatus: selectedStatus?.id,
    },
  });

  const hitUpdateOrderStatus = async () => {
    setLoader(true);
    let response = await updateOrderStatus();
    if (response.success) {
      hitGetOrderItemDetails();
    }
    setLoader(false);
  };
  const showChangeStatus = () => {
    if (
      orderDetails?.product[0]?.status == PRODUCT_STATUS.IN_PROCESS ||
      orderDetails?.product[0]?.status == PRODUCT_STATUS.SHIPPED
    ) {
      return true;
    } else {
      return false;
    }
  };
  const showDownload = () => {
    return (
      orderDetails?.product[0]?.status == PRODUCT_STATUS.IN_PROCESS ||
      orderDetails?.product[0]?.status == PRODUCT_STATUS.DELIVERED ||
      orderDetails?.product[0]?.status == PRODUCT_STATUS.SHIPPED ||
      orderDetails?.product[0]?.status == PRODUCT_STATUS.DISPUTED
    );
  };
  return (
    <View style={styles.bgColor}>
      <ImageBackground
        source={AppImages.ORDER_DETAILS.pinkArrowBg}
        style={styles.bgImage}>
        <Text style={styles.orderId}>Order ID: {orderDetails?.id}</Text>
      </ImageBackground>
      <View style={styles.mainContiner}>
        <TouchableOpacity
          onPress={() => {
            if (orderDetails?.product[0]?.isSaleableProduct == 1) {
              navigation.navigate(SCREEN.PRODUCT_DETAIL, {
                productId: orderDetails?.product[0]?.id,
              });
            }
          }}>
          <FastImageView
            width={moderateScale(124)}
            height={moderateScale(124)}
            borderRadius={moderateScale(20)}
            imageUrl={orderDetails?.product[0]?.image}
          />
        </TouchableOpacity>

        <Text style={styles.productName}>{orderDetails?.product[0]?.name}</Text>

        <View style={styles.colorSize}>
          {!!orderDetails?.product[0]?.attributes?.resultSet[0]?.name && (
            <>
              <Text style={styles.heading}>{translations.COLOR}: </Text>
              <View style={styles.border}>
                <View
                  style={{
                    ...styles.colorCircle,
                    backgroundColor:
                      orderDetails?.product[0]?.attributes?.resultSet[0]
                        ?.hex_code,
                  }}></View>
              </View>
              <Text style={[styles.name, styles.marginRight]}>
                {' '}
                {orderDetails?.product[0]?.attributes?.resultSet[0]?.name}
              </Text>
            </>
          )}
          {!!orderDetails?.product[0]?.attributes?.resultSet[0]
            ?.productVariantSizeList[0]?.size?.name && (
            <>
              <Text style={styles.heading}>{translations.SIZE}: </Text>
              <Text style={[styles.name, styles.marginRight]}>
                {
                  orderDetails?.product[0]?.attributes?.resultSet[0]
                    ?.productVariantSizeList[0]?.size?.name
                }
              </Text>
            </>
          )}

          <Text style={styles.heading}>{translations.QTY}</Text>
          <Text style={styles.name}>{orderDetails?.product[0]?.quantity}</Text>
          {checkIsNull(orderDetails?.product[0]?.download_file_path) &&
            from == ORDER_FROM.BUYER &&
            showDownload() && (
              <TouchableOpacity
                style={styles.raiseConcernSection}
                onPress={() => {
                  downloadFile(orderDetails?.product[0]?.download_file_path);
                }}>
                <AppImages.MY_ORDERS.DownloadIcon />
                <Text style={styles.concernStyle}>
                  {'  ' +
                    translations.DOWNLOAD +
                    ' ' +
                    getDownloadFileType(
                      orderDetails?.product[0]?.subcategory[0],
                    )}
                </Text>
              </TouchableOpacity>
            )}
        </View>
        <View style={styles.pinkLine} />
        <View style={styles.productStatusSection}>
          {getProductStatusImage(orderDetails?.product[0]?.status)}
          <View style={styles.orderSection}>
            <View style={styles.productDateTime}>
              <Text
                style={{
                  ...styles.productLabel,
                  color: getProductStatusColour(
                    orderDetails?.product[0]?.status,
                  ),
                }}>
                {getStatusTitle(orderDetails?.product[0]?.status)}
              </Text>
              <Text style={styles.dateTimeStyle}>
                {orderDetails?.created_at}
              </Text>
            </View>
            {from == ORDER_FROM.BUYER ? (
              orderDetails?.product[0]?.status !== PRODUCT_STATUS.FAILED && (
                <Text
                  style={styles.concernStyle}
                  onPress={() => {
                    setIsModalVisible(true);
                  }}>
                  {checkIsNull(orderDetails?.product[0]?.dress_order_dispute)
                    ? translations.VIEW_CONCERN
                    : checkIsNull(orderDetails?.product[0]?.allow_dispute)
                    ? translations.RAISE_A_CONCERN
                    : null}
                </Text>
              )
            ) : (
              <Text
                style={styles.concernStyle}
                onPress={() => {
                  setIsModalVisible(true);
                }}>
                {checkIsNull(orderDetails?.product[0]?.dress_order_dispute)
                  ? translations.VIEW_CONCERN
                  : null}
              </Text>
            )}

            {showChangeStatus() && from == ORDER_FROM.SELLER && (
              <Text
                style={styles.concernStyle}
                onPress={() => {
                  setChangeStatusModal(true);
                }}>
                {translations.CHANGE_STATUS}
              </Text>
            )}
          </View>
        </View>
        {orderDetails?.product[0]?.allow_return !== 0 &&
          from == ORDER_FROM.BUYER &&
          orderDetails?.product[0]?.status == PRODUCT_STATUS.DISPUTED && (
            <View style={styles.buttonView}>
              <CustomButton
                inactive
                label={translations.RETURN_PRODUCT}
                border={true}
                textStyle={styles.borderButtonText}
                onPress={() => {
                  navigation.navigate(SCREEN.SHIPPING_RETURN_DETAILS, {
                    id: id,
                  });
                }}
              />
            </View>
          )}
      </View>
      {isModalVisible && (
        <RaiseConcernModal
          isModalVisible={isModalVisible}
          setModalVisible={setIsModalVisible}
          type={
            checkIsNull(orderDetails?.product[0]?.dress_order_dispute)
              ? translations.RAISED_CONCERN
              : translations.RAISE_A_CONCERN
          }
          productId={id}
          viewConcernDetails={orderDetails?.product[0]?.dress_order_dispute}
          refetchAPI={hitGetOrderItemDetails}
        />
      )}

      <CustomBottomModal
        isModalVisible={changeStatusModal}
        setIsModalVisible={val => {
          setChangeStatusModal(val);
        }}
        data={changeStatusList}
        parentCallback={selectedText => {
          setSelectedStatus(selectedText);
          if (selectedText.id == 1) {
            navigation.navigate(SCREEN.SHIPPING_RETURN_DETAILS, {
              id: id,
              from: from,
            });
          } else {
            setTimeout(() => {
              hitUpdateOrderStatus();
            }, 200);
          }
        }}
        preSelectedValue={orderDetails?.product[0]?.status}
        showAddCancle
        customStyles={{height: '40%'}}
        heading={translations.CHANGE_STATUS}
      />
    </View>
  );
};

export default OrderProductDetails;

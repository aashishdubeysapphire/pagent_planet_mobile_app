import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import translations from '../../../../../../../assets/translations';
import ProductView from '../../../../components/productview';
import {checkIsNull} from '../../../../../../utils/validations';
import {DressOrderDispute} from '../../../../../../../services/models/myorders/myOrdersList';
import RaiseConcernModal from '../../../../components/raiseconcernmodal';
import {ORDER_FROM} from '../../../../../../utils/enum';

const OtherItemWithThisOrderId = ({
  otherProducts,
  hitGetOrderItemDetails,
  from,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [concernType, setConcernType] = useState('');
  const [productId, setProductId] = useState(0);
  const [viewConcernData, setViewConcernData] = useState<DressOrderDispute>();

  const getDownloadFileType = (fileInfo: any) => {
    if (fileInfo?.name?.includes(translations.SMALL_TICKET)) {
      return translations.TICKET;
    } else if (fileInfo?.values?.name == translations.OTHER.trim()) {
      return translations.FILE;
    } else {
      return fileInfo?.values?.name;
    }
  };

  const concernButtonClicked = (
    concern_type: string,
    product_id: number,
    indexx: number
  ) => {
    setProductId(product_id);
    setConcernType(concern_type);
    setModalVisible(true);
    setViewConcernData(otherProducts[indexx]?.dress_order_dispute);
  };

  return checkIsNull(otherProducts) ? (
    <View>
      <Text style={styles.heading}>
        {translations.OTHER_ITEM_WITH_THIS_ORDER}
      </Text>
      <View style={styles.continer}>
        <FlatList
          key={'#'}
          data={otherProducts}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled={true}
          renderItem={({item, index}) => (
            <>
              <ProductView
                index={index}
                id={item?.id}
                imagePath={item?.product?.product_img_url}
                title={item?.product?.unique_style_number}
                noOfLines={2}
                price={item?.sub_total}
                productQty={item?.quantity}
                status={item?.shipping_status}
                dateTime={item?.formatted_created_at}
                orderId={item?.dress_order_id}
                downloadLink={''}
                viewConcern={checkIsNull(item?.dress_order_dispute)}
                downloadType={
                  from === ORDER_FROM.SELLER
                    ? ''
                    : getDownloadFileType(item?.product?.subcategory[0])
                }
                handleConcernButton={(
                  type: string,
                  id: number,
                  position: number
                ) => concernButtonClicked(type, id, position)}
                from={from}
              />
              <View style={styles.seperator} />
            </>
          )}
        />
        {isModalVisible &&
         <RaiseConcernModal
         isModalVisible={isModalVisible}
         setModalVisible={setModalVisible}
         type={concernType}
         productId={productId}
         viewConcernDetails={viewConcernData}
         refetchAPI={hitGetOrderItemDetails}
       />
        }
       
      </View>
    </View>
  ) : null;
};

export default OtherItemWithThisOrderId;

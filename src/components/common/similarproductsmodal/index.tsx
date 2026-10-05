import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import BottomModal from '../bottommodal';
import useStyle from './useStyle';
import {moderateScale, moderateScaleVertical} from '../../utils/responsiveSize';
import translations from '../../../assets/translations';
import AppImages from '../../../assets/images/AppImages';
import {FlatList} from 'react-native-gesture-handler';
import {useState} from 'react';
import {SIMILAR_PRODUCT} from '../../../services/endpoints';
import {useSetLoader} from '../../../store/useAppStore';
import useCgMutation from '../../../services/api/useCgMutation';
import {MethodTypes} from '../../../services/constants';
import ProductsView from '../../dashboard/shop/components/productview';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: any;
  productId: number;
}
const SimilarProductsModal = ({
  isModalVisible,
  setIsModalVisible,
  productId,
}: Props) => {
  const [similarProductsList, setSimilarProductsList] = useState([]);
  const setLoader = useSetLoader();
  const styles = useStyle();
  const {mutateAsync: similarProductAPI} = useCgMutation({
    key: SIMILAR_PRODUCT,
    url: SIMILAR_PRODUCT,
    method: MethodTypes.Post,
    disableLoader: true,
    body: {product_id: productId},
    offSuccessToast: true,
    offErrorToast: true,
  });
  // SIMILAR_PRODUCT--------------------------------------------------END
  useEffect(() => {
    getSimilarProducts();
  }, [productId]);

  const getSimilarProducts = async () => {
    setLoader(true);

    const response = await similarProductAPI();
    if (response.success) {
      setSimilarProductsList(response?.data);
      setLoader(false);
    } else {
      setLoader(false);
    }
  };
  return (
    <BottomModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      customStyles={{
        height: moderateScaleVertical(344),
        paddingHorizontal: moderateScaleVertical(16),
      }}>
      <View style={styles.headingView}>
        <Text style={styles.modalHeading}>{translations.SIMILAR_STYLES}</Text>
        <TouchableOpacity
          style={styles.crossIcon}
          onPress={() => {
            setIsModalVisible(false);
          }}>
          <AppImages.ProfileImage.Tpp_cross_icon />
        </TouchableOpacity>
      </View>
      <View style={styles.similarProductsList}>
        <FlatList
          data={similarProductsList}
          keyExtractor={item => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({item, index}) => (
            <ProductsView
              title={item?.unique_style_number}
              sellingPrice={item?.selling_price}
              imageUrl={item?.featured_image_path}
              width={moderateScale(154)}
              marginBottomValue={moderateScaleVertical(0)}
              marginRightValue={moderateScale(12)}
              showFavIcon={false}
              showMRP={true}
              maxPrice={item?.price}
              id={item?.id}
              isFav={false}
              closeModal={() => {
                setIsModalVisible(false);
              }}
            />
          )}
        />
      </View>
    </BottomModal>
  );
};

export default SimilarProductsModal;

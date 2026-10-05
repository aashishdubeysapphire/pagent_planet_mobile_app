import {Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {styles} from './styles';
import AppImages from '../../../../../../assets/images/AppImages';
import translations from '../../../../../../assets/translations';
import {checkIsConnected, hapticFeedBack, onShare} from '../../../../../utils/helperFunction';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {Base} from '../../../../../../services/models/base';
import {ADD_PRODUCT_AS_FAVORITE} from '../../../../../../services/endpoints';
import {MethodTypes} from '../../../../../../services/constants';
import {RecordType, REFESH_SCREEN} from '../../../../../utils/enum';
import {useSetScreenRefresh} from '../../../../../../store/useAppStore';
import {UserContext} from '../../../../../../store/userStore';
import GuestUserLoginSignModel from '../../../../../common/guestuserloginsignupmodal';

const FavoriteShareAddToBag = ({
  productId,
  public_url,
  is_favorite,
  setColorSizeModal,
  onProceedClick,
  modal,
  addToBag,
  getCartCountApi,
  isGuestUserLoginModalVisinle,
  setGuestUserLoginModalVisinle,
  params,
}) => {
  const [isFavLocal, setIsFavLocal] = useState(is_favorite == 0 ? false : true);
  const setScreenRefresh = useSetScreenRefresh();

  const {storeData} = useContext(UserContext);
  useEffect(() => {
    setIsFavLocal(is_favorite == 0 ? false : true);
  }, [is_favorite]);

  const {mutateAsync: addFavourite} = useCgMutation<Base>({
    key: ADD_PRODUCT_AS_FAVORITE + productId,
    url: ADD_PRODUCT_AS_FAVORITE,
    method: MethodTypes.Post,
    disableLoader: true,
    body: {id: productId, record_type: RecordType.PRODUCT},
    offSuccessToast: true,
    offErrorToast: true,
  });
  const hitAddToFav = async () => {
    if (checkIsConnected()) {
      const res = await addFavourite();
      if (res.success === true) {
        setIsFavLocal(!isFavLocal);
        getCartCountApi();
        setScreenRefresh(REFESH_SCREEN.PRODUCT_LISTING);
      }
    }
  };
  const onAddToFav = () => {
    if (storeData?.data?.user === null || storeData?.data?.user === undefined) {
      setGuestUserLoginModalVisinle(true);
    } else {
      if (params?.onFavUpdate !== undefined) {
        params?.onFavUpdate(!isFavLocal);
      }
      setIsFavLocal(!isFavLocal);
      hitAddToFav();
    }
  };

  const onAddToCartClick = () => {
    hapticFeedBack()
    if (storeData?.data?.user === null || storeData?.data?.user === undefined) {
      setGuestUserLoginModalVisinle(true);
    } else if (modal) {
      setColorSizeModal(true);
    } else {
      onProceedClick();
    }
  };
  return (
    <>
      <View style={styles.shadow} />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.favBtn}
          onPress={() => {
            onAddToFav();
          }}>
          <View style={styles.rowView}>
            {isFavLocal ? (
              <AppImages.SHOP.tpp_favourite_small_iconFilled />
            ) : (
              <AppImages.SHOP.tpp_favourite_small_icon />
            )}
            <Text style={styles.btnText}>{translations.FAVORITE}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.favBtn, styles.marginLeft, styles.share]}
          onPress={() => onShare('', public_url)}>
          <View style={styles.rowView}>
            <AppImages.SHOP.tpp_share_icon_details />
            <Text style={styles.btnText}>{translations.SHARE}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.favBtn, styles.marginLeft, styles.addToBag]}
          onPress={onAddToCartClick}>
          <View style={styles.rowView}>
            <AppImages.SHOP.whiteAddToBag />
            <Text style={[styles.btnText, styles.addToBagTxt]}>
              {addToBag ? translations.GO_TO_BAG : translations.ADD_TO_BAG}
            </Text>
          </View>
        </TouchableOpacity>
        <GuestUserLoginSignModel
          isModalVisible={isGuestUserLoginModalVisinle}
          setIsModalVisible={setGuestUserLoginModalVisinle}
          toastMessage={undefined}
        />
      </View>
    </>
  );
};

export default FavoriteShareAddToBag;

import {TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import AppImages from '../../../../../assets/images/AppImages';
import WarningModel from '../../../../common/warningmodel';
import translations from '../../../../../assets/translations';
import {styles} from './styles';
import {checkIsConnected, hapticFeedBack} from '../../../../utils/helperFunction';
import {
  MARK_AS_SOLD_MY_PRODUCT,
  UNPUBLISH_MY_PRODUCT,
} from '../../../../../services/endpoints';
import {MethodTypes} from '../../../../../services/constants';
import useCgMutation from '../../../../../services/api/useCgMutation';
import Loader from '../../../../common/customloader';
import {Base} from '../../../../../services/models/base';
import {useSetScreenRefresh} from '../../../../../store/useAppStore';
import {REFESH_SCREEN} from '../../../../utils/enum';

interface Props {
  type: string;
  buttonState: boolean;
  productId: number;
  refetchAPI: any;
}

const CustomToggleButton = ({
  type,
  buttonState,
  productId,
  refetchAPI,
}: Props) => {
  const [toggleState, setToggleState] = useState(buttonState);
  const [warningMsg, setWarningMsg] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const setScreenRefresh = useSetScreenRefresh();

  // MARK AS SOLD MY PRODUCT--------------------------------------------------START
  const {mutateAsync: markProductAsSold} = useCgMutation<Base>({
    key: MARK_AS_SOLD_MY_PRODUCT,
    method: MethodTypes.Post,
    url: MARK_AS_SOLD_MY_PRODUCT,
    disableLoader: true,
    body: {product_id: productId},
  });
  // MARK AS SOLD MY PRODUCT--------------------------------------------------END

  // UNPUBLISH MY PRODUCT-----------------------------------------------------START
  const {mutateAsync: unPublishMyProduct} = useCgMutation<Base>({
    key: UNPUBLISH_MY_PRODUCT,
    method: MethodTypes.Post,
    url: UNPUBLISH_MY_PRODUCT,
    disableLoader: true,
    body: {product_id: productId},
  });
  // UNPUBLISH MY PRODUCT------------------------------------------------------END

  const toggleButtonState = () => {
    hapticFeedBack()
    let state = toggleState;
    setModalVisible(true);
    if (type === translations.MARK_AS_SOLD) {
      if (state) {
        setWarningMsg(
          translations.ARE_YOU_SURE_YOU_WANT_TO_MARK_THIS_AS_IN_STOCK
        );
      } else {
        setWarningMsg(translations.ARE_YOU_SURE_YOU_WANT_TO_MARK_THIS_AS_SOLD);
      }
    } else {
      if (state) {
        setWarningMsg(
          translations.ARE_YOU_SURE_YOU_WANT_TO_UNPUBLISH_THIS_PRODUCT
        );
      } else {
        setWarningMsg(
          translations.ARE_YOU_SURE_YOU_WANT_TO_PUBLISH_THIS_PRODUCT
        );
      }
    }
  };

  const checkInterNet = () => {
    return checkIsConnected();
  };

  const ChangeStatusOfProduct = async () => {
    if (checkInterNet()) {
      setShowLoader(true);
      let res;
      if (type === translations.MARK_AS_SOLD) {
        res = await markProductAsSold();
      } else {
        res = await unPublishMyProduct();
      }
      if (res.success) {
        refetchAPI();
        setToggleState(!toggleState);
        setScreenRefresh(REFESH_SCREEN.SHOP_DASHBOARD);
      }
      setTimeout(() => {
        setShowLoader(false);
      }, 2000);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => toggleButtonState()}>
        {toggleState ? (
          <AppImages.SELL_ITEMS.ActiveSwitch />
        ) : (
          <AppImages.SELL_ITEMS.InactiveSwitch />
        )}
      </TouchableOpacity>
      <WarningModel
        msg={warningMsg}
        isModalVisible={isModalVisible}
        setConfirm={ChangeStatusOfProduct}
        setIsModalVisible={setModalVisible}
        headingStyle={styles.modalHeading}
      />
      <Loader isLoading={showLoader} />
    </>
  );
};

export default CustomToggleButton;

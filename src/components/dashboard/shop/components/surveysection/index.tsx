import React, { useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import AppImages from '../../../../../assets/images/AppImages';
import {moderateScale, width} from '../../../../utils/responsiveSize';
import {styles} from './styles';
import FastImageView from '../../../../../components/common/fastimageview';
import translations from '../../../../../assets/translations';
import useCgMutation from '../../../../../services/api/useCgMutation';
import {Base} from '../../../../../services/models/base';
import {MethodTypes} from '../../../../../services/constants';
import {LIKE_PRODUCT} from '../../../../../services/endpoints';
import {color} from '../../../../../assets/colorConstant';
import {useSetLoader} from '../../../../../store/useAppStore';
import {ProductsData} from '../../../../../services/models/shop/shopLandingDetails';
import {checkIsNull} from '../../../../utils/validations';

interface Props {
  imageUrl: string;
  id: number;
  setSurveyData: Function;
  setLoading: Function;
}

const SurveySection = ({imageUrl, id, setSurveyData, setLoading}: Props) => {
  const [selectedId, setSelectedId] = useState(id);
  const [isLiked, setIsLiked] = useState(false);
  const setLoader = useSetLoader();

  // LIKE PRODUCT--------------------------------------------------START
  const {mutateAsync: likeProductAPI} = useCgMutation<Base<ProductsData>>({
    key: LIKE_PRODUCT,
    url: LIKE_PRODUCT,
    method: MethodTypes.Post,
    disableLoader: true,
    body: {product_id: selectedId},
    offSuccessToast: true,
    offErrorToast: true,
  });
  // LIKE PRODUCT--------------------------------------------------END

  const onLikeButtonPressed = async (selected_id: number) => {
    setSelectedId(selected_id);
    setIsLiked(true);
    setLoader(true);
    setLoading(true);
    const response = await likeProductAPI();
    if (response.success) {
      setSurveyData(response?.data);
      setIsLiked(false);
      setLoader(false);
      setLoading(false);
    } else {
      setLoader(false);
      setLoading(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.bottomSection}
        onPress={() => onLikeButtonPressed(id)}>
        {isLiked ? <AppImages.SHOP.Liked /> : <AppImages.SHOP.NotLiked />}
        <Text
          style={{
            ...styles.likeStyles,
            color: isLiked ? color.P_PINK : color.S_GRAY_4,
          }}>
          {isLiked ? translations.LIKED : translations.LIKE}
        </Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.imageSection}>
          <FastImageView
            width={width / 2 - moderateScale(24)}
            height={width / 2 - moderateScale(24)}
            borderRadius={moderateScale(24)}
            imageUrl={checkIsNull(imageUrl) ? imageUrl : ''}
          />
        </View>
      </View>
    </View>
  );
};

export default SurveySection;

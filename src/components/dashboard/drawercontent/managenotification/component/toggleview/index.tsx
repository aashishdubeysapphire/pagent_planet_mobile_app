import {View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import AppImages from '../../../../../../assets/images/AppImages';
import {color} from '../../../../../../assets/colorConstant';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {Base} from '../../../../../../services/models/base';
import {UPDATE_NOTIFICATION_SETTING} from '../../../../../../services/endpoints';
import {MethodTypes, Param} from '../../../../../../services/constants';
import { hapticFeedBack } from '../../../../../utils/helperFunction';
const ToggleView = ({isON = false, slug = '', lable = '', setIsON}) => {
  const [isLoading, setIsLoading] = useState(false);
  const getOnStatusforApi = () => {
    return isON == true ? '0' : '1';
  };
  const {mutateAsync: updateNotificcationaStatus} = useCgMutation<Base>({
    key:
      UPDATE_NOTIFICATION_SETTING +
      slug +
      Param.AND_VALUE +
      getOnStatusforApi(),
    method: MethodTypes.Put,
    url:
      UPDATE_NOTIFICATION_SETTING +
      slug +
      Param.AND_VALUE +
      getOnStatusforApi(),
    disableLoader: false,
    // offSuccessToast: true,
  });
  const getToggleImage = () => {
    if (isLoading) {
      return (
        <View style={styles.loaderSmall}>
          <ActivityIndicator size="small" color={color.P_PINK} />
        </View>
      );
    } else if (isON) {
      return <AppImages.Drawer.tpp_toggle_btnON />;
    } else {
      return <AppImages.Drawer.tpp_toggle_btnOFF />;
    }
  };
  const onPressToggle = async () => {
    hapticFeedBack()
    setIsLoading(true);
    const response = await updateNotificcationaStatus();

    if (response.success) {
      setIsON(!isON);
    }
    setIsLoading(false);
  };
  return (
    <View style={styles.mainView}>
      <Text style={styles.lable}>{lable}</Text>
      <TouchableOpacity onPress={onPressToggle}>
        {getToggleImage()}
      </TouchableOpacity>
    </View>
  );
};

export default ToggleView;

import {View, Text, SafeAreaView, FlatList, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import Header from '../../../../../common/header';
import translations from '../../../../../../assets/translations';
import AppImages from '../../../../../../assets/images/AppImages';
import {color} from '../../../../../../assets/colorConstant';
import ShimmerList from '../../../../../common/shimmer/listshimmer';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';
import useCgMutation from '../../../../../../services/api/useCgMutation';
import {Base} from '../../../../../../services/models/base';
import {VIEW_LEADS} from '../../../../../../services/endpoints';
import {MethodTypes} from '../../../../../../services/constants';
import { useIsFocused } from '@react-navigation/core';

const Contestantdetail = ({route}) => {
  const {id, pageantId} = route?.params;
  const [isLoading, setIsLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const isFocused = useIsFocused()
  const {mutateAsync: leadsData} = useCgMutation<Base>({
    key: VIEW_LEADS + id + '&profile_type=pageant&profile_id=' + pageantId,
    method: MethodTypes.GET,
    url: VIEW_LEADS + id + '&profile_type=pageant&profile_id=' + pageantId,
    disableLoader: true,
    offSuccessToast: true,
  });

  const getLeadData = async () => {
    setIsLoading(true);
    const response = await leadsData();

    if (response.success) {
      setListData(response?.data);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    isFocused && getLeadData();
  }, [isFocused]);

  const _renderItem = ({item, index}) => {
    return (
      <View
        style={[
          styles.rowView,
          {
            backgroundColor: index % 2 == 0 ? color.WHITE : color.S_GRAY_1,
          },
        ]}>
        <Text style={styles.heading}>{item?.title}</Text>
        {item.isLocked ? (
          <View style={styles.lockView}>
            <AppImages.Common.LOCK_ICON />
            <Text style={styles.lockText}>
              {' '}
              {translations.CLAIM_TO_MAKE_VISIBLE}
            </Text>
          </View>
        ) : (
          <Text style={styles.data}>{item.value}</Text>
        )}
      </View>
    );
  };
  const _listFooterComponent = () => {
    return <View style={styles.bottomHeight} />;
  };
  return (
    <SafeAreaView style={styles.mainView}>
      <Header
        lable={translations.CONTESTANT + ' ' + translations.DETAILS}
        isUnderLineRequired
      />
      {isLoading ? (
        <>
          <View style={styles.height} />
          <ShimmerList
            width={Dimensions.get('window').width - moderateScale(32)}
            height={moderateScaleVertical(50)}
            padding={16}
            numColumns={1}
          />
        </>
      ) : (
        <FlatList
          data={listData}
          renderItem={_renderItem}
          ListFooterComponent={_listFooterComponent}
        />
      )}
    </SafeAreaView>
  );
};

export default Contestantdetail;

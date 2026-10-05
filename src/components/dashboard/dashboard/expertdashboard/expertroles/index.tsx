import React, {useState} from 'react';
import {View, FlatList, Text} from 'react-native';
import translations from '../../../../../assets/translations';
import {useNavigation} from '@react-navigation/core';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import Header from '../../../../common/header';
import CategoriesList from '../../../sellitemservices/components/categorieslist';
import {
  moderateScale,
  moderateScaleVertical,
  width,
} from '../../../../utils/responsiveSize';
import {SCREEN} from '../../../../../root/screenname';
import ShimmerList from '../../../../common/shimmer/listshimmer';
import {GET_EXPERT_ROLES_CATEGORIES} from '../../../../../services/endpoints';
import useHtQuery from '../../../../../services/api/useHtQuery';
import ThreeDotMenuModal from '../../../sellitemservices/components/threedotmenumodal';
import {Base} from '../../../../../services/models/base';
import {USER_DESHBOARD_TAB} from '../../../../utils/enum';
import {useSetSelectedRole} from '../../../../../store/useAppStore';

export const ExpertRoles = props => {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const setSelectedRole = useSetSelectedRole();

  //API CATEGORY LIST ----------------------------------------- START
  const {data, isLoading, isRefetching} = useHtQuery<Base>({
    key: GET_EXPERT_ROLES_CATEGORIES,
    url: GET_EXPERT_ROLES_CATEGORIES,
    offSuccessToast: true,
  });

  const listFooterComponent = () => {
    return <View style={{height: moderateScaleVertical(100)}}></View>;
  };

  const onItemClick = (item: number) => {
    if (item?.has_profile) {
      navigation?.reset({
        index: 0,
        routes: [
          {
            name: SCREEN.DASHBOARD_NAVIGATION,
          },
        ],
      });
      setSelectedRole(item.display_name);
      setTimeout(() => {
        navigation.navigate(USER_DESHBOARD_TAB.DESHBOARD, {
          redirectedto: item.display_name,
        });
      }, 1);
    } else {
      navigation.navigate(SCREEN.CREATE_EXPERT_PROFILE, {
        selectedProfile: item,
      });
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Header lable={translations.CHOOSE_YOUR_PROFILE} isUnderLineRequired />
      <Text style={styles.heading}>Select Your Business Profile</Text>
      <View
        style={{
          ...styles.squareContainer,
          marginRight: 0,
        }}>
        {data !== undefined && !isLoading ? (
          <FlatList
            data={data?.data}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            key={'#'}
            ListFooterComponent={listFooterComponent}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <CategoriesList
                image={item?.app_icon_path}
                onItemClickListener={() => onItemClick(item)}
                label={item?.display_name}
                id={item?.id}
                inactive={
                  item?.has_profile?.status === 'Inactive' ? true : false
                }
                selected={item?.has_profile?.status === 'Active' ? true : false}
              />
            )}
          />
        ) : isLoading || isRefetching ? (
          <ShimmerList
            padding={moderateScale(10)}
            width={width / 3 - moderateScale(18)}
            height={moderateScaleVertical(120)}
            borderRadius={moderateScale(12)}
            numColumns={3}
          />
        ) : null}
      </View>
      <ThreeDotMenuModal
        modalVisible={showModal}
        setModalVisible={setShowModal}
      />
    </SafeAreaView>
  );
};

export default ExpertRoles;

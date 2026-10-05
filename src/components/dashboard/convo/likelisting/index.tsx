import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './styles';
import Header from '../../../common/header';
import translations from '../../../../assets/translations';
import AppImages from '../../../../assets/images/AppImages';
import FastImageView from '../../../common/fastimageview';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../utils/responsiveSize';
import useCgMutation from '../../../../services/api/useCgMutation';
import {CONVO_POST_LIKED_USER_LIST} from '../../../../services/endpoints';
import {PostLikeUserList} from '../../../../services/models/convo/postlikeuserlist';
import {MethodTypes} from '../../../../services/constants';
import {checkIsNull, onlyAlphabets} from '../../../utils/validations';
import {useBackHandler} from '@react-native-community/hooks';
import ShimmerList from '../../../common/shimmer/listshimmer';
import {IMAGES, IS_MINOR_VALUES} from '../../../utils/enum';

const LikeListing = ({route}) => {
  const {id} = route.params;
  
  const searchRef = useRef();
  const [loader, setLoader] = useState(false);
  const {mutateAsync: getUserListing} = useCgMutation<PostLikeUserList>({
    key: CONVO_POST_LIKED_USER_LIST + id,
    url: CONVO_POST_LIKED_USER_LIST + id,
    offSuccessToast: true,
    method: MethodTypes.GET,
  });

  const [dataList, setdataList] = useState();
  const [isSearcing, setisSearcing] = useState(false);
  const [searchingList, setSearchingList] = useState([]);
  useBackHandler(() => {
    if (isSearcing) {
      onBack();
      return true;
    }
    // let the default thing happen
    return false;
  });
  const onBack = () => {
    setisSearcing(false);
    return true;
  };
  useEffect(() => {
    hitgetUserList();
  }, []);

  const hitgetUserList = async () => {
    setLoader(true);
    const response = await getUserListing();
    if (response.success) {
      setdataList(response.data.postUsersWholikedList.data);
    }
    setLoader(false);
  };
  const itemSeperator = () => {
    return <View style={styles.itemSeperator} />;
  };
  const _onChangeSearchText = val => {
    if (!!val && checkIsNull(dataList)) {
      const filteredName = dataList.filter(item => {
        return (
          String(item?.owner?.first_name) + String(item?.owner?.last_name)
        )
          .toLowerCase()
          .match(onlyAlphabets(val).trim().toLowerCase());
      });
      setSearchingList([...filteredName]);
    } else {
      setSearchingList(dataList);
    }
  };
  const emptyList = () => {
    return (
      <View style={styles.horizontalCenter}>
        <AppImages.Common.NoRecordIcon />
      </View>
    );
  };
  const checkIsUserActive = item => {
    if (item?.convoUserTabsArr?.haveRole === 1) {
      if (item?.contestant?.is_minor === IS_MINOR_VALUES.YES) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isSearcing ? (
        <View style={styles.searchingView}>
          <TouchableOpacity
            onPress={() => {
              setisSearcing(false);
            }}>
            <AppImages.Common.crossIcon />
          </TouchableOpacity>
          <TextInput
            placeholder={translations.SEARCH_HERE}
            style={styles.searchTextInput}
            ref={searchRef}
            onChangeText={_onChangeSearchText}
          />
        </View>
      ) : (
        <Header
          lable={translations.PEOPLE_WHO_LIKED}
          rightIcon1={<AppImages.Dashboard.HeaderSearchIcon />}
          onPressRightIcon1={() => {
            setisSearcing(true);
            setSearchingList(dataList);
            setTimeout(() => {
              searchRef.current.focus();
            }, 200);
          }}
          isUnderLineRequired
        />
      )}

      <View style={styles.height} />
      {loader ? (
        <ShimmerList
          width={'98%'}
          height={moderateScaleVertical(48)}
          padding={8}
          numColumns={1}
        />
      ) : (
        <FlatList
          data={isSearcing ? searchingList : dataList}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={itemSeperator}
          initialNumToRender={100}
          renderItem={({item}) => (
            <>
              <TouchableOpacity
                style={
                  checkIsUserActive(item)
                    ? styles.listView
                    : {...styles.listView, opacity: 0.5}
                }
                onPress={() => {}}>
                <View style={styles.imageView}>
                  <FastImageView
                    width={moderateScale(48)}
                    height={moderateScale(48)}
                    borderRadius={100}
                    imageUrl={
                      item.thread_owner_image == IMAGES.noImage
                        ? null
                        : item.thread_owner_image
                    }
                    isCircle
                    isProfileImage={true}
                  />
                </View>
                <Text style={styles.nameText} numberOfLines={1}>
                  {item?.owner?.first_name} {item?.owner?.last_name}
                </Text>
              </TouchableOpacity>
            </>
          )}
          ListEmptyComponent={isSearcing ? emptyList : null}
        />
      )}
    </SafeAreaView>
  );
};

export default LikeListing;

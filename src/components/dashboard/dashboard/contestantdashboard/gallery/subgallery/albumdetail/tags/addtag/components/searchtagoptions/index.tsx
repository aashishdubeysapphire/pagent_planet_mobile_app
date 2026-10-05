import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import useStyle from './styles';
import AppImages from '../../../../../../../../../../../assets/images/AppImages';
import translations from '../../../../../../../../../../../assets/translations';
import React, {useEffect, useState} from 'react';
import {color} from '../../../../../../../../../../../assets/colorConstant';
import Modal from 'react-native-modal';
import {GET_PROFILE_BY_TAG_TYPE} from '../../../../../../../../../../../services/endpoints';
import ShimmerList from '../../../../../../../../../../common/shimmer/listshimmer';
import {
  ApiStatusType,
  MethodTypes,
  Param,
} from '../../../../../../../../../../../services/constants';
import useCgMutation from '../../../../../../../../../../../services/api/useCgMutation';
import {Item} from '../../../../../../../../../../../services/models/gallery/tagOptions';
import {useIsFocused} from '@react-navigation/native';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {internetState} from '../../../../../../../../../../common/commonalert';
import FastImageView from '../../../../../../../../../../common/fastimageview';
import {moderateScale} from '../../../../../../../../../../utils/responsiveSize';
import {useKeyboard} from '@react-native-community/hooks';
import {font} from '../../../../../../../../../../../assets/fonts/fontsConstant';
import {onlyAlphabets} from '../../../../../../../../../../utils/validations';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: any;
  preSelectedValue: any;
  title: string;
  params: any;
  onItemSelect: (itemID: number, title: string) => void;
  show_image: number;
  enableMultiSelect: boolean;
}

const SearchTagOptions = ({
  isModalVisible,
  setIsModalVisible,
  preSelectedValue = -1,
  onItemSelect,
  title,
  params,
  show_image = 0,
  enableMultiSelect = false,
}: Props) => {
  const styles = useStyle();
  const [pageNo, setPageNo] = useState(1);
  const [param, setParam] = useState(params);
  const [searchState, setSearchState] = useState('');
  const isFocused = useIsFocused();
  const [maxLength, setMaxLength] = useState(0);
  const [data, setData] = useState({});
  const [multiSelectedArray, setMultiSelectedArray] =
    useState(preSelectedValue);
  const netInfo = useNetInfo();
  const {keyboardShown} = useKeyboard();

  //API SELECT OPTIONS ----------------------------------------- START

  const {isLoading, mutateAsync: getProfileTagRequest} = useCgMutation<Item[]>({
    key:
      GET_PROFILE_BY_TAG_TYPE +
      Param.PAGE +
      pageNo +
      Param.PROFILE_TYPE_ +
      param +
      Param.SHOW_IMG +
      show_image,
    url:
      GET_PROFILE_BY_TAG_TYPE +
      Param.PAGE +
      pageNo +
      Param.PROFILE_TYPE_ +
      param +
      Param.SHOW_IMG +
      show_image,
    method: MethodTypes.GET,
    offSuccessToast: true,
    disableLoader: true,
  });
  //API SELECT OPTIONS ----------------------------------------- END

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected || state.isInternetReachable) {
        callGetProfileTagAPI();
      } else {
        internetState(netInfo.isConnected!!);
      }
    });
  }, [isFocused]);

  const onItemSelection = item => {
    if (enableMultiSelect) {
      onMuiltipleSelect(item);
    } else {
      onItemSelect(item.id, item.text);
      onCloseModel();
    }
  };
  const onMuiltipleSelect = item => {
    Keyboard.dismiss();
    if (!doesArrayIncludesItem(item)) {
      !!multiSelectedArray
        ? setMultiSelectedArray([...multiSelectedArray, item])
        : setMultiSelectedArray([item]);
    } else if (doesArrayIncludesItem(item)) {
      const filterArray = multiSelectedArray.filter(i => {
        return multiSelectedArray.indexOf(i) !== getIndex(item);
      });
      setMultiSelectedArray(filterArray);
    }
  };
  const doesArrayIncludesItem = (obj: {id: any}, arr = multiSelectedArray) => {
    if (!!arr) {
      for (let index = 0; index < arr.length; index++) {
        if (arr?.[index]?.id === obj?.id) {
          return true;
        }
      }
    }
    return false;
  };
  const getIndex = (obj: {id: any}, arr = multiSelectedArray) => {
    for (let index = 0; index < arr.length; index++) {
      if (arr[index].id === obj.id) {
        return index;
      }
    }
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchingCategory(searchState);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchState]);
  const searchingCategory = async (text: string) => {
    setPageNo(1);
    if (text.length > 0) {
      setParam(params + '&search=' + text);
    } else {
      setParam(params);
    }
    NetInfo.fetch().then(async state => {
      if (state.isConnected || state.isInternetReachable) {
        const res = await getProfileTagRequest();
        setData(res?.data);
      } else {
        internetState(netInfo.isConnected!!);
      }
    });
  };

  const callGetProfileTagAPI = async () => {
    NetInfo.fetch().then(async state => {
      if (state.isConnected || state.isInternetReachable) {
        const res = await getProfileTagRequest();
        if (res.success || res.status_code === ApiStatusType.Success) {
          if (pageNo <= res.total_record) {
            if (pageNo === 1) {
              setData(res?.data);
            } else {
              setData([...data, ...res?.data]);
            }
            setPageNo(pageNo + 1);
            setMaxLength(res.total_record);
          }
        }
      } else {
        internetState(netInfo.isConnected!!);
      }
    });
  };

  const onCloseModel = () => {
    setIsModalVisible(false);
  };
  const onPressADD = () => {
    onItemSelect(multiSelectedArray);
    onCloseModel();
  };
  const getColor = item => {
    if (enableMultiSelect) {
      return doesArrayIncludesItem(item) ? color.P_PINK : color.BLACK;
    } else {
      return preSelectedValue === item.id ? color.P_PINK : color.BLACK;
    }
  };
  const showTick = item => {
    if (enableMultiSelect) {
      return doesArrayIncludesItem(item);
    } else {
      return preSelectedValue === item.id;
    }
  };
  return (
    <Modal
      isVisible={isModalVisible}
      backdropOpacity={0.2}
      useNativeDriver={true}
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      onBackButtonPress={onCloseModel}
      style={{marginHorizontal: 0, marginVertical: 0, marginTop: 70}}>
      <View style={styles.modalContainer}>
        <View style={styles.headingView}>
          <Text style={styles.modalHeading}>{title}</Text>
          <TouchableOpacity
            style={styles.crossIcon}
            onPress={() => {
              setIsModalVisible(false);
            }}>
            <AppImages.ProfileImage.Tpp_cross_icon />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBOx}>
          <TextInput
            placeholder={translations.SEARCH_HERE}
            selectionColor={color.P_PINK}
            style={styles.searchTExtinput}
            value={searchState}
            onChangeText={val => {
              setSearchState(onlyAlphabets(val));
            }}
          />

          {isLoading ? (
            <ActivityIndicator size="small" color={color.P_PINK} />
          ) : (
            <View style={styles.searchImage}>
              <AppImages.Common.tpp_search_small_icon />
            </View>
          )}
        </View>
        {data !== null && data?.length > 0 ? (
          <FlatList
            data={data}
            numColumns={1}
            key={'#'}
            initialNumToRender={100}
            keyboardShouldPersistTaps={'handled'}
            onEndReachedThreshold={0.2}
            onEndReached={() => {
              if (data?.length < maxLength) {
                callGetProfileTagAPI();
              }
            }}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.textView}
                onPress={() => onItemSelection(item)}>
                {show_image == 1 && (
                  <View style={styles.imgView}>
                    <FastImageView
                      width={moderateScale(40)}
                      height={moderateScale(40)}
                      borderRadius={100}
                      isCircle
                      imageUrl={item?.image_with_path}
                    />
                  </View>
                )}

                {!!item.text ? (
                  <Text
                    style={{
                      ...styles.selectiontext,
                      fontFamily:
                        getColor(item) === color.P_PINK
                          ? font.RobotoMedium
                          : font.RobotoRegular,
                      color: getColor(item),
                    }}>
                    {item.text}
                  </Text>
                ) : (
                  <Text
                    style={{
                      ...styles.selectiontext,
                      color:
                        preSelectedValue === item.id
                          ? color.P_PINK
                          : color.BLACK,
                    }}>
                    {item.text}
                  </Text>
                )}
                {showTick(item) && <AppImages.Common.PinkTickIcon />}
              </TouchableOpacity>
            )}
          />
        ) : isLoading ? (
          <ShimmerList
            width={300}
            height={18}
            padding={16}
            borderRadius={6}
            numColumns={1}
          />
        ) : (
          data !== null &&
          data?.length === 0 && (
            <View style={styles.noRecordContainer}>
              {/* <NoRecord rightIcon={<AppImages.Common.NoRecordIcon />} /> */}
              <AppImages.Common.NoRecordIcon />
            </View>
          )
        )}

        {enableMultiSelect && data.length > 0 && !keyboardShown && (
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={styles.containerDelete}
              onPress={onCloseModel}>
              <Text style={{...styles.borderButtonText, color: color.BLACK}}>
                {translations.CANCLE}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.containerConfirm}
              onPress={onPressADD}>
              <Text style={styles.borderButtonText}>{translations.ADD}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default SearchTagOptions;

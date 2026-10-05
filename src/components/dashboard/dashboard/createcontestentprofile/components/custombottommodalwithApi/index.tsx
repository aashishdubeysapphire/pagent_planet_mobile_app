import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import React from 'react';
import useStyle from './styles';
import BottomModal from '../../../../../common/bottommodal';
import {color} from '../../../../../../assets/colorConstant';
import AppImages from '../../../../../../assets/images/AppImages';
import translations from '../../../../../../assets/translations';
import {checkIsNull} from '../../../../../utils/validations';
import CustomButton from '../../../../../common/button';
import {font} from '../../../../../../assets/fonts/fontsConstant';
import {ActivityIndicator} from 'react-native-paper';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../utils/responsiveSize';
import {PagentNameList} from '../../../../../../services/models/constantsForm/pagentnameList';
import useInfiniteHtQuery from '../../../../../../services/api/useHtInfiniteQuery';
import {GET_PAGEANT_NAME_LIST} from '../../../../../../services/endpoints';
import {Param} from '../../../../../../services/constants';
import ShimmerList from '../../../../../common/shimmer/listshimmer';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: any;
  data: any;
  heading: string;
  parentCallback: any;
  preSelectedValue: any;
  enableSearch: boolean;
  enableMultiselect: boolean;
  initalySelected: any;
  isLoading: boolean;
}
const CustomBottomModalWithApi = ({
  isModalVisible,
  setIsModalVisible,
  data = [],
  heading,
  parentCallback,
  preSelectedValue = '',
  enableSearch = false,
  enableMultiselect = false,
}: Props) => {
  const styles = useStyle();

  const [isSelected, setIsSelected] = React.useState(preSelectedValue);
  const [multiSelectedArray, setMultiSelectedArray] =
    React.useState(preSelectedValue);
  const [searchText, setSearchText] = React.useState('');

  const sendData = (selectedText: any) => {
    parentCallback(selectedText);
  };
  React.useEffect(() => {
    setSearchText('');
  }, [isModalVisible]);
  React.useEffect(() => {
    setIsSelected(preSelectedValue);
    setMultiSelectedArray(preSelectedValue);
  }, [preSelectedValue]);
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      hitSearchApi();
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const searchFilterFunction = text => {
    setSearchText(text);
  };
  const onSingleSelect = item => {
    Keyboard.dismiss();
    setIsSelected(item.item.id);
    sendData(item.item);

    setIsModalVisible(false);
  };

  const onMuiltipleSelect = item => {
    Keyboard.dismiss();
    if (checkIsNull(multiSelectedArray))
      if (!multiSelectedArray.includes(item?.item)) {
        setMultiSelectedArray([...multiSelectedArray, item?.item]);
      } else {
        const filterArray = multiSelectedArray.filter(i => {
          return (
            multiSelectedArray.indexOf(i) !=
            multiSelectedArray.indexOf(item?.item)
          );
        });
        setMultiSelectedArray(filterArray);
      }
  };
  const onPressADD = () => {
    sendData(multiSelectedArray);
    setIsModalVisible(false);
  };
  const onPressCancle = () => {
    setIsModalVisible(false);
    setMultiSelectedArray(preSelectedValue);
  };
  const emptyList = () => {
    return <AppImages.Common.NoRecordIcon />;
  };
  const hitSearchApi = async () => {
    await refetch();
  };
  const {
    data: paginatedData,
    fetchNextPage,
    isLoading,
    refetch,
    isFetchingNextPage,
  } = useInfiniteHtQuery<PagentNameList>({
    key: GET_PAGEANT_NAME_LIST + searchText,
    url: GET_PAGEANT_NAME_LIST + Param.STR_ + searchText,
    page: Param.PAGE_,
    getDataArray: page => page?.data?.pageants?.length,
    disableLoader: true,
  });

  const pageantListData =
    paginatedData?.pages
      ?.map(page => {
        if (page?.data?.pageants != null && page?.data?.pageants != undefined) {
          return page?.data?.pageants;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];
  const onEndReached = async () => {
    fetchNextPage();
  };
  return (
    <BottomModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      customStyles={{paddingHorizontal: moderateScaleVertical(16)}}>
      <View style={styles.headingView}>
        <Text style={styles.modalHeading}>{heading}</Text>
        <TouchableOpacity
          style={styles.crossIcon}
          onPress={() => {
            setIsModalVisible(false);
          }}>
          <AppImages.ProfileImage.Tpp_cross_icon />
        </TouchableOpacity>
      </View>

      {enableSearch && (
        <>
          <View style={[styles.searchBOx]}>
            <TextInput
              placeholder={translations.SEARCH_HERE}
              selectionColor={color.P_PINK}
              style={[styles.searchTExtinput]}
              value={searchText}
              onChangeText={val => {
                searchFilterFunction(
                  val.replace(
                    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
                    '',
                  ),
                );
              }}
            />
            <View style={[styles.searchImage]}>
              <AppImages.Common.tpp_search_small_icon />
            </View>
          </View>
        </>
      )}
      {isLoading ? (
        <View>
          <ShimmerList
            customStyle={{marginVertical: moderateScaleVertical(8)}}
            borderRadius={moderateScale(20)}
            width={'100%'}
            height={moderateScale(36)}
          />
        </View>
      ) : (
        <FlatList
          ListEmptyComponent={emptyList}
          data={pageantListData}
          keyExtractor={item => item?.id?.toString()}
          keyboardShouldPersistTaps="always"
          onEndReachedThreshold={0.9}
          onEndReached={onEndReached}
          ListFooterComponent={() => {
            return (
              <View style={styles.bottomHeight}>
                {isFetchingNextPage ? (
                  <ActivityIndicator size={'small'} color={color.P_PINK} />
                ) : null}
              </View>
            );
          }}
          renderItem={item => (
            <>
              <TouchableOpacity
                style={styles.textView}
                onPress={() =>
                  enableMultiselect
                    ? onMuiltipleSelect(item)
                    : onSingleSelect(item)
                }>
                <Text
                  style={{
                    ...styles.selectiontext,
                    fontFamily:
                      isSelected === item?.item?.id
                        ? font.RobotoMedium
                        : font.RobotoRegular,
                    color:
                      isSelected === item?.item?.id
                        ? color.P_PINK
                        : color.BLACK,
                  }}
                  numberOfLines={1}>
                  {item.item.title}
                </Text>
                {isSelected === item?.item?.id && (
                  <AppImages.Common.PinkTickIcon />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onSingleSelect(item)}>
                {checkIsNull(item?.item?.state) ? (
                  <Text>
                    {item?.item?.state}, {item?.item?.country}
                  </Text>
                ) : (
                  <Text> {item?.item?.country}</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        />
      )}
      {enableMultiselect && (
        <View style={styles.bottomContainer}>
          <View style={styles.containerDelete}>
            <CustomButton
              inactive
              label={translations.CANCLE}
              border={true}
              inActiveBorder
              onPress={onPressCancle}
            />
          </View>

          <View style={styles.containerConfirm}>
            <CustomButton
              inactive
              label={translations.ADD}
              border={true}
              onPress={() => {
                onPressADD();
              }}
              textStyle={styles.borderButtonText}
            />
          </View>
        </View>
      )}
    </BottomModal>
  );
};

export default CustomBottomModalWithApi;

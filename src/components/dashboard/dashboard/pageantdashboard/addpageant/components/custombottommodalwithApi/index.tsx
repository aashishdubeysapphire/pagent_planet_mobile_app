import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import useStyle from './styles';
import BottomModal from '../../../../../../common/bottommodal';
import {color} from '../../../../../../../assets/colorConstant';
import AppImages from '../../../../../../../assets/images/AppImages';
import translations from '../../../../../../../assets/translations';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../../../../utils/responsiveSize';
import {checkIsNull} from '../../../../../../utils/validations';
import {UserContext} from '../../../../../../../store/userStore';
import images from '../../../../../../../assets/images/AppImages';
import {
  GET_PAGEANT_TITLE_LIST,
  CHECK_PAGEANT_EXISTENCE,
} from '../../../../../../../services/endpoints';
import {MethodTypes, Param} from '../../../../../../../services/constants';
import useInfiniteHtQuery from '../../../../../../../services/api/useHtInfiniteQuery';
import {PageantTitleData} from '../../../../../../../services/models/pageantdetails/pageantTitleData';
import {useNavigation} from '@react-navigation/core';
import {SCREEN} from '../../../../../../../root/screenname';
import {
  checkIsConnected,
  emptyFunction,
} from '../../../../../../utils/helperFunction';
import {useSetLoader} from '../../../../../../../store/useAppStore';
import useCgMutation from '../../../../../../../services/api/useCgMutation';

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: any;
  data: any;
  heading: string;
  parentCallback: any;
  parentSearchCallback: any;
  preSelectedValue: any;
  enableSearch: boolean;
  enableMultiselect: boolean;
  initalySelected: any;
  prefilledValue: string;
}
const CustomBottomModalWithApi = ({
  isModalVisible,
  setIsModalVisible,
  data = [],
  heading,
  parentCallback,
  parentSearchCallback,
  preSelectedValue = '',
  enableSearch = false,
  enableMultiselect = false,
  prefilledValue,
}: Props) => {
  const styles = useStyle();
  const {storeData} = React.useContext(UserContext);
  const [showError, setShowError] = React.useState(false);
  const [error2, setError2] = React.useState(false);
  const [searchTitle, setSearchTitle] = React.useState(true);
  const [slug, setSlug] = React.useState('');
  const [isSelected, setIsSelected] = React.useState(preSelectedValue);
  const [ownerId, setOwnerId] = React.useState(null);
  const [multiSelectedArray, setMultiSelectedArray] =
    React.useState(preSelectedValue);
  const [searchText, setSearchText] = React.useState('');
  const navigation = useNavigation();
  const setLoader = useSetLoader();
  //API GALLERY----------------------------------------- START
  const {
    data: paginatedPageantTitle,
    fetchNextPage,
    isLoading,
    isRefetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteHtQuery<PageantTitleData>({
    key: GET_PAGEANT_TITLE_LIST,
    url: GET_PAGEANT_TITLE_LIST + searchText,
    page: Param.PAGE_,
    getDataArray: page => page?.data?.pageants?.data?.length,
    reverse: true,
    disableLoader: true,
  });
  const pageantTitleList =
    paginatedPageantTitle?.pages
      ?.map((page: PageantTitleData) => {
        if (
          page?.data?.pageants?.data !== null &&
          page?.data?.pageants?.data !== undefined
        ) {
          return page?.data?.pageants?.data;
        } else {
          return [];
        }
      })
      .reduce((allPages, pageData) => [...allPages, ...pageData], []) ?? [];

  const sendSearchData = () => {
    parentSearchCallback(searchText);
  };
  const {mutateAsync: checkPageantExistence} = useCgMutation({
    key: CHECK_PAGEANT_EXISTENCE,
    url: CHECK_PAGEANT_EXISTENCE + searchText,
    method: MethodTypes.GET,
    offErrorToast: true,
    offSuccessToast: true,
    disableLoader: true,
  });
  const checkInterNet = () => {
    return checkIsConnected();
  };
  const checkError = async () => {
    if (checkInterNet()) {
      setLoader(true);

      const res = await checkPageantExistence();
      if (res.success) {
        sendSearchData();
        setSearchTitle(false);
        setIsModalVisible(false);
        setShowError(false);
        setLoader(false);
      } else {
        setShowError(true);
        setLoader(false);
      }
    } else {
      setLoader(false);
    }
  };

  useEffect(() => {
    setIsSelected('');
    setShowError(false);
    setError2(false);
    if (prefilledValue === '') {
      setSearchText('');
      setSearchTitle(true);
    } else {
      setSearchTitle(false);
      setSearchText(prefilledValue);
    }
  }, [isModalVisible]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchQuery();
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const searchQuery = async () => {
    await refetch();
  };

  const searchFilterFunction = text => {
    setSearchText(text);
  };
  const onSingleSelect = item => {
    Keyboard.dismiss();
    setIsSelected(item.item.id);
    setSlug(item.item.slug);
    setShowError(false);
    setError2(false);
    setOwnerId(item?.item?.owner_id);
  };
  const onPressSave = () => {
    checkError();
  };

  const onMuiltipleSelect = item => {
    Keyboard.dismiss();
    if (checkIsNull(multiSelectedArray))
      if (!multiSelectedArray.includes(item?.item)) {
        setMultiSelectedArray([...multiSelectedArray, item?.item]);
      } else {
        let filterArray = multiSelectedArray.filter(i => {
          return (
            multiSelectedArray.indexOf(i) !=
            multiSelectedArray.indexOf(item?.item)
          );
        });
        setMultiSelectedArray(filterArray);
      }
  };
  const onPressClaim = () => {
    if (ownerId === storeData?.data?.user.id) {
      setError2(true);
    } else {
      setIsModalVisible(false);
      navigation.navigate(SCREEN.CLAIM_PROFILE, {
        profileType: translations.PAGEANT_SMALL,
        slug: slug,
      });
    }
  };
  const onPressCancle = () => {
    setIsModalVisible(false);
    setSearchTitle(true);
    setSearchText('');
    setMultiSelectedArray(preSelectedValue);
  };
  const onEndReached = async () => {
    if (pageantTitleList?.length > 19) {
      fetchNextPage();
    }
  };
  const emptyList = () => {
    return !isLoading && !isRefetching && searchText !== '' ? (
      <View
        style={{alignSelf: 'center', marginTop: moderateScaleVertical(101)}}>
        <Text style={styles.noPageantFound}>
          {translations.NO_PAGEANT_TITLE_FOUND} "{searchText}"
        </Text>
      </View>
    ) : null;
  };
  return (
    <BottomModal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}>
      <View style={styles.headingView}>
        <Text style={styles.modalHeading}>{heading}</Text>
        <TouchableOpacity
          style={styles.closeButtonIcon}
          onPress={() => {
            setIsModalVisible(false);
          }}>
          <AppImages.ProfileImage.Tpp_cross_icon />
        </TouchableOpacity>
      </View>

      {enableSearch && (
        <>
          <View
            style={{
              ...styles.searchBOx,
              backgroundColor:
                searchText !== '' && !isLoading ? color.WHITE : color.S_GRAY_1,
            }}>
            <TextInput
              placeholder={
                searchTitle
                  ? translations.PAGEANT_TITLE1
                  : translations.ADD_TITLE
              }
              selectionColor={color.P_PINK}
              style={styles.searchTExtinput}
              value={searchText}
              onChangeText={val => {
                setIsSelected('');
                const re = /^[a-zA-Z ]*$/;
                if (val === '' || re.test(val)) {
                  searchFilterFunction(val);
                }
              }}
            />
            <View style={styles.searchImage}>
              {searchText !== '' && !searchTitle && !isLoading ? (
                <TouchableOpacity onPress={() => onPressSave()}>
                  <Text
                    style={{
                      ...styles.save,
                      opacity: 1,
                    }}>
                    {translations.ADD}
                  </Text>
                </TouchableOpacity>
              ) : isRefetching || isLoading ? (
                <ActivityIndicator size={'small'} color={color.P_PINK} />
              ) : searchText !== '' && searchTitle ? (
                <TouchableOpacity
                  onPress={() => {
                    setSearchText('');
                  }}>
                  <AppImages.Common.greyCrossSmall />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </>
      )}
      {showError && (
        <View
          style={{
            flexDirection: 'row',
            marginBottom: moderateScaleVertical(16),
          }}>
          <images.Common.Alert_ICON
            height={moderateScaleVertical(13)}
            marginRight={moderateScale(2)}
            marginTop={moderateScaleVertical(3)}
          />
          <Text style={styles.error}>{translations.PAGEANT_ERROR}</Text>
        </View>
      )}
      {searchTitle ? (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: moderateScaleVertical(16),
          }}
          onPress={() => {
            setSearchTitle(false);
            setIsSelected('');
            setSearchText('');
          }}>
          <AppImages.Common.AddPageant />

          <Text style={styles.addTitle}>{translations.ADD_PAGEANT_TITLE}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: moderateScaleVertical(16),
          }}
          onPress={() => {
            setSearchTitle(true);
            setShowError(false);
          }}>
          <AppImages.Common.Claim />

          <Text style={styles.addTitle}>
            {translations.CLAIM_EXISTING_PAGEANT}
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.bottomContainer2}>
        {(searchTitle && !isRefetching) ||
        (searchTitle && isFetchingNextPage && isRefetching) ? (
          <FlatList
            ListEmptyComponent={emptyList}
            data={pageantTitleList}
            keyExtractor={item => item?.id?.toString()}
            keyboardShouldPersistTaps="always"
            onEndReachedThreshold={0.5}
            onEndReached={onEndReached}
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
                <TouchableOpacity onPress={() => onSingleSelect(item)} />
                {error2 && isSelected === item?.item?.id && (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: moderateScaleVertical(5),
                    }}>
                    <images.Common.Alert_ICON
                      height={moderateScaleVertical(13)}
                      marginRight={moderateScale(2)}
                      marginTop={moderateScaleVertical(3)}
                    />
                    <Text style={styles.error}>
                      {translations.MANAGED_BY_YOU}
                    </Text>
                  </View>
                )}
              </>
            )}
          />
        ) : null}
      </View>
      {searchTitle && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.containerDelete}
            onPress={onPressCancle}>
            <Text style={{...styles.borderButtonText, color: color.BLACK}}>
              {translations.CANCLE}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              ...styles.containerConfirm,
              opacity: isSelected === '' || showError ? 0.2 : 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                if (isSelected === '') {
                  emptyFunction();
                } else {
                  onPressClaim();
                }
              }}>
              <Text style={styles.borderButtonText}>{translations.CLAIM_}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </BottomModal>
  );
};

export default CustomBottomModalWithApi;
